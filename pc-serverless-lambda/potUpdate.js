'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient();

    let responseBody = "";
    let statusCode = 0;

    const {CognitoID, timestamp, PotID, sensorData } = JSON.parse(event.body);

    const params = {
        TableName: "Pot",
        Key: {
            CognitoID: CognitoID,
            timestamp: timestamp
        },
        UpdateExpression: "set PotID = :p, sensorData = :s",
        ExpressionAttributeValues:{
            ":p": PotID,
            ":s": sensorData
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
