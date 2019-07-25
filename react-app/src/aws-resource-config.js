export default {
    apiGateway: {
        REGION: "ap-southeast-1",
        URL: "https://bmyhcj7d37.execute-api.ap-southeast-1.amazonaws.com/dev/api"
        //URL:"https://d1aq9uhbhb07yr.cloudfront.net/dev/api"
    },
    cognito: {
        REGION: "ap-southeast-1",
        USER_POOL_ID: "ap-southeast-1_WyB6qKQsu",
        APP_CLIENT_ID: "67gb4v70mhmpi3dgrpocj5a983",
        IDENTITY_POOL_ID: "ap-southeast-1:4790d7ff-ebec-460d-b04c-ad55bed7cc57"
    },
    oauth : {
        domain: 'to-do-dev-auth.auth.ap-southeast-1.amazoncognito.com',
        scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
        redirectSignIn: window.location.origin,
        redirectSignOut: window.location.origin,
        responseType: 'code'
    }
};
