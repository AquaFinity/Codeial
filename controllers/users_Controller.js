const User = require('../models/user');
module.exports.profile = function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{
            title: "Users",
            profile_user: user
        });
    });
};

module.exports.update = async function(req,res){
    //check so that any user exept the authorized user can fill the form
    if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('******Multer Error: ',err);
                }
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){
                    //this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });
        }catch(err){
            req.flash('error','Unauthorized');
            return res.status(401).send("Unauthorized");
        }
    }
    else{
        req.flash('error',"Unauthorized");
        return res.status(401).send("Unauthorized");
    }
}
//Render the sign up page
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title: "Codial | Sign Up"
    });
};

//Render the sign in page
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        res.redirect('/users/profile');
    }
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
    req.flash('success','Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout();
    req.flash('success','You Have logged Out');
    return res.redirect('/');
}