import React, { useState, useEffect } from 'react';
import { CssBaseline, Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';

import { commerce } from '../../../lib/commerce';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import useStyles from './styles';

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

    let Confirmation = () => order.customer ? (
        <>
        <div>
            <Typography variant="h5">Merci pour votre commande, {order.customer.firstname} {order.customer.lastname}</Typography>
            <Divider className={classes.divider}/>
            <Typography variant="subtitle2">Ref de la commande: {order.customer_reference}</Typography>
        </div>
        <br />
        <Button component={Link} to="/" variant="outlined" type="button">Retour à l'acceuil</Button>
        </>
        ):(
            <div className={classes.spinner}>
                <CircularProgress/>
            </div>
    );
    if(error){
        <><CssBaseline />
        <Typography variant="h5">Erreur: {error}</Typography>
        <br />
        <Button component={Link} to="/" variant="outlined" type="button">
            Retour à l'accueil
        </Button>
        </>
    }

    const Form = () => activeStep === 0
        ? <AddressForm checkoutToken={checkoutToken} next={next} />
        : <PaymentForm shippingData={shippingData} backStep={backStep} 
        checkoutToken={checkoutToken} onCaptureCheckout={onCaptureCheckout}
        nextStep={nextStep} />

    return (
        <>
        <CssBaseline />
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
