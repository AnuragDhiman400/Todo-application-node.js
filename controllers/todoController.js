//Dummy Data
//var data = [{ item: 'Do this project' }, { item: 'walk' }, { item: 'make coffee' }];

var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//Connect to the database
//In the database string password is: test@2020 but need to replace @ by %40 because mongo DB is not able to understand this pass
mongoose.connect('mongodb://test:test%402020@ds161162.mlab.com:61162/todo', {
    useNewUrlParser: true
});

//Create a schema -this is like a blueprint 
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);
// var itemOne = Todo({ item: 'buy flowers' }).save(function(err) {
//     if (err) throw err;
//     console.log('item saved');
// });

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {
    app.get('/todo', function(req, res) {
        //get data from mongodb and pass it to view
        Todo.find({}, function(err, data) {
            if (err) throw err;
            res.render('todo', { todos: data });
        });
        //   /  res.render('todo', { todos: data });

    });

    app.post('/todo', urlencodedParser, function(req, res) {
        //get data from the view and add it to the mongodb
        var newTodo = Todo(req.body).save(function(err, data) {
                if (err) throw err;
                res.json(data);
            })
            //  data.push(req.body);
            //  res.json(data);

    });

    app.delete('/todo/:item', function(req, res) {
        //delete the requested item from mongoDb
        Todo.find({ item: req.params.item.replace(/\-/g, " ") }).remove(function(err, data) {
            if (err) throw err;
            res.json(data);
        });
        // data = data.filter(function(todo) {

        //     return todo.item.replace(/ /g, '-') !== req.params.item;
        // });
    });

}