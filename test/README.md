# Mock Server

## Lambda Deployment

1. `npm install`
2. `npm run pack`
3. Upload the zip to a new lambda. Use a microservices role
4. Create API Gateway
5. Create Method: ANY
6. Create Resource: checkbox proxy
7. Connect it to the lambda you made

## Netlify Deployment

> Coming soon

## Testing

1. Open postman
2. Send `{ "username": "username", "password": "password" }` to `/auth/login`
3. Copy the token from the response
4. In the `Authorization` header, put `Bearer ${access_token}`
