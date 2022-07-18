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
            style={{borderRadius: 0}}
        >
            <DialogContentText paragraph={false} style={{margin: "24px"}}>
                <br/>1. Drag traits to the left or right depending on whether you value them.<br/>
                <br/>2. Click on the traits you value more.<br/>
                <br/>3. Click the share buttons to show your friends!<br/>
            </DialogContentText>
        </Dialog>
        </div>
    )
}
export default HelpDialogBox;
