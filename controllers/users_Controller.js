const User = require('../models/user');
module.exports.profile = function(req,res){
    return res.render('users',{
        title: "Users"
    });
};
//Render the sign up page
module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title: "Codial | Sign Up"
    });
};

//Render the sign in page
module.exports.signIn = function(req,res){
    return res.render('user_sign_in',{
        title: "Codial | Sign In"
    })
}

//get the sign up data
module.exports.create = function(req,res){
    if(req.body.password!= req.body.confirm_password){
        res.redirect('back');
    }

    User.findOne({email: req.body.email},function(err,user){
        if(err){
            console.log('Error in finding user in signing Up');
            return;
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('Error in creating user while signing Up');
                    return;
                }
                return res.redirect('/users/sign-in');
            });
        }
        else{
            return res.redirect('back');
        }
    });
}


module.exports.createSession = function(req,res){
    return res.redirect('/');
}