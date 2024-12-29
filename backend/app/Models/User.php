<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Role;

class User extends Authenticatable
{
    use HasFactory, Notifiable;
    use HasApiTokens, Notifiable;

    protected $primaryKey = 'user_id'; // 主キーを指定


    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'password',
        'name',
        'birthday',
        'email',
        'role_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'password' => 'hashed', // Laravel 10以降の新しいパスワードキャスト
        ];
    }

    /**
     * Override the default username field for authentication.
     *
     * @return string
     */
    public function username(): string
    {
        return 'user_id'; // 認証時に使用するフィールドを指定
    }

    public function roles()
    {
        return $this->belongsTo(Role::class);
    }
}
