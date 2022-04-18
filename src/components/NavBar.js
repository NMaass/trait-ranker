import React from "react";
import {AppBar, Box, Button, IconButton, Toolbar} from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const NavBar = () => {
return(
    <Box sx={{flexGrow: 1}}>
        <AppBar position="fixed">
            <Toolbar>
                <Button
                color="inherit"
                >
                    Trait Ranker</Button>
                <IconButton
                    size="large"
                    style ={{marginLeft: 'auto'}}
                    >
                    <SettingsIcon/>
                </IconButton>
                <IconButton
                    size="large"
                >
                    <HelpOutlineIcon/>
                </IconButton>
            </Toolbar>
        </AppBar>
    </Box>
)
}
export default NavBar;
