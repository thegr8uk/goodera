"# goodera" 

1. Check out the repository
2. move to goodera folder
3. then run this command      npm install
4. then run this command      node index.js
5. Once it is up, fire the following requests using postman

Sample URL: http://localhost:3000/user/create



For Creating A User

POST /user/create HTTP/1.1
Content-Type: application/json
 
{
    "emailAddress" : "abcd1@gmail.com",
    "mobileNumber" : "9876543211",
    "password": "password",
    "role" : "job-seeker"
}

The above method will be creating a user in db and make active as false

Expected result

{"statusCode":0,"description":"Success","data":{"userId":1}}

Where userId is the id of the created user.


For verify the user with OTP

The OTP will be printed in the console. Please take OTP from there for the mentioned user
The User ID will be the User ID which is created in the previous request

POST /user/verify HTTP/1.1
Content-Type: application/json

{
    "userId" : 1,
    "otp" : "0000"
}


For Login with the user

POST /user/login HTTP/1.1
Content-Type: application/json

{
    "emailAddress" : "abcd1@gmail.com",
    "password" : "password",
    "role": "job-seeker"
}

In the response we can expect a jwt token.
{
    "statusCode": 0,
    "description": "Success",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY0NTI2ODI1MCwiZXhwIjoxNjQ1Mjc1NDUwfQ.ncIWVJc3bgvMMKO0jXFsi4DNIjZY_GkSCuH_MTmNkNI"
    }
}

To list all the available jobs

GET /jobs HTTP/1.1
Accept: */*

The expected response

{
    "statusCode": 0,
    "description": "Success",
    "data": [
        {
            "id": 1,
            "company": "Goodera",
            "location": "Bangalore",
            "description": "Node JS Developer",
            "active": 1,
            "created_at": "2022-02-19 10:55:43"
        },
        {
            "id": 2,
            "company": "Google",
            "location": "Bangalore",
            "description": "Java Developer",
            "active": 1,
            "created_at": "2022-02-19 10:55:43"
        },
        {
            "id": 3,
            "company": "Amazon",
            "location": "Bangalore",
            "description": "Java Developer",
            "active": 1,
            "created_at": "2022-02-19 10:55:43"
        },
        {
            "id": 4,
            "company": "Meta",
            "location": "UK",
            "description": "Java Developer",
            "active": 1,
            "created_at": "2022-02-19 10:55:43"
        },
        {
            "id": 5,
            "company": "IBM",
            "location": "Bangalore",
            "description": "Python Developer",
            "active": 1,
            "created_at": "2022-02-19 10:55:43"
        },
        {
            "id": 6,
            "company": "Google",
            "location": "Bangalore",
            "description": "Java Developer",
            "active": 1,
            "created_at": "2022-02-19 10:55:44"
        }
    ]
}

To apply for a job

POST /user/apply-job HTTP/1.1
x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY0NTI2ODI1MCwiZXhwIjoxNjQ1Mjc1NDUwfQ.ncIWVJc3bgvMMKO0jXFsi4DNIjZY_GkSCuH_MTmNkNI
Content-Type: application/json

{
    "jobId": 1
}

Make sure, we need to pass user token for this.


To see all the applied jobs

GET /user/list-applied-jobs HTTP/1.1
x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY0NTI2ODI1MCwiZXhwIjoxNjQ1Mjc1NDUwfQ.ncIWVJc3bgvMMKO0jXFsi4DNIjZY_GkSCuH_MTmNkNI
User-Agent: PostmanRuntime/7.29.0
Accept: */*

Expected response

{"statusCode":0,"description":"Success","data":[{"id":1,"company":"Goodera","location":"Bangalore","description":"Node JS Developer","active":1,"created_at":"2022-02-19 10:55:43"},{"id":4,"company":"Meta","location":"UK","description":"Java Developer","active":1,"created_at":"2022-02-19 10:55:43"}]}