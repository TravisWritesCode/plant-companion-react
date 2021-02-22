'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient();

    let responseBody = "";
    let statusCode = 0;

    const{ CognitoID, timestamp, PotID, sensorData} = JSON.parse(event.body);

    const params = {
        TableName: "Pot",
        Item: {
            CognitoID: CognitoID,
            timestamp: timestamp,
            PotID:PotID,
            sensorData: sensorData
        }
    };

    try{
        const data = await documentClient.put(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 201;
    } catch(error){
        responseBody = `Unable to put pot: ${error}`;
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
