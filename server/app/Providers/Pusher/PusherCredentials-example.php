<?php

class PusherCredentials
{
    private $KEY = "key";
    private $SECRET = "secret";
    private $APP_ID = -1;

    public function getKey() {
        return $this->KEY;
    }

    public function getSecret() {
        return $this->SECRET;
    }

    public function getAppId() {
        return $this->APP_ID;
    }
}