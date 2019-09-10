FROM openjdk:11

ADD ./target/recommendation-service-0.0.1-SNAPSHOT.jar /usr/src/recommendation-service-0.0.1-SNAPSHOT.jar

WORKDIR usr/src

ENTRYPOINT ["java","-jar","recommendation-service-0.0.1-SNAPSHOT.jar"]