require("dotenv").config();
const express = require("express");
const path = require("path");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const {
  getAllJobApps,
  addJobApp,
  deleteJobApp,
  updateJobApp,
} = require("./controllers/jobAppController");
const {
  addUser,
  verifyUser,
  setCookie,
  verifyCookie,
} = require("./controllers/userController");

const { PORT, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
const app = express();

// parsers
// app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve static files
// app.use(express.static(path.resolve(__dirname, "../public")));
app.use('/dist', express.static(path.resolve(__dirname, "../dist")));

// google OAuth
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/dashboard",
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOrCreate({ googleId: profile.id }, (err, user) => {
        return done(err, user);
      });
    }
  )
);

// home / landing page
app.get("/", (req, res) => {
  return res.sendFile(path.resolve(__dirname, "../public/index.html"));
});

// USER MANAGEMENT ------------

// app.get('/login', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));
app.get('/login', passport.authenticate('google'));

// I don't think we need a GET to '/signup' ?
// it seems this could be handled with React Router
// i.e., no data is needed

// POST /signup
// REQ.body:  username, password (bcrypt)
// on success, RES: new User's record as object
// on fail for user already exists, RES:  null (other failures, too short or no uname or pword, handled by frontend)
// app.post(
//   "/signup",
//   /* <some middleware */
//   (req, res) => res.status(200).json(res.locals.user)
// );

// login / authenticate using oAuth
// REQ.body:  username, password (bcrypt)
// on successful login, RES:  array of all of that user's applications
// on failed loging, RES: null
// app.get(
//   "/login",
//   /* <some middleware> */
//   (req, res) => {
//     res.status(200).json(res.locals.user);
//   }
// );

// app.post("/login", /* middleware */ (req, res) => res.status(200));

// IS LOGOUT ROUTE EVEN NECESSARY?? CAN SIMPLY UPDATE STATE ON FRONTEND
// WHAT DOES BACKEND NEED TO DO? AND WHAT SHOULD RESPONSE BE??
// logout
// RES: redirect to home page
// app.get(
//   "/logout",
//   /* <some middleware> */
//   (req, res) => {
//     // res.redirect('/');
//     res.send(200).json(res.locals.isLoggedIn);
//   }
// );

// MAIN APP / JOB APPLICATION MANAGEMENT ------------
/**
 * RESPONDS with array of job application json objects
 */
app.get("/dashboard", getAllJobApps, (req, res) =>
  res.status(200).json(res.locals.allJobApps)
);

/**
 * RESPONDS with new job application json object
 */
app.post("/dashboard", addJobApp, (req, res) =>
  res.status(200).json(res.locals.newJobApp)
);

/**
 * RESPONDS with _id of the deleted job application (null if nothing to delete)
 */
app.delete("/:jobAppId", deleteJobApp, (req, res) =>
  res.status(200).json(res.locals.deletedJobAppId)
);

// RESPONDS with updated record
app.put("/:jobAppId", updateJobApp, (req, res) =>
  res.status(200).json(res.locals.updatedJobApp)
);

// default route
app.use((req, res) => res.status(404).send("page not found"));

// error route
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// server listener
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
