FROM openjdk:11

ADD ./target/donor-profile-service-0.0.1-SNAPSHOT.jar /usr/src/donor-profile-service-0.0.1-SNAPSHOT.jar

WORKDIR usr/src

ENTRYPOINT ["java","-jar","donor-profile-service-0.0.1-SNAPSHOT.jar"]