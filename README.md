# Personal Password Manager  

This application aims to securely store the data of your registered accounts on websites, applications, and other services. It allows you to save the following information:  

- Application name  
- Password  
- Username  
- Email  
- Recovery Email  
- Phone number  
- Recovery Phone number  
- Birth Date  
- Description  
- Additional Info  

With this, you can organize and manage most of the information used when creating an account in a service in a simple and efficient way. To retrieve or access the data, simply use the search bar within the application, making it easier to log in or recover an account.  

To register an entry in the system, only the **application name** and **password** are required. All other fields are optional. Additionally, the stored data can be modified or deleted as needed.  

## Installation  

The project is based on **Laravel 11**, a PHP framework, so it is necessary to install **PHP**, **Composer** (dependency manager), and **Laravel**.  

1. Clone the project repository to your machine.  
   ```bash
   git clone https://github.com/PedrohAlvesM/PasswordManager.git
   ```
2. To simplify the installation process, it is recommended to use **XAMPP**, a widely used tool among PHP developers, as it includes **PHP**, **Apache**, and **MySQL**. If you choose not to use XAMPP, you will need to install **PHP**, **MySQL**, and a **web server** separately.  
   ```
   https://www.apachefriends.org/index.html
   ```
3. Install Composer by visiting the following link:  
   ```bash
   https://getcomposer.org/download/
   ```
4. Once Composer is installed, install Laravel using the command below:  
   ```bash
   composer global require laravel/installer
   ```

After installing all the necessary programs, you will need to configure both the **web server** and the **application**.

## Configuration  

With all components installed and both the **web server** and **database** running, the next step is to configure the project. Open the terminal in the folder where **Password Manager** was installed.  

1. Install all project dependencies using Composer.  
   ```bash
   composer install
   ```
2. Copy and rename the `.env.example` file to `.env`. This file allows the configuration of several **environment variables**, such as application credentials, database settings, date and time formats, and more.  
3. Generate the application's encryption key using **Artisan**, Laravel’s command-line tool:  
   ```bash
   php artisan key:generate
   ```
4. Laravel can automatically create the database structure using the following command:  
   ```bash
   php artisan migrate
   ```
5. Build client using NPM:
   ```
   npm run build
   ```
After completing these steps, the application can be accessed via the web server. However, to improve usability, it is recommended to configure a **virtual domain**, making access more intuitive than just `localhost/PasswordManager`.  

If you choose not to configure a virtual domain, remember to update the `APP_URL` variable in the `.env` file.  

## Virtual Host Configuration (optional)  

To configure a **virtual domain**, modifications need to be made both to the operating system and the **web server**. You can choose any custom domain, as long as you also update the `APP_URL` variable in the `.env` file.

### 1. Adding the domain to Windows  

Access the Windows **hosts** file, located at:  
```
C:/Windows/System32/drivers/etc/hosts
```
Edit the file and add the following lines:  
```
127.0.0.1 localhost
127.0.0.1 PasswordManager.local
```

### 2. Adding the domain to the web server (Apache)  

In **XAMPP**, the **Virtual Host** configuration files are located at:  
```
C:/xampp/apache/conf/extra/httpd-vhosts.conf
```
Edit this file and add the following configurations:  

```apache
<VirtualHost *:80>
    DocumentRoot "C:/xampp/htdocs"
    ServerName localhost
</VirtualHost>

<VirtualHost *:80>
    DocumentRoot "C:/xampp/htdocs/PasswordManager/public"
    ServerName PasswordManager.local
</VirtualHost>
```

After making these changes, restart the **web server**. Now, the application can be accessed directly at:  

```
http://PasswordManager.local
```
