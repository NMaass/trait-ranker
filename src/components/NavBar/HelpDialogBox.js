import React from "react";
import {Dialog, DialogContentText, DialogTitle, IconButton} from "@mui/material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const HelpDialogBox = () => {
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    }
    const handleOpen = () => {
        setOpen(true);
    }

    return(
        <div>
            <IconButton
                size="large"
                onClick={handleOpen}
            >
                <HelpOutlineIcon/>
            </IconButton>

        <Dialog
            onClose={handleClose}
            open = {open}
            maxWidth={"xl"}
            contentStyle={{margin:'100px'}}
        >
            <DialogTitle>Instructions</DialogTitle>
            <DialogContentText paragraph={true}>
                <br/>-Drag the traits into the stack you best describes how you feel about them
                <br/>- This is for your personal use so the definitions are subjective to you
            </DialogContentText>
        </Dialog>
        </div>
    )
}
export default HelpDialogBox;
