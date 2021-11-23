"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwt = void 0;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const dotenv = require('dotenv');
dotenv.config();
const options = {};
options['jwtFromRequest'] = ExtractJwt.fromAuthHeaderAsBearerToken();
options['secretOrKey'] = process.env.jwtSecret;
exports.jwt = new JwtStrategy(options, function (jwt, done) {
});
