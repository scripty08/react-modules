import { createStore } from '@scripty/react-store';

export default createStore({
    name: 'modulesStore',
    model: {
        fields: [
            { name: 'assignment', type: 'string' },
            { name: 'layout', type: 'array' },
        ]
    },
    proxy: {
        rootProperty: 'entries',
        api: {
            read: {
                url: '/layouts/read',
                method: 'get'
            },
            update: {
                url: '/layouts/update',
                method: 'post'
            },
            destroy: {
                url: '/layouts/destroy',
                method: 'post'
            }
        }
    }
});
