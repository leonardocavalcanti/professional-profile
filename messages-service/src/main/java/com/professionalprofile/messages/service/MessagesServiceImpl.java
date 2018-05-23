package com.professionalprofile.messages.service;

import com.professionalprofile.messages.domain.Message;
import com.professionalprofile.messages.repository.MessagesRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonReader;
import javax.net.ssl.HttpsURLConnection;
import java.io.*;
import java.net.URL;
import java.util.Date;

@Service
public class MessagesServiceImpl implements MessagesService {

	private final Logger log = LoggerFactory.getLogger(getClass());

    private static final String url = "https://www.google.com/recaptcha/api/siteverify";
    private static final String secret = "6LeevkMUAAAAAI59tKUvEriG37jEEohSmIZMy-yL";
    private static final String USER_AGENT = "Mozilla/5.0";

    @Autowired
	private MessagesRepository repository;

	/**
	 * {@inheritDoc}
	 */
	@Override
	public Iterable<Message> findAll() {
		return repository.findAll();
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public Message create(String captchaToken, Message create) {

	    Assert.isTrue(verifyRecaptcha(captchaToken), "Invalid captcha token");

		create.date = new Date();
	    create.read = false;

		repository.save(create);

		log.info("new message has been created: " + create.name);

		return create;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public void update(Message update) {
		Message message = repository.findOne(update.id);

		Assert.notNull(message, "Message not found");

		message.name = update.name;
		message.email = update.email;
		message.subject = update.subject;
		message.message = update.message;
		message.read = update.read;

		repository.save(message);

		log.debug("Message {} changes has been saved", update.name);
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public void delete(String id) {
		Message message = repository.findOne(id);

		Assert.notNull(message, "Message not found");

		repository.delete(message);

		log.debug("Message {} has been deleted", message.name);
	}

	private static boolean verifyRecaptcha(String gRecaptchaResponse) {
		if (gRecaptchaResponse == null || "".equals(gRecaptchaResponse)) {
			return false;
		}

		try{
			URL obj = new URL(url);
			HttpsURLConnection con = (HttpsURLConnection) obj.openConnection();

			// add reuqest header
			con.setRequestMethod("POST");
			con.setRequestProperty("User-Agent", USER_AGENT);
			con.setRequestProperty("Accept-Language", "en-US,en;q=0.5");

			String postParams = "secret=" + secret + "&response="
					+ gRecaptchaResponse;

			// Send post request
			con.setDoOutput(true);
			DataOutputStream wr = new DataOutputStream(con.getOutputStream());
			wr.writeBytes(postParams);
			wr.flush();
			wr.close();

			int responseCode = con.getResponseCode();
			System.out.println("\nSending 'POST' request to URL : " + url);
			System.out.println("Post parameters : " + postParams);
			System.out.println("Response Code : " + responseCode);

			BufferedReader in = new BufferedReader(new InputStreamReader(
					con.getInputStream()));
			String inputLine;
			StringBuffer response = new StringBuffer();

			while ((inputLine = in.readLine()) != null) {
				response.append(inputLine);
			}
			in.close();

			// print result
			System.out.println(response.toString());

			//parse JSON response and return 'success' value
			JsonReader jsonReader = Json.createReader(new StringReader(response.toString()));
			JsonObject jsonObject = jsonReader.readObject();
			jsonReader.close();

			return jsonObject.getBoolean("success");
		}catch(Exception e){
			e.printStackTrace();
			return false;
		}
	}
}