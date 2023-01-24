"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostFunctions = void 0;
const dotenv = require('dotenv');
dotenv.config();
const sql = require('mssql');
var PostFunctions;
(function (PostFunctions) {
    async function search(params) {
        const request = new sql.Request();
        for (const param in params) {
            switch (param) {
                case 'userId':
                    request.input('userId', sql.Int, params[param]);
                    break;
                default:
                    break;
            }
        }
        const result = await request.execute('usp_get_Posts');
        if (!result.recordset.length) {
            return [];
        }
        return result.recordset;
    }
    PostFunctions.search = search;
    async function insert(post) {
        const request = new sql.Request();
        if (post.userId) {
            request.input('userId', sql.Int, post.userId);
        }
        if (post.content) {
            request.input('content', sql.VarChar(500), post.content);
        }
        const result = await request.execute('usp_insert_Post');
        if (result.returnValue && result.returnValue !== -1) {
            post.id = result.returnValue;
        }
        else if (result.returnValue) {
            post.id = -1;
        }
        return;
    }
    PostFunctions.insert = insert;
    async function remove(id) {
        const request = new sql.Request();
        request.input('id', sql.Int, id);
        await request.execute('usp_delete_Post');
        return;
    }
    PostFunctions.remove = remove;
    async function $like(like) {
        const request = new sql.Request();
        if (like.userId) {
            request.input('userId', sql.Int, like.userId);
        }
        if (like.postId) {
            request.input('postId', sql.VarChar(500), like.postId);
        }
        const result = await request.execute('usp_like_Post');
        if (result.returnValue && result.returnValue !== -1) {
            like.id = result.returnValue;
        }
        else if (result.returnValue) {
            like.id = -1;
        }
        return;
    }
    PostFunctions.$like = $like;
    async function $comment(comment) {
        const request = new sql.Request();
        if (comment.userId) {
            request.input('userId', sql.Int, comment.userId);
        }
        if (comment.postId) {
            request.input('postId', sql.VarChar(500), comment.postId);
        }
        if (comment.content) {
            request.input('content', sql.VarChar(500), comment.content);
        }
        const result = await request.execute('usp_comment_on_Post');
        if (result.returnValue && result.returnValue !== -1) {
            comment.id = result.returnValue;
        }
        else if (result.returnValue) {
            comment.id = -1;
        }
        return;
    }
    PostFunctions.$comment = $comment;
    async function $unlike(id) {
        const request = new sql.Request();
        request.input('id', sql.Int, id);
        await request.execute('usp_unlike_Post');
        return;
    }
    PostFunctions.$unlike = $unlike;
    async function $removeComment(id) {
        const request = new sql.Request();
        request.input('id', sql.Int, id);
        await request.execute('usp_delete_Comment');
        return;
    }
    PostFunctions.$removeComment = $removeComment;
})(PostFunctions = exports.PostFunctions || (exports.PostFunctions = {}));
