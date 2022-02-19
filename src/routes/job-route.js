const jwt = require('jsonwebtoken');
const db = require('../services/db');
const User = require('../model/user');
const Response = require('../model/response');
const config = require('../../config');

class JobRoute {

    constructor() {

    }

    applyJob = (req, res, next) => {
        const token =
            req.body.token || req.query.token || req.headers["x-access-token"];

        if (!token) {
            return res.status(403).json(new Response(403, "A token is required for authentication"));
        }
        try {
            let response = new Response(0, "Success");
            const decoded = jwt.verify(token, config.token);
            const userId = decoded.userId;
            // let result = db.query(`SELECT role FROM user where id = ${userId}`, []);
            let query = `SELECT role FROM user where id = '${userId}'`;
            let result = db.query(query, []);
            if (result.length == 0) {
                response = new Response(100, `Invalid User`);
                res.json(response);
                return;
            }
            const role = result[0].role;
            if (role != 'job-seeker') {
                return res.status(403).json(new Response(600, "Admin not supposed to apply for any job"));
            }
            const jobId = req.body.jobId;
            result = db.run(`INSERT INTO userjob (userid, jobid) VALUES 
            ('${userId}', '${jobId}')`,
                []);
            response = new Response(0, "Job Applied Successfully");
            res.json(response);
            return;
        } catch (err) {
            console.log(err);
            return res.status(401).send("Invalid Token");
        }
    }

    listAppliedJobs = (req, res, next) => {
        const token =
            req.body.token || req.query.token || req.headers["x-access-token"];

        if (!token) {
            return res.status(403).json(new Response(403, "A token is required for authentication"));
        }
        try {
            let response = new Response(0, "Success");
            const decoded = jwt.verify(token, config.token);
            const userId = decoded.userId;
            let result = db.query(`SELECT role FROM user where id = '${userId}'`, []);
            if (result.length == 0) {
                response = new Response(100, `Invalid User`);
                res.json(response);
                return;
            }
            const role = result[0].role;
            if (role != 'job-seeker') {
                return res.status(403).json(new Response(600, "Admin not supposed to apply for any job"));
            }
            const jobId = req.body.jobId;
            result = db.query(`SELECT jobid from userjob where userid = '${userId}'`,
                []);
            let jobIds = [];
            result.forEach(item => {
                jobIds.push(item.jobid);
            });
            const jobIdsIn = jobIds.join(',');
            result = db.query(`SELECT * FROM job where id in (${jobIdsIn})`, []);
            response = new Response(0, "Success", result);
            res.json(response);
            return;
        } catch (err) {
            console.log(err);
            return res.status(401).send("Invalid Token");
        }
    }

    listAllJobs = (req, res, next) => {
        let result = db.query(`SELECT * FROM job`, []);
        let response = new Response(0, "Success", result);
        res.json(response);
        return;
    }
}

module.exports = JobRoute;