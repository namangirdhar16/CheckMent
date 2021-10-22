
const User = require("../models/user");

const user = async (req, res) => {
    try {
       const user = await User.findById(req.params.id);
       return res.render("user", {
        title: "User profile", 
        profile_user: user
       })
    }
    catch(err) {
       return console.error(err);
    }
}

const signUp = (req, res) => {
    if(req.isAuthenticated()) {
        return res.redirect("/");
    }

    return res.render("signUp", {
        title: "ChecKMent| Sign Up"
    });
}
const signIn = (req, res) => {
    if(req.isAuthenticated()) {
        return res.redirect("/");
    }
    return res.render("signIn", {
        title: "CheckMent | Sign In"
    });
}

const create = async (req, res) => {
    if(req.body.password != req.body.confirm_password) {
        return res.redirect("back");
    }
    
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user) {
            await User.create(req.body);
            return res.redirect("/user/sign-in");
        }
        else {
            res.redirect("back");
        }

    }
    catch(err) {
        return console.error(err);
    }
}
const createSession = (req, res) => {
    
     res.redirect("/");
} 
const destroySession = (req, res) => {
  
    req.logout();
    res.redirect("/");
}


module.exports = {
    user , signUp, signIn, create, createSession, destroySession
}