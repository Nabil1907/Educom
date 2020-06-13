const mongoose = require('mongoose') ; 

const schema = mongoose.Schema; 

const userSchema = new schema({
    password:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    username:{
        type:String,
        require:true,
    }
});

module.exports = mongoose.model('User',userSchema);