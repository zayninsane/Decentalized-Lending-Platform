import React from "react";
import ReactDom from 'react-dom/client';
import { BrowserRouter as Router} from 'react-router-dom';
import { ThirdwebProvider, metamaskWallet, coinbaseWallet, walletConnect } from '@thirdweb-dev/react';

import { StateContextProvider } from "./context";
import App from "./App";
import './index.css';

const root = ReactDom.createRoot(document.getElementById('root'));

root.render(
    <ThirdwebProvider 
    activeChain={"sepolia"}
    supportedWallets={[
        metamaskWallet({
            recommended: true,
        }),
        coinbaseWallet(),
        walletConnect(),
        ]}
        clientId="0cd25a13c556505f18132ced46ecca81"
        >
             
       <Router>
        <StateContextProvider>
        <App/>
        </StateContextProvider>
        </Router>
    </ThirdwebProvider>
)