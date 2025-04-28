<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Personal Password Manager</title>


        @vite(['resources/css/app.css', 'resources/css/button.css', 'resources/css/input.css', 'resources/js/app.js'])

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

    </head>
    <body class="flex-container">
        <h1>Welcome to your Personal Password Manager</h1>
        @if (!$userExists)

            <form action="/login" method="POST" class="flex-container main-container shadow"> 
                @csrf
                <h2>Login with your password</h2>
                <div>
                    <label for="name">Name</label>
                    <input type="text" name="name" required>
                </div>
                <div>
                    <label for="password">Password</label>
                    <input type="password" name="password" minlength="8" required>
                </div>
                @if (session('error'))
                    <p class="error-text"> {{session('error')}} </p>
                @endif
                <button class="button btn-send shadow">Login</button>
            </form>
            @else 
                <form action="/register" method="POST" class="flex-container main-container">
                    @csrf
                    <h2>Create your password</h2>
                    <div>
                        <label for="name">Name</label>
                        <input type="text" name="name" required>
                    </div>
                    <div>
                        <label for="password">Password</label>
                        <input type="password" name="password" minlength="8" required>
                    </div>
                    <button class="button btn-send shadow">Save your password</button>
                </form>
            @endif

    </body>
</html>
