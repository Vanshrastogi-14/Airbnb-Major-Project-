// requirements
if(process.env.NODE_ENV != "production"){
  require('dotenv').config()
}

const express = require("express");
const app = express();
let port = 8080;
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/expressError.js");
const listingRoute = require("./routes/listings.js");
const reviewRoute = require("./routes/reviews.js");
const userRoute = require("./routes/user.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const URL = process.env.ATLASDB_URL;

// session
const store = MongoStore.create({
  mongoUrl:URL,
  crypto:{
    secret:process.env.SECRET,
  },
  touchAfter:24*3600,
});

store.on("error",()=>{
  console.log("ERROR",err);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  saveUninitialized: true,
  resave: false,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  }
};


app.use(session(sessionOptions));
app.use(flash());


// passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// paths
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine("ejs", ejsMate);

// database connection
main()
  .then(() => {
    console.log("Connection successful");
  })
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect(URL);
}

// locals middleware
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// routes middleware
app.use("/listings", listingRoute);
app.use("/listings/:id/reviews", reviewRoute);
app.use("/", userRoute);

// page not found err handler
app.use((req, res, next) => {
  next(new ExpressError(404, "page not found"));
});

// middleware(error handler)
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "some error" } = err;
  res.status(statusCode).render("error.ejs", { message });
});

// connection to localhost
app.listen(port, () => {
  console.log("listening...");
});


// app.get("/",(req,res)=>{
//   res.send("i am root...");
// });