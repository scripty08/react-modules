import React from 'react';

import { hot } from 'react-hot-loader/root';
import { Example } from './Example';
import modulesStore from './modulesStore';
import placementsStore from './placementsStore';
import articlesStore from './articlesStore';
import { StoreProvider } from '@scripty/react-store';

const App = () => {

    let defaultStores = {
        modulesStore,
        placementsStore,
        articlesStore
    };

    return (
        <StoreProvider defaultStores={defaultStores}>
            <Example />
        </StoreProvider>
    );
};

export default hot(App);
