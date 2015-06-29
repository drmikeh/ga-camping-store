# Deploying to Heroku

```bash
yo angular-fullstack:heroku

# Now make sure Heroku has your credit card by visiting https://heroku.com/verify
# Then run:
heroku addons:create mongolab:sandbox
```

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