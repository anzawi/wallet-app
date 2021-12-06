<?php

namespace App\Transformers;

use App\Models\Wallet;
use League\Fractal\TransformerAbstract;

class WalletTransformer extends TransformerAbstract
{
    /**
     * List of resources possible to include
     *
     * @var array
     */
    protected $availableIncludes = [
        'transaction',
        'user'
    ];

    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(Wallet $wallet)
    {
        return [
            'name' => $wallet->name,
            'withdraw' => $wallet->withdraw(),
            'deposit' => $wallet->deposit(),
            'balance' => $wallet->balance(),
            'uuid' => $wallet->uuid
        ];
    }

    public function includeTransaction(Wallet $wallet)
    {
        return $this->collection($wallet->transactions, new TransactionsTransformer());
    }

    public function includeUser(Wallet $wallet)
    {
        return $this->item($wallet->user, new UserTransformer());
    }
}
