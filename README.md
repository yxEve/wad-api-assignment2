# Assignment 2 - Web API.

Name: Yuxin Nie

## Features.

...... A bullet-point list of the ADDITIONAL features you have implemented in the API **THAT WERE NOT IN THE LABS** ......,
 
 + Feature 1 - Users can get a list of upcoming movies according to the region. For example, if someone wants to watch movies from UK, he can use the keywords 'UK' to select them.
 + Feature 2 - Users can get a list of popular movies according to the page.
 + Feature 3 - Users can get a list of now_playing movies according to the page.
 + Feature 4 - Users can get a list of similar movies of a specific movie if thay are very interested to such type of movies.
 + Feature 5 - Users can get a list of recommendations movies for a specific movie.
 + Feature 6 - Users can get the information of the cast if they want to know more about a movie.
 + Feature 7 - Users can get the information of the crew.
 + Feature 8 - Users can get the information of backdrops of a movie, which can help them know more about the movie in advance.
 + Feature 9 - Users can get the information of videos of a movie, including some short videos about the movie.
 + Feature 10 - Users can add new movies.
 + Feature 11 - Users can delete a specific movie using its id.
 + Feature 12 - Users can get a list of popular actors.
 + Feature 13 - Users can get detailed informaion about a famous people.
 + Feature 14 - Users can add new popular people.
 + Feature 15 - Users can delete or modify the information about a specific person.

## Installation Requirements

Describe what needs to be on the machine to run the API (Node v?, NPM, MongoDB instance, any other 3rd party software not in the package.json). 
Cloud MongoDB

Describe getting/installing the software, perhaps:

```bat
git clone https://github.com/yxEve/wad-api-assignment2.git
```

followed by installation

```bat
git install
npm start
npm run start
```

## API Configuration
Describe any configuration that needs to take place before running the API. For example, creating an ``.env`` and what variables to put in it. Give an example of how this might be structured/done.
REMEMBER: DON'T PUT YOUR OWN USERNAMES/PASSWORDS/AUTH KEYS IN THE README OR ON GITHUB, just placeholders as indicated below:

```bat
NODE_ENV=development
PORT=8080
HOST=localhost
TMDB_KEY=MyKey
mongoDB=MyMongoURL
SEED_DB=true
SECRET=MyJWTSecret
```


## API Design
Give an overview of your web API design, perhaps similar to the following: 

|  |  GET | POST | PUT | DELETE
| -- | -- | -- | -- | -- 
| /api/movies | Get a list of movies | Create new movies | N/A |
| /api/movies/{movieid} | Get a Movie | N/A | N/A | Delete a specific movie
| /api/movies/{movieid}/reviews | Get all reviews for movie | Create a new review for Movie | N/A | N/A  
| /api/upcoming/{region} | Get upcoming movies using region | N/A | N/A | N/A
| /api/popular/{page} | Get popular movies using page | N/A | N/A | N/A
| /api/now_playing/{page} | Get now_playing movies using page | N/A | N/A | N/A
| /api/{movieId}/similar | Get similar movies of a specific movie | N/A | N/A | N/A
| /api/{movieid}/recommendations | Get recommendations movies of a specific movie | N/A | N/A | N/A
| /api/{movieid}/cast | Get cast information of a specific movie | N/A | N/A | N/A
| /api/{movieid}/crew | Get screw information of a specific movie | N/A | N/A | N/A
| /api/{movieid}/image | Get backdrops of a specific movie | N/A | N/A | N/A
| /api/{movieid}/vedio | Get vedio information of a specific movie | N/A | N/A | N/A
| /api/person | Get a list of popular people | Create new people | N/A | N/A
| /api/person/{peopleid} | Get detailed information of a specific person | N/A | Update a specific person | Delete a specific person
| /api/users | Get a list of users | Create new users | N/A | N/A
| /api/users/{username} | N/A | N/A | N/A | Delete a specific user
| /api/users/{userid} | N/A | N/A | Update a specific user | N/A
| /api/users/{username}/favourites | Get favourites of a specific user | Add new to favourites | N/A | N/A

