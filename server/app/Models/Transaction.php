<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'amount',
        'uuid',
        'payment_id',
    ];

    /**
     * change key when we're using route injection (binding) for user model
     * @return string
     */
    public function getRouteKeyName()
    {
        return 'uuid';
    }

    /**
     * relation between wallet & transactions
     * many transaction refer to one wallet
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function wallet()
    {
        return $this->belongsTo(Wallet::class);
    }

    /**
     * relation between payments & transactions
     * many transaction refer to one wallet
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function payment()
    {
        return $this->belongsTo(Payment::class);
    }

    /**
     * get confirmed transaction
     * @param  Builder  $query
     * @return Builder
     */
    public function scopeValidTransactions(Builder $query)
    {
        return $query->where('status', 'approved');
    }

    /**
     * get all deposit transaction
     * @param  Builder  $query
     * @return Builder
     */
    public function scopeDeposit(Builder $query)
    {
        return $query->where('type', 'deposit');
    }

    /**
     * get all withdraw transaction
     * @param  Builder  $query
     * @return Builder
     */
    public function scopeWithdraw(Builder $query)
    {
        return $query->where('type', 'withdraw');
    }

    /**
     * get all pending transaction
     * @param  Builder  $query
     * @return Builder
     */
    public function scopeWaiting(Builder $query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * get all approved transactions
     * @param  Builder  $query
     * @return Builder
     */
    public function scopeApproved(Builder $query)
    {
        return $query->where('status', 'approved');
    }

    /**
     * get all declined reansactions
     * @param  Builder  $query
     * @return Builder
     */
    public function scopeDeclined(Builder $query)
    {
        return $query->where('status', 'declined');
    }

    /**
     * get all confirmed transaction from admin
     * @param  Builder  $query
     * @return Builder
     */
    public function scopeConfirmed(Builder $query)
    {
        return $query->where('confirmed', true);
    }

    /**
     * get all unconfirmed transaction from admin
     * @param  Builder  $query
     * @return Builder
     */
    public function scopeUnconfirmed(Builder $query)
    {
        return $query->where('confirmed', false);
    }

    /**
     * this method well called when we set value to confirmation attribute
     * ($this->confirmation = value)
     * @param $value
     */
    public function setConfirmationAttribute($value)
    {
        switch($value) {
            case 'approved':
                $this->approve($this);
                break;
            case 'declined':
                $this->decline($this);
                break;
            default:
                $this->pending($this);
        }
    }

    /**
     * mark transaction as approved
     * Approve transaction
     * @param  Transaction  $transaction
     */
    public function approve(Transaction $transaction)
    {
        $transaction->status = 'approved';
        $transaction->wasConfirmed();

        $transaction->save();
    }

    /**
     * mark transaction as pending
     * Approve transaction
     * @param  Transaction  $transaction
     */
    public function pending(Transaction $transaction)
    {
        $transaction->status = 'pending';
        $transaction->wasConfirmed(false);

        $transaction->save();
    }

    /**
     * Decline transaction
     * @param  Transaction  $transaction
     */
    public function decline(Transaction $transaction)
    {
        $transaction->status = 'declined';
        $transaction->wasConfirmed();

        $transaction->save();
    }

    /**
     * mark transaction as viewed & changed by admin
     */
    private function wasConfirmed($confirmed = true)
    {
        $this->confirmed = $confirmed;
        $this->save();
    }
}
