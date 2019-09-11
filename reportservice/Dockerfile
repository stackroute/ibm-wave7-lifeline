FROM openjdk:11

ADD ./target/reportservice-0.0.1-SNAPSHOT.jar /usr/src/reportservice-0.0.1-SNAPSHOT.jar

WORKDIR usr/src

ENTRYPOINT ["java","-jar","reportservice-0.0.1-SNAPSHOT.jar"]
