# Personal Password Manager  

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Virtual Host Configuration with HTTPS (optional)](#virtual-host-configuration-with-https-optional)  
  - [Adding the domain to Windows](#adding-the-domain-to-windows)  
  - [Generating an SSL Certificate](#generating-an-ssl-certificate)  
  - [Adding the domain to the web server (Apache)](#adding-the-domain-to-the-web-server-apache)  
  - [Enabling SSL in Apache](#enabling-ssl-in-apache)  
  - [Testing the Configuration](#testing-the-configuration)  


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

## 1 Installation  

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

## 2 Configuration  

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
After completing these steps, the application can be accessed via the web server. However, to improve usability, it is recommended to configure a **virtual host**, making access more intuitive than just `localhost/PasswordManager`.  

If you choose not to configure a virtual host, remember to update the `APP_URL` variable in the `.env` file.  

## 3. Virtual Host Configuration with HTTPS (optional)  

To configure a virtual host with HTTPS, modifications need to be made both to the operating system and the web server. You can choose any custom domain, as long as you also update the `APP_URL` variable in the `.env` file. It's optional but some app functions may not work as intended.

### 3.1. Adding the domain to Windows  

Access the Windows hosts file, located at:  
```
C:/Windows/System32/drivers/etc/hosts
```
Edit the file and add the following lines:  
```
127.0.0.1 localhost
127.0.0.1 PasswordManager.local
```

### 3.2. Generating an SSL Certificate  

XAMPP does not provide an SSL certificate by default, so you need to generate a self-signed certificate:  

1. Open a command prompt and navigate to the XAMPP Apache directory:  
   ```
   cd C:\xampp\apache
   ```
2. Create a `crt` directory.   

3. Download the [mkcert](https://github.com/FiloSottile/mkcert) tool to create the application self signed SSL Certificate and run inside the `crt` directory (you can leave most fields blank, but Common Name (CN) must be `PasswordManager.local`).

4. Double click `server.crt` and install it.

### 3.3. Adding the domain to the web server (Apache)  

In XAMPP, the Virtual Host configuration files are located at:  
```
C:/xampp/apache/conf/extra/httpd-vhosts.conf
```
Edit this file and add the following configurations:  

```apache
<VirtualHost *:443>
    DocumentRoot "C:/xampp/htdocs/PasswordManager/public"
    ServerName PasswordManager.local

      SSLEngine on
    SSLCertificateFile "C:\xampp\apache\crt\passwordmanager.local\server.crt"
    SSLCertificateKeyFile "C:\xampp\apache\crt\passwordmanager.local\server.key"
    <Directory "C:/xampp/htdocs/PasswordManager/public">
        Require local
        Options All
        AllowOverride All
        Require all granted
        Order allow,deny
        Allow from all
    </Directory>

</VirtualHost>
```

### 3.4. Enabling SSL in Apache  

Ensure that SSL is enabled in the Apache configuration:  

1. Open the `httpd.conf` file located at:  
   ```
   C:/xampp/apache/conf/httpd.conf
   ```
2. Uncomment (remove `#` from) the following lines:  
   ```apache
   LoadModule ssl_module modules/mod_ssl.so
   Include conf/extra/httpd-ssl.conf
   ```
3. Restart Apache.


### 3.5. Testing the Configuration  

After making these changes, restart the web server. Now, the application can be accessed securely at:  

```
https://PasswordManager.local
```

If Apache fails to start, open a command prompt and run:  
```
C:\xampp\apache\bin\httpd.exe -t
```
This will help identify any syntax errors in the configuration.
```