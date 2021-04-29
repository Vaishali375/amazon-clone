const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe= require('stripe')('sk_test_51IY9MlSCFG7IILXHnCLDAnvIXYWmei6Y0pobtRhisOwxXehhKnjfeOVWWjwUwPYmYjJgZCuNHX0qYi4B7OOyy3UV00f49hXNDc')

//-API


//-App config
const app = express();

//-Middlewares
app.use(cors({origin: true}));
app.use(express.json());

//-API routes
app.get('/', (req, res) => res.status(200).send("hello world"));
app.post('/payments/create', async (req,res) =>{
    const total= req.query.total;
    console.log('Payment request receive >>>', total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, //subunits of the currency
        currency:"inr",
    });

    res.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})

//-Listen command
exports.api =  functions.https.onRequest(app);

//http://localhost:5001/challenge-c4a1c/us-central1/api