function updateOnlineUsers(locale) {
    var urls = {
        br: "https://origins.habbo.com.br/api/public/origins/users",
        us: "https://origins.habbo.com/api/public/origins/users",
        es: "https://origins.habbo.es/api/public/origins/users",
        dev: null
    };
    function fetchOnlineUsers(callback) {
        var url = urls[locale];
        if(!url) {
            callback("Failed to fetch online users");
            return;
        }
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) { // request finished and response is ready
                if(this.status == 200) {
                    var data = JSON.parse(this.responseText);
                    if(data.onlineUsers) {
                        callback(data.onlineUsers+" members online");
                        return;
                    }
                }
                callback("Failed to fetch online users");
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    }
    function updateOnlineUsers() {
        fetchOnlineUsers(function(onlineMessage) {
            document.getElementById("habboCountUpdateTarget").innerHTML = onlineMessage;
        });
    }

    updateOnlineUsers();
    setInterval(updateOnlineUsers, 60000); // update every minute
}