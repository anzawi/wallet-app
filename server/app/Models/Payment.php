<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Model to manage payments table
 */
class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'currencies',
        'min_deposit',
        'max_deposit',
        'max_withdrawal',
        'min_withdrawal',
        'img'
    ];

    /**
     * change key when we're using route injection (binding) for payment model
     * @return string
     */
    public function getRouteKeyName()
    {
        return 'slug';
    }

    /**
     * create relation with \App\Models\Transactions::class
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function transaction()
    {
        return $this->hasMany(Transaction::class);
    }
}
