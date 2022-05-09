var express = require('express');
var router = express.Router();
var AWS = require("aws-sdk");

AWS.config.update({
    region: "ap-northeast-1"
});

const dynamodb = new AWS.DynamoDB.DocumentClient();
const dynamodbTableName = 'surveyResult';

//post user data
router.post('/', async(req, res) => {
    var newBody = req.body;
    newBody["clickPositions"] = [];
    newBody["clickActions"] = [];
    newBody["scrollActions"] = [];
    newBody["formData"] = "";
    const params = {
        TableName: dynamodbTableName,
        Item: newBody
    }
    await dynamodb.put(params).promise().then(() => {
        const body = {
            Operation: "SAVE",
            Message: "SUCCESS",
            Item: req.body
        }
        res.json(body);
    }, error => {
        console.error("post failed");
        let err = {
            error: error,
            item: req.body
        }
        res.status(500).send(err);
    })



});

router.get('/', async(req, res) => {
    console.log("try to get user init");
    res.json({ message: "try to get user init!" });
});

module.exports = router;