'use strict';
const controllers  = require('./controllers');
exports.main = async (event, context) => {
    const { httpMethod } = event
    if (httpMethod === 'OPTIONS') {
        return 204
    }
    let returnValue = {}
    try{
        returnValue = await controllers[httpMethod]
    } catch(error){
        returnValue.code = 500
        returnValue.msg='ERROR'
        returnValue.data = error
    }
    return returnValue
};
