<?php

namespace App\Transformers;

use App\Models\User;
use App\Models\Wallet;
use League\Fractal\TransformerAbstract;

class UserTransformer extends TransformerAbstract
{

    private $_token;
    public function __construct(string $token = null)
    {
        $this->_token = $token;
    }

    /**
     * List of resources possible to include
     *
     * @var array
     */
    protected $availableIncludes = [
        'wallet'
    ];
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(User $user)
    {
        return [
            'name' => $user->name,
            'email' => $user->email,
            'blocked' => $user->isBlocked,
            'is_admin' => (bool)$user->is_admin,
            'token' => $this->_token
        ];
    }

    public function includeWallet(User $user)
    {
            return $this->item($user->wallet?? new Wallet(), new WalletTransformer());
    }
}
