<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Transformers\TransactionsTransformer;
use App\Transformers\UserTransformer;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * get all users
     *
     */
    public function index()
    {
        return response()->json(
            fractal()
            ->collection(User::withTrashed()->get())
            ->transformWith(new UserTransformer())
            ->toArray()['data']
        );
    }

    /**
     * get logged-in user details
     * @param  Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function me(Request $request)
    {
        $data =fractal()
            ->item($request->user())
            ->transformWith(new UserTransformer())
            ->parseIncludes('wallet')
            ->toArray()['data'];

        return response()->json($data);
    }

    /**
     * get specified user details
     * @param  User  $user
     */
    public function details(User $user)
    {
        $data = fractal()
            ->item($user)
            ->transformWith(new UserTransformer())
            ->toArray()['data'];

        return $this->sendResponse($data);
    }

    /**
     * block or unblock user
     * @param  Request  $request
     */
    public function blockUnblock(Request $request)
    {
        $user = User::withTrashed()->where('email', $request->email)->first();
        if ($user === null)
            return $this->sendError(['user not found']);
        $user->deleted_at === null  ?
            $user->delete() :
            $user->restore();

        return $this->sendResponse(['ok']);
    }

    /**
     * user transactions
     */

    /**
     * get all user transactions
     * @param  Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function allTransaction(Request  $request)
    {
        return response()->json(
            fractal()
                ->collection(auth()->user()->wallet->transactions()->get())
                ->transformWith(new TransactionsTransformer())
                ->toArray()['data']
        );
    }

    /**
     * get approved transaction for user
     * @param  Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function approved(Request $request)
    {
        return response()->json(
            fractal()
                ->collection($request->user()->wallet->transactions()->approved())
                ->transformWith(new TransactionsTransformer())
                ->toArray()['data']
        );
    }

    /**
     * get declined transactions for user
     * @param  Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function declined(Request $request)
    {
        return response()->json(
            fractal()
                ->collection($request->user()->wallet->transactions()->declined())
                ->transformWith(new TransactionsTransformer())
                ->toArray()['data']
        );
    }

    /**
     * get pending transactions for user
     * @param  Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function pending(Request $request)
    {
        return response()->json(
            fractal()
                ->collection($request->user()->wallet->transactions()->waiting())
                ->transformWith(new TransactionsTransformer())
                ->toArray()['data']
        );
    }
}
