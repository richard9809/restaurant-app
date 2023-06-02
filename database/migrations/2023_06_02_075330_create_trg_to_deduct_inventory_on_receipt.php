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
        CREATE OR REPLACE TRIGGER trg_to_deduct_inventory_on_receipt
        AFTER INSERT ON receipt_items 
        FOR EACH ROW 
        BEGIN 
            UPDATE inventories 
            SET quantity = quantity - NEW.inventory_quantity 
            WHERE id = NEW.inventory_id; 
        END;
    ');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trg_to_deduct_inventory_on_receipt');
    }
};
