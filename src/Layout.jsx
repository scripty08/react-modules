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
import { Module } from './Module';


export const Layout = (props) => {
    const { placements, setPlacements, onSaveBtnClick, onAddBtnClick, editing = false, menuItems, modules, records, Components} = props;

    const onDragEnd = (result) => {
        onDragEndHelper(result, placements, setPlacements);
    }

    const getCols = (idx) => {
        switch (idx) {
            case 1:
                return colLayout.flyout;
            case 2:
                return colLayout.extra;
            default:
                return colLayout.logo;
        }
    }

    const snapshot = (el, idx) => {
        return (provided, snapshot) => {
            return (
                <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                    {...provided.droppableProps}
                >
                    {getDraggable(el)}
                    {provided.placeholder}
                </div>
            )
        }
    }

    const getModule = (item, index) => {
        return (provided, snapshot) => {
            return (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                    )}
                >
                    <Module editing={editing} placements={placements} item_id={item.id} modules={modules} index={index} records={records} Components={Components} />
                </div>
            )
        }
    }

    const getDraggable = (el) => {
        return el.map((item, index) => {
            return (
                <Draggable
                    isDragDisabled={!editing}
                    key={item.id}
                    draggableId={item.id}
                    index={index}
                >
                    {getModule(item, index)}
                </Draggable>
            )
        })
    }

    const getDroppable = () => {
        return placements.map((el, idx) =>  {
            return (
                <Col {...getCols(idx)} key={idx}>
                    <Droppable isDropDisabled={!editing} droppableId={`${idx}`}>
                        {snapshot(el, idx)}
                    </Droppable>
                </Col>
            )
        })
    }

    return (
        <div className={'content-container'}>
            <Toolbar
                placements={placements}
                setPlacements={setPlacements}
                onSaveBtnClick={onSaveBtnClick.bind(null, placements)}
                onAddBtnClick={onAddBtnClick}
                editing={editing}
                menuItems={menuItems}
            />
                <Row style={{ display: 'flex' }}>
                    <DragDropContext onDragEnd={onDragEnd}>
                        {getDroppable()}
                    </DragDropContext>
                </Row>
        </div>
    );
}
