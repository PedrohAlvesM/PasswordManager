<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller {

    public function RegisterPassword(Request $request) {
        $data = $request->validate([
            'name'=>['required'],
            'password'=>['required']
        ]); 
        $data['password'] = bcrypt($data['password']);

        $user = User::create($data);
        Auth::login($user);

        return redirect('/password');
    }
    
    public function Login(Request $request) {
        $data = $request->validate([
            'name'=>['required'],
            'password'=>['required']
        ]); 

        if (Auth::attempt(['name'=>$data['name'], 'password'=>$data['password']])) {
            $request->session()->regenerate();
        }
        return redirect('/password');
    }

    public function UserExists() {
        $user = User::find(1);
        return view('home', ['userExists'=>$user===null]);
    }
    
}