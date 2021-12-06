<?php

namespace App\Http\Controllers\Wallet;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\Transaction;
use App\Models\User;
use App\Transformers\TransactionsTransformer;
use Illuminate\Http\Request;

/**
 * all transaction processes
 */
class TransactionsController extends Controller
{
    public function __construct()
    {
        // all method need admin except (total, create)
        $this->middleware(['admin'])->except(['total', 'create']);
    }

    /**
     * get all transaction
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return response()->json(
            fractal()
                ->collection(Transaction::all())
                ->transformWith(new TransactionsTransformer())
                ->toArray()['data']
        );
    }

    /**
     * create new transaction
     * @param  Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Request $request)
    {
        // get payment method choices by user
        $payment = Payment::where('slug', $request->payment_method)->first();
        if ($payment === null) // if payment method not found
            return $this->sendError(['Payment Method is not found'], 404);

        // create a transaction
        $response = $request->user()->wallet->tryCreateTransaction($request->all(), $payment);

        // check if transaction not created, then tell user about a problem
        if ($response['status'] === false) {
            return $this->sendError([$response['msg']], 422);
        }


        // return created transaction details
        return response()->json(fractal()
            ->item($response)
            ->transformWith(new TransactionsTransformer())
            ->toArray()['data']);
    }

    /**
     * confirm transaction from admin (approve/decline/set to pending)
     * @param  Request  $request
     * @param  Transaction  $transaction
     * @return \Illuminate\Http\JsonResponse
     */
    public function confirm(Request $request, Transaction $transaction)
    {
        $transaction->confirmation = $request->type;

        return $this->sendResponse([], 'Transaction Changed');
    }

    /**
     * get all approved transaction
     * @return \Illuminate\Http\JsonResponse
     */
    public function approved()
    {
        return response()->json(fractal()
            ->collection(Transaction::approved()->get())
            ->transformWith(new TransactionsTransformer())
            ->toArray()['data']);
    }

    /**
     * get all declined transaction
     * @return \Illuminate\Http\JsonResponse
     */
    public function declined()
    {
        return response()->json(fractal()
            ->collection(Transaction::declined()->get())
            ->transformWith(new TransactionsTransformer())
            ->toArray()['data']);
    }

    /**
     * get all pending transaction
     * @return \Illuminate\Http\JsonResponse
     */
    public function pending()
    {
        return response()->json(fractal()
            ->collection(Transaction::waiting()->get())
            ->transformWith(new TransactionsTransformer())
            ->toArray()['data']);
    }

    /**
     * get transactions count for user
     * @return \Illuminate\Http\JsonResponse
     */
    public function total()
    {
        return response()->json([
            'approved' => auth()->user()->totalApproved(),
            'declined' => auth()->user()->totalDeclined(),
            'pending' => auth()->user()->totalPending(),
        ]);
    }

    /**
     * get all transactions count for dashboard chart
     * @return \Illuminate\Http\JsonResponse
     */
    public function allTotals()
    {
        $transaction = new Transaction();
        return response()->json([
            'approved' => $transaction->approved()->count(),
            'declined' => $transaction->declined()->count(),
            'pending' => $transaction->waiting()->count(),
        ]);
    }
}
