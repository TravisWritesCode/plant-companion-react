'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient();

    let responseBody = "";
    let statusCode = 0;

    const params = {
        TableName: "Pots"
    };

    try{
        const data = await documentClient.scan(params).promise();
        responseBody = JSON.stringify(data.Items);
        statusCode = 200;
    } catch(error){
        responseBody = `Unable to get pots: ${error}`;
        statusCode = 403;
    }

    const response = {
        statusCode: statusCode,
        headers:  {
            "Content-Type": "application/json"
        },
        body: responseBody 
    };

    return response;

};
