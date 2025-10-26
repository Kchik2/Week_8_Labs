//Declaring a const to a require function is like importing libraries.
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

//This is like importing files created by me. I use UNIX notation for paths.
const indexRouter = require('./routes/index.js')

const app = express() //Creates the webb app server

// enable parsing POST request body
app.use(bodyParser.urlencoded({ extended: false }))
//Set the views directory to be used as the HTML output folder.
//__dirname is a keyword that brings the current path from any file
//And like server.js is located in the root of our project, we can look for any file
//from here.

app.set('views', path.join(__dirname, 'view'))
app.set('view engine', 'hbs') //Set app view engine as handlebars to generate views HTML

const staticFileLocation = path.join(__dirname, 'public')
app.use(express.static(staticFileLocation))


// '/' is root directory of my project. I tell the app to use index.js as the file who receives the requests
// and generates the response.

app.use('/', indexRouter)
// Start server running once listens to a specific Port or port 3000
const server = app.listen(process.env.PORT || 3000, function(){
    //Prints a message on console showing the server running and showing the specific port.
    console.log('Server is running on port ' + server.address().port)
})

