<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

/**
 * Log out
 */
class LogoutController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:api']);
    }

    public function __invoke()
    {
        auth()->logout();

        return $this->sendResponse([], 'logged out');
    }
}
