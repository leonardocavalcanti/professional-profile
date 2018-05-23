FROM java:8-jre

ADD ./target/profile-service.jar /app/
CMD ["java", "-Xmx200m", "-jar", "/app/profile-service.jar"]

EXPOSE 6000