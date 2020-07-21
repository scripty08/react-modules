import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'react-simple-flex-grid/lib/main.css';
import { useStore } from '@scripty/react-store';
import { getNewItemId, Modules } from '../../src';
import { Article } from '@scripty/react-articles';
import { Login } from '@scripty/react-login';
import placementsStore from './placementsStore';

const initialPlacements = [
    [], [], []
]

export const Example = () => {
    const { loginStore } = useStore('loginStore');
    const { modulesStore } = useStore('modulesStore');
    const { placementsStore } = useStore('placementsStore');
    const records = modulesStore.getAt(0);
    const placementsRecords = placementsStore.getAt(0);
    const user = loginStore.getAt(0);

    useEffect(() => {
        modulesStore.proxy.findModules({ assignment: 'Dashboard' });
    }, []);

    useEffect(() => {
        placementsStore.proxy.findPlacements({ assignment: 'Dashboard' });
    }, [modulesStore.data]);

    const onSaveBtnClick = async () => {
        const dirtyModules = modulesStore.getDirtyRecords();
        const dirtyPlacements = placementsStore.getDirtyRecords();

        if (dirtyModules) {
            await modulesStore.proxy.updateModules(dirtyModules);
        }
        if (dirtyPlacements) {
            await placementsStore.proxy.updatePlacements(placementsStore.data);
        }
    };

    const onAddBtnClick = (type) => {
        const id = getNewItemId(placementsRecords.placements);
        let model = modulesStore.createModel({
            item_id: id,
            type: 'Article',
            assignment: {
                type: 'selected',
                value: [
                    'Dashboard'
                ]
            },
            plugin: [{
                title: '',
                html: '',
                edit: true
            }]
        });

        model.setDirty();
        modulesStore.setData(model);

        const record = placementsStore.data[0];
        record.placements[1].unshift({ id: id });
        record.set(record.placements);
        record.setDirty();
    }

    const onSubmit = (data) => {
        const { username, password } = data;
        console.log(username, password);
        loginStore.proxy.login(data)
    }

    const LoginComponent = () => {
        return <Login loginPath={'/'} onLoginSubmit={onSubmit} />
    }

    return (
        <Router>
            <Modules
                placements={placementsRecords.placements}
                setPlacements={(placements) => {
                    let pal = placements;
                    if (placements.length < 3) {
                        pal = pal.concat([[]])
                    }
                    if (placements.length < 2) {
                        pal = pal.concat([[], []])
                    }
                    placementsRecords.set({
                        placements: pal
                    });
                    placementsRecords.setDirty();
                }}
                Components={{ Article, Login: LoginComponent}}
                onSaveBtnClick={onSaveBtnClick}
                onAddBtnClick={onAddBtnClick}
                editing={true}
                menuItems={['Article']}
                modules={modulesStore.data}
                records={records}
            />
        </Router>
    )
}
