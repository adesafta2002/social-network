"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFunctions = void 0;
const notification_1 = require("../notification");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const sql = require('mssql');
var UserFunctions;
(function (UserFunctions) {
    async function read(id) {
        const request = new sql.Request();
        request.input('id', sql.VarChar(100), id);
        const result = await request.execute('usp_get_User');
        if (result.recordset[0]) {
            const user = result.recordset[0];
            delete user['password'];
            return { user, token: jwt.sign({ id: user.id, fName: user.firstName, lName: user.lastName }, process.env.jwtSecret, { expiresIn: '72h' }) };
        }
    }
    UserFunctions.read = read;
    async function search(params) {
        const request = new sql.Request();
        let summary;
        const entry = [];
        for (const param in params) {
            switch (param) {
                case '_summary':
                    summary = params[param];
                    break;
                case 'name':
                    request.input('name', sql.VarChar(100), params[param]);
                    break;
                default:
                    break;
            }
        }
        const result = await request.execute('usp_get_User');
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
    UserFunctions.search = search;
    async function getRelationships(params) {
        const request = new sql.Request();
        for (const param in params) {
            switch (param) {
                case 'userId':
                    request.input('id', sql.Int, +params[param]);
                    break;
                default:
                    break;
            }
        }
        const result = await request.execute('usp_get_Relationships');
        if (!result.recordset.length) {
            return [];
        }
        return result.recordset;
    }
    UserFunctions.getRelationships = getRelationships;
    async function sendFriendRequest(relationship) {
        const request = new sql.Request();
        if (relationship.emit_user) {
            request.input('emit_user', sql.Int, relationship.emit_user);
        }
        if (relationship.receive_user) {
            request.input('receive_user', sql.Int, relationship.receive_user);
        }
        const result = await request.execute('usp_send_friend_request');
        if (result.returnValue && result.returnValue !== -1) {
            relationship.id = result.returnValue;
            const notification = {
                emit_user: relationship.emit_user,
                receive_user: relationship.receive_user,
                type: "friend_req",
                content: "Has sent you a friend request",
            };
            notification_1.NotificationFunctions.insert(notification);
        }
        else if (result.returnValue) {
            relationship.id = -1;
        }
        else {
            return;
        }
    }
    UserFunctions.sendFriendRequest = sendFriendRequest;
    async function cancelFriendRequest(id) {
        const request = new sql.Request();
        request.input('id', sql.Int, id);
        const result = await request.execute('usp_delete_Relationship');
        return;
    }
    UserFunctions.cancelFriendRequest = cancelFriendRequest;
    async function acceptFriendRequest(id) {
        const request = new sql.Request();
        request.input('id', sql.Int, id);
        const result = await request.execute('usp_accept_Relationship');
        return;
    }
    UserFunctions.acceptFriendRequest = acceptFriendRequest;
    async function update(user) {
        const request = new sql.Request();
        request.input('id', sql.Int, user.id);
        request.input('first_name', sql.VarChar(50), user.firstName);
        request.input('last_name', sql.VarChar(50), user.lastName);
        request.input('address', sql.VarChar(50), user.address);
        request.input('gender', sql.VarChar(50), user.gender);
        request.input('birth_date', user.birthDate);
        const result = await request.execute('usp_update_User');
        return;
    }
    UserFunctions.update = update;
})(UserFunctions = exports.UserFunctions || (exports.UserFunctions = {}));
