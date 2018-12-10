# Tubeparison

## What and Why

Tubeparison is an app making it easy to compare relevant KPIs across YouTube videos in order to see where channels having more subscribers than you are better and find the right strategies to make your channel more successfull.

## Screenshots

![Frontpage of the project](https://github.com/Bueggi/YouTube-Comparison/blob/master/pictures/Frontpage.png)

![Video Comparison](https://github.com/Bueggi/YouTube-Comparison/blob/master/pictures/Video%20Comparison.png)

On the front page you can log in, and on the user page you can find and add channels. The five latest videos of each channel will be added to the comparison.

## Installation

1. Clone or fork the repo
2. ```cd YouTube-Comparison npm i``` 
to install all neccessary dependencies.
3. ``` cd server
nodemon index.js```
4. ```cd youtubecomparison
npm start```

The project will now run on port 3000.

## Tech Stack
* <a href="https://reactjs.org/">React</a>
* <a href="https://koajs.com">koa</a>

## Used APIs
* [YouTube Data API][https://developers.google.com/youtube/v3/]
* [YouTube Analytics API][https://developers.google.com/youtube/analytics/]

## Next steps

* Adding a user database and make user choices persistent
* Making the FE more stable
* Reading the session cookie on the FE to maintain login after refresh
* Better and more complex data analytics
* reducing API calls

## Author and how to contribute

Author: Christopher Buecklein | [linkedIn][https://www.linkedin.com/in/christopher-b%C3%BCcklein-594b13b3/] | [gitHub][https://github.com/Bueggi]
