<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    //
    protected $fillable = [
        'name',
        'description'
    ];

    public function h_users() {
        return $this->belongsToMany(
            '\App\HUser',
            'h_user_skill',
            'skill_id',
            'h_user_id'
        );
    }
    
}
