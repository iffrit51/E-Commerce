import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';

const Revue = ({ checkoutToken }) => {
    return (
        <>
            <Typography variant="h6" gutterBottom>Détail de la Commande</Typography>
            <List disablePadding>
                {checkoutToken.live.line_items.map((produit)=>
                    <ListItem style={{padding: '10px 0'}} key={produit.name}>
                        <ListItemText primary={produit.name} secondary={`Quantité: ${produit.quantity}`}/>
                        <Typography variant="body2">{produit.line_total.formatted_with_symbol}</Typography>
                    </ListItem>
                )}
                <ListItem style={{padding: '10px 0'}}>
                        <ListItemText primary="Total" />
                        <Typography variant="sous titre" style={{fontWeight: 700}}>
                            {checkoutToken.live.subtotal.formatted_with_symbol}
                            </Typography>
                    </ListItem>
            </List>
        </>
    );
};

export default Revue;