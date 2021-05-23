import React, { useEffect, useState } from "react";
import axios from 'axios';
let BILLS_ENDPOINT = "http://localhost:3030/bills/";

const SideBar = ({currentState}) => {
    const [allData, setAllData] = useState(null);
    const [state, setState] = useState(null);
    
    useEffect(() => {
        if(currentState){
            BILLS_ENDPOINT += "WY";
            console.log("About to get bills");
            axios.get(BILLS_ENDPOINT)
            .then((res) => {
                console.log(res);
                setAllData(res);
            }).catch((err) => {
                console.error(err);
            });
        }
        console.log("### " + currentState)
    }, [currentState, allData]);

    if(allData != null){
        return (
            <div className="infoBar">
                <div className="bill-head">
                    <h4>Showing Bills For</h4>
                    <h4 className="currState">{currentState}</h4>
                </div>
                <div className="bill-body">
                    {
                        allData.data.suppression.map((bill, index) => {
                            {console.log("&&&& " + JSON.stringify(bill))}
                            <div>
                                <h6>{bill.bill_id}</h6>
                                <p>{bill.subject}</p>
                            </div>
                        })
                    }
                </div>
                
            </div>
        )
    } 
    else {
        return(
            <div className="infoBar">
             <div className="bill-head">
                <h4>No Bills Found For</h4>
                <h4 className="currState">{currentState}</h4>
            </div>
        </div>
        )
        
    }
};

export default SideBar;