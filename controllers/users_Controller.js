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
    //TODO Later
}


module.exports.createSession = function(req,res){
    //TODO Later
}