const express = require('express'),
    path = require('path'),
    Session = require('express-session'),
    bodyParse = require('body-parser'),
    passport = require('./auth/passport'),
    mongoose = require('mongoose'),
    middleware = require('connect-ensure-login'),
    FileStore = require('session-file-store')(Session),
    config = require('./config/default'),
    flash = require('connect-flash'),
    port = config.server.port,
    app = express(),
    node_media_server = require('./media_server'),
    thumbnail_generator = require('./cron/thumbnails');


mongoose.connect('mongodb://127.0.0.1/nodeStream',{useUnifiedTopology: true,
useNewUrlParser:true});


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'./views'));
app.use(express.static('public'));
app.use('/thumbnails', express.static('server/thumbnails'));
app.use(require('cookie-parser')());

/*
pm2 및 nodemon으로 돌릴경우
Fistore Session Json 파일이 수정 및 재생성 되므로
서버가 재실행됨. 그러므로

package.json에 
,"nodemonConfig": {
    "ignore": ["./server/sessions"]
},
을 삽입
*/
app.use(Session({
    store: new FileStore({
        path : 'server/sessions'
    }),
    secret: config.server.secret,
    maxAge : Date().now + (60 * 1000 * 30),
    resave : true,
    saveUninitialized : false,
}));
app.use(bodyParse.urlencoded({extended:true}));
app.use(bodyParse.json({extended:true}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


app.use('/login',require('./routes/login'));
app.use('/register',require('./routes/register'));
app.use('/settings', require('./routes/settings'));
app.use('/streams',require('./routes/streams'));
app.use('/user', require('./routes/user'));


app.get('/logout', (req, res) => {
    req.logout();
    return res.redirect('/login');
});


app.get('*',middleware.ensureLoggedIn(),(req,res)=>{
    res.render('index');
})

app.listen(port,()=>console.log(`App listening on ${port}!`))
node_media_server.run();
thumbnail_generator.start();