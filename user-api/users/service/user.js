const { v4: uuid } = require('uuid')
const DynamoDB = require('../../db')

module.exports = {

    // new user creation
    async new_user (payload) {

        try {

             // params for dynamodb
            const params = {
                TableName: 'Users',
                Item: {
                    user_id: { S: uuid() },
                    name: { S: payload?.name },
                    age: { S: payload?.age },
                    active_status: { BOOL: payload?.active_status }
                }
            }

            // inserting new user
            const user = await DynamoDB.putItem(params).promise()

            if(user) return {
                data: params,
                message: 'new user created'
            }
            else return new Error('not able to create user')

        } catch (error) {
            console.log(error)
            return new Error('not able to create user')
        }

    },

    // list all users
    async list_users() {

        try {

            const params = {
                TableName: 'Users'
            }

            const users = await DynamoDB.scan(params).promise()

            return users

        } catch (error) {
            console.log(error)
            return new Error('not able to fetch users')
        }

    },

    // get single user
    async get_user(user_id) {
        try {
            
            const params = {
                TableName: 'Users',
                Key: {
                    user_id: { S: user_id }
                }
            }

            const user = await DynamoDB.getItem(params).promise()

            if(user) return user
            else return new Error('user not found')

        } catch (error) {
            console.log(error)
            return new Error('not able to fetch user')
        }
    },

    // delete user
    async delete_user(user_id) {
        try {
            
            const params = {
                TableName: 'Users',
                Key: {
                    user_id: { S: user_id }
                }
            }

            await DynamoDB.deleteItem(params).promise()

            return 'user deleted'

        } catch (error) {
            console.log(error)
            return new Error('not able to delete user')
        }
    },

    //update user
    async update_user(user_id, payload) {
        try {
            
            const params = {
                TableName: 'Users',
                Key: {
                    user_id: { S: user_id }
                },
                UpdateExpression: "set updatePayload = :updatePayload",
                ExpressionAttributeValues: {
                    ":updatePayload": payload
                },
                ReturnValues: "UPDATED_NEW"
            }

            const user = await DynamoDB.updateItem(params).promise()

            if(user) return {
                data: user,
                message: 'user updated'
            }
            else return new Error('unable to update user')

        } catch (error) {
            console.log(error)
            return new Error('not able to update user')
        }
    }

}