const db = require("../database/dbModels");
const TABLE_NAME = "job_apps";

// TODO - UPDATE THIS ONCE COOKIES AND SESSIONS ARE WORKING
/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
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
      next({
        log: err,
        err: "ERROR in jobAppController.getAllJobApps",
      })
    );
};

// TODO - UPDATE THIS ONCE SESSIONS AND COOKIES ARE WORKING
/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const addJobApp = (req, res, next) => {
  // const user_id = req.cookies.ssid;
  const user_id = Math.ceil(Math.random() * 4);
  const queryFields = Object.keys(req.body);
  const queryParams = [];
  let queryString = "";

  try {
    queryString += `INSERT INTO ${TABLE_NAME} (`;
    for (let i = 0; i < queryFields.length; i++) {
      queryString += queryFields[i] + ", ";
      queryParams.push(req.body[queryFields[i]]);
    }
    queryString += "user_id) VALUES (";
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
      next({
        log: err,
        err: "ERROR in jobAppController.addJobApp",
      })
    );
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
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
      next({
        log: err,
        err: "ERROR in jobAppController.deleteJobApp",
      })
    );
};

module.exports = { getAllJobApps, addJobApp, deleteJobApp };
