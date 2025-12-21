<?php

namespace App\Models\Features\Search;

use Illuminate\Database\Eloquent\Model;

class UserSearchHistory extends Model
{
    protected $fillable = ['user_id', 'query'];
}
