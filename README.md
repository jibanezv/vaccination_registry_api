# VACCINATION REGISTRY API
API for MySQL database administration about vaccines, dugs and vaccination calendar, accesible only with login and secured by signed JWT.
 <hr>

## MYSQL DATABASE
To correctly execute the API it is necessary to install MySQL, you can easily install it by downloading XAMPP in this same repository :D!


How to use XAMPP to Create a MySQL Database?
Here are the easy steps to get started with XAMPP MySQL Database:

Go to your system’s XAMPP folder or simply click the XAMPP Icon to open it. The Control Panel is now visible, and you may use it to start or stop any module.

XAMPP MySQL Step 2: Starting XAMPP
Select the “Start” option for the Apache and MySQL modules, respectively. The user will see the following screen once it has started working:

![image](https://user-images.githubusercontent.com/115019618/203633450-8a87bee1-9c18-4f88-96bf-a5df6a725fee.png)

XAMPP MySQL - XAMPP Control panel
Image Source
XAMPP MySQL Step 3: Accessing Admin
Next, select the MySQL Module and click the “Admin” button. The user is immediately redirected to the following address in a web browser:

---> http://localhost/phpmyadmin

XAMPP MySQL Step 4: Creating a Database
A number of tabs appear, including Database, SQL, User Accounts, Export, Import, Settings, and so on. Select the “Database” tab from the drop-down menu. The Create option is visible there. Choose a suitable name for the Database input field.

Database name: **vaccinationRegistryDataBase**

![image](https://user-images.githubusercontent.com/115019618/203633833-956a5d5c-fd79-4c67-9db8-f3193cbe2c55.png)

I configure the local conection in the db.config.js file of the project without a password. 
Only needs the following data:

![image](https://user-images.githubusercontent.com/115019618/203634456-6f9a5b45-9af5-41e4-b723-93d0df21a2d5.png)

# API

To run the project you will need to install [NODE.js](https://nodejs.org/en/download/) on your machine.

Node installation is next, next...

I recommend not installing chocolatey, as it will take much longer to finish.

When the installation is complete, open a terminal in the root folder of the project and run the following commands...

## Installing Dependencies
Run `npm install`

When all the dependencies are installed, you are ready to run the project:

Run `npm start`

Once the project is executed, sequelize automatically connects to the local database and creates tables if they don't exist...

![image](https://user-images.githubusercontent.com/115019618/203639936-4118194f-3749-467a-979c-b0b1ce54ccc3.png)

Something like this should appear in the terminal:

![image](https://user-images.githubusercontent.com/115019618/203637684-bce83681-d9fe-4b24-b9cc-c83e98f33b9b.png)

# TESTING API

To consume the API, you can use [POSTMAN](https://www.postman.com/downloads/).

The collection of consumable routes is available in a JSON file importable by postman...

![image](https://user-images.githubusercontent.com/115019618/203640832-006bdd2b-0c52-4ee5-afec-b24e64b168ae.png)

Once the collection is imported, you must create your user to obtain an account...

![image](https://user-images.githubusercontent.com/115019618/203641097-38ab6ba1-a8cb-4a9f-bf88-78ec92c27ab6.png)

Once your user account has been created, go to the LogIn route and in the body of the request enter the data of your previously created account.

![image](https://user-images.githubusercontent.com/115019618/203641257-28c1d098-795d-45d2-afdd-047847505637.png)

As you can see, if the data is correct, the API will respond with your info and a signed JWT that will be your access token to be able to consume the protected routes...

The signed JWT is valid for 5 minutes (you can modify the duration in the file "auth.controller.js" in the path "/app/controllers/".

You can now consume the protected routes by adding the signed JWT to the request header and filling in the information as appropriate...

Example:

## POST route to create drug:

We place the JWT in the header with "key" equal to "x-access-token" and "value" the signed JWT.

![image](https://user-images.githubusercontent.com/115019618/203642743-d51f9187-5566-419a-bfc4-df9cc789623f.png)

Now we go to the body of the request, and fill in the required data.

![image](https://user-images.githubusercontent.com/115019618/203644535-abb465de-52f4-4c3f-b1d2-ff7e06394db1.png)

Pressing "send" will send the request to the API and it will respond accordingly...

![image](https://user-images.githubusercontent.com/115019618/203643513-c7612ddb-b320-4dd2-b7a1-fd15b1e9cc50.png)

And if we review the "drugs" table we will see the newly created record.

![image](https://user-images.githubusercontent.com/115019618/203643769-8051fc68-9222-4fdf-a023-a0c081af2123.png)
