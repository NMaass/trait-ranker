import React, {useEffect, useState} from "react";
import DoneButton from "./DoneButton"
import Column from "./Column";
import styled from "styled-components";
import {DragDropContext} from "react-beautiful-dnd";

const Container = styled.div`
  display: flex;
`;



const SelectionPage = ({columnData, onDragEnd, topTraits, setTopTraits, setColumnData, history}) =>{

    return(
        <div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Container>
                    {

                        columnData.columnOrder.map(columnId => {
                        const column = columnData.columns[columnId];
                        return (
                            <Container key={column.id}>
                                <Column column={column} traits={column.traitIds} setData={setColumnData} data={columnData} />
                            </Container>
                        )}
                        )}
                </Container>
            </DragDropContext>
            <DoneButton
                topTraits={topTraits}
                setTopTraits={setTopTraits}
                columnData={columnData}
                setColumnData={setColumnData}
                history={history}/>
        </div>
    )
};
export default SelectionPage;
