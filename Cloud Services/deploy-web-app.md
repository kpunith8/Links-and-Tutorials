# Build an End-to-End AWS Web Application

## Apps used

- `AWS Amplify` - To deploy the webapp
- `Lambda` - Serverless function to write to DB and return data
- `API Gateway` - To create an API and write data to database
- `DyanamoDB` - Database to store the result
- `IAM` - To give permissions to services using roles

### Create an app

- Create an `index.html` file, start with a simple html without style and button, make
sure to replace the `API_GATEWAY_ENDPOINT` on a fetch call so that it calls the end point.

```html
<!DOCTYPE html>
<html>
  <head>
  <meta charset="UTF-8">
  <title>To the Power of Math!</title>
    <!-- Styling for the client UI -->
    <style>
      h1 {
        color: #FFFFFF;
        font-family: system-ui;
        margin-left: 20px;
      }
      body {
        background-color: #222629;
      }
      label {
        color: #86C232;
        font-family: system-ui;
        font-size: 20px;
        margin-left: 20px;
        margin-top: 20px;
      }
      button {
        background-color: #86C232;
        border-color: #86C232;
        color: #FFFFFF;
        font-family: system-ui;
        font-size: 20px;
        font-weight: bold;
        margin-left: 30px;
        margin-top: 20px;
        width: 140px;
      }
      input {
        color: #222629;
        font-family: system-ui;
        font-size: 20px;
        margin-left: 10px;
        margin-top: 20px;
        width: 100px;
      }
    </style>
    <script>
      // callAPI function that takes the base and exponent numbers as parameters
      const callAPI = (base, exponent)=> {
        // instantiate a headers object
        var myHeaders = new Headers();
        // add content type header to object
        myHeaders.append("Content-Type", "application/json");
        // using built in JSON utility package turn object to string and store in a variable
        var body = JSON.stringify({"base": base, "exponent": exponent});
        // create a JSON object with parameters for API call and store in a variable
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body,
          redirect: 'follow'
        };
        // make API call with parameters and use promise to get the response
        fetch("API_GATEWAY_ENDPOINT", requestOptions)
          .then(response => response.text())
          .then(result => alert(JSON.parse(result).body))
          .catch(error => console.log('error', error));
      }
    </script>
  </head>
  <body>
    <h1>THE POWER OF MATH!</h1>
    <form>
      <label>Base number:</label>
      <input type="text" id="base">
      <label>power:</label>
      <input type="text" id="exponent">
      <!-- set button onClick method to call function we defined passing input values as parameters -->
      <button type="button" onclick="callAPI(document.getElementById('base').value, document.getElementById('exponent').value)">CALCULATE</button>
    </form>
  </body>
</html>
```

- `zip` the index.html file and upload it to `AWS Amplify`
- Create an app in `AWS Amplify`, select `Deploy without a git provider option`
- Name it and give environment name as `dev`
- Drag and drop the zip file and click on `Save and Deploy`
- Once deployed `grab the URL` and access the deployed app

### Create a lambda function

- Create a function, select `Author from scratch`
- `Name the app` and select the runtime as `python 3.9+`
- Create the function
- Update the source code in the editor

```py
# import the JSON utility package
import json
# import the Python math library
import math

# define the handler function that the Lambda service will use an entry point
def lambda_handler(event, context):

  # extract the two numbers from the Lambda service's event object
  mathResult = math.pow(int(event['base']), int(event['exponent']))

  # return a properly formatted JSON object
  return {
    'statusCode': 200,
    'body': json.dumps('Your result is ' + str(mathResult))
  }
```

> NOTE: Will update the code later to make a call to DynamoDB to write results to DB.

- `Deploy` the funtion and test it by `configuring a test event` clicking `Test` button
- Create a test event and pass values by editing `Event JSON` in the editor

```json
{
  "base": 2,
  "exponent": 4
}
```

- `Save` and `Test` the function

### Create an API

- Go to `API Gateway`, create a `REST API`, Build
- Select `REST` and `New API` options (leave it as default)
- Give API a name and description and leave the `Endpoint Type` as is and `Create API`
- Select `Resources` and select `/` and click on `Actions` and select `Create method`
- Select the type of method as `POST`
- Select `Lambda function` as an `Integration type`
- Select the proper `Lambda region` and the `Lambda function` created above, `Save`
- Enable `CORS` on the `POST` resource created, select the `POST` action and click on `Actions`
and select `Enable CORS` option and leave the default options as is and `Enable`
- `Deploy` the API and Create a new stage and name it as `dev` and `Deploy` and `Save the changes`
- Copy the `Invoke URL` for later use in `index.html`
- Select the resource and `Test` it by passing the same JSON we used to test the `lambda function`
we have selected `Integration Type` as `Lambda function` above

### Create the databse to persist results

- Select `DynamoDB` and `Create Table`
- Name it and give `Partition Key` as `ID` and `Create Table`
- Grab the `ARN` of the table created, select the table and expand `Additional info` and grab the `ARN`,
it is required to give write permission to the lambda function to write/read the data from table

### Give Permissions to a Lambda function having permission to write to the table

- Select the created `Lambda function` and go to `Configuration` tab
- Select `Permissions` and `Select the role` attached to it
- It opens a `IAM` with the selected role, click on `Add permissions` and select `Create inline policy`
- Update the JSON as shown to enable lambda function to write/read/delete from the DB, make sure to `update the DB ARN`

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "VisualEditor0",
      "Effect": "Allow",
      "Action": [
        "dynamodb:PutItem",
        "dynamodb:DeleteItem",
        "dynamodb:GetItem",
        "dynamodb:Scan",
        "dynamodb:Query",
        "dynamodb:UpdateItem"
      ],
      "Resource": "YOUR-TABLE-ARN"
    }
  ]
}
```

- Review the policy and save it

### Update the lambda funtion to write to DB

- Select the `lambda function` and update the code as follows

```py
# import the JSON utility package
import json
# import the Python math library
import math

# import the AWS SDK (for Python the package name is boto3)
import boto3
# import two packages to help us with dates and date formatting
from time import gmtime, strftime

# create a DynamoDB object using the AWS SDK
dynamodb = boto3.resource('dynamodb')
# use the DynamoDB object to select our table
table = dynamodb.Table('PowerOfMathDatabase')
# store the current time in a human readable format in a variable
now = strftime("%a, %d %b %Y %H:%M:%S +0000", gmtime())

# define the handler function that the Lambda service will use an entry point
def lambda_handler(event, context):

  # extract the two numbers from the Lambda service's event object
  mathResult = math.pow(int(event['base']), int(event['exponent']))

  # write result and time to the DynamoDB table using the object we instantiated and save response in a variable
  response = table.put_item(
    Item={
      'ID': str(mathResult),
      'LatestGreetingTime':now
      })

  # return a properly formatted JSON object
  return {
    'statusCode': 200,
    'body': json.dumps('Your result is ' + str(mathResult))
  }
```

- `Deploy` and `Test` to verify whether the result has been written to `DynamoDB`

- Update the `API_GATEWAY_ENDPOINT` in `index.html`, upload and deploy the app and test it
