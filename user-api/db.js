const AWS = require('aws-sdk')

// update default region
AWS.config.update({
    region: 'ap-south-1'
})

// New DynamoDB obj
const DynamoDB = new AWS.DynamoDB()

module.exports = DynamoDB