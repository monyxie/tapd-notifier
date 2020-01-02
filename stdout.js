const getTodos = require("./get-todos").getTodos;

let todoNames = ['story', 'task', 'bug', 'launch', 'tobject', 'item'];

let spinner = 'abcdefghijklmnopqrstuvwxyz';
let checkTodos = function () {
    getTodos().then(function (current) {
        let changed = [];
        todoNames.forEach(name => {
            let field = 'todo_' + name;
            if (current[field] !== 0) {
                changed.push(`${name}=${current[field]}`);
            }
        });

        let msg = 'No todos';
        if (changed.length) {
            msg = changed.join(', ');
        }
        let spin = spinner.charAt(Math.floor(Math.random() * spinner.length));
        console.log('TAPD: ' + msg + ' ' + spin);
    })
        .catch(function (err) {
            console.log("TAPD: " + err);
        });
};

checkTodos();
