import React from 'react';
import { Grid } from '@material-ui/core';

import Produit from './Produit/Produit';
import useStyles from './styles';

const Produits = ({produits,onAddToPanier}) => {
    const classes = useStyles();

    if(!produits.length) return <p>Loading...</p>

    return (
        <main className={classes.content}>
            <div className={classes.toolbar}/>
            <Grid container justifyContent="center" spacing={4}>
                {produits.map((produit) => (
                    <Grid item key={produit.id} xs={12} sm={6} md={4} lg={3}>
                        <Produit produit={produit} onAddToPanier={onAddToPanier} />
                    </Grid>
                ))}
            </Grid>
        </main>
    );
};

export default Produits;