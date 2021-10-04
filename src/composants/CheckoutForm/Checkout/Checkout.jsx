import React, { useState, useEffect } from 'react';
import {Paper, Stepper, Step, StepLabel, Typography } from '@material-ui/core';

import { commerce } from '../../../lib/commerce';

import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import useStyles from './styles';
import {useHistory } from 'react-router-dom';

const steps = ['Shipping address', 'Payement details'];

const Checkout = ({panier}) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        //if (panier.id) {
            const generateToken = async () => {
                try {
                    const token = await commerce.checkout.generateToken(panier.id, { type: 'cart' });
                    console.log("token");
                    setCheckoutToken(token);
                }
                catch (error) {
                    history.push('/');
                }
            };
            generateToken();
        //}
    }, [panier, history]);

    const Confirmation = () => (
        <div>
            Confirmation
        </div>
    );

    const Form = () => activeStep === 0
        ? <AddressForm checkoutToken={checkoutToken} />
        : <PaymentForm />

    return (
        <>
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Checkout</Typography>
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
