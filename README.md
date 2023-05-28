# Backend-Url-Server

### A Thinkful Assignment

A backend application for posting and retrieving URLs.

Keeps track of number of GET requests made to each URL in database.

The following commands are implimented: 

| HTTP verb	| Path	| Description |
|---|---|---|
| GET	| /urls |	Retrieve a list of all short URLs
| POST | /urls |	Create a new short URL
| GET	| /urls/:urlId |	Retrieve a short URL by ID
| PUT	| /urls/:urlId |	Update a short URL by ID
| GET	| /urls/:urlId/uses |	Retrieve a list of use metrics for a given short URL ID
| GET |	/urls/:urlId/uses/:useId	| Retrieve a use metric by ID for a given short URL ID
| GET |	/uses |	Retrieve a list of all use metrics
| GET	| /uses/:useId |	Retrieve a use metric by ID
| DELETE |	/uses/:useId |	Delete a use metric by ID

All POST and PUT requests are expected to have the following shape:
```{ "data": { "href": "www.exampleurl.com" } }```

## Implimentation

This site is built on the framework provided by Thinkful. 

Build with Express and Express Routing.

No database is used. All data is saved in-memory, meaning any changes are erased when server closes

## Installation

1. Fork and Clone Repository
2. Open terminal at local repo
3. run ```npm install``` and ```npm start```
