
export const constants = {
  SERVER_DOMAIN: process.env.REACT_APP_SERVER_DOMAIN,
  SERVER_KEY: process.env.REACT_APP_SERVER_KEY,
  STRIPE_KEY: process.env.REACT_APP_STRIPE_KEY,
  AWS_REGION: process.env.REACT_APP_AWS_REGION || process.env.AWS_REGION || 'us-east-1',
  AWS_IDENTITY_POOL_ID: process.env.REACT_APP_AWS_IDENTITY_POOL_ID,
  AWS_POOL_ID: process.env.REACT_APP_AWS_POOL_ID,
  AWS_POOL_ARN: process.env.REACT_APP_AWS_POOL_ARN,
  AWS_WEB_CLIENT_ID: process.env.REACT_APP_AWS_WEB_CLIENT_ID,
  COGNITO_DOMAIN: process.env.REACT_APP_COGNITO_DOMAIN,
};

export default constants;
