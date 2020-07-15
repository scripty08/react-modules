import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import 'react-simple-flex-grid/lib/main.css';
import { Col, Row } from 'react-simple-flex-grid';
import { reorder, move, colLayout, getListStyle, getItemStyle, getItems, onDragEndHelper } from './utils';
import { Button } from '@scripty/react-buttons';
import './Layout.scss';

export const Layout = (props) => {
    const { state, setState } = props;

    const onDragEnd = (result) => {
        onDragEndHelper(result, state, setState);
    }

    const onDeleteButtonClick = (ind, index) => {
        const newState = [...state];
        newState[ind].splice(index, 1);
        setState(
            newState.filter(group => group.length)
        );
    }

    const getDeleteButton = (ind, index) => {
        return (
            <Button
                style={{
                    height: 30
                }}
                className={'deleteBtn'}
                onClick={onDeleteButtonClick.bind(null, ind, index)}
            >
                delete
            </Button>
        );
    }

    return (
        <div className={'content-container'}>
            <div>
                <button
                    type="button"
                    onClick={() => {
                        setState([...state, []]);
                    }}
                >
                    Add new group
                </button>
                <button
                    type="button"
                    onClick={() => {
                        setState([...state, getItems(1)]);
                    }}
                >
                    Add new item
                </button>
                <Row style={{ display: 'flex' }}>
                    <DragDropContext onDragEnd={onDragEnd}>
                        {state.map((el, ind) => {

                            let coller = colLayout.logo;

                            if (ind === 1) {
                                coller = colLayout.flyout;
                            }

                            if (ind === 2) {
                                coller = colLayout.extra;
                            }

                            return (<Col {...coller}>
                                    <Droppable key={ind} droppableId={`${ind}`}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                style={getListStyle(snapshot.isDraggingOver)}
                                                {...provided.droppableProps}
                                            >
                                                {el.map((item, index) => (
                                                    <Draggable
                                                        key={item.id}
                                                        draggableId={item.id}
                                                        index={index}
                                                    >
                                                        {(provided, snapshot) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                style={getItemStyle(
                                                                    snapshot.isDragging,
                                                                    provided.draggableProps.style
                                                                )}
                                                            >
                                                                <div>
                                                                    {item.content}

                                                                </div>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </Col>
                            )
                        })}
                    </DragDropContext>
                </Row>
            </div>
        </div>
    );
}
