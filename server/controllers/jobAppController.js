const db = require("../database/dbModels");
// const cryptoRandomString = require("crypto-random-string");

const getAllJobApps = (req, res, next) => {
  // const { ssid } = req.cookies;
  // const queryString = `
  //   SELECT * FROM job_apps
  //   WHERE job_apps.user_id = ${ssid}
  // `;

  const queryString = `
    SELECT * FROM job_apps
    WHERE job_apps.user_id = 1
  `;

  db.query(queryString)
    .then((data) => {
      console.log(data);
      res.locals.allJobApps = data.rows;
      next();
    })
    .catch((err) =>
      next({
        log: err,
        err: "ERROR in jobAppController.getAllJobApps",
      })
    );
};

const addJobApp = (req, res, next) => {
  // const user_id = req.cookies.ssid;
  const user_id = Math.ceil(Math.random() * 4);
  const queryFields = Object.keys(req.body);
  const queryParams = [];
  let queryString = "";

  try {
    queryString += "INSERT INTO job_apps (";
    for (let i = 0; i < queryFields.length; i++) {
      queryString += queryFields[i] + ", ";
      queryParams.push(req.body[queryFields[i]]);
    }
    queryString += "user_id) VALUES (";
    for (let i = 0; i < queryParams.length; i++)
      queryString += `'${queryParams[i]}', `;
    queryString += `${user_id}) RETURNING *`;
  } 
  catch (err) {
    console.log(err);
  }

  db.query(queryString)
    .then((data) => {
      res.locals.newJobApp = data.rows[0];
      next();
    })
    .catch((err) =>
      next({
        log: err,
        err: "ERROR in jobAppController.addJobApp",
      })
    );
};

deleteJobApp = (req, res, next) => {
  
};

module.exports = { getAllJobApps, addJobApp };
