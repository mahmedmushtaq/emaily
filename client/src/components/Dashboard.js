import React from "react";
import {Link} from "react-router-dom";

class Dashboard extends React.Component{
    render() {
        return(
            <div className={"container"}>
                Dashboard
                <div className="fixed-action-btn">
                    <Link to={"/surveys/new"} className="btn-floating red btn-large">
                        <i className="material-icons">add</i>
                    </Link>
                </div>
            </div>
        )
    }
}

export default Dashboard;