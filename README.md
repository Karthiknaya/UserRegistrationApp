These are the steps for the execution on VSCode
1) Backend
cd backend
npm install
npm i express mongoose cors dotenv body-parser bcryptjs express-validator
node server.js
Start the backend server & ensure the server is running on port 5000 & also connected to MongoDB

3) Frontend
cd frontend
npm i axios
npm install
npm run dev
Start the Frontend server
http://localhost:5000
follow the link and open it in browser

APIs for Postman
Open postman and enter url and valid relavent json data
Get All Users (GET)
URL: http://localhost:5000/api/users

Register a User (POST)
URL: http://localhost:5000/api/users/register
JSON Body:
{
  "name": "abcde",
  "age": 25,
  "dob": "1998-05-10",
  "password": "sPass1234",
  "gender": "Male",
  "about": "Software Engineer Intern"
}


Update User (PUT)
URL: http://localhost:5000/api/users/:id
JSON Body:
{
  "name": "Updated Name",
  "age": 26
}

Delete User (DELETE)
URL: http://localhost:5000/api/users/:id






