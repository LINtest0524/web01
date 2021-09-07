var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

// csrf 防跨站攻擊 引入2隻， csrfProtection 加在有表單的路由
var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });

require('dotenv').config();



// csrfProtection 這句加在有表單的地方 防攻擊
router.get('/',csrfProtection, function(req, res) {
    //  { csrfToken: req.csrfToken() } 當作csrf的辨識碼 會隨機產生亂碼key
    res.render('contact', { 
        csrfToken: req.csrfToken(),
        errors: req.flash('errors')
     });

});
router.get('/review', function(req, res) {
    res.render('contactReview');
});
// csrfProtection 這句加在有表單的地方 防攻擊
router.post('/post',csrfProtection, function(req, res) {

    // 偵測內容是否為空
    if(req.body.username == ''){
        req.flash('errors','姓名不可為空');
        res.redirect('/contact');
    }
    if(req.body.email == ''){
        req.flash('errors','信箱不可為空');
        res.redirect('/contact');
    }

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            type: "OAuth2",
            user: process.env.ACCOUNT,
            clientId: process.env.CLINENTID,
            clientSecret: process.env.CLINENTSECRET,
            refreshToken: process.env.REFRESHTOKEN,
            accessToken: process.env.ACCESSTOKEN
        }
    });



    var mailOptions = {
        from: '"七角學院"<service@hexschool.com>',
        to: 'nogiginode@gmail.com',
        subject: req.body.username + '寄了一封信',
        text: req.body.description
    }
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        res.redirect('review');
    })
});
module.exports = router;
