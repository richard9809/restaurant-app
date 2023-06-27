<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MpesaResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'FirstName' => $this->FirstName,
            'MiddleName' => $this->MiddleName,
            'TransID' => $this->TransID,
            'MSISDN' => $this->MSISDN,
            'TransAmount' => $this->TransAmount,
            'created_at' => $this->created_at->format('H:i:s'),
        ];
    }
}
