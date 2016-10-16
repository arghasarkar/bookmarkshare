<?php

namespace App\Http\Controllers;


use App\HUser;
use App\Skill;
use Illuminate\Http\Request;

use App\Http\Requests;
use Mockery\CountValidator\Exception;

class SkillController extends Controller
{

    public function showAll() {
        try {
            $skills = Skill::all();
            return $skills;
        } catch (Exception $e) { }
    }
    
}