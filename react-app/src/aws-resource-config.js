export default {
    apiGateway: {
        REGION: "ap-southeast-1",
        URL: "https://7dxu4967lb.execute-api.ap-southeast-1.amazonaws.com/dev"
    },
    cognito: {
        REGION: "ap-southeast-1",
        USER_POOL_ID: "ap-southeast-1_KpxvpSu11",
        APP_CLIENT_ID: "2ae1srf3qnhhl0mstiaqjdbp32",
        IDENTITY_POOL_ID: "ap-southeast-1:adbf58ea-6262-45e6-97e3-8b49927623d9"
    },
    oauth : {
        domain: 'to-do.auth.ap-southeast-1.amazoncognito.com',
        scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
        redirectSignIn: window.location.origin,
        redirectSignOut: window.location.origin,
        responseType: 'code'
    }
};
