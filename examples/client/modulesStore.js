import { createStore } from '@scripty/react-store';

export default createStore({
    name: 'modulesStore',
    model: {
        fields: [
            { name: 'modules', type: 'array' },
            { name: 'placements', type: 'array' },
        ]
    },
    proxy: {
        rootProperty: 'entries',
        api: {
            findModules: {
                url: '/modules/findModules',
                method: 'get'
            },
            updatePlacements: {
                url: '/modules/updatePlacements',
                method: 'post'
            },
            updateModule: {
                url: '/modules/updateModule',
                method: 'post'
            }
        }
    }
});
