<?php

namespace App\Http\Controllers;


use App\HUser;
use App\Skill;
use Illuminate\Http\Request;

use App\Http\Requests;
use Mockery\CountValidator\Exception;

class HUserController extends Controller
{

    public function showAll() {
        try {
            $users = HUser::all();
            return $users;
        } catch (Exception $e) { }
    }


    public function join($group_name) {
        /**
         * If the group exists, then return all the Bookmarks which belong to this group.
         * If the group does not exist, then create a new group.
         */
        try {
            $groupId = self::store($group_name);
            if ($groupId > 0) {
                $bookmarks = [];
                $bookmarks = Group::find($groupId)->bookmarks;
                return $bookmarks;
            }
        } catch (Exception $e) { }

        return [];
    }

    private function store($group_name) {
        /**
         * Return the groupID if the group name exists. Otherwise create a new group with the name and return it's ID
         */
        try {
            $gid = Group::firstOrCreate(['name' => $group_name])->id;
            return $gid;
        } catch (Exception $e) { }

        return -1;
    }

    private function getBookmarks($group_name) {
        $bookmarks = null;
        try {
            $bookmarks = Group::where('name', $group_name)->get()->first()->bookmarks;
            return $bookmarks;
        } catch (\ErrorException $e) { }
        return [];
    }

    public function destroy($groupName) {
        /**
         * If the group exists, then delete all of the Bookmarks belonging to this group.
         */

    }
}