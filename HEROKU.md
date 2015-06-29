# Deploying to Heroku


## Prerequisites

* Now make sure Heroku has your credit card by visiting https://heroku.com/verify
* I had to disable the `rev` task for images so that the image paths in the DB data
  would match the names of the files in the `dist` folder.

## 1st Time Deployment Steps

```bash
yo angular-fullstack:heroku
cd dist
heroku addons:create mongolab:sandbox
```

## Re-deploys

```bash
grunt build
grunt buildcontrol:heroku
```


### Instructions from running `yo angular-fullstack:heroku`

```
Because you're using mongoose, you must add mongoDB to your heroku app.
  from `/dist`: heroku addons:add mongohq

You will need to set environment variables for facebook auth. From `/dist`:
  heroku config:set FACEBOOK_ID=appId
  heroku config:set FACEBOOK_SECRET=secret

You will need to set environment variables for google auth. From `/dist`:
  heroku config:set GOOGLE_ID=appId
  heroku config:set GOOGLE_SECRET=secret

You will need to set environment variables for twitter auth. From `/dist`:
  heroku config:set TWITTER_ID=appId
  heroku config:set TWITTER_SECRET=secret


Your app should now be live. To view it run
  cd dist && heroku open

You may need to address the issues mentioned above and restart the server for the app to work correctly.
After app modification run
  grunt build
Then deploy with
  grunt buildcontrol:heroku
```
