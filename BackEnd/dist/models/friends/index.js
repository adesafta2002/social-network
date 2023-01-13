"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendsFunctions = void 0;
const dotenv = require('dotenv');
dotenv.config();
const sql = require('mssql');
var FriendsFunctions;
(function (FriendsFunctions) {
    async function search(params) {
        const request = new sql.Request();
        let summary;
        const entry = [];
        for (const param in params) {
            switch (param) {
                case '_summary':
                    summary = params[param];
                    break;
                case 'userId':
                    request.input('id', sql.Int, params[param]);
                    break;
                default:
                    break;
            }
        }
        const result = await request.execute('usp_get_Friends');
        if (!result.recordset.length) {
            return [];
        }
        result.recordset.forEach(user => {
            delete user['password'];
            if (summary) {
                delete user['email'];
                delete user['gender'];
                delete user['birthDate'];
                delete user['address'];
            }
            entry.push(user);
        });
        return entry;
    }
    FriendsFunctions.search = search;
})(FriendsFunctions = exports.FriendsFunctions || (exports.FriendsFunctions = {}));
