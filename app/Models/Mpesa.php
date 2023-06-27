<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mpesa extends Model
{
    use HasFactory;

    protected $fillable = [
        "paid",
        "FirstName",
        "MiddleName",
        "LastName",
        "TransactionType",
        "TransID",
        "TransTime",
        "BusiessShortCode",
        "BillRefNumber",
        "InvoiceNumber",
        "ThirdPartyTransID",
        "MSISDN",
        "TransAmount",
        "OrgAccountBalance",
    ];

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }
}
