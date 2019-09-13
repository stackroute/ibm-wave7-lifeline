package com.stackroute.recepientprofileservice.model;

public class Notification {

    private String message;

    public Notification (String content) {
        this.message = content;
    }

    public String getContent() {
        return message;
    }

}