const jwt = require('jsonwebtoken');
const db = require('../services/db');
const User = require('../model/user');
const Response = require('../model/response');
const config = require('../../config');

class UserRoute {

    constructor() {

    }

    createUser = (req, res, next) => {
        const emailAddress = req.body.emailAddress;
        const mobileNumber = req.body.mobileNumber;
        const password = req.body.password;
        const role = req.body.role;
        let response = new Response(0, "Success");
        if (!this.isValidEmailAddress(emailAddress)) {
            response = new Response(1001, "Email ID is missing or invalid Email ID");
            res.json(response);
            return;
        }
        if (!this.isValidMobileNumber(mobileNumber)) {
            response = new Response(1002, "Mobile number is missing or invalid Mobile number");
            res.json(response);
            return;
        }
        if (!this.isValidPassword(password)) {
            response = new Response(1003, "Password should not be empty");
            res.json(response);
            return;
        }
        if (!this.isValidRole(role)) {
            response = new Response(1004, `Invalid role specified. It must be either "job-seeker" or "admin"`);
            res.json(response);
            return;
        }
        const otp = Math.floor(1000 + Math.random() * 9000);
        const epoch = Date.now();
        //fetch from db using mobile number and email address
        //const user = new User(emailAddress, password, mobileNumber, role, otp, epoch, false);
        const result = db.run(`INSERT INTO user (email_address, password, mobile_number, role, otp, otp_generated_at, active) VALUES 
            ('${emailAddress}', '${password}', '${mobileNumber}', '${role}', '${otp}', '${epoch}', ${(true ? 1 : 0)})`,
            []);
        //Add to DB4
        console.log("***********************************************");
        console.log('ATTENTION');
        console.log(`OTP for the user id ${result.lastInsertRowid} is ${otp}`);
        console.log("***********************************************");
        response.data = { userId: result.lastInsertRowid };
        res.json(response);
    }

    verifyUser = (req, res, next) => {
        const userId = req.body.userId;
        const otp = req.body.otp;
        let response = new Response(1005, "OTP Verification failed");
        let result = db.query(`SELECT otp FROM user where id = '${userId}'`, []);
        if (result.length == 0) {
            res.json(response);
            return;
        }
        const otpFromDb = result[0].otp;
        if (otpFromDb == otp) {
            db.run(`UPDATE user SET active = 1 where id = ${userId}`, []);
            response = new Response(0, "User verified successfully");
            res.json(response);
            return;
        } else {
            res.json(response);
            return;
        }
    }

    loginUser = (req, res, next) => {



        const emailAddress = req.body.emailAddress;
        const userGivenPassword = req.body.password;
        const userGivenRole = req.body.role;
        let response = new Response(400, "Service temporarily unavailable");
        let result = db.query(`SELECT role, password, id FROM user where email_address = '${emailAddress}'`, []);
        if (result.length == 0) {
            response = new Response(100, `User email doesn't exist in DB`);
            res.json(response);
            return;
        }
        const password = result[0].password;
        const role = result[0].role;
        const userId = result[0].id;
        if (userGivenPassword == password) {
            if (userGivenRole == role) {
                //JWT
                const token = jwt.sign(
                    { userId },
                    config.token,
                    {
                        expiresIn: "2h",
                    }
                );
                response = new Response(0, "Success", {token});
                res.json(response);
                return;
            } else {
                response = new Response(300, "User email and password are correct but the role selected doesn't match the one stored in DB");
                res.json(response);
                return;
            }
        } else {
            response = new Response(100, `User email exists but the password provided is incorrect`);
            res.json(response);
            return;
        }
    }

    isValidEmailAddress = (emailAddress) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(emailAddress);
    }

    isValidMobileNumber = (mobileNumber) => {
        const re = /^[6-9]\d{9}$/;
        return re.test(mobileNumber);
    }

    isValidPassword = (password) => {
        return password != null && password != undefined && password.trim() != '';
    }

    isValidRole = (role) => {
        return role == 'job-seeker' || role == 'admin';
    }
}

module.exports = UserRoute;