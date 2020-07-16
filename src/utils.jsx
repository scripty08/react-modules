import React, { useState, Fragment } from 'react';
import {
    DeleteButton as ScriptyDeleteButton,
    EditButton as ScriptyEditButton,
} from '@scripty/react-buttons';

export const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        content: `<div>item ${k + offset}</div>`
    }));

export const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 2;

export const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'transparent',

    // styles we need to apply on draggables
    ...draggableStyle
});

export const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'transparent',
    padding: grid,
    width: '100%'
});

export const colLayout = {
    logo: {
        xs: 2, sm: 2, md: 2, lg: 2, xl: 2
    },
    flyout: {
        xs: 10, sm: 10, md: 10, lg: 10, xl: 8
    },
    extra: {
        xs: 10, sm: 10, md: 10, lg: 10, xl: 2
    }
};

export const onDragEndHelper = (result, state, setState) => {
    const { source, destination } = result;
    if (!destination) {
        return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
        const items = reorder(state[sInd], source.index, destination.index);
        const newState = [...state];
        newState[sInd] = items;
        setState(newState);
    } else {
        const result = move(state[sInd], state[dInd], source, destination);
        const newState = [...state];
        newState[sInd] = result[sInd];
        newState[dInd] = result[dInd];

        setState(newState.filter(group => group.length));
    }
}

const onDeleteButtonClick = (ind, index, state, setState) => {
    const newState = [...state];
    newState[ind].splice(index, 1);
    setState(
        newState.filter(group => group.length)
    );
}

export const DeleteButton = ({ ind, index, state, setState, editing }) => {
    if (editing) {
        return (
            <ScriptyDeleteButton
                iconBtn
                color={'white'}
                style={{
                    position: 'absolute',
                    top: 10,
                    right: 5
                }}
                onClick={onDeleteButtonClick.bind(null, ind, index, state, setState)}
            >
                delete
            </ScriptyDeleteButton>
        );
    }
    return null;
}

export const EditButton = ({ onEditBtnClick, editing }) => {
    if (editing) {
        return (
            <ScriptyEditButton
                iconBtn
                color={'white'}
                style={{
                    position: 'absolute',
                    top: 10,
                    right: 36
                }}
                onClick={onEditBtnClick}
            >
                delete
            </ScriptyEditButton>
        );
    }
    return null;
}

export const cleanPlacements = (placements) => {
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
