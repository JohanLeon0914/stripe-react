const express = require('express')
const Stripe = require('stripe')
const cors = require('cors')

const app = express()

const stripe = new Stripe("sk_test_51LMxh5LJwxQZpmN873F4pMMwMQM3tw7iWpdDJxoqP6q4syFoh6dsTa1Ny9tn5sPNjHgsPtXFqNTA96TpBSyQjnmL00Ff46aTWv") //USAR UN .ENV EN CODIGO DE VERDAD XD

app.use(cors({origin: 'http://localhost:3000'}))
app.use(express.json())

app.post('/api/checkout', async (req, res) => {
    try {
        const { id, amount } = req.body
    // en el req.body tambien podria recibir el id del producto para poder accerder a el producto desde una base de datos y enviar su descripcion en la compra
    const payment = await stripe.paymentIntents.create({
        amount: amount, 
        currency:  "USD",
        description: "Gaming keyboard",
        payment_method: id,
        confirm: true
    })
    console.log(payment)
    res.send({message: 'Successul payment'})
    } catch (error) {
        console.log(error)
        res.json({message: error.raw.message})
    }
})

app.listen(3001, () => {
    console.log('server on port', 3001);
})