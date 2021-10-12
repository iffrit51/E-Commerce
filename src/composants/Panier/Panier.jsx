import React from 'react';
import { Grid,Container, Typography,Button } from '@material-ui/core';
import {Link} from 'react-router-dom';

import useStyles from './styles';
import CartItem from './CartItem/CartItem';

const Panier = ({ panier,onUpdateCartQty,onRemoveFromCart,onEmptyCart  }) => {
    const classes=useStyles();
    const handleEmptyCart = () => onEmptyCart();
    const panierVide = () => {
        <Typography variant="subtitle1">Vous avez aucun objets dans votre panier
            <Link to="/" className={classes.link}>commencer à ajouter</Link>
        </Typography>
    };

    const renderCart = () => (
        <>
            <Grid container spacing={3}>
                {panier.line_items.map((lineItem) => (
                    <Grid item xs={12} sm={4} key={lineItem.id}>
                        <CartItem item={lineItem} onUpdateCartQty={onUpdateCartQty} onRemoveFromCart={onRemoveFromCart}/>
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4">
                    Sous-Total: {panier.subtotal.formatted_with_symbol}
                </Typography>
                <div>
                    <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Vider le panier</Button>
                    <Button component={Link} to="/checkout" className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
                </div>
            </div>
        </>
    );

    if(!panier.line_items) return 'Loading... ';

return(
    <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="h3" gutterBottom>Votre Panier</Typography>
            {!panier.line_items.length ? panierVide() : renderCart() }
    </Container>
);
};

export default Panier