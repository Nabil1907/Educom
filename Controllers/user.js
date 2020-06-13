const User = require('../models/users'); 

const { validationResult } = require('express-validator/check'); 

const crypto = require('crypto');

const bcrypt = require('bcryptjs')

const nodemailer = require('nodemailer');

const sendMailer = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(sendMailer({
    auth : { 
     api_key:'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'
     }
 }));

exports.postregister = (req,res,next)=>{

    username   = req.body.username;
    password   = req.body.password;
    repeatPassword   = req.body.repeatPassword;
    email      = req.body.email;

    errors = validationResult(req);
        // console.log( errors.array()[0].msg);
    if(!errors.isEmpty()){
        return res.status(422).render('pages/register',{
            errorMessage: errors.array().msg,
            oldInput:{
                email :email ,
                password : password,
                username: username,
                repeatpassword : repeatPassword
            }
        });
    }
    return bcrypt.hash(password,12)
    .then(hashedPass=>{
        const user = new User({
            password : hashedPass,
            email : email,
            username :username
        });
        return user.save();
    }).then(result=>{
        res.redirect('/login');
        return transporter.sendMail({
            to:username,
            from:'snabil084@gmail.com',
            subject:'SignUp Succeeded',
            html:'<h1> You Successfully sign up !</h1>'
        }).catch(err=>{
            console.log(err)
        })
    })
    .catch(err=>{
        console.log(err);
    })


}

exports.postlogin = (req,res,next)=>{
    email = req.body.email ; 
    password = req.body.password; 

    User.findOne({email:email})
    .then((user)=>{
        if(!user){
            console.log("Not Foumd User ! "); 
        }else{
            if(user.password === password){
                res.redirect('/')
            }
        }
    })
}

exports.getIndex = (req,res,next)=>{
    res.render('pages/index.html');
}

exports.getIndexTwo = (req,res,next)=>{
    res.render('pages/index-2.html');
}

exports.getAboutAs = (req,res,sent)=>{
    res.render('pages/about-us.html');
}

exports.getContact = (req,res,next)=>{
    res.render('pages/contact.html');
}

exports.getGallery = (req,res,next)=>{
    res.render('pages/gallery.html');
}

exports.getlogin = (req,res,next)=>{
    res.render('pages/login.html');
}

exports.getregister = (req,res,next)=>{
    res.render('pages/register.html',{
        errorMessage:"",
        oldInput:{
            email :'' ,
            password : '',
            username: '',
            repeatpassword : ''
        }

    });
}

exports.get404 = (req,res,next)=>{
    res.render('pages/404.html');
}

exports.getCourseGrid = (req,res,next)=>{
    res.render('courses/courses-grid.html');
}

exports.getCourseCarousel = (req,res,next)=>{
    res.render('courses/courses-carousel.html');
}

exports.getCourseDetails = (req,res,next)=>{
    res.render('courses/course-details.html');
}

exports.getAdvisorGrid = (req,res,next)=>{
    res.render('teachers/advisor-grid.html');
}

exports.getAdvisorCarousel = (req,res,next)=>{
    res.render('teachers/advisor-carousel.html');
}

exports.getAdvisorDetails = (req,res,next)=>{
    res.render('teachers/advisor-details.html');
}

exports.getEventOne = (req,res,next)=>{
    res.render('events/event-1.html');
}

exports.getEventTwo = (req,res,next)=>{
    res.render('events/event-1.html');
}


