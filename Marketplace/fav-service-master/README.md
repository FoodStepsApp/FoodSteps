# fav-service
Service which favourites Users Ideas and store them in Database.
This service is written in NodeJS with ExpressJS , MongoDB as database using Mongoose ORM.
A User can Favorite an Idea , Unfavorite any idea.

# Installation
Clone this repository into your local system 


Go to that Project directory
```bash
cd <proj-name>
```
System should have npm installed to run this command.
Install all Dependencies for Node to run the service by 

```bash
npm install
```
# Run Service

To Run this service your system or Local environment should have NodeJS & npm installed.

```bash
npm start
```

# Usage
This Service has API endpoints at 
```bash
/api/fav --> POST Request

/api/unfav --> PUT Request

/api/favorites/:id --> GET Request

/api/favorites --> GET Request
```
For /api/fav - POST Request
POST body data in the request should be like , for example: 
```JSON
{ 
"user":
     {
     "_id":"5d6ede6a0ba62570afcedd3b"
     },
"favorite":
     {
     "_id":"5d6ede6a0ba62570afcedd32",
     "idea_owner": "String",
     "idea_owner_name": "String2",
     "idea_genre": "String3",
     "idea_headline": "String idea_name",
     "idea_description": "String idea_description",
     "price": 50
     } 
}
```
Fields in the POST Body should be "user" & "favorite" which has the deatils of the User who wants to favorite an idea ( eg: _id etc) and the deatils of the Idea a user want to favorite ( eg: _id, idea_headline , idea_description etc ) respectively


Here the _id in user is the MongoDB UID / _id unique for every user. This shoud 12 characters and uinque and accoridng to the rules of MongoDB _id.
Here the _id in Favorite is the MongoDB UID / _id unique for every Idea. This shoud 12 characters and uinque and accoridng to the rules of MongoDB _id.


For making this POST Favorite Request ( Favourite an Idea ) :
The user needs to send User detalis in "user" and Idea Details in "favorite"

Response :
```JSON
{
    "favorites": [
        "5d6ede6a0ba62570afcedd32"
    ],
    "_id": "5d6ede6a0ba62570afcedd3b",
    "__v": 0
}
```

For /api/unfav - PUT Request
PUT body data in the request should be like , for example: 
```JSON
{ 
"user":
     {
     "_id":"5d6ede6a0ba62570afcedd3b"
     },
"favorite":
     {
     "_id":"5d6ede6a0ba62570afcedd32"
     } 
}
```
Fields in the POST Body should be "user" & "favorite" which has the deatils of the User who wants to favorite an idea ( eg: _id etc) and the deatils of the Idea a user want to favorite ( eg: _id, idea_headline , idea_description etc ) respectively.


Here the _id in user is the MongoDB UID / _id unique for every user. This shoud 12 characters and uinque and accoridng to the rules of MongoDB _id.
Here the _id in Favorite is the MongoDB UID / _id unique for every Idea. This shoud 12 characters and uinque and accoridng to the rules of MongoDB _id.

For making this PUT un-favorite Request ( un-Favourite an Idea ) :
The user needs to send User detalis in "user" and only Idea _id in "favorite"
Response :
```JSON
{
    "favorites": [],
    "_id": "5d6ede6a0ba62570afcedd3b",
    "__v": 0
}
```

# To Get all favorited ideas of a User :
/api/favorites/:id -> GET Request
 here Params :id is the User's UID/_id from User collection. 
 Here the _id in user is the MongoDB UID / _id unique for every user. This shoud 12 characters and uinque and accoridng to the rules of MongoDB _id.
 
 Response :
 ```JSON
 [
    {
        "_id": "5d6ede6a0ba62570afcedd38",
        "idea_owner": "String",
        "idea_owner_name": "String2",
        "idea_genre": "String3",
        "idea_headline": "String idea_name",
        "idea_description": "String idea_description",
        "price": 50
    },
    {
        "_id": "5d6ede6a0ba62570afcedd39",
        "idea_owner": "String",
        "idea_owner_name": "String2",
        "idea_genre": "String3",
        "idea_headline": "String idea_name",
        "idea_description": "String idea_description",
        "price": 50
    }
]
```
 # Internal APIs
 For /api/favorites - GET Request
 Use of this end point is to Get all the Relational Data of user and their favorites present in the service.
 
 Response :
```JSON
[
    {
        "favorites": [
            {
                "_id": "5d6ede6a0ba62570afcedd35",
                "idea_owner": "String",
                "idea_owner_name": "String2",
                "idea_genre": "String3",
                "idea_headline": "String idea_name",
                "idea_description": "String idea_description",
                "price": 50
            },
            {
                "_id": "5d6ede6a0ba62570afcedd33",
                "idea_owner": "String",
                "idea_owner_name": "String2",
                "idea_genre": "String3",
                "idea_headline": "String idea_name",
                "idea_description": "String idea_description",
                "price": 50
            },
            {
                "_id": "5d6ede6a0ba62570afcedd33",
                "idea_owner": "String",
                "idea_owner_name": "String2",
                "idea_genre": "String3",
                "idea_headline": "String idea_name",
                "idea_description": "String idea_description",
                "price": 50
            },
            
            {
                "_id": "5d6ede6a0ba62570afcedd38",
                "idea_owner": "String",
                "idea_owner_name": "String2",
                "idea_genre": "String3",
                "idea_headline": "String idea_name",
                "idea_description": "String idea_description",
                "price": 50
            }
        ],
        "_id": "5d6ede6a0ba62570afcedd3a",
        "__v": 0
    },
    {
        "favorites": [
            {
                "_id": "5d6ede6a0ba62570afcedd39",
                "idea_owner": "String",
                "idea_owner_name": "String2",
                "idea_genre": "String3",
                "idea_headline": "String idea_name",
                "idea_description": "String idea_description",
                "price": 50
            }
        ],
        "_id": "5d6ede6a0ba62570afcedd3b",
        "__v": 0
    }
]
```
The response is a array of objects. These objects have fields "user" & "favorite" which has the deatils of the User who favorited an idea ( eg: _id etc) and the deatils of the Idea favorited ( eg: _id, idea_headline , idea_description etc ) respectively.
Here if an ideas which are favorited more than once can appear. 


Here the _id in user is the MongoDB UID / _id unique for every user. This shoud 12 characters and uinque and accoridng to the rules of MongoDB _id.
Here the _id in Favorite is the MongoDB UID / _id unique for every Idea. This shoud 12 characters and uinque and accoridng to the rules of MongoDB _idPoss.


# Possible BottleNecks:
A user can favorite an idea more than once --> This will not happen untill the frontend lets. ( can be taken care in frontend ).

While making request to all the favories of all the users in the service , this may over-load the database if the users & ideas are huge. ( consider like a million)

--> This can be taken care by increasng the power of machine running the Database.

--> Limit the number of users & ideas comming from the request. ( Hard to get all the favories of all the users in the service )
