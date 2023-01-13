import { INotification } from "../../auth/notification-model";

const dotenv = require('dotenv')
dotenv.config();
const sql = require('mssql');


export namespace NotificationFunctions {
    export async function search(params) {
        const request = new sql.Request();

        for (const param in params) {
            switch (param) {
                case 'userId':
                    request.input('id', sql.Int, params[param]);
                    break;
                default:
                    break;
            }
        }

        const result = await request.execute('usp_get_Notifications');

        if (!result.recordset.length) {
            return [];
        }
        return result.recordset;
    }

    export async function insert(notification: INotification) {
        const request = new sql.Request();


        if (notification.emit_user) {
            request.input('emit_user', sql.Int, notification.emit_user);
        }

        if (notification.receive_user) {
            request.input('receive_user', sql.Int, notification.receive_user);
        }

        if (notification.type) {
            request.input('type', sql.VarChar(50), notification.type);
        }

        if (notification.content) {
            request.input('content', sql.VarChar(100), notification.content);
        }

        const result = await request.execute('usp_insert_Notifications');

        if (result.returnValue && result.returnValue !== -1) {
            notification.id = result.returnValue;
        } else if (result.returnValue) {
            notification.id = -1;
        }

        return;
    }

    export async function remove(id){
        const request = new sql.Request();

        request.input('id', sql.Int, id);

        await request.execute('usp_delete_Notifications');

        return;
    }
}
