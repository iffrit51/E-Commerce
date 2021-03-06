import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import { Produits, Navbar, Panier,Checkout } from './composants';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';

const App = () => {
  const [produits, setProduits] = useState([]);
  const [panier, setPanier] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const fetchProduits = async () => {
    const { data } = await commerce.products.list();

    setProduits(data);
  };

  const fetchPanier = async () => {
    setPanier(await commerce.cart.retrieve());
  };

  const handleAddToPanier = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setPanier(item.cart);
  };

  const handleUpdatePanierQty = async (productId, quantity) => {
    const response = await commerce.cart.update(productId, {quantity});
    setPanier(response.cart);
  };

  const handleRemoveFromPanier = async (productId, quantity) => {
    const response = await commerce.cart.remove(productId);
    setPanier(response.cart);
  };

  const handlePanierVide = async () => {
    const response = await commerce.cart.empty();
    setPanier(response.cart);
  };

  const refreshCarte = async () => {
    const newCart = await commerce.cart.refresh();
    setPanier(newCart);
    refreshCarte();
  };

  const handleCaptureCheckout = async (checkoutTokenId,newOrder) => {
    try{
      const incommingOrder = await commerce.checkout.capture(checkoutTokenId,newOrder);
      setOrder(incommingOrder);
      refreshCarte();
    }
    catch(error){
      setErrorMessage(error.data.error.message);
    }
  }

  useEffect(() => {
    fetchProduits();
    fetchPanier();
  }, []);

  console.log(panier);


  return (
    <Router>
      <div>
        <Navbar totalItems={panier.total_items} />
        <Switch>
          <Route exact path="/">
            <Produits produits={produits} onAddToPanier={handleAddToPanier} />
          </Route>
          <Route exact path="/panier">
            <Panier panier={panier}
            onUpdateCartQty={handleUpdatePanierQty}
            onRemoveFromCart={handleRemoveFromPanier}
            onEmptyCart={handlePanierVide}            
            />
          </Route>
          <Route exact path="/checkout">
            <Checkout 
            panier={panier}
            order={order}
            onCaptureCheckout={handleCaptureCheckout}
            eroor={errorMessage}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;