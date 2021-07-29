# food-permit
Service to run food-permit service.

## Structure

`/build` - Contains the dockerfiles that are build as part of the deployable artifacts of this repo.

`/src` - Contains all source code that forms the shared and deployable artifacts of the repo.


## Installation

    yarn install

## Building the whole repo

    yarn run build

## Building specific API projects

    yarn run build:api

## Running

    yarn run start

Starts the local docker container to run API.

## Local Development

- do `yarn install` to install all the dependencies
- then `yarn run start` to start all the service

## Testing

    yarn run test

## Database
We are using in-memory database. We keep the structure as per the requirement, where consumer needs to make 2 types of queries - searching and auto-complete.
So 
1) we have one in-memory table which is indexed by address(lets say we want search capabilities on addresses)
2) we have another in-memory table which contains location related items so that we can geo-query them.(using geo-lib for geo queries)

We created them on the fly and keep the tables in the context of the request.

