# NodeTask

### For installing dependencies
npm install express mongoose mongodb assert shortid body-parser

### For installing dev dependencies
npm install -D nodemon

### To run the application
npm run dev

### Create user profile
Use Postman to do a post request on : http://localhost:3000/add_user <br/>
To pass details of the user, write in this format in the body section and ensure the setings to be on raw and doc type json : {"firstname" : "", "lastname" : "", "email" : "", "phone" : "", "address" : ""}

### Update user profile 
Put request on : http://localhost:3000/update_user/<id of the user you want to update> <br/>
Pass data in the same format as in add_user

### Get list of all profiles
Get request on : http://localhost:3000/view_users

### Get a specific user profile
Get request on : http://localhost:3000/view_users/<id of the user you want to see>

### Delete an existing profile
Delete request on : http://localhost:3000/delete_user/<id of the user you want to delete>

### Create a copy of user profile
Post request on : http://localhost:3000/copy_user/<id of the user you want to copy>


