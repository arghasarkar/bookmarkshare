# UrlShare backend API

The API for UrlShare's is created using the Laravel framework based on 
PHP.


## Laravel framework 

You can find out more about the framework from this link here:
[https://laravel.com](https://laravel.com).


### API server installation

For installation, follow the instructions for the Laravel and then just
clone this repo.
Installation link: [https://laravel.com/docs/5.2#installation](https://laravel.com/docs/5.2#installation)


## Configuration

After installing Laravel, only a small amount of configuration is required.

The [Pusher](https://pusher.com) API is used to transmit the "Links" or 
"Bookmarks" in real-time to the users in a certain group. For this, the 
Pusher needs to be configured.


### Pusher 

A [Pusher](https://pusher.com) account needs to be created. 


#### Pusher API Configuration

After creating the account, login to the dashboard and go to "Your apps".
Create a new app for this purpose. This will give you three pieces of information which is required for the next step:

* App ID
* Key
* Secret


#### Pusher configuration with server

In the `\app\Providers\Pusher` directory, there is a file called `PusherCredentials-example.php`.

1. Copy the contents of the file into a new file called `PusherCredentials.php`
2. Replace the relevant fields from the information acquired from Pusher in the previous step.
3. Save the file. 


## Post API configuration

After the backend API is set up, the `php artisan serve` command can be used to ___run___ the server. 
Modify the appropriate IP address for the server in the extension configuration. More about this in the extension's documentation.


## Using the REST API

The API works by sending **HTTP GET** requests to the server. This section below explains it in detail.

### Creating or joining a new group

Access `/group/join/{group_name}` path. Replace ___group_name___ by the
group to be joined or created. If the group already exists, then a list 
**Bookmarks** belonging to the group is returned in a __JSON__ format.

Example: `/group/join/test_channel` returns the following:

```javascript
[
    {
        "id":20,
        "title":"Get Couper",
        "url":"http:\/\/getcouper.com",
        "name":"Argha",
        "group_id":9,
        "created_at":"2016-04-26 13:55:20",
        "updated_at":"2016-04-26 13:55:20"
    },
    {
        "id":21,"title":"Facebook",
        "url":"https:\/\/www.facebook.com",
        "name":"Argha",
        "group_id":9,
        "created_at":"2016-04-26 13:56:01",
        "updated_at":"2016-04-26 13:56:01"
    }
]
```

If the group does NOT exist, then a new group will be created and `[]` 
will be returned.

### Creating a new Bookmark

A **Bookmark** can only be created for a **Group** that already exists. 
If the Group does not exist, then an error is returned.

To create the Bookmark, send a **GET** request to `/bookmark/set/` with 
the following parameters in the ___query string___:

* ____'group', 'name' and 'url'  keys` 
* __Group__: The Group this Bookmark belongs to
* __Name:__: The creator of the Bookmark. This is the field called *Name* in the Chrome extension
* __Title__: The Title of the web page being Bookmarked
* __URL__: The URL of the link being Bookmarked


# Contribution

If you would like to contribute to this project, then please create a 
new branch. When the work is ready for submission, please create a Pull
Request to the __DEVELOP__ branch for code review.