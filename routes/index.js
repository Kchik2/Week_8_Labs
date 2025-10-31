//Importing express library and router Object
const express = require('express')
//imports message_sorting.js
const messageSorter = require('../services/message_sorting')

const router = express.Router() //Figures out what code to run in response to a request.
//Typically based on the URL and the method, GET, POST, etc...

//Req = request, res = response, next = if page cant handle the request, next tells which page can deal with it
//Response to get request to home page /
router.get('/', function (req, res, next) {
    //name of handlebars file - name of the template, optional, give object with data for the template
    res.render('index', {
        title: 'Feedback application',
        author: 'Manuel Garcia',
        currentLoadedDate: new Date()
    })
}) //Get request to the home page

//Generates a get request-response for the student_feedback_form with path /feedback-form
router.get('/feedback-form', function (req, res, next) {
    res.render('student_feedback_form')
})

//Generates a post request-response for the students_feedback_form form with path /submit-feedback
router.post('/submit-feedback', function (req, res, next) {
    // access form data
    const formData = req.body //Retrieve information on post request.
    console.log(formData)

    let message = formData.comments
    messageSorter(message).then(departmentList => {
        //Render is inside promise response to be able to include llm response as well.
        //As a promise, I need to return what I want to do. In this case, render.

        //If llm return an empty list it means that it did not find a good fit. Therefore,
        //create a new array with just one item.

        if(departmentList.length === 0){
            departmentList = ['General College Feedback']
        }

        return res.render('thank_you', {
            name: formData.user_name,
            email: formData.user_email,
            comments: formData.comments,
            current_student: formData.current_student,
            departmentList: departmentList
        })
    })
})


//Send back the router Object to whenever is required. In this case server.js is like a return but not.
module.exports = router //This line needs to be the very last one!
