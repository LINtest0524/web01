
var send = document.getElementById('send');
var content = document.getElementById('content');
var list = document.getElementById('list');

send.addEventListener('click', function(e){
    var str = content.value;
    console.log(str);

    var xhr = new XMLHttpRequest();

    xhr.open('post', "/work/addTodo");
    xhr.setRequestHeader('Content-type',"application/json");
    var todo = JSON.stringify({"content": str});
    xhr.send(todo);
    xhr.onload = function() {
        var originData = JSON.parse(xhr.responseText) ;
        // console.log(originData);
        if(originData.success == false){
            alert(originData.msg);
            return;
        }
        var data = originData.result;
        var str = '';
        for( item in data){
            str += '<li>'+data[item].content+'<input type="button" data-id="'+item+'" value="刪除" /></li>'
        }
        list.innerHTML = str;

    }
})


// 刪除
list.addEventListener('click', function(e){
    if(e.target.nodeName !== 'INPUT'){
        return;
    }
    var id = e.target.dataset.id;
    var xhr = new XMLHttpRequest();
    xhr.open('post','/work/removeTodo');
    xhr.setRequestHeader('Content-type',"application/json");
    var removeTodo = JSON.stringify({"id": id});
    xhr.send(removeTodo);
    xhr.onload = function(){
        var originData = JSON.parse(xhr.responseText);
        var data = originData.result;
        var str = '';
        for(item in data){
            str += '<li>'+data[item].content+'<input type="button" data-id="'+item+'" value="刪除" /></li>'
        }
        list.innerHTML = str;
    }

})














