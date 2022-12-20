import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import UserStore from './store/Userstore';
import ProductStore from './store/ProductStore';
import RecipeStore from './store/RecipeStore';
import PositionStore from './store/PositionStore';
import CartStore from './store/CartStore';
import OrderStore from './store/OrderStore';

import styled, { createGlobalStyle } from 'styled-components';

import MontserratTtf from "./static/fonts/MontserratAlternates-Medium.ttf";


export const Context = createContext(null)

const FontStyle = createGlobalStyle`
@font-face {
  font-family: Montserrat-Alternates-Meduim;
  src: url(${MontserratTtf}) format('truetype');
  font-weight: 400;
  font-style: normal;
}
`

const Global = createGlobalStyle`
  html, body {height:100%; width:100%; margin:0; padding:0;}

  * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: Montserrat-Alternates-Meduim, sans-serif;
  }

  #root {
    min-height: 100%;
  }
`


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Context.Provider value={{
      usersStore: new UserStore(),
      productsStore: new ProductStore(),
      recipesStore: new RecipeStore(),
      positionsStore: new PositionStore(),
      cartStore: new CartStore(),
      ordersStore: new OrderStore()
    }}>
      <Global />
      <FontStyle />
      <App />
    </Context.Provider>
  </React.StrictMode>
);
