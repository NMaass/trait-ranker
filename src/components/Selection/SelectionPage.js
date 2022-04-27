import React from "react";
import DoneButton from "./DoneButton"
import Column from "./Column";
import {DragDropContext} from "react-beautiful-dnd";
import {Grid} from "@mui/material";




const SelectionPage = ({columnData, onDragEnd, topTraits, setTopTraits, setColumnData, history}) =>{

    return(
        <div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Grid container>
                    {

                        columnData.columnOrder.map(columnId => {
                        const column = columnData.columns[columnId];
                        return (
                            <Grid item key={column.id}>
                                <Column column={column} traits={column.traitIds} setData={setColumnData} data={columnData} />
                            </Grid>
                        )}
                        )}
                </Grid>
            </DragDropContext>
            <Grid container
                  alignItems='center'
                  justifyContent="center"
            >
                <Grid item >
                    <DoneButton
                        topTraits={topTraits}
                        setTopTraits={setTopTraits}
                        columnData={columnData}
                        setColumnData={setColumnData}
                        history={history}/>
                </Grid>
            </Grid>

        </div>
    )
};
export default SelectionPage;
