const serverless = require('serverless-http')
const express = require('express')
const { new_user, list_users, get_user, delete_user, update_user } = require('../service/user')



const app = express()


// middleware to accept json format
app.use(express.json())


// endpoint for creating new user
app.post('/users', async (req, res) => {
    try {
        
        // user payload from req
        const user = req.body

        const newUser = await new_user(user)

        res.status(201).send(newUser)

    } catch (error) {
        console.log(error)
        res.status(500).send('internal server error')
    }
})



// endpoint for list all user
app.get('/users', async (req, res) => {
    try {
        
        // users
        const users = await list_users()

        res.send(users)

    } catch (error) {
        console.log(error)
        res.status(500).send('internal server error')
    }
})


// endpoint for fetching single user
app.get('/users/:user_id', async (req, res) => {
    try {
        
        // user id from req params
        const { user_id } = req.params

        const user = await get_user(user_id)

        res.send(user)

    } catch (error) {
        console.log(error)
        res.status(500).send('internal server error')
    }
})


// endpoint for deleting user
app.delete('/users/:user_id', async (req, res) => {
    try {
        
        // user id from req params
        const { user_id } = req.params

        const response = await delete_user(user_id)

        res.send(response)

    } catch (error) {
        console.log(error)
        res.status(500).send('internal server error')
    }
})


// endpoint for updating user
app.put('/users/:user_id', async (req, res) => {
    try {
        
        // user id from req params
        const { user_id } = req.params

        const response = await update_user(user_id, req.body)

        res.send(response)

    } catch (error) {
        console.log(error)
        res.status(500).send('internal server error')
    }
})




module.exports.handler = serverless(app)