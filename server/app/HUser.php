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
    
}
