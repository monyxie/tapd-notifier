const getTodos = require("./get-todos").getTodos;

const notifier = require('node-notifier');
const path = require('path');

let todo = {
    todo_story: 0,
    todo_task: 0,
    todo_bug: 0,
    todo_launch: 0,
    todo_tobject: 0,
    todo_item: 0,
    todo_total: 0
};

let todoNames = ['story', 'task', 'bug', 'launch', 'tobject', 'item'];
let icon = path.join(__dirname, 'tapd.png');
let notifyCount = 0;

let checkTodos = function () {
    getTodos().then(function (current) {
            let changed = [];
            todoNames.forEach(name => {
                let field = 'todo_' + name;
                if (current[field] !== todo[field]) {
                    let num = current[field] - todo[field];
                    if (num > 0) num = '+' + num;

                    changed.push(`${num} ${name}`);
                    todo[field] = current[field];
                }
            });
            if (changed.length) {
                let todos = "    " + changed.join("\n    ");
                let message = "You have \n\n" + todos;
                message += '\n';
                message += `\nTodo count: ${current['todo_total']}`;
                message += '\nTime: ' + (new Date()).toLocaleTimeString();
                notifier.notify({
                    title: 'TAPD Notifier',
                    message: message,
                    icon: icon,
                    wait: true,
                    time: notifyCount ? 1000 * 3600 * 24 : 1000 * 5,
                });
            }
        })
        .catch(function (err) {
            notifier.notify({
                title: 'TAPD Notifier',
                message: "" + err,
                icon: icon,
            })
        });
};

checkTodos();
setInterval(checkTodos, 60000);
