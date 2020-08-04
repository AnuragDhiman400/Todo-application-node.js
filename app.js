var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

//set up template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

//fire  controllers
todoController(app);

app.get('/', function(req, res) {

    res.send('This is your first app');
    console.log(req.url);
});



//listen to port
app.listen(process.env.PORT || 4000);
console.log('You are listening to port 4000');