<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/jh/users/', 'HUserController@showAll');

Route::get('/api/group/join/{group_name}', 'GroupsController@join');

Route::get('/api/bookmark/get/id/{bookmark_id}', 'BookmarksController@getBookmarkById');
Route::get('/api/bookmark/get/groupid/{group_id}', 'BookmarksController@getBookmarksByGroupId');
Route::get('/api/bookmark/get/groupname/{group_name}', 'BookmarksController@getBookmarksByGroupName');
Route::get('/api/bookmark/set/', 'BookmarksController@store');
Route::get('/api/bookmark/del/{bookmark_id}', 'BookmarksController@deleteBookmarkById');

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/

/*Route::group(['middleware' => ['web']], function () {
    //
});
*/