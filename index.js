const express = require("express");
const app = express();
const passport = require("passport");
const session = require("express-session");
const MongoStore = new require("connect-mongo");
const expressLayouts = require("express-ejs-layouts");
const passportLocal = require("./config/passport.js");
const db = require("./config/db");
const PORT = 3300;


 app.use(express.urlencoded({extended: true}));

 app.use(express.static('./assets'));
 
 app.use(expressLayouts);

 app.set('layout extractStyles', true);
 app.set('layout extractScripts', true);
 
 app.set("view engine", "ejs");
 app.set("views", "./views");
 
 app.use(session({
    name: 'CheckMent',
    secret: 'somesecret',
    saveUninitialized: false,
    resave: false,
    cookie: {
       maxAge: (1000 * 60 * 100)
    }, 
    store: MongoStore.create({
       mongoUrl: 'mongodb://localhost/CheckMent_development',
       autoRemove: 'disable'
    })
 }))
 
 app.use(passport.initialize());
 app.use(passport.session());
 app.use(passport.setAuthenticatedUser);
 app.use("/", require("./routes/index"));
 




app.listen(PORT, () => {
    console.log(`server is up and running on port: ${PORT}`);
})
