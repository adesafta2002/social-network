const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const dotenv = require('dotenv');
dotenv.config();

const options = {};

options['jwtFromRequest'] = ExtractJwt.fromAuthHeaderAsBearerToken();
options['secretOrKey'] = process.env.jwtSecret;
export const jwt  = new JwtStrategy(options, function(jwt, done){

})