If you have your API design on an online platform or graphic, please link to it (e.g. [Swaggerhub](https://app.swaggerhub.com/)).
+ I use Swagger to show my API design and I run it on the localhost, the screenshot are as follows:

![][movies]

![][users]

![][people]

## Security and Authentication
Give details of authentication/ security implemented on the API(e.g. passport/sessions). Indicate which routes are protected.
+ protected routes:
~~~Javascript
app.use('/api/movies', passport.authenticate('jwt', {session: false}), moviesRouter);
app.use('/api/person', passport.authenticate('jwt', {session: false}), personRouter);
~~~

## Integrating with React App
Describe how you integrated your React app with the API. Perhaps link to the React App repo and give an example of an API call from React App. For example: 
+ I use API to realize the login and signup functions.
~~~Javascript
export const login = (username, password) => {
  return fetch('/api/users', {
      headers: {
          'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({ username: username, password: password })
  }).then(res => res.json())
};

export const signup = (username, password) => {
  return fetch('/api/users?action=register', {
      headers: {
          'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({ username: username, password: password })
  }).then(res => res.json())
};

~~~

## Extra features

. . Briefly explain any non-standard features, functional or non-functional, developed for the app.  

## Independent learning.

+ I install the swagger in my vscode, and I import many packages to my public folder.  



# Assignment 2 - Agile Software Practice.

Name: Yuxin Nie

## Target Web API.

...... Document the Web API that is the target for this assignment's CI/CD pipeline. Include the API's endpoints and any other features relevant to the creation of a suitable pipeline, e.g.

+ Get /api/movies - returns an array of movie objects.
+ Get /api/movies/:id - returns detailed information on a specific movie.
+ GET /api/movies/upcoming/:region - returns an array of upcoming movies, which can be searched by region like US or UK.
+ GET /api/movies/popular/:page - returns an array of popular movies, which can be searched by pages like 1 or 2.
+ GET /api/movies/:id/similar - returns an array of similar movies of a specific movie.
+ GET /api/movies/:id/cast - returns the cast information on a specific movie.
+ GET /api/movies/:id/image - returns the image information such as the backdrop_path on a specific movie.
+ POST /api/movies - creates a new movie included its basic information.
+ DELETE /api/movies/:id - deletes a specific movie using its id.
+ GET /api/users - returns an array of user objects.
+ POST /api/users - creates a new user included its basic information.
+ DELETE /api/users/:userName - deletes a specific user using his username.
+ GET /api/person - returns an array of person objects.
+ GET /api/person/:id - returns detailed information on a specific person.
+ POST /api/person - creates a new person included his basic information.
+ DELETE /api/person/:id - deletes a specific person using his id.

## Error/Exception Testing.

.... From the list of endpoints above, specify those that have error/exceptional test cases in your test code, the relevant test file and the nature of the test case(s), e.g.

+ GET /api/movies/:id - test when id is invalid. See tests/functional/api/movies/index.js 
+ GET /api/movies/upcoming/:region - tests when the region is invalid. The region should be the form of ^{A-Z}2$, it will cause an error if the region is invalid. See tests/functional/api/movies/index.js 
+ GET /api/movies/popular/:page - tests when the page is invalid. The page should be an integer. When the page is invalid like '...', it will cause an error. See tests/functional/api/movies/index.js
+ GET /api/movies/:id/similar - tests when the id is invalid. It will cause an error when the id is invalid. See tests/functional/api/movies/index.js
+ GET /api/movies/:id/cast - tests when the id is invalid. It will cause an error when the id is invalid. See tests/functional/api/movies/index.js
+ GET /api/movies/:id/image - tests when the id is invalid. It will cause an error when the id is invalid. See tests/functional/api/movies/index.js
+ POST /api/movies - tests when after the post operation. See tests/functional/api/movies/index.js
+ DELETE /api/movies/:id - tests when after the delete operation. See tests/functional/api/movies/index.js
+ POST /api/users - tests when after the post operation. See tests/functional/api/users/index.js
+ DELETE /api/users/:userName - tests when after the delete operation. See tests/functional/api/users/index.js
+ GET /api/person/:id/ - tests when the id is invalid. It will cause an error when the id is invalid. See tests/functional/api/person/index.js
+ POST /api/person - tests when after the post operation. See tests/functional/api/person/index.js
+ DELETE /api/person/:id - tests when after the delete operation. See tests/functional/api/person/index.js

## Continuous Delivery/Deployment.

..... Specify the URLs for the staging and production deployments of your web API, e.g.

+ https://dashboard.heroku.com/apps/movies-api-ass2-staging - Staging deployment
+ https://dashboard.heroku.com/apps/movies-api-ass2-production - Production

.... Show a screenshots from the overview page for the two Heroku apps e,g,

+ Staging app overview 

![][stagingapp]

+ Production app overview 

![][production]

[If an alternative platform to Heroku was used then show the relevant page from that platform's UI.]

## Feature Flags (If relevant)

... Specify the feature(s) in your web API that is/are controlled by a feature flag(s). Mention the source code files that contain the Optimizerly code that implement the flags. Show screenshots (with appropriate captions) from your Optimizely account that prove you successfully configured the flags.


[stagingapp]: ./public/stagingapp.png
[production]: ./public/production.png
[movies]: ./public/movies.png
[users]: ./public/users.png
[people]: ./public/people.png