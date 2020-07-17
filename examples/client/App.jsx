import React from 'react';

import { hot } from 'react-hot-loader/root';
import { Example } from './Example';
import modulesStore from './modulesStore';
import articlesStore from './articlesStore';
import layoutsStore from './layoutsStore';
import { StoreProvider } from '@scripty/react-store';

const App = () => {

    let defaultStores = {
        modulesStore,
        layoutsStore,
        articlesStore
    };

    return (
        <StoreProvider defaultStores={defaultStores}>
            <Example />
        </StoreProvider>
    );
};

export default hot(App);
