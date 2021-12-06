<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Transformers\UserTransformer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * Login Process
 */
class LoginController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function __invoke(Request $request)
    {
        /**
         * validate user input
         */
        $validator = Validator::make( $request->all(), [
            'email' => 'required',
            'password' => 'required'
        ]);
        /**
         * check if theirs any problem
         */
        if($validator->fails()){
            return $this->sendError(['all fields ar required!'], 422);
        }

        /**
         *  login
         */
        if (!$token = auth()->attempt($request->only('email', 'password'))) {
            return $this->sendError(['Credential Error, Cant find user with specified details.'], 401);
        }

        // return user details
        return response()->json(fractal()
            ->item(auth()->user())
            ->transformWith(new UserTransformer($token))
            ->toArray()['data']);
    }
}
