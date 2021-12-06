<?php

namespace App\Transformers;

use App\Models\Transaction;
use League\Fractal\TransformerAbstract;

class TransactionsTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(Transaction $transaction)
    {
        return [
            'user' => $transaction->wallet->user->name?? 'blocked user' ,
            'type' => $transaction->type,
            'confirmed' => $transaction->confirmed,
            'amount' => $transaction->amount,
            'uuid' => $transaction->uuid,
            'status' => $transaction->status
        ];
    }
}
