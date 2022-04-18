import React from "react";
import {AppBar, Box, Button, IconButton, Toolbar} from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';

import HelpDialogBox from "./HelpDialogBox";
import BackButton from "./BackButton";
import HomeButton from "./HomeButton";


const NavBar = ({history}) => {
return(
    <Box sx={{flexGrow: 1}}>
        <AppBar position="fixed">
            <Toolbar>
                <BackButton history={history}/>
                <HomeButton history={history} style={{marginLeft: "auto"}}/>
                <IconButton
                    size="large"
                    style ={{marginLeft: 'auto'}}
                    >
                    <SettingsIcon/>
                </IconButton>
                <HelpDialogBox/>
            </Toolbar>
        </AppBar>
    </Box>
)
}
export default NavBar;
