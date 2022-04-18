import React from "react";
import DoneButton from "./DoneButton"
import Column from "./Column";
import styled from "styled-components";
import {DragDropContext} from "react-beautiful-dnd";

const Container = styled.div`
  display: flex;
`;



const SelectionPage = ({columnData, onDragEnd, setTopTraits, setColumnData, history}) =>{

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
                            <Container key={column.id}>
                                <Column column={column} traits={traits} setData={setColumnData} data={columnData} />
                            </Container>
                        )}
                        )}
                </Container>
            </DragDropContext>
            <DoneButton setTopTraits={setTopTraits} columnData={columnData} setColumnData={setColumnData} history={history}/>
        </div>
    )
};
export default SelectionPage;
