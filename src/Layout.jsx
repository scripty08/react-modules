import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import 'react-simple-flex-grid/lib/main.css';
import { Col, Row } from 'react-simple-flex-grid';
import {
    colLayout,
    getListStyle,
    getItemStyle,
    onDragEndHelper,
    DeleteButton, EditButton
} from './utils';

import { Toolbar } from './Toolbar';
import './Layout.scss';

export const Layout = (props) => {
    const { state, setState, onSaveBtnClick, onEditBtnClick, onAddBtnClick, editing = false} = props;

    const onDragEnd = (result) => {
        onDragEndHelper(result, state, setState);
    }

    return (
        <div className={'content-container'}>
            <Toolbar
                state={state}
                setState={setState}
                onSaveBtnClick={onSaveBtnClick}
                onAddBtnClick={onAddBtnClick}
                editing={editing}
            />
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

                            return (<Col {...coller} key={ind}>
                                    <Droppable isDropDisabled={!editing} droppableId={`${ind}`}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                style={getListStyle(snapshot.isDraggingOver)}
                                                {...provided.droppableProps}
                                            >
                                                {el.map((item, index) => (
                                                    <Draggable
                                                        isDragDisabled={!editing}
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
                                                                <div style={{position: 'relative'}}>
                                                                    {item.content}
                                                                    <EditButton editing={editing} onEditButtonClick={onEditBtnClick} />
                                                                    <DeleteButton
                                                                        ind={ind}
                                                                        index={index}
                                                                        state={state}
                                                                        setState={setState}
                                                                        editing={editing}
                                                                    />
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
    );
}
