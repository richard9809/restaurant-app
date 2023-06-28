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
            CREATE TRIGGER trg_update_paid_status_on_order_after_payment 
            AFTER INSERT ON payments
            FOR EACH ROW
            BEGIN
                UPDATE orders SET paid = 1 WHERE id = NEW.order_id AND paid = 0;
            END
        ');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trg_update_paid_status_on_order_after_payment');
    }
};
