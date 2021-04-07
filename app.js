const mongoose = require('mongoose');
const express = require('express');
const Summative = require('./models/summative');
const path = require('path');
const request = require('request');
const { deepStrictEqual } = require('assert');



// express app
const app = express();
app.locals.date;
app.locals.nationality;
app.locals.detect;


// connect to MongoDB
const dbURI = 'mongodb+srv://RalphEmperado:August291999@summative.j2k8h.mongodb.net/Summative';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((result) => app.listen(3000))
        .catch((err) => console.log(err));


// middleware & static files
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'logo')))
app.set('view engine', 'ejs');

//app.use(express.static('public'));
//app.use(morgan'dev'));
// register view engine

// mongoose and mongo sandbox routes
app.get('/', (req,res) => {
    res.redirect('/index');
});

function timeanddate(objects)
    {
        var timeFormat = 
        {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
            timeZone: objects["timezone"]
        }

        var dateFormat = 
        {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: objects["timezone"]
        }

        var datetime = new Date(objects["datetime"])
        
        var date = new Intl.DateTimeFormat('en-US', dateFormat).format(datetime)
        var time = new Intl.DateTimeFormat('en-US', timeFormat).format(datetime)

        return [time, date];

    }



// get index
app.get('/index', (req, res) => {
    Summative.find()
        .then((result) => {
            res.render('index')

        })
})


// post list
app.post('/view/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
})


// new person routes
app.get('/new', (req, res) => {

    if (detect.Area == "America/New_York"){
        nationality = 'American';
    }
    else if (detect.Area == "Australia/Sydney") {
        nationality = 'Australian';
    }
    else if (detect.Area == "Asia/Manila") {
        nationality = 'Filipino';
    }
    else if (detect.Area == "Europe/Belgrade") {
        nationality = 'Serbian';
    }
    else if (detect.Area == "Pacific/Guam") {
        nationality = 'Chamorro';
    }
    res.render('new',{
        nationality:nationality
    })
});


// view person
app.get('/view', (req, res) => {
    res.render('view')
})

//post request
app.post('/list', (req, res) => {
    const list = new Summative(req.body);
    console.log(req.body);

    list.save()
        .then((result) =>{
            res.redirect('/list');
        })
        .catch((err) => {
            console.log(err);
        })
})

function splitStr(str){
    var string = str.split('/')[1];
    return string;
}

app.post('/detect', (req, res) => {
    detect = req.body
    console.log(detect)
    res.redirect('list')
});


// Worldtime
app.get('/list', (req, res) => {
    request('http://worldtimeapi.org/api/timezone/'+detect.Area, function(error, response, body) {
        const info = JSON.parse(body)
        img = splitStr(detect.Area)
        information = timeanddate(info)
        Summative.find()
            .then((result) => {
                res.render('list', {title: 'Data List', time: information[0], date: information[1], image: img, people: result})
            })
            .catch((err) => {
                console.log(err);
            })
    })
    console.log(detect.Area)
});
