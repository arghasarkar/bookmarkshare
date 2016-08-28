<?php

namespace App\Http\Controllers;

require __DIR__ . '/../../Providers/Pusher/PusherHelper.php';

use App\Bookmark;
use App\Group;

use Illuminate\Http\Request;
use Mockery\CountValidator\Exception;

class BookmarksController extends Controller
{
    public function getBookmarkById($bookmark_id) {
        $bookmark = null;
        try {
            $bookmark = Bookmark::find($bookmark_id);
        } catch (Exception $e) { }

        return $bookmark;
    }

    public function getBookmarksByGroupId($group_id) {
        $bookmarks = null;
        try {
            $bookmarks = Group::find($group_id)->bookmarks;
            return $bookmarks;
        } catch (\ErrorException $e) { }
        return [];
    }

    public function getBookmarksByGroupName($group_name) {
        $bookmarks = null;
        try {
            $bookmarks = Group::where('name', $group_name)->get()->first()->bookmarks;
            return $bookmarks;
        } catch (\ErrorException $e) { }
        return [];
    }

    public function store(Request $request) {
        $group = $request->input('group');
        $title = $request->input('title');
        $url = $request->input('url');
        $name = $request->input('name');

        try {
            $groupId = $this->getGroupIdByGroupName($group);

            if ($groupId > 0) {
                Bookmark::firstorCreate(['title' => $title, 'url' => $url, 'name' => $name, 'group_id' => $groupId]);

                // Creating a notification array with details of the newly created bookmark
                $notification = [
                    'group' => $group,
                    'name' => $name,
                    'title' => $title,
                    'url' => $url
                ];

                // Sending off Pusher notifcations
                $pusherHelper = new \PusherHelper();
                $sentStatus = $pusherHelper->sendPusherNotification($notification) . "";
                return $sentStatus;
            }
        } catch (Exception $e) {}

    }

    private function getGroupIdByGroupName($groupName) {
        return Group::whereName($groupName)->get()->first()->id;
    }

    public function deleteBookmarkById($bookmark_id) {
        try {
            Bookmark::find($bookmark_id)->delete();
        } catch (\Exception $e) { }
    }
}
