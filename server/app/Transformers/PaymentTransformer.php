<?php

namespace App\Transformers;

use App\Models\Payment;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use League\Fractal\TransformerAbstract;

class PaymentTransformer extends TransformerAbstract
{
    /**
     * List of resources possible to include
     *
     * @var array
     */
    protected $availableIncludes = [
        //
    ];

    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(Payment $payment)
    {
        return [
            'name' => $payment->name,
            'currencies' => is_array($payment->currencies) ? json_encode($payment->currencies) : $payment->currencies,
            'deposit' => [
                'min' => $payment->min_deposit,
                'max' => $payment->max_deposit
            ],
            'withdrawal' => [
                'min' => $payment->min_withdrawal,
                'max' => $payment->max_withdrawal
            ],
            'img' => url("/storage/images/$payment->img/$payment->img"),
            'slug' => $payment->slug
        ];
    }
}
