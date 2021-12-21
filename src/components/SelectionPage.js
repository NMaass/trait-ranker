import React, {useState} from "react";
import SkipButton from "./SkipButton";
import Column from "./Column";
import styled from "styled-components";
import {DragDropContext} from "react-beautiful-dnd";

const Container = styled.div`
  display: flex;
`;



const SelectionPage = ({columnData, onDragEnd, setTopTraits, setData, data}) =>{

    return(
        <div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Container>
                    {columnData.columnOrder.map(columnId => {
                        const column = columnData.columns[columnId];
                        const traits = column.traitIds.map(traitId => {
                            return columnData.traits[traitId]
                        });
                        return (
                            <Container>
                                    <Column key={column.id} column={column} traits={traits} />
                                    <SkipButton column={column} id={columnId} setData={setData} data={data} />
                            </Container>
                        )}
                        )}
                </Container>
            </DragDropContext>
        </div>
    )
};
export default SelectionPage;
