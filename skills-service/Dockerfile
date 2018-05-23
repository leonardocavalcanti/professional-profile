FROM java:8-jre

ADD ./target/skills-service.jar /app/
CMD ["java", "-Xmx200m", "-jar", "/app/skills-service.jar"]

EXPOSE 7000