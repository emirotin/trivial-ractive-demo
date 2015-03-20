var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  express = require('express'),
  router = express.Router();

TodoSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

var Todo = mongoose.model('Meal', TodoSchema);

module.exports = router;

router.route('/')

.get(function (req, res) {
  Todo.find({}, function(err, todos) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(todos);
    }
  });
})

.post(function (req, res) {
  Todo.create(req.body, function(err, todo) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(todo);
    }
  });
});

router.param('id', function(req, res, next, id) {
  Todo.findById(id, function(err, todo) {
    if (err) {
      res.status(500).send(err);
    } else {
      req.todo = todo;
      next();
    }
  });
});

router.route('/:id')

.get(function (req, res) {
  res.json(req.todo);
})

.patch(function (req, res) {
  req.todo.update({ $set: req.body }, function(err) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({});
    }
  });
})
