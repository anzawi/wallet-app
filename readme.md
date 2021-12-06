# Wallet App
this app created with
* Laravel 8
* React <typescript>
* tailwindCss

### pleas note : 
all files (Classes, methods) are documented well,
so you can open any file and read comments if you want to know how things going.

#### server directory -> Back-End (API)
#### client directory -> Front-End (APP)

## run this app
to run this app on your computer please follow steps,

* clone this repo or download it.
* open /server/.env file and setup your database information
* dont forget to change (APP_URL) from .env file
* `JWT_TTL` key for JWT token expiration.
* open your tirminal or CMD and navagate to project directory
* navagate to /server directory
* run `composer install` to install dependencies (wait to finish)
* run `php artisan key:generate` to generate app key
* run `php artisan jwt:secret` to generate JWT key
* run `php artisan migrate` to migrate tables to database
* run `php artisan db:seed` to create admin user with {name: Admin, email: admin@admin.com, passowrd: admin123}
* run `php artisan storage:link` to link storage with public directory.
* now your api is ready to deploy
* you can use (homestead or valet) or for fast you can run `php artisan serve` now your api in http://localhost:8000
* ----------------------
* navigate to /client directory
* run `npm install` to install dependencies (wait to finish)
* if your back-end url not (http://localhost:8000) :
* open `/client/src/app/api/agent.ts` file and change
* `axios.defaults.baseURL = 'http://localhost:8000/api'`
* to be axios.defaults.baseURL = 'your-url/api'
* now run `npm start` to start application on http://localhost:3000
* open http://localhost:3000 in your browser and start testing :)

  
first thing you want to do is (login as admin and create payment method)
if you register as a user , you cant create ant transactions if theres no payment methods.
----------------------------

## how to setup your database
* first thing create database -call it anything you want- 
* open your database management tool and run `CREATE DATABASE {database_name}`
* open /server/.env file and change
* if .env file not exists copy .env.example and rename it to .env

```env
DB_CONNECTION={database_driver} #(by default its mysql)
DB_HOST={database_host}
DB_PORT=={database_port} # by default (3306)
DB_DATABASE={database_name}
DB_USERNAME={database_username}
DB_PASSWORD={database_user_password}
```

## other configuration

in /server/.env file

```env
# set app url
APP_URL={API_URL}

# set setion limit
JWT_TTL=120 # for 2 hours

```
 

### note:
This version of the application does not specify the allowed currencies,
due to time constraints only.

the main idea its create table `currencies` related with `payments` table
when user creating transaction just check if the currency he choose is allowd in selected payment method or not, thats it

## About the application
wallet management system that has two types of users: admin and client.  
  
Admin section:   
• Admin can create a new payment method that will be offered to the clients, the clients can 
use the predefined payment methods to deposit or withdrawal to their wallet,  
payment method interface includes the following:  
`Payment  method  name`,  `payment  method  image`, `allowed  currencies`, `min  deposit`, `max  
deposit`, `min withdrawal` and `max withdrawal`. 
• Admin can approve or reject the transaction (deposit or withdrawal), created by the user.  
• Admin can see all users, and he has the power to block any user.  
• Admin can show the total transactions with a chart and filtration.  
  
Client section:
• Client  can  make  any transaction  (deposit  or  withdrawal), and  wallet  will  be  reflected  after  
admins approval.  
• The client can see the wallet balance and he can see the transactions he requested with the 
status. 
