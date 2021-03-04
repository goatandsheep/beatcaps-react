# Beatcaps ReactJS

ReactJS Front End to connect with BeatCaps back end which will use Azure Active
Directory.

## Pages

* Login page
* Jobs page (status of file processes): requires fake data to view
* Profile page (change password, contact, etc.)
* Payments page (Stripe)
* File submit page: upload song / video, options, etc.
* Processed file preview page
* API documentation page

## Setup

### Dotenv

1. Copy the `.env.template`
2. Rename the copy as `.env`
3. Customize variables as you please

### First time setup

1. `npm install` in root (install frontend)
2. `cd /test`
3. `npm install` in /test (install mock backend)

### Running Project
1. In first terminal: Start React app from root folder (`npm start`)
2. In second terminal: Start dev server from `/test` folder (`cd test && npm run dev`)
3. React app is on `localhost:3000`
4. Create an account through the sign up form, and activate it with the code sent to your email

### Production

* [S3 IAM](https://docs.amplify.aws/lib/storage/getting-started/q/platform/js#using-amazon-s3)
* [S3 CORS](https://aws.amazon.com/blogs/mobile/use-an-existing-s3-bucket-for-your-amplify-project/)

