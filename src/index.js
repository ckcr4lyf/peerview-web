const axios = require('axios');

const API_BASE = "https://peerview.saxrag.com/v1/";

insertArrayEls = (theArray) => {
    const div = document.getElementById("ips");
    div.innerHTML = "";

    theArray.forEach(ip => {
        let span = document.createElement("span");
        span.innerText = ip;
        span.className = "ip";
        div.appendChild(span);
    })
}

const getPeers = () => {
    const div = document.getElementById("ips");
    div.innerHTML = "";
    const hash = document.getElementById('hash').value;
    const re = /[0-9A-Fa-f]{40}/
    let span = document.getElementById('status');
    span.innerText = "";

    if (!re.test(hash)){
        span.innerText = "Bad hash"
        return;
    }

    axios({
        url: API_BASE + hash
    }).then(response => {
        console.log(response.status);
        let ips = response.data.split('\n');
        console.log(ips);
        insertArrayEls(ips);
    }).catch(error => {
        let code = "";
        if (error.response){
            code = error.response.status;
        }
        span.innerText = "Error. Code: " + code;
    })
}

window.getPeers = getPeers;