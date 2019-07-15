# to-do-api

### Setup locally

#### Install and configure AWS CLI (Skip this step if you have installed and configured AWS CLI)

##### Install AWS CLI (If you are on Linux execute the following commands)

``` bash
$ sudo apt-get update
```

``` bash
$ sudo apt-get install awscli
```
##### Configure AWS CLI with your profile details

``` bash
$ aws configure
```
If you are configuring for solely running locally - 

AWS Access Key ID : {some-text} 
AWS Secret Access Key : {some-text}

Leave other feilds empty.

#### Installling dependancies and running locally

##### Install dependancies
``` bash
$ npm install
```

##### Install dynamodb locally
``` bash
$ serverless dynamodb install
```

##### Run the API along with dynamodb locally 
``` bash
$ serverless offline start
```
## Known Issues
### CORS Issue (Preflight Requests)
When the front end is hosted on S3 and the back end functions are triggered through the API gateway(different origins), the browser blocks the XHR requests sent from the frontend. This can easily be solved by configuring the API gateway to send the required response headers (Access-control-allow-origin), but the browser still sends a preflight request (OPTIONS call)  before the actual request to check if the actual request can be made. This doubles the latencey.

This issue can be overcome by plugging in the S3 and the API gateway to a same origin using cloud front. For more information refer the below links - 
- https://hackernoon.com/speedup-serverless-web-apps-in-aws-12fa25b94600
- https://apimeister.com/2017/05/09/hosting-a-cloudfront-site-with-s3-and-api-gateway.html

However, if a custom domain is not used, you will have to sign (https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html) the requests from the frontend manually, which restricts you from using the automatic signing functions offered by Amplify. This is because Amplify signs the request with the cloud front host name, but the actual host of the API gateway is different. If you get a custom domain name and configure it with the API gateway this will not be a problem. 

