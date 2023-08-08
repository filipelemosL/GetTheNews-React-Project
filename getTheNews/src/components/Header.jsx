import React from "react";
import '../styles/header.css';

function Header (){
    return(
        <>
            <div className='header'>
                <h1 className ='title'>GetTheNews</h1>
                <input className='searchBar' type='text' />
                <button className='button' type='submit'>Search</button>
            </div>
        </>
    )
}

export default Header;