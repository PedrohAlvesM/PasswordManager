<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Password extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_password';  

    protected $fillable = [
        'application_name',
        'password',
        'username',
        'email',
        'recovery_email',
        'phone',
        'recovery_phone',
        'birth_date',
        'description',
        'additional_info',
        'user_id',
    ];

    protected $casts = [
        'birth_date' => 'date',
        'user_id' => 'integer',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
