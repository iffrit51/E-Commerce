import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';

import useStyles from './styles';

const Produit = ({ produit,onAddToPanier }) => {
    const classes = useStyles();

    const handleAddToPanier = () => onAddToPanier(produit.id, 1);

    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={produit.media.source} title={produit.name} />
            <CardContent>
                <div className={classes.CardContent}>
                    <Typography variant="h5" gutterBottom>
                        {produit.name}
                    </Typography>
                    <Typography variant="h5">
                        {produit.price.formatted_with_symbol}
                    </Typography>
                </div>
                <Typography dangerouslySetInnerHTML={{__html:produit.description}} variant="body2" color="textSecondary"/>
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton arial-label="Ajouter au panier" onClick={handleAddToPanier}>
                    <AddShoppingCart />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default Produit