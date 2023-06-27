<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Http\Requests\StorePaymentRequest;
use App\Http\Requests\UpdatePaymentRequest;
use App\Http\Resources\PaymentResource;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $payments = Payment::orderBy('id', 'desc')->paginate(10);

        return PaymentResource::collection($payments);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePaymentRequest $request)
    {
        $requestData = $request->validated();
        $paymentsData = [];

        foreach ($requestData['payments'] as $payment) {
            $paymentData = [
                'order_id' => $requestData['order_id'],
                'amount' => $payment['amount'],
                'change' => $payment['change'],
            ];

            if (isset($payment['mpesa_id']) && $payment['mpesa_id'] !== null) {
                $paymentData['payment_type'] = 'mpesa';
                $paymentData['mpesa_id'] = $payment['mpesa_id'];
            } else {
                $paymentData['payment_type'] = 'cash';
                $paymentData['mpesa_id'] = null;
            }

            $paymentsData[] = $paymentData;
        }

        foreach ($paymentsData as $paymentData) {
            Payment::create($paymentData);
        }

        return response()->json([
            'message' => 'Payment(s) created successfully',
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Payment $payment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePaymentRequest $request, Payment $payment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payment $payment)
    {
        //
    }
}
