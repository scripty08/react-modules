import React, { useState } from 'react';

// fake data generator
export const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        content: `<div>item ${k + offset}</div>`
    }));

// a little function to help us with reordering the result
export const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
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
