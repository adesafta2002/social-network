import { IUser } from "./userModel";
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

export function validateUserData(user: IUser, fields: string[]) {
    let isDataValid = true;
    for (const field of fields) {
        if (!user[field]) {
            isDataValid = false;
            return isDataValid;
        }
    }

    if (!(user.email.split('@').length === 2) || !(user.password.length >= 8)) {
        isDataValid = false
    }

    return isDataValid;
}

export function getTokenAndData(header) {
    const token = header.authorization.split(' ')[1];

    let data;
    jwt.verify(token, process.env.jwtSecret, function (err, decoded) {
        if (!err) {
            data = decoded;
        }
    });
    return { token, data };
}