<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PasswordsController;
use Illuminate\Support\Facades\Auth;

Route::get('/', [UserController::class, 'UserExists']);

Route::get('password', [PasswordsController::class, 'GetAllPasswords']);

Route::post('/login', [UserController::class, 'Login']);
Route::post('/register', [UserController::class, 'RegisterPassword']);
Route::post('/password', [PasswordsController::class, 'RegisterPassword']);
Route::post('/password/id/{id}', [PasswordsController::class, 'DeletePassword']);
Route::put('/password/id/{id}', [PasswordsController::class, 'Update']);
Route::post('/password/backup', [PasswordsController::class, 'GenerateBackupFile']);