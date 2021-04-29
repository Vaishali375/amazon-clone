
import { Link, useHistory } from "react-router-dom";
import React, {useEffect, useState} from 'react';
import CheckoutProduct from './CheckoutProduct';
import './Payment.css';
import { useStateValue } from './StateProvider';
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from "./axios";
import { db } from "./firebase";

function Payment() {
    const [{basket, user}, dispatch] = useStateValue();
    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        //generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                   method: 'post',
                   url: `/payments/create?total=${getBasketTotal(basket) *100}`
            });
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret();
    }, [basket])

    console.log("the secret is >>>", clientSecret);
    console.log("person ", user);

    const handleSubmit = async (e) => {
        //do all fancy stripe stuff....
        e.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method:{
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {
             //paymentIntent =payment confirmation
             db
               .collection('users')
               .doc(user?.uid)
               .collection('orders')
               .doc(paymentIntent.id)
               .set({
                 basket: basket,
                 amount: paymentIntent.amount,
                 created: paymentIntent.created
               })

             setSucceeded(true);
             setError(null);
             setProcessing(false)
             
             dispatch({
                 type: 'EMPTY_BASKET'
             })
             history.replace("/orders")
        })
    }

    const handleChange = e =>{
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");
    }

    return (
        <div className="payment">
            <div className="payment__container">
               <h1>
                 Checkout(<Link to='/checkout'>{basket?.length} items</Link>)
               </h1>
               {/* Payment section - delivery address */}
               <div className="payment__section">
                  <div className="payment__title">
                       <h3>Delivery Address</h3>
                  </div>
                  <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>123 React Lane</p>
                        <p>Diu, Una, Nathej</p>
                  </div>
                </div>
               {/* Payment section - Review items */}
               <div className="payment__section">
                    <div className="payment__title">
                         <h3>Reveiw items and delivery</h3>
                    </div>
                    <div className="payment__items">
                       {basket.map(item => (
                           <CheckoutProduct 
                           id={item.id}
                           title={item.title}
                           image={item.image}
                           price={item.price}
                           rating={item.rating}
                           />
                       ))}
                    </div>
                </div>
               {/* Payment section - Payment method */}
               <div className="payment__section">
                    <div className="payment__title">
                       <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        {/* Stripe will go  */}
                        <form onSubmit={handleSubmit}>
                           <CardElement onChange={handleChange} />

                            <div className="payment__priceContainer">
                                <CurrencyFormat 
                                    renderText={(value) => (
                                     <h3>Order Total: {value}</h3>
                                    )}
                                    decimalScal={2}
                                    value={getBasketTotal(basket)} 
                                    displayType={'text'} 
                                    thousandSeparator={true} 
                                    prefix={'$'}  
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>

                            {/* Errors */}
                            {error && <div>{error}</div>}
                        </form>
                    </div>
               </div>
            </div>
        </div>
    )
}

export default Payment
