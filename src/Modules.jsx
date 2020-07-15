import React from 'react';

export const getModule = (placements) => {
    Object.keys(placements).forEach((key) => {
        placements[key].map((placement) => {
            delete placement['content']
        });
    });

    return placements;
};

export const updatePlacements = (modules, layouts, components) => {
    return layouts.map((record) => {
        let blub = record.map((layout, idx) => {
            let jo = modules.map((rec, index) => {
                const Component = components[rec.type];
                if (layout.id === 'item-' + index) {
                    if (Component) {
                        const Component = components[rec.type];
                        const plugin = rec.plugin[0];

                        return { id: layout.id, content: <Component {...plugin}/> };

                    } else {
                        return null;
                    }
                }

            }).filter(mapped => typeof mapped !== 'undefined' && mapped !== null);
            return jo[0];
        }).filter(mapped => typeof mapped !== 'undefined' && mapped !== null);
        return blub;
    })
};
