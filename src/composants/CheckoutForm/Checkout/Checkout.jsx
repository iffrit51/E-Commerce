import React, { useState, useEffect } from 'react';
import {Paper, Stepper, Step, StepLabel, Typography } from '@material-ui/core';

import { commerce } from '../../../lib/commerce';

import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import useStyles from './styles';
import {useHistory } from 'react-router-dom';

const steps = ['Shipping address', 'Payement details'];

const Checkout = ({panier,order,onCaptureCheckout,error}) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData,setShippingData] = useState({});
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
            const generateToken = async () => {
                try {
                    const token = await commerce.checkout.generateToken(panier.id, { type: 'cart' });
                    setCheckoutToken(token);
                }
                catch (error) {
                    history.push('/');
                }
            };
            generateToken();
    }, [panier, history]);

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep +1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep -1);

    const next = (data) =>{
        setShippingData(data);
        nextStep();
    }

    const Confirmation = () => (
        <div>
            Confirmation
        </div>
    );

    const Form = () => activeStep === 0
        ? <AddressForm checkoutToken={checkoutToken} next={next} />
        : <PaymentForm shippingData={shippingData} backStep={backStep} nextStep={nextStep} checkoutToken={checkoutToken} onCaptureCheckout={onCaptureCheckout} />

    return (
        <>
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Commande</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
                </Paper>
            </main>
        </>
    );
};

export default Checkout;
