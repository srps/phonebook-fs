# phonebook-fs
 Phonebook app - Full stack

 ## Available Scripts

In the project directory, you can run:

### `npm start`

Runs an [Express](https://expressjs.com/) based Node.js server in the development mode\
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

### `npm dev`

Runs an [Express](https://expressjs.com/) based Node.js server using nodemon for development purposes\
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.


#### Endpoints

The server responds on the following endpoints:
##### `/info`

Static webpage

##### `/api/persons`

CRUD-like RESTful API with the following operations available:

###### GET `/api/persons`

Serves the list of persons in JSON format
###### POST `/api/persons`

###### GET `/api/persons/:id`

Serves the person with ID :id in JSON format if it exists.
If no person with the given ID is found, responds with 404 not found

###### DELETE `/api/persons/:id`

Removes the person with ID :id from the Phonebook
