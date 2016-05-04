<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bookmark extends Model
{
    protected $fillable = [
        'title',
        'url',
        'name',
        'group_id'
    ];

    public function groups() {
        return $this->belongsTo('\App\Group', 'group_id');
    }

}
