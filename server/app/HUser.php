<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class HUser extends Model
{

    protected $fillable = [
        'name',
        'mob',
        'email',
        'about'
    ];

    public function skills() {
        return $this->belongsToMany(
            '\App\Skill',
            'h_user_skill',
            'h_user_id',
            'skill_id'
        );
    }
    
}
