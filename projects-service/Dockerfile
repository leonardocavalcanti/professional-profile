FROM java:8-jre

ADD ./target/projects-service.jar /app/
CMD ["java", "-Xmx200m", "-jar", "/app/projects-service.jar"]

EXPOSE 8000