require('dotenv').config();
const express = require("express");
const path = require("path");
const jobAppController = require('./controllers/jobAppController');

const app = express();
const { PORT } = process.env;

// parsers
// app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve static files
app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.static(path.resolve(__dirname, "../dist")));

// home / landing page
app.get("/", (req, res) => {
  return res.sendFile(path.resolve(__dirname, "../public/index.html"));
});

// USER MANAGEMENT ------------

// I don't think we need a GET to '/signup' ?
// it seems this could be handled with React Router
// i.e., no data is needed

// POST /signup
// REQ.body:  username, password (bcrypt)
// on success, RES: new User's record as object
// on fail for user already exists, RES:  null (other failures, too short or no uname or pword, handled by frontend)
app.post(
  '/signup',
  /* <some middleware */
  (req, res) => res.status(200).json(res.locals.user)
);

// login / authenticate using oAuth
// REQ.body:  username, password (bcrypt)
// on successful login, RES:  array of all of that user's applications
// on failed loging, RES: null
app.get(
  '/login',
  /* <some middleware> */
  (req, res) => {
    res.status(200).json(res.locals.user);
  }
);

// IS LOGOUT ROUTE EVEN NECESSARY?? CAN SIMPLY UPDATE STATE ON FRONTEND
// WHAT DOES BACKEND NEED TO DO? AND WHAT SHOULD RESPONSE BE??
// logout
// RES: redirect to home page
app.get(
  '/logout',
  /* <some middleware> */
  (req, res) => {
    // res.redirect('/');
    res.send(200).json(res.locals.isLoggedIn);
  }
);

// MAIN APP / JOB APPLICATION MANAGEMENT ------------
app.get(
  "/dashboard",
  /* <some middleware> */
  (req, res) => {
    res.status(200).json(res.locals.allJobApps);
  }
);

// once in, routes for:
// add a new application
// POST
// req.body:  { JSON object }
// update the database
// upon success, RES: the JSON object from dBase (including _id) to the frontend
// upon failure, RES: null to frontend
app.post(
  '/dashboard',
  /* <some middleware> */
  (req, res) => {
    res.status(200).json(res.locals.jobApp);
  }
);

// delete an application
// DELETE
// req.params (_id)
// update the database
// upon success, RES: application id for success
// upon failure, RES: null for failure
app.delete(
  '/:jobAppId',
  /* <some middlware> */
  (req, res) => {
    res.status(200).json(res.locals.deletedJobAppId); // null if error
  }
);

// update an application
// PUT
// req.params(_id)
// req.body:  JSON object consisting of CHANGED data
// update the database
// upon success, RES: updated JSON object from dBase
// upon failure, RES: null
app.put(
  '/:jobAppId',
  /* <some middleware> */
  (req, res) => {
    res.status(200).json(res.locals.jobApp);
  }
);

// default route
app.use((req, res) => res.status(404).send('page not found'));

// error route
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// server listener
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
