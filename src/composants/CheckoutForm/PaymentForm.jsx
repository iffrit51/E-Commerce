import React from 'react';
import {Typography,Button,Divider} from '@material-ui/core';
import {Elements,CardElement,ElementsConsumer} from '@stripe/react-stripe-js';
import {loadStrip} from '@stripe/stripe-js';

import Revue from './Revue';

const PaymentForm = ({checkoutToken}) => {
    return (
        <>
            <Revue checkoutToken={checkoutToken}/>
        </>
    );
}

export default PaymentForm;
