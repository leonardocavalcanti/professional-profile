FROM java:8-jre

ADD ./target/messages-service.jar /app/
CMD ["java", "-Xmx200m", "-jar", "/app/messages-service.jar"]

EXPOSE 5000