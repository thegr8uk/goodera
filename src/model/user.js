class User {
    constructor(email, password, mobileNumber, role, otp, otpGeneratedAt, active) {
        this.email = email;
        this.password = password;
        this.mobileNumber = mobileNumber;
        this.role = role;
        this.otp = otp;
        this.otpGeneratedAt = otpGeneratedAt;
        this.active = active;
    }
}

module.exports = User;