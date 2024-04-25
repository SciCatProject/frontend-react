import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import scicatLogo from '../../assets/scicat-logo-white.png'
import essLogo from '../../assets/esslogo-white.png'

const Header: React.FC = () => {
    return (
        <AppBar position="static" style={{ backgroundColor: '#0099C8' }}>
            <Toolbar style={{ justifyContent: 'space-between', height: '4rem' }}>
                <div>
                    <img className='img' src={scicatLogo} alt="" />
                    <img style={{ paddingBottom: '15px', width: '7rem' }} className='img' src={essLogo} alt="" />
                </div>
                <div>
                    <a href="">Help</a>
                    <a href="">About</a>
                    <a href="">Sign in</a>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Header;