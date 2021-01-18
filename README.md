
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