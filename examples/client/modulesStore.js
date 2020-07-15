import { createStore } from '@scripty/react-store';

export default createStore({
    name: 'routesStore',
    model: {
        fields: [
            { name: 'modules', type: 'array' },
            { name: 'layout', type: 'array' },
        ]
    },
    proxy: {
        rootProperty: 'entries',
        api: {
            findModules: {
                url: '/modules/findModules',
                method: 'get'
            },
            updateLayout: {
                url: '/modules/updateLayout',
                method: 'post'
            }
        }
    }
});
