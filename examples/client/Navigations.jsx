import React from 'react';
import { Card } from '@scripty/react-card';

export const Navigations = (props) => {

    const { title, html } = props;

    return (
        <Card title={title}>
            <div dangerouslySetInnerHTML={{ __html: html }} />
        </Card>
    );
};
