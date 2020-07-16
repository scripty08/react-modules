import React from 'react';
import { Layout } from './Layout';

export const Modules = (props) => {

    const { layout = 'default', ...restProps } = props;

    switch (layout) {
        case 'layout1':
            return 'ToDo: implement more layouts';
        default:
            return <Layout {...restProps} />;
    }
}

