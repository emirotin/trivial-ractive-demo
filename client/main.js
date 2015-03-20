(function (Ractive, qwest) {
  var app = new Ractive({
    el: "#ui-root",
    template: "#tpl-main",
    data: {
      todos: null
    }
  });

  var todos;

  qwest.get('/api')
  .then(function (todos_) {
    todos = JSON.parse(todos_);
    app.set('todos', todos);
  });

}(window.Ractive, qwest));
