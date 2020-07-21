import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import './Module.scss'

export const Module = (props) => {
    const {
        children,
        item_id,
        modules,
        placements,
        index,
        records,
        Components
    } = props;

    let componentType = '';

    let bla = modules.filter((rec) => {
       if (rec.item_id === item_id) {
           componentType = rec.type;
           return rec;
       }
    });


    if (bla.length > 0) {

        const Component = Components[componentType];

        return (
            <Component
                {...bla[0].plugin[0]}
                item_id={item_id}
            />
        );
    }

    return null;
};


