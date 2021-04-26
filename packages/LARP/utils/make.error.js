"use strict";
module.exports = function (errors) {
    let response = {};
    for (var item in errors) {
        const message = errors[item].message;
        response[item] = {
            message: message,
        };
    }
    return { status: 404, data: response };
};