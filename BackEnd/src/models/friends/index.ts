const dotenv = require('dotenv')
dotenv.config();
const sql = require('mssql');


export namespace FriendsFunctions {
    export async function search(params) {
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
}
