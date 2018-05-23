FROM java:8-jre

ADD ./target/jobs-service.jar /app/
CMD ["java", "-Xmx200m", "-jar", "/app/jobs-service.jar"]

EXPOSE 4000