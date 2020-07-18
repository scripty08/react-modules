import React from 'react';
import * as PropTypes from 'prop-types';
import { Card } from '@scripty/react-card';
import './Module.scss'

export const Module = (props) => {

    const {
        title,
        item,
        children
    } = props;

    return (
        <Card
            cardCls={'module card'}
            title={''}
        >
            {item.content}
        </Card>
    );
};

Module.defaultProps = {
    title: ''
}

Module.propTypes = {
    title: PropTypes.string
}
