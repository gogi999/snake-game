import React from 'react';

const AppHeader = () => {
    return (
        <nav className="nav-wraper deep-purple lighten-1">
            <div className="container">
                <h3 
                    className="brand-logo"
                    style={{ marginTop: "15px" }}
                >
                    Snake Game
                </h3>
            </div>
        </nav>
    );
}

export default AppHeader;
