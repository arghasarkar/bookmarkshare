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

}