var SERVER_HOST = "192.168.16.200:8000";
// ifconfig | grep inet
var socket;

function init() {
    socket = io.connect(SERVER_HOST);
    socket.emit("extension", null);
    socket.on("music", function (data) {
        command(data);
    });
}

function command(action) {
    chrome.tabs.query({title:"*Google Play"}, function(tabs) {
        if (tabs && tabs.length > 0) {
            control("google", tabs[0].id, action);
        }
    });
    chrome.tabs.query({title:"Amazon Cloud Player"}, function(tabs) {
        if (tabs && tabs.length > 0) {
            control("amazon", tabs[0].id, action);
        }
    });
    chrome.tabs.query({title:"Pandora Internet Radio*"}, function(tabs) {
        if (tabs && tabs.length > 0) {
            control("pandora", tabs[0].id, action);
        }
    });
    chrome.tabs.query({title:"*YouTube"}, function(tabs) {
        if (tabs && tabs.length > 0) {
            control("youtube", tabs[0].id, action);
        }
    });
}

function control(player, tabId, action) {
    var file;
    if (action === "play") {
        file = "playPause.js";
    } else if (action === "next") {
        file = "next.js";
    } else if (action === "previous") {
        file = "previous.js";
    }
    file = "scripts/" + player + "_" + file;
    chrome.tabs.executeScript(tabId, {file:file});
}

window.onload = init;