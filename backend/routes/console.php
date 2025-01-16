<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function ($artisan) {
    $this->comment(Inspiring::quote());

    $artisan->resolveCommands([
        \App\Console\Commands\MakeService::class,
    ]);
})->purpose('Display an inspiring quote')->hourly();
