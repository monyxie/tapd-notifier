const axios = require('axios').default;
const fs = require('fs');
const path = require('path');

let cookies = fs.readFileSync(path.join(__dirname, 'cookies.txt')).toString();

module.exports.getTodos = function getTodos() {
    return axios.get("https://www.tapd.cn/worktable_ajax/get_top_nav_worktable_data", {
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
        .then(response => response.data);
}
