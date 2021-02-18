'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient();

    let responseBody = "";
    let statusCode = 0;

    const params = {
        TableName: "Pots",
        Key: {
            PotID: "12346"
        },
        UpdateExpression: "set Nickname = :n",
        ExpressionAttributeValues:{
            ":n": "tom2"
        },
        ReturnValues:"UPDATED_NEW"
    };

    try{
        const data = await documentClient.update(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 204;
    } catch(error){
        responseBody = `Unable to update pot: ${error}`;
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
