# To-Do-App-Backend 



A website for managing To do tasks, marking as deleted or completed as needed. 


*** Setting up - VSC and GitHub repository *** 

To set up the serverless deploy, the stages are as follows:

1) Create a git repository called To-Do-App-backend.

2) Clone a repo using `git clone .....` and made sure you `cd` into the directory

3) Created an IAM user for each group member and downloaded the API access keys as a CSV file  (https://www.youtube.com/watch?v=KngM5bfpttA)

4) Configure our serverless command with the credentials
`serverless config credentials --provider aws --key YOURKEY --secret YOURSECRET`

5) Generate our serverless boiler plate code
`serverless create --template hello-world`

6) Initialise node (to create our package.json file)

`npm init -f`

7) Update our package.json in order to introduce the express framework and a serverless helper dependency

`npm install --save express serverless-http`

8) Code written into films.js and databaseservice.js , updating the `serverless.yaml` adding in the functions in as created.  


9) Checking code in Postman-
    URL obtained for each function by running this command in the backend repository in terminal; 

`serverless deploy --RDS_HOST --RDS_USER film --RDS_PASSWORD --RDS_DATABASE`
***Note: This needs running every time the code is updated/resaved***

10) Use the corresponding URL to check each function is working correctly.  

