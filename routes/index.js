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
    // const params = {
    //     TableName: dynamodbTableName,
    //     Item: req.body
    // }
    // await dynamodb.put(params).promise().then(() => {
    //     const body = {
    //         Operation: "SAVE",
    //         Message: "SUCCESS",
    //         Item: req.body
    //     }
    //     res.json(body);
    // }, error => {
    //     console.error("post failed");
    //     let err = {
    //         error: error,
    //         item: req.body
    //     }
    //     res.status(500).send(err);
    // })

    var promises_arr = [];

    if (req.body.hasOwnProperty('clickAction')) {
        const params = {
            TableName: dynamodbTableName,
            Key: { "userId": req.body.userId },
            UpdateExpression: 'set #clickActions = list_append(#clickActions, :clickAction)',
            ExpressionAttributeNames: {
                '#clickActions': 'clickActions'
            },
            ExpressionAttributeValues: {
                ':clickAction': [req.body.clickAction]
            }
        }
        promises_arr.push(dynamodb.update(params).promise());
        /*
        await dynamodb.update(params).promise().then(() => {
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
        })*/
    }

    if (req.body.hasOwnProperty('scrollAction')) {
        const params = {
            TableName: dynamodbTableName,
            Key: { "userId": req.body.userId },
            UpdateExpression: 'set #scrollActions = list_append(#scrollActions, :scrollAction)',
            ExpressionAttributeNames: {
                '#scrollActions': 'scrollActions'
            },
            ExpressionAttributeValues: {
                ':scrollAction': [req.body.scrollAction]
            }
        }
        promises_arr.push(dynamodb.update(params).promise());
        /*await dynamodb.update(params).promise().then(() => {
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
        })*/
    }

    if (req.body.hasOwnProperty('clickPosition')) {
        const params = {
            TableName: dynamodbTableName,
            Key: { "userId": req.body.userId },
            UpdateExpression: 'set #clickPositions = list_append(#clickPositions, :clickPosition)',
            ExpressionAttributeNames: {
                '#clickPositions': 'clickPositions'
            },
            ExpressionAttributeValues: {
                ':clickPosition': [req.body.clickPosition]
            }
        }
        promises_arr.push(dynamodb.update(params).promise());
        /*await dynamodb.update(params).promise().then(() => {
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
        })*/
    }

    if (req.body.hasOwnProperty('formData')) {
        const params = {
            TableName: dynamodbTableName,
            Key: { "userId": req.body.userId },
            UpdateExpression: "set formData = :formData",
            ExpressionAttributeValues: {
                ':formData': req.body.formData
            }
        }
        promises_arr.push(dynamodb.update(params).promise());
        /*await dynamodb.update(params).promise().then(() => {
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
*/


    }


    Promise.all(promises_arr).then(() => {
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
    });




});

/* GET data. */
router.get('/', async(req, res) => {
    console.log("try to get user data");
    res.json({ message: "try to get user data!" });
});

module.exports = router;