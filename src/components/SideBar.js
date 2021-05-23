import React, { useEffect } from "react";

const SideBar = ({currentState}) => {

    useEffect(() => {
        
        console.log("### " + currentState)
    }, [currentState]);

    return (
        <div>
            <h4>Current State: {currentState}</h4>
        </div>
    );
};

export default SideBar;