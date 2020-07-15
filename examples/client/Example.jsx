import React, { Fragment, useEffect, useState } from 'react';
import 'react-simple-flex-grid/lib/main.css';
import { useStore } from '@scripty/react-store';
import { getModule, updatePlacements } from '../../src';
import { Articles } from './Articles';
import { Layout } from '../../src/Layout';
import { SaveButton } from '@scripty/react-buttons';

export const Example = () => {

    const { modulesStore } = useStore('modulesStore');
    const modules = modulesStore.getAt(0).get('modules');
    const layout = modulesStore.getAt(0).get('layout');
    let [ placements, setPlacements ] = useState([])

    useEffect(() => {
        modulesStore.proxy.findModules({assignment: 'Dashboard'});
    }, []);

    useEffect(() => {
        let blub = updatePlacements(modules, layout, {Articles})
        setPlacements(blub);
    }, [modules]);

    const onSaveBtnClick = () => {
        const cleadPlacements = getModule(placements);
        modulesStore.proxy.updateLayout({assignment: 'Dashboard', layout: cleadPlacements})
    };

    return (
        <Fragment>
            <SaveButton onClick={onSaveBtnClick}/>
            <Layout state={placements} setState={setPlacements} />
        </Fragment>

    )
}
