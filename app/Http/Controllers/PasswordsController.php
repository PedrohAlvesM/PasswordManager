<?php

namespace App\Http\Controllers;

use App\Models\Password;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Log;


class PasswordsController extends Controller
{
    public function RegisterPassword(Request $request) {
        $data = $request->validate([
            'application_name' => 'required|string|max:255',
            'password'         => 'required|string|min:8',
            'username'         => 'nullable|string|max:255',
            'email'            => 'nullable|email|max:255',
            'recovery_email'   => 'nullable|email|max:255',
            'phone'            => 'nullable|string|regex:/^\+?\d{1,4}?\s?\(?\d{1,4}\)?\s?\d{4,5}[- ]?\d{4}$/',
            'recovery_phone'   => 'nullable|string|regex:/^\+?\d{1,4}?\s?\(?\d{1,4}\)?\s?\d{4,5}[- ]?\d{4}$/',
            'birth_date'       => 'nullable|date|before:today',
            'description'      => 'nullable|string|max:65535',
            'additional_info'  => 'nullable|string|max:65535',
        ]);
        $data['password'] = Crypt::encryptString($data['password']);
        $data['user_id'] = 1;

        $passwords = Password::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Password created successfully.'
        ], Response::HTTP_OK);
    }

    public function Update(Request $request, $id)
    {
        $password = Password::find($id);

        if (!$password) {
            return response()->json([
                'success' => false,
                'message' => 'password not found.'
            ], Response::HTTP_NOT_FOUND);
        }

        $data = $request->validate([
            'application_name' => 'required|string|max:255',
            'password'         => 'required|string|min:8',
            'username'         => 'nullable|string|max:255',
            'email'            => 'nullable|email|max:255',
            'recovery_email'   => 'nullable|email|max:255',
            'phone'            => 'nullable|string|regex:/^\+?\d{1,4}?\s?\(?\d{1,4}\)?\s?\d{4,5}[- ]?\d{4}$/',
            'recovery_phone'   => 'nullable|string|regex:/^\+?\d{1,4}?\s?\(?\d{1,4}\)?\s?\d{4,5}[- ]?\d{4}$/',
            'birth_date'       => 'nullable|date|before:today',
            'description'      => 'nullable|string|max:65535',
            'additional_info'  => 'nullable|string|max:65535',
        ]);
        $data['password'] = Crypt::encryptString($data['password']);

        $password->update($data);

        return response()->json([
            'success' => true,
            'message' => 'password updated successfully.',
            'data' => $password
        ], Response::HTTP_OK);
    }
    public function GetAllPasswords() {
        $passwords = Password::all();
        foreach ($passwords as $p) {
            $p['password'] = Crypt::decryptString($p['password']);
        }
        return View('password', ['passwords'=>$passwords]);
    }

    public function DeletePassword($id) {
        $id = intval($id);
        if ($id <= 0 || $id === null) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid password.'
            ], Response::HTTP_BAD_REQUEST);
        }

        $password = Password::find($id);
        if (!$password) {
            return response()->json([
                'success' => false,
                'message' => 'Password not found.'
            ], Response::HTTP_NOT_FOUND);
        }
        $password->delete();

        return response()->json([
            'success' => true,
            'message' => 'Password deleted successfully.'
        ], Response::HTTP_OK);
    }
}
