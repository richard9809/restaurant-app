<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::unprepared('
            CREATE OR REPLACE TRIGGER trg_mpesa_paid_status_on_payment
            AFTER INSERT ON payments 
            FOR EACH ROW 
            BEGIN
                    IF NEW.payment_type = "mpesa" THEN
                    UPDATE mpesas SET paid = 1 WHERE id = NEW.mpesa_id;
                END IF;
            END
        ');
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trg_mpesa_paid_status_on_payment');
    }
};
