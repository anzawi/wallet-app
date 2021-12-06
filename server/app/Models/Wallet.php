<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Wallet extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'uuid',
        'description',
    ];


    public function getRouteKeyName()
    {
        return 'uuid';
    }

    /**
     * reverse relation between user->wallet
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * create relation between wallet->transaction
     * wallet can be related to many transaction
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    /**
     * get Credit for user wallet
     * @return numeric
     */
    public function withdraw()
    {
        return $this->transactions()->withdraw()->validTransactions()->sum('amount');
    }

    /**
     * get Debit for user wallet
     * @return numeric
     */
    public function deposit()
    {
        return $this->transactions()->deposit()->validTransactions()->sum('amount');
    }

    /**
     * get Balance for user wallet
     * @return numeric
     */
    public function balance()
    {
        return $this->deposit() - $this->withdraw();
    }

    /**
     * check if user wallet have enough balance to create withdraw transaction
     * @return boolean
     */
    public function allowWithdraw($amount): bool
    {
        return $this->balance() >= $amount;
    }

    /**
     * create new transaction
     * @param  array  $data
     * @return Model|null
     */
//    public function createTransaction(array $data)
//    {
//        // if client want to withdraw and amount grater than his balance decline transaction
//        if ($data['type'] === 'withdraw' && !$this->allowWithdraw($data['amount']))
//            return null;
//
//        // return added transaction to send it to client-app
//        return $this->transactions()->create($data);
//    }

    /**
     * @param $details
     * @param  Payment  $payment
     * @return array|mixed
     */
    public function tryCreateTransaction($details, Payment $payment)
    {
        if ($details['transaction_type'] === 'withdraw')
            return $this->createWithdrawTransaction($payment, $details['amount']);
        else if ($details['transaction_type'] === 'deposit')
            return $this->createDepositTransaction($payment, $details['amount']);

        return ['status' => false, 'msg' => 'Unknown Error!'];
    }

    /**
     * @param  Payment  $payment
     * @param $amount
     * @return mixed
     */
    public function createWithdrawTransaction(Payment $payment, $amount)
    {
        if (!$this->allowWithdraw($amount)) {
            return ['status' => false, 'msg' => 'your balance less than transaction amount.'];
        }

        if ($amount > $payment->max_withdrawal || $amount < $payment->min_withdrawal) {
            return ['status' => false, 'msg' =>
                "transaction decline, payment method you using limit is: max: {$payment->max_withdrawal}, min: {$payment->min_withdrawal}"];
        }

        return $this->createTransaction('withdraw', $amount, $payment->id);
    }

    /**
     * @param  Payment  $payment
     * @param $amount
     * @return mixed
     */
    public function createDepositTransaction(Payment $payment, $amount)
    {
        if ($amount > $payment->max_deposit || $amount < $payment->min_deposit) {
            return ['status' => false, 'msg' =>
                "transaction decline, payment method you using limit is: max: {$payment->max_deposit}, min: {$payment->min_deposit}"];
        }

        return $this->createTransaction('deposit', $amount, $payment->id);
    }

    /**
     * @param $type
     * @param $amount
     * @param $payment
     * @return mixed
     */
    private function createTransaction($type, $amount, $payment)
    {
        return $this->transactions()->create([
            'amount' => $amount,
            'uuid' => Str::uuid(),
            'payment_id' => $payment,
            'type' => $type
        ]);
    }
}
