# to-do-api

## Setup locally -

###Install and configure AWS CLI (Skip this step if you have installed and configured AWS CLI)

####Install AWS CLI (If you are on Linux execute the following commands)

``` bash
$ sudo apt-get update
```

``` bash
$ sudo apt-get install awscli
```
####Configure AWS CLI with your profile details

``` bash
$ aws configure
```
If you are configuring for solely running locally - 

AWS Access Key ID : {some-text} 
AWS Secret Access Key : {some-text}

Leave other feilds empty.

###Installling dependancies and running locally

####Install dependancies
``` bash
$ npm install
```

####Install dynamodb locally
``` bash
$ serverless dynamodb install
```

####Run the API along with dynamodb locally 
``` bash
$ serverless offline start
```