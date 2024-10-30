First clone this repository in Local system

//FRONTEND

For frontend this project is setup in REACT

step to start:

1-> cd car_rental_form

2-> cd frontend

3-> npm i 

4-> npm start

Frontend will start 


//Backend

For Backend this project is setup in Node and Express

step to start:

1-> cd car_rental_form

2->cd backend

3-> npm i 

4-> npm start (for nodemon) OR node index.js 


I have hosted the MySQL database on phpMyAdmin with a free tier setup, where it automatically uses the seeder and migration files to upsert vehicle data and create the Booking and Vehicle tables if they don’t already exist. This setup is accessible directly on phpMyAdmin.


Hosted config is already done so no need to change Backend file for it .

Directly Clone the repository from GIT and use npm start to run both frontend and backend

In the index.js file within the Backend folder, DB_NAME = DB_ARR[0] (PHP HOSTED)
In the Backend folder,  Models -> index.js a env = env_arr[0] 

However if you want  run it locally, follow these steps to make changes:

Install MySQL on your local system and run it in the background.
In the index.js file within the Backend folder, update DB_NAME = DB_ARR[0] (PHP HOSTED) to DB_ARR[1] (LOCAL SQL) and change DATABASE_URL=DATABASE_URL_ARR[0] (PHP HOSTED)  to DATABASE_URL_ARR[1] (LOCAL SQL).
In the Backend folder, go to Models -> index.js and set const env = env_arr[0]  (PHP HOSTED to env_arr[1] (LOCAL SQL).

