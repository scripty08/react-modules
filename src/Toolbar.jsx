import React from 'react';
import { MenuButton, SaveButton } from '@scripty/react-buttons';
import './Toolbar.scss';

export const Toolbar = ({ onSaveBtnClick, onAddBtnClick, editing, modules }) => {

    if (editing) {

        const onClick = (type) => {
            onAddBtnClick(type);
        }

        const getLinks = () => {
            return modules.map((module, idx) => {
                return (
                    <a key={idx} onClick={onClick.bind(null, module)} aria-current={'page'} href={'#'}
                       className={'active'}>{module}</a>
                )
            })
        }

        return (
            <div className={'modules-toolbar'}>
                <MenuButton
                    items={getLinks()}>
                    Add
                </MenuButton>

                <SaveButton onClick={() => {
                    // setState([...state, getItems(1)]);
                    onSaveBtnClick();
                }}/>
            </div>
        )
    }

    return null;
};
