<?php

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

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::get('/tables', [\App\Http\Controllers\Api\GetController::class, 'getTables']);
    Route::get('/categories', [\App\Http\Controllers\Api\GetController::class, 'categories']);
    Route::get('/foods', [\App\Http\Controllers\Api\GetController::class, 'getFoods']);
    Route::apiResource('/orders', \App\Http\Controllers\Api\OrderController::class);
    Route::post('/logout', [\App\Http\Controllers\Api\AuthController::class, 'logout']);    

});
