import React, { useEffect, useState } from 'react';
import 'react-simple-flex-grid/lib/main.css';
import { useStore } from '@scripty/react-store';
import { cleanPlacements, Modules, updatePlacements } from '../../src';
import { Articles } from './Articles';

export const Example = () => {

    const { modulesStore } = useStore('modulesStore');
    const modules = modulesStore.getAt(0).get('modules');
    const layout = modulesStore.getAt(0).get('layout');
    let [ placements, setPlacements ] = useState([])

    useEffect(() => {
        modulesStore.proxy.findModules({assignment: 'Dashboard'});
    }, []);

    useEffect(() => {
        let updatedPlacements = updatePlacements(modules, layout, {Articles})
        setPlacements(updatedPlacements);
    }, [modules]);

    const onSaveBtnClick = () => {
        const cleanedPlacements = cleanPlacements(placements);
        modulesStore.proxy.updateLayout({assignment: 'Dashboard', layout: cleanedPlacements})
    };

    const onAddBtnClick = (state) => {

        layout[1].push(
            {
                id: 'item-28'
            }
        );

        modules.push({
            assignment: {
                type: 'selected', value: ['Dashbaord']
            },
            type: 'Articles',
            plugin: [{
                title: 'bla',
                html: 'blub'
            }]
        });

        console.log(layout, ' layout <------------');

        let updatedPlacements = updatePlacements(modules, layout, {Articles})
        setPlacements(updatedPlacements);
        console.log(modules, ' modules <------------');
        console.log(updatedPlacements, '  updatedPlacements <------------');
    }


    return (
        <Modules
            state={placements}
            setState={setPlacements}
            onSaveBtnClick={onSaveBtnClick}
            onAddBtnClick={onAddBtnClick}
            editing={true}
        />
    )
}
