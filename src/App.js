/* eslint-disable jsx-a11y/alt-text */

import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import axios from "axios";

import "bootswatch/dist/lux/bootstrap.min.css";
import './App.css';
import { useState } from "react";

const stripePromise = loadStripe("pk_test_51LMxh5LJwxQZpmN8LSWGuRL1GB3szoowHpqbRsPuykK4OcVl0r928bPR2fkujc9OJyvOjv7EZCnpr648gG4JgYol001NWhR4ku")


const CheckoutForm = () => {

  const stripe = useStripe()
  const elements = useElements()
  const[loading, setLoading] =  useState(false)

  const handleSubmit = async (e) =>{
    e.preventDefault();

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement) 
    });
    setLoading(true)

    if(!error){
      const { id } = paymentMethod;

      try {
      const { data } = await axios.post("http://localhost:3001/api/checkout", {
        id,
        amount: 10000
      });
      console.log(data);

      elements.getElement(CardElement).clear()
      } catch (error) {
        console.log(error)
      }
    setLoading(false)

    }
    
  };

  return( 
  <form onSubmit={handleSubmit} className='card card-body'> 

    <img
     src="https://i.pinimg.com/564x/5e/eb/27/5eeb27d93265f440c96321c66c56cf65.jpg"
     alt="teclado" 
     className="img-fluid" 
    />

    <h3 className="text-center my-2">Precio: 100$</h3>

    <div className="form-group">
      <CardElement className="form-control" />
    </div>
    
    <button className="btn btn-success" disabled={!stripe}>
      {loading ? (
        <div className="spinner-border text-light" role="status">
        
      </div>
      ): (
        "Rentar"
      )}
    </button>
  </form>
  )
}

function App() {
  return (
    <Elements stripe={stripePromise}>
      <div className="container p-4">
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <CheckoutForm />
          </div>
        </div>
      </div>
    </Elements>
  );
}

export default App;
