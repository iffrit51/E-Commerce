import React from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Revue from './Revue';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ checkoutToken,shippingData,backStep,onCaptureCheckout,nextStep }) => {

    const handleSubmit = async(event,elements,stripe) => {
        event.preventDefault();

        if(!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);

        const {error,paymentMethod} = await stripe.createPaymentMethod({type:'card',card:cardElement});
        if(error){
            console.log(error);
        }
        else{
            const orderData={
                line_items:checkoutToken.live.line_item,
                customer:{firstname:shippingData.FirstName,lastname:shippingData.LastName,email:shippingData.email},
                shipping:{
                    name:'Primary',
                    street:shippingData.address1,
                    town_city:shippingData.city,
                    country_state:shippingData.shippingSubdivision,
                    postal_zip_code:shippingData.zip,
                    country:shippingData.shippingCountry,
                },
                fullfillment:{shipping_method:shippingData.shippingOption},
                payment:{
                    gateway:'stripe',
                    stripe:{
                        payement_method_id:paymentMethod.id
                    }
                }
            }
            onCaptureCheckout(checkoutToken.id,orderData);
            nextStep();
        }
    }

    return (
        <>
            <Revue checkoutToken={checkoutToken} />
            <Divider />
            <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>
                Payement
            </Typography>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {({ elements, stripe }) => (
                        <form>
                            <CardElement />
                            <br /><br />
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button variant="outlined" onClick={backStep}>Retour</Button>
                                <Button type="submit" variant="outlined" disabled={!stripe} color="primary">
                                    Payement {checkoutToken.live.subtotal.formated_with_symbol}
                                </Button>
                            </div>
                        </form>
                    )
                    }
                </ElementsConsumer>
            </Elements>
        </>
    );
}

export default PaymentForm;
