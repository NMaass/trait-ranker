import React from "react";
import SkipButton from "./SkipButton";
import Column from "./Column";
import styled from "styled-components";
import {DragDropContext} from "react-beautiful-dnd";

const Container = styled.div`
  display: flex;
`;


const SelectionPage = ({columnData, onDragEnd}) =>{
    return(
        <div>
            <SkipButton column={columnData.columns.column2}/>
            <DragDropContext onDragEnd={onDragEnd}>
                <Container>
                    {columnData.columnOrder.map(columnId => {
                        const column = columnData.columns[columnId];
                        const traits = column.traitIds.map(traitId => {
                            return columnData.traits[traitId]
                        });
                        return <Column key={column.id} column={column} traits={traits} />
                    })}
                </Container>
            </DragDropContext>
        </div>
    )
};
export default SelectionPage;
