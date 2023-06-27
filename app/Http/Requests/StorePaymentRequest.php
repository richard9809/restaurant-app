<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePaymentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'order_id' => 'required|exists:orders,id',
            'payments' => 'required|array|min:1',
            'payments.*.mpesa_id' => 'nullable|exists:mpesas,id',
            'payments.*.amount' => 'required|numeric|min:1',
            'payments.*.change' => 'required|numeric|min:0',
        ];
    }
}
