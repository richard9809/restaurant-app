<?php

namespace App\Http\Controllers;

use App\Models\Mpesa;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class MpesaController extends Controller
{
    public function generateAccessToken()
    {
        $consumer_key = env('MPESA_CONSUMER_KEY');
        $consumer_secret = env('MPESA_CONSUMER_SECRET');
        $credentials = base64_encode($consumer_key.":".$consumer_secret);
        $url="https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
        $curl=curl_init();
        curl_setopt($curl,CURLOPT_URL,$url);
        curl_setopt($curl,CURLOPT_HTTPHEADER,array("Authorization: Basic ".$credentials));
        curl_setopt($curl,CURLOPT_SSL_VERIFYPEER,false);
        curl_setopt($curl,CURLOPT_RETURNTRANSFER,true);
        $curl_response=curl_exec($curl);
        $access_token=json_decode($curl_response);
        return $access_token->access_token;
    }

    public function createValidationResponse($resultCode, $resultDesc)
    {
        $result=json_encode([
            "ResultCode"=>$resultCode,
            "ResultDesc"=>$resultDesc
        ]);
        $response = new Response();
        $response->headers->set("Content-Type", "application/json; charset=utf-8");
        $response->setContent($result);
        return $response;
    }

    public function mpesaValidation(Request $request)
    {
        Log::info('Validation Endpoint Hit!');
        Log::info($request->all());
        $resultCode = "0";
        $resultDesc = "Accepted validation request.";
        return $this->createValidationResponse($resultCode, $resultDesc);
    }

    public function mpesaRegisterUrls()
    {
        $curl=curl_init();
        curl_setopt($curl,CURLOPT_URL,"https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl");
        curl_setopt($curl, CURLOPT_HTTPHEADER, array( 'Content-Type:application/json', 'Authorization: Bearer '.$this->generateAccessToken())); //setting custom header
        curl_setopt($curl,CURLOPT_RETURNTRANSFER,true);
        curl_setopt($curl,CURLOPT_POST,true);
        curl_setopt($curl,CURLOPT_POSTFIELDS, json_encode(array(
            //Fill in the request parameters with valid values
            'ShortCode' => env('MPESA_SHORTCODE'),
            'ResponseType' => 'Completed',
            'ConfirmationURL' => env('MPESA_CONFIRMATION_URL'),
            'ValidationURL' => env('MPESA_CONFIRMATION_URL')
        )));
        $curl_response=curl_exec($curl);
        echo $curl_response;                                                                                      
    }    

    public function mpesaConfirmation(Request $request)
    {
        Log::info('Confirmation Endpoint Hit!');
        Log::info($request->all());
        $content=json_decode($request->getContent());
        $mpesa_transaction = new Mpesa();
        $mpesa_transaction->TransactionType = $content->TransactionType;
        $mpesa_transaction->TransID = $content->TransID;
        $mpesa_transaction->TransTime = $content->TransTime;
        $mpesa_transaction->TransAmount = $content->TransAmount;
        $mpesa_transaction->BusinessShortCode = $content->BusinessShortCode;
        $mpesa_transaction->BillRefNumber = $content->BillRefNumber;
        $mpesa_transaction->InvoiceNumber = $content->InvoiceNumber;
        $mpesa_transaction->OrgAccountBalance = $content->OrgAccountBalance;
        $mpesa_transaction->ThirdPartyTransID = $content->ThirdPartyTransID;
        $mpesa_transaction->MSISDN = $content->MSISDN;
        $mpesa_transaction->FirstName = $content->FirstName;
        $mpesa_transaction->MiddleName = $content->MiddleName;
        $mpesa_transaction->LastName = $content->LastName;
        $mpesa_transaction->save();
    }

    public function makeHttp($url, $data)
    {
        $curl=curl_init();
        curl_setopt($curl,CURLOPT_URL,$url);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type:application/json','Authorization:Bearer '.$this->generateAccessToken())); //setting custom header
        curl_setopt($curl,CURLOPT_RETURNTRANSFER,true);
        curl_setopt($curl,CURLOPT_POST,true);
        curl_setopt($curl,CURLOPT_POSTFIELDS, json_encode($data));
        $curl_response=curl_exec($curl);
        return $curl_response;
    }

    public function simulateTransaction()
    {
        $url = 'https://sandbox.safaricom.co.ke/mpesa/c2b/v1/simulate';
        $data = array(
            "ShortCode"=> env('MPESA_SHORTCODE'),
            "CommandID"=> "CustomerPayBillOnline",
            "Amount"=> 100,
            "Msisdn"=> "254708374149",
            "BillRefNumber"=> "null"
        );
        $result = $this->makeHttp($url, $data);
        return $result;
    }
}
