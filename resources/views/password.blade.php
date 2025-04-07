<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    @vite(['resources/css/app.css', 'resources/css/password.css', 'resources/css/notification.css', 'resources/js/password.js', 'resources/js/notification.js'])
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

    <title>Password Manager</title>
</head>
<body class="flex-container">
    <script>
        let data = @json($passwords);
        sessionStorage.setItem('passwords', JSON.stringify(data));
    </script>
    <main class="main-container flex-container shadow">
        <div class="flex-container search-box">
            <label for="search">Search your passwords</label> 
            <input type="text" id="search" list="applications">
            <datalist id="applications"> 
                @foreach ($passwords as $password)
                    <option value='{{$password->application_name}}'>{{$password->application_name}}</option>
                @endforeach
            </datalist>
            <div class="actions">
                <img id="btn-done" class="image" src="{{URL('assets/done.svg')}}" alt="done">
                <img id="btn-change" class="image" src="{{URL('assets/change.svg')}}" alt="change">
                <img id="btn-delete" class="image" src="{{URL('assets/delete.svg')}}" alt="delete">
            </div>
        </div>
        <div class="table-container">
            <div class="table-header">Application Name</div>
            <input class="password-data password-view" type="text" name="application_name" required>
            <img class="image btn-copy" src="{{URL('assets/copy.svg')}}" alt="copy">

            <div class="table-header">Password</div>
            <input class="password-data password-view" type="password" name="password" required>
            <img class="image btn-copy" src="{{URL('assets/copy.svg')}}" alt="copy">

            <div class="table-header">Username</div>
            <input class="password-data password-view" type="text" name="username">
            <img class="image btn-copy" src="{{URL('assets/copy.svg')}}" alt="copy">

            <div class="table-header">Email</div>
            <input class="password-data password-view" type="email" name="email">
            <img class="image btn-copy" src="{{URL('assets/copy.svg')}}" alt="copy">

            <div class="table-header">Recovery Email</div>
            <input class="password-data password-view" type="email" name="recovery_email">
            <img class="image btn-copy" src="{{URL('assets/copy.svg')}}" alt="copy">

            <div class="table-header">Phone</div>
            <input class="password-data password-view" type="tel" placeholder="+55 (99) 99999-9999" maxlength="20" name="phone">
            <img class="image btn-copy" src="{{URL('assets/copy.svg')}}" alt="copy">
            
            <div class="table-header">Recovery Phone</div>
            <input class="password-data password-view" type="tel" placeholder="+55 (99) 99999-9999" maxlength="20" name="recovery_phone">
            <img class="image btn-copy" src="{{URL('assets/copy.svg')}}" alt="copy">

            <div class="table-header">Birth Date</div>
            <input class="password-data password-view" type="text" name="birth_date">
            <img class="image btn-copy" src="{{URL('assets/copy.svg')}}" alt="copy">

            <div class="table-header">Description</div>
            <input class="password-data password-view" type="text" name="description">
            <img class="image btn-copy" src="{{URL('assets/copy.svg')}}" alt="copy">

            <div class="table-header">Addtional Info</div>
            <input class="password-data password-view" type="text" name="additional_info">
            <img class="image btn-copy" src="{{URL('assets/copy.svg')}}" alt="copy">
        </div>   
    </main>

    <button id="backup">Criar Backup</button>
</body>
</html>