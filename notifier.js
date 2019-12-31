const notifier = require('node-notifier');
const axios = require('axios').default;
const fs = require('fs');
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
let cookies = fs.readFileSync(path.join(__dirname, 'cookies.txt')).toString();
let icon = path.join(__dirname, 'tapd.png');
let notifyCount = 0;

let checkTodos = function () {
    axios.get("https://www.tapd.cn/worktable_ajax/get_top_nav_worktable_data", {
        "params": {
            t: Math.random()
        },
        "headers": {
            "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:71.0) Gecko/20100101 Firefox/71.0",
            "Accept": "application/json, text/javascript, */*; q=0.01",
            "Accept-Language": "en-US,en;q=0.5",
            "X-Requested-With": "XMLHttpRequest",
            "Pragma": "no-cache",
            "Cache-Control": "no-cache",
            "Cookie": cookies,
        },
        "referrer": "https://www.tapd.cn/letters/?from=top_nav_worktable_v2",
        "method": "GET",
        "mode": "cors"
    })
        .then(function (response) {
            let current = response.data;
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
