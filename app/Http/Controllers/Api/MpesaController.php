<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\MpesaResource;
use App\Models\Mpesa;
use Illuminate\Http\Request;

class MpesaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $mpesas = Mpesa::where('paid', 0)->orderBy('id', 'desc')->paginate(10);

        return MpesaResource::collection($mpesas);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Mpesa $mpesa)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Mpesa $mpesa)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Mpesa $mpesa)
    {
        //
    }
}
