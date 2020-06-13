const user = require('../Controllers/user'); 

const User = require('../models/users');

const express = require('express');

const {check , body } = require('express-validator/check'); 


const routers = express.Router();

routers.get('/',user.getIndex);

routers.get('/homeVersionTwo',user.getIndexTwo);

routers.get('/about',user.getAboutAs); 

routers.get('/contact',user.getContact);

routers.get('/gallery',user.getGallery);

// -- Auth 

routers.get('/login',user.getlogin);

routers.post('/login',user.postlogin);


routers.get('/register',user.getregister);

routers.post('/register',[  check('email').
isEmail().
withMessage('Please Enter invalid Email !').
custom((value,{req})=>{
    return User.findOne({email:value})
    .then((userDoc)=> {
        if(userDoc){
            return Promise.reject(
                'E-Mail exists already, please pick a different one.'
              );
        }

    })
})
,
check('username').
notEmpty().
withMessage('Please Enter Your UserName ')
,
body('password','Please Enter A pass at Least 6 charc with only number and test .. ')
.isLength({min:6})
.isAlphanumeric(),
body('repeatPassword').custom((value,{req})=>{
    if(value !== req.body.password ){
        throw new Error('Two Password Not Indentical !')
    }
    return true 
})
],user.postregister);

routers.get('/404',user.get404);

routers.get('/coursesGrid',user.getCourseGrid);

routers.get('/coursesCarousel',user.getCourseCarousel);

routers.get('/courseDetails',user.getCourseDetails);

routers.get('/advisorCarousel',user.getAdvisorCarousel);

routers.get('/advisorGrid',user.getAdvisorGrid);

routers.get('/advisorDetails',user.getAdvisorDetails);

routers.get('/event1',user.getEventOne);

routers.get('/event2',user.getEventTwo);






module.exports = routers;