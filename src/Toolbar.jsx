import React from 'react';
import { AddButton, SaveButton } from '@scripty/react-buttons';
import { getItems } from './utils';
import './Toolbar.scss';

export const Toolbar = ({ state, setState, onSaveBtnClick, onAddBtnClick, editing }) => {
    if (editing) {
        return (
            <div className={'toolbar'}>
                <AddButton
                    onClick={() => {
                       // setState([...state, getItems(1)]);
                        onAddBtnClick(state);
                    }}
                >
                    Add
                </AddButton>
                <SaveButton onClick={onSaveBtnClick}/>
            </div>
        )
    }

    return null;
};
