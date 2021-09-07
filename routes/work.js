
var express = require('express');
var router = express.Router();


// 獨立不同的js檔案 還是要引入一次 連結資料庫 只需這兩句就可以 金鑰那些不用
var admin = require("firebase-admin");
var fireData = admin.database();


router.get('/info2', function (req, res) {

    // 撈出資料庫 渲染到網頁上
    fireData.ref('todos').once('value', function (snapshot) {
        var data = snapshot.val();
        // 鏡像內容
        var title = data.title;
        // 鏡像內容裡的title
        res.render('info2', { "title2": title });
        // 這邊title2 是連結 info2.ejs 的 <h1><%= title2 %></h1>
    });

});


router.get('/inputadd', function (req, res) {

    // 撈出資料庫 渲染到網頁上
    fireData.ref('todos').once('value', function (snapshot) {
        var data = snapshot.val();
        // 鏡像內容

        res.render('inputadd', { "todolist": data });
       
    });

});


// 新增邏輯
router.post('/addTodo', function (req, res) {
    var content = req.body.content;
    // req.body 全部資料   content 其中一個key

    var contentRef = fireData.ref('todos').push();
    // 準備新增資料 指定到哪個路徑 push資料

    contentRef.set({ "content": content }).then(function () {
        fireData.ref('todos').once('value', function (snapshot) {
            res.send(
                {
                    "success": true,
                    "result": snapshot.val(),
                    "msg": "資料讀取成功"
                }
            )
        })
    })
})


// 刪除邏輯
router.post('/removeTodo', function (req, res) {
    var _id = req.body.id;
    // req.body 全部資料   id 其中一個key


    fireData.ref('todos').child(_id).remove().then(function () {
        fireData.ref('todos').once('value', function (snapshot) {
            res.send(
                {
                    "success": true,
                    "result": snapshot.val(),
                    "msg": "資料刪除成功"
                }
            )
        })
    })
})







router.get('/chpw', function (req, res) {
    res.send('chpw');
});



module.exports = router;

