import React from "react";
import {Button} from "@mui/material";

const SubmitButton = ({column, setColumn}) => {
    const onSubmit = () =>{
        setColumn(column)
    }
    return <Button onSubmit={onSubmit} />
};

export default SubmitButton;
