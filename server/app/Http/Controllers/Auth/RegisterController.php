<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Transformers\UserTransformer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

/**
 * Create new user
 */
class RegisterController extends Controller
{
    public function __invoke(Request $request)
    {
        $validator = Validator::make( $request->all(), [
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6|confirmed',
            'name' => 'required',
        ]);

        if($validator->fails()){
            return $this->sendError($validator->errors()->all(), 422);
        }

        $user = User::create([
            'name' => $request->name,
            'password' => Hash::make($request->password),
            'email' => $request->email
        ]);

        // after creating user, we want to create a wallet for him
        $user->wallet()->create([
            'name' => $request->email . '-Wallet',
            'slug' => Str::uuid(),
            'uuid' => Str::uuid()
        ]);


        //return response()->json(compact('token'));
        return response()->json(fractal()
            ->item($user)
            ->transformWith(new UserTransformer())
            ->toArray()['data']);
    }
}
