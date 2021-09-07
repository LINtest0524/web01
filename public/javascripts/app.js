var send = document.getElementById('send');
var content = document.getElementById('content');

send.addEventListener('click', function(e) {
    e.preventDefault();

    var str = content.value;
    console.log(str);
    var xhr = new XMLHttpRequest();
    // 開啟一個 xml Request 設定

    xhr.open('post', '/search2');

    // 有兩種格式 一種是 x-www  一種 json
    // xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    
    // var data = 'content=' + str;
    // xhr.send(data);

    xhr.setRequestHeader("Content-type","application/json");

    var datajson = JSON.stringify({"content":str, "list":["app","css","php","js"]});
    xhr.send(datajson);



    xhr.onload = function() {
        console.log(xhr.responseText);
    }
})

    

    

 