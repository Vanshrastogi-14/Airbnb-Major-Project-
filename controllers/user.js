const User = require("../models/user.js");

module.exports.signupForm = (req, res) => {
    res.render("users/signup.ejs");
}

module.exports.signUp = async (req,res,next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser,(e)=>{
            if(e){
                return next();
            }
            req.flash("success", "Welcome to Wanderlust!!");
            res.redirect("/listings");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}

module.exports.loginForm = (req, res) => {
    res.render("users/login.ejs");
}

module.exports.loginAuth = async (req, res) => {
    req.flash("success", "Welcome back to Wanderlust!!");
    let redirectURl = res.locals.redirectURL || "/listings";
    res.redirect(redirectURl);
}

module.exports.logOut =(req, res, next) => {
    req.logOut((e) => {
        if (e) {
            return next(e);
        }
        req.flash("success","you logged out successfully!!");
        res.redirect("/listings");
    });
}