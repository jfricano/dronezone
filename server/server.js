const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// serve static files
// app.use('/', express.static(path.resolve(__dirname, './public')));
app.use(express.static(path.resolve(__dirname, '../dist')));

app.get('/', (req, res) => {
  return res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

// USER MANAGEMENT ------------
// signup
  // REQ.body:  username, password (bcrypt)
  // on success, RES: array of that user's applications
  // on fail for user already exists, RES:  null (other failures, too short or no uname or pword, handled by frontend)

// login / authenticate using oAuth
  // REQ.body:  username, password (bcrypt)
    // on successful login, RES:  array of all of that user's applications
    // on failed loging, RES: null

// logout
  // RES: redirect to home page

// MAIN APP / JOB APPLICATION MANAGEMENT ------------
// once in, routes for:
  // add a new application
  // POST
    // req.body:  { JSON object }
    // update the database
    // upon success, RES: the JSON object from dBase (including _id) to the frontend
    // upon failure, RES: null to frontend

  // delete an application
  // DELETE
    // req.params (_id)
    // update the database
    // upon success, RES: application id for success
    // upon failure, RES: null for failure

  // update an application
  // PATCH
    // req.params(_id)
    // req.body:  JSON object consisting of CHANGED data
    // update the database
    // upon success, RES:


app.listen(PORT, () => console.log(`listening on port ${PORT}`));
