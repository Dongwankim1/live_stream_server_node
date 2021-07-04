const express = require('express'),
router = express.Router(),
User = require('../database/Schema').User;


router.get('/info',
require('connect-ensure-login').ensureLoggedIn(),
(req,res)=>{
    console.log('asdasdq');
    if(req.query.streams){
        let streams = JSON.parse(req.query.streams);
        let query = {$or :[]};
        console.log('asdasdq22');
        for(let stream in streams){
            if(!streams.hasOwnProperty(stream)) continue;
            query.$or.push({stream_key:stream});
        }
        console.log('asdasdq11');
        User.find(query,(err,users)=>{
            if(err)
                return;
            if(users){
                res.json(users);
            }
        })
    }
}
)

module.exports = router;