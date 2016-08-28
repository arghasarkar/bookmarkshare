<?php

require 'Pusher.php';
require 'PusherCredentials.php';

class PusherHelper
{
    /**
     * @param array $notification -- Associative array
     *                               Must contain 'group', 'name' and 'url'  keys
     * @return bool
     */
    public function sendPusherNotification(array $notification) : bool {
        $options = array(
            'cluster' => 'eu',
            'encrypted' => true
        );
        $pusherCredentials = new PusherCredentials();
        $pusher = new Pusher(

            $pusherCredentials->getKey(),
            $pusherCredentials->getSecret(),
            $pusherCredentials->getAppId(),

            $options
        );

        $status = $pusher->trigger($notification['group'], 'newurl', $notification);
        return $status;
    }

}