FROM openjdk:11

ADD ./target/recepient-profile-service-0.0.1-SNAPSHOT.jar /usr/src/recepient-profile-service-0.0.1-SNAPSHOT.jar

WORKDIR usr/src

ENTRYPOINT ["java","-jar","recepient-profile-service-0.0.1-SNAPSHOT.jar"]