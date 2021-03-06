import Amplify from '@aws-amplify/core';
// import Auth from '@aws-amplify/auth';
import constants from '../constants';

const awsconfig = {
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: constants.AWS_IDENTITY_POOL_ID,

    // REQUIRED - Amazon Cognito Region
    region: constants.AWS_REGION,
    // storage: sessionStorage,

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: constants.AWS_POOL_ID,

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: constants.AWS_WEB_CLIENT_ID,
  },
  API: {
    endpoints: [{
      name: 'OverleiaApi',
      endpoint: constants.SERVER_DOMAIN,
      // custom_header: async () => {
      //   return {
      //     Authorization: `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}`,
      //   };
      // },
    }],
  },
  Storage: {
    AWSS3: {
      bucket: constants.S3_BUCKET,
      region: constants.AWS_REGION,
    },
  },

};

export const awsAuthInit = () => {
  Amplify.configure(awsconfig);
};
