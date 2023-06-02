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
            CREATE OR REPLACE TRIGGER trg_to_update_quantity 
            AFTER UPDATE ON invoice_items 
            FOR EACH ROW 
            BEGIN 
                IF OLD.inventory_id = NEW.inventory_id AND OLD.quantity <> NEW.quantity THEN
                    UPDATE inventories 
                    SET quantity = quantity - OLD.quantity 
                    WHERE id = NEW.inventory_id;
                    
                    UPDATE inventories 
                    SET quantity = quantity + NEW.quantity 
                    WHERE id = NEW.inventory_id;
                ELSEIF OLD.inventory_id <> NEW.inventory_id AND OLD.quantity = NEW.quantity THEN
                    UPDATE inventories 
                    SET quantity = quantity - NEW.quantity 
                    WHERE id = OLD.inventory_id;
                    
                    UPDATE inventories 
                    SET quantity = quantity + NEW.quantity 
                    WHERE id = NEW.inventory_id;
                ELSEIF OLD.inventory_id <> NEW.inventory_id AND OLD.quantity <> NEW.quantity THEN
                    UPDATE inventories 
                    SET quantity = quantity - OLD.quantity 
                    WHERE id = OLD.inventory_id;
                    
                    UPDATE inventories 
                    SET quantity = quantity + NEW.quantity 
                    WHERE id = NEW.inventory_id;
                END IF;
            END;
        ');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trg_to_update_quantity');
    }
};
