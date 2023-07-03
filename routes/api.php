<?php

use App\Http\Controllers\MpesaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/login', [\App\Http\Controllers\Api\AuthController::class, 'login']);

Route::post("sts/access/token", [MpesaController::class, "generateAccessToken"]);
Route::post("sts/payment/confirmation", [MpesaController::class, "mpesaConfirmation"]);
Route::post("sts/validation", [MpesaController::class, "mpesaValidation"]);
Route::post("sts/register/urls", [MpesaController::class, "mpesaRegisterUrls"]);
Route::post("sts/simulate", [MpesaController::class, "simulateTransaction"]);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::get('/tables', [\App\Http\Controllers\Api\GetController::class, 'getTables']);
    Route::get('/categories', [\App\Http\Controllers\Api\GetController::class, 'categories']);
    Route::get('/foods', [\App\Http\Controllers\Api\GetController::class, 'getFoods']);
    Route::apiResource('/orders', \App\Http\Controllers\Api\OrderController::class);
    Route::apiResource('/mpesas', \App\Http\Controllers\Api\MpesaController::class);
    Route::apiResource('/payments', \App\Http\Controllers\Api\PaymentController::class);
    Route::post('/logout', [\App\Http\Controllers\Api\AuthController::class, 'logout']);    

});
