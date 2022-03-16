'use strict'
const AWS = require('aws-sdk');
AWS.config.update({ region: "us-east-1" });

exports.handler = async(event, context) => {
    const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08" });
    const documentClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });


    let responseBody = "";
    let statusCode = 0;

    const { name } = JSON.parse(event.body);

    const params = {
        TableName: "Serverless",
        Key: {
            Name: name,
        },
        UpdateExpression: "set Visitors = Visitors + :val",
        ExpressionAttributeValues: {
            ":val": 1
        },
        ReturnValues: "UPDATED_NEW"
    }

    try {
        const data = await documentClient.update(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 201;
    } catch (err) {
        responseBody = 'Unable to update visit data';
        statusCode = 403;
    }

    const response = {
        statusCode: statusCode,
        headers: {
            "myHeader": "test"
        },
        body: responseBody
    }

    return response;

}