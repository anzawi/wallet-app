<?php

namespace App\Http\Controllers\Wallet;

use App\Http\Controllers\Controller;
use App\Models\Wallet;
use App\Transformers\WalletTransformer;
use Illuminate\Http\Request;

/**
 * Read documentation in routes/api.php in block (Wallet)
 */
class WalletController extends Controller
{
    public function __construct()
    {
        $this->middleware(['admin'])->except(['show']);
    }
    /**
     * get a listing of the wallets.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return $this->sendResponse(
            fractal()
            ->collection(Wallet::all())
            ->transformWith(new WalletTransformer())
            ->parseIncludes('user')
            ->toArray()['data']
        );
    }

    // we dont need to create wallet,
    // we will create wallet to user automatically when we create user
//    /**
//     * Store a newly created resource in storage.
//     *
//     * @param  \Illuminate\Http\Request  $request
//     * @return \Illuminate\Http\Response
//     */
//    public function store(Request $request)
//    {
//
//    }

    /**
     * Display the specified resource.
     *
     * @param  Wallet  $wallet
     * @return \Illuminate\Http\JsonResponse
     */
    public function show()
    {
        return response()->json(
            fractal()
            ->item(auth()->user()->wallet()->first())
            ->transformWith(new WalletTransformer())
            //->parseIncludes('user')
            ->toArray()['data']
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Wallet $wallet)
    {
        $wallet->delete();

        return $this->sendResponse(['deleted']);
    }
}
