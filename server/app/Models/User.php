<?php

namespace App\Models;

use http\Encoding\Stream\Inflate;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use  HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    /**
     * create user->wallet relation
     * the user can have only one wallet
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function wallet()
    {
        return $this->hasOne(Wallet::class);
    }

    /**
     * create withdraw transaction for user wallet
     * @param $amount
     * @return bool
     */
    public function withdraw($amount, $uuid): bool
    {
        if ($this->wallet->allowWithdraw($amount)) {
            $this->wallet->transactions()->create([
                'amount' => $amount,
                'type' => 'withdraw',
                'uuid' => $uuid,
            ]);
            return true;
        }

        return false;
    }

    /**
     * create deposit transaction for user wallet
     * @param $amount
     * @return bool
     */
    public function deposit($amount, $uuid): bool
    {
        $this->wallet->transactions()->create([
            'amount' => $amount,
            'type' => 'deposit',
            'uuid' => $uuid,
        ]);

        return true;
    }

    /**
     * this method well called when we set value to locked attribute
     * ($this->blocked = value)
     * @return bool
     */
    public function getIsBlockedAttribute() : bool
    {
        return $this->deleted_at !== null;
    }

    /**
     * get blocked users only
     */
    public function blocked()
    {
        return User::onlyTrashed()->get();
    }

    /**
     * get total approved transactions for user
     * @return mixed
     */
    public function totalApproved()
    {
        return $this->wallet->transactions()->approved()->count();
    }

    /**
     * get total Declined transactions for user
     * @return mixed
     */
    public function totalDeclined()
    {
        return $this->wallet->transactions()->declined()->count();
    }

    /**
     * get total Pending transactions for user
     * @return mixed
     */
    public function totalPending()
    {
        return $this->wallet->transactions()->waiting()->count();
    }

    /**
     * @return mixed|void
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
}
