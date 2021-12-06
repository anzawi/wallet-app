<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Wallet\TransactionsController;
use App\Http\Controllers\Wallet\WalletController;
use App\Models\Wallet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', LoginController::class);
Route::post('/logout', LogoutController::class);
Route::post('/register', RegisterController::class);


// make sure the request from authenticated user
Route::group(['middleware' => ['jwt.auth']], function () {
    Route::group(['prefix' => 'usr'], function () {
        // get logged-in user details
        Route::get('/me', [UserController::class, 'me']);
        Route::patch('/{email}', [UserController::class, 'blockUnblock']);

        // user transactions
        Route::group(['prefix' => 'transaction'], function () {
            Route::get('/', [UserController::class, 'allTransaction']);

            /**
             * I created those endpoints and methods in controller,
             * but I will not use it
             * I just want to get all transactions for user
             * and if we need to separate them we can filter results from front-end
             * I know in big data this is a bad choice
             *
             * so in big data we want to use those endpoints.
             *
             * I think in this simple application we have not a big data
             */
            Route::get('/approved', [UserController::class, 'approved']);
            Route::get('/declined', [UserController::class, 'declined']);
            Route::get('/pending', [UserController::class, 'pending']);
        }); // end usr/transaction group

        // get all users
        Route::get('/', [UserController::class, 'index']);
        // get specified user details
        Route::get('/{user}', [UserController::class, 'details']);
    }); // end usr group

    // show, delete, get wallet(s)
    Route::resource('wallet', WalletController::class);

    // transactions
    Route::group(['prefix' => 'transaction'], function () {
        Route::get('/', [TransactionsController::class, 'index']);
        Route::get('/approved', [TransactionsController::class, 'approved']);
        Route::get('/declined', [TransactionsController::class, 'declined']);
        Route::get('/pending', [TransactionsController::class, 'pending']);

        Route::post('/', [TransactionsController::class, 'create']);
        Route::patch('/{transaction}', [TransactionsController::class, 'confirm']);

        Route::get('/total', [TransactionsController::class, 'total']);
        Route::get('/total/all', [TransactionsController::class, 'allTotals']);
    }); // end transaction group

    // Payment
    /**
     * in payment, we want to show/add/edit/delete only
     */
    Route::group(['prefix' => 'payment'], function() {
        Route::get('/', [PaymentController::class, 'index']);
        Route::post('/', [PaymentController::class, 'create']);
        Route::put('/{payment}', [PaymentController::class, 'update']);
        Route::delete('/{payment}', [PaymentController::class, 'delete']);
        // upload image end-point
        Route::post('/upload', [PaymentController::class, 'upload']);
    });

    // Wallet
    Route::group(['prefix' => 'wallet'], function () {
        // in this simple api we dont create restfull api,
        // so we well not follow restfull api endpoints standard
        // in this endpoint we want a wallet details for auth user only
        // in controller I create methods but we well not use it
        Route::get('/', [WalletController::class, 'show']);
    });

}); // end route group for middleware [auth:sanctum]
