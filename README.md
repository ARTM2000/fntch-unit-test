# Finnoteach - Unit Test
This project create for educational purpose in order to share the knowledge about how to write **unit test** and its best practices.

## Scenario
The project take place in backend of a blog post website platform which has these concepts:
 -  User (who write post)
 -  Post
 -  Activity logs (activities are: _user register_, _user login_, _post creation_, _post update_, _post delete_)

Features are:
 - User should be able to register with username, email and password
 - User should be able to login with email and password
 - Authorized user should be able to create post
 - Authorized user should be able to get list of his/her posts
 - Authorized user should be able to edit his/her post
 - Authorized user should be able to delete his/her post
 - Activity logs should be save to database by user information and user act
 - Authorized user should receive email for _new login_, _post creation_ and _post delete_ events

## Technical Requirements
 - nodejs (v16 or later)
 - docker (v20 or later)
 - docker compose (v2.13.0 or later)

## Installation

```bash
$ npm ci
```

## Running the app

```bash
# run project with docker compose
docker-compose up

# run project with docker-compose with detach mode
docker-compose up -d
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
