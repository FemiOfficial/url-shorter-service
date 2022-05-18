# URL Shorter Service


The url shorterner service is basically to generate short code for urls supplied to the service for this purpose

### Features
* 1. Shortens Url, by generating a shortcode or using desired shortcode from client
* 2. Provides stats for shortcodes generated for a particular url
* 3. Provides endpoint to get url for specified short code


## Deployment
* This app is deployed on Heroku ::: https://url-shorter-service.herokuapp.com
* Documentation on [Postman](https://documenter.getpostman.com/view/17520199/UyxnDQ2q)

## Technology used
[Node js](https://nodejs.org/en/)
[Express](https://expressjs.com/)
[MongoDB](https://www.mongodb.com/)

## Installation
Requires [Node js](https://nodejs.org/en/), Version 14 or higher

Requires Docker (Optional if you have Mongo Installed Locally)

Clone the repository or download and unzip:

`git clone https://github.com/FemiOfficial/url-shorter-service.git`

### Without Docker

Start the App by running:

`npm install`

`npm start`


### With Docker

`git clone https://github.com/FemiOfficial/url-shorter-service.git`

`nano .env (set all env as describle in env.example)`

`docker compose up`
