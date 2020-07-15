import React from 'react';

import { hot } from 'react-hot-loader/root';
import { Example } from './Example';
import modulesStore from './modulesStore';
import { StoreProvider } from '@scripty/react-store';

const App = () => {

    let defaultStores = {
        modulesStore
    };

    return (
        <StoreProvider defaultStores={defaultStores}>
            <Example />
        </StoreProvider>
    );
};

export default hot(App);
