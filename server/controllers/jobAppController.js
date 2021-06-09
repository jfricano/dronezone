const db = require('../database/dbModels');
const TABLE_NAME = 'job_apps';

// TODO - UPDATE THIS ONCE COOKIES AND SESSIONS ARE WORKING
/**
 * gets all of the job applications associated with the user
 * accepts req.cookies.ssid to identify user
 * assigns to res.locals.allJobApps an array of job application json objects
 */
const getAllJobApps = (req, res, next) => {
  // const { ssid } = req.cookies;
  // const queryString = `
  //   SELECT * FROM job_apps
  //   WHERE job_apps.user_id = ${ssid}
  // `;

  const queryString = `
    SELECT * FROM ${TABLE_NAME}
    WHERE ${TABLE_NAME}.user_id = 1
  `;

  db.query(queryString)
    .then((data) => {
      console.log(data);
      res.locals.allJobApps = data.rows;
      next();
    })
    .catch((err) =>
      next({ log: err, err: 'ERROR in jobAppController.getAllJobApps',
      })
    );
};

// TODO - UPDATE THIS ONCE SESSIONS AND COOKIES ARE WORKING
/**
 * adds a job application record to the user's account
 * accepts req.cookies.ssid to idenitfy user (TODO)
 * accepts req.body to populate the record
 * assigns to res.locals.newJobApp the new job application object
 */
const addJobApp = (req, res, next) => {
  // const user_id = req.cookies.ssid;
  const user_id = Math.ceil(Math.random() * 4);
  const queryFields = Object.keys(req.body);
  const queryParams = [];
  let queryString = '';

  // construct the query string
  try {
    queryString += `INSERT INTO ${TABLE_NAME} (`;
    for (let i = 0; i < queryFields.length; i++) {
      queryString += queryFields[i] + ', ';
      queryParams.push(req.body[queryFields[i]]);
    }
    queryString += 'user_id) VALUES (';
    for (let i = 0; i < queryParams.length; i++)
      queryString += `'${queryParams[i]}', `;
    queryString += `${user_id}) RETURNING *`;
  } catch (err) {
    console.log(err);
  }

  db.query(queryString)
    .then((data) => {
      res.locals.newJobApp = data.rows[0];
      next();
    })
    .catch((err) =>
      next({ log: err, err: 'ERROR in jobAppController.addJobApp' })
    );
};

/**
 * deletes a job application record
 * accepts req.params.jobAppId
 * assigns as res.locals.deletedJobAppId the DB _id of the deleted record
 */
deleteJobApp = (req, res, next) => {
  const queryString = `DELETE FROM ${TABLE_NAME} WHERE ${TABLE_NAME}._id = ${req.params.jobAppId} RETURNING *`;

  db.query(queryString)
    .then((data) => {
      res.locals.deletedJobAppId = data.rows.length ? data.rows[0]._id : null;
      console.log(res.locals.deletedJobAppId);
      next();
    })
    .catch((err) =>
      next({ log: err, err: 'ERROR in jobAppController.deleteJobApp' })
    );
};

/**
 * updates a job application record
 * accepts req.body object that includes only changed KVPs
 * assigns updated record as res.locals.updatedJobApp
 */
updateJobApp = (req, res, next) => {
  let queryString = '';

  // construct query string
  try {
    queryString += `UPDATE ${TABLE_NAME} SET `;
    for (const key in req.body) queryString += `${key} = '${req.body[key]}', `;
    queryString = queryString.trim().replace(/(^,)|(,$)/g, ' ');
    queryString += `WHERE ${TABLE_NAME}._id = ${req.params.jobAppId} RETURNING *`;
  } catch (err) {
    console.log(err);
  }

  db.query(queryString)
    .then((data) => {
      res.locals.udpatedJobApp = data.rows[0];
      next();
    })
    .catch((err) =>
      next({ log: err, err: 'ERROR in jobAppController.updateJobApp' })
    );
};

module.exports = { getAllJobApps, addJobApp, deleteJobApp, updateJobApp };
