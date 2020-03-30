import React from "react";

/*  The component retruns breadcrumbs shown at the top left corner
    help the user in navigating across screens
*/
export const BreadCrumbs = (props) => {

    return(
        <div className="view-navigator" style={{display: "flex"}}>
            <div className="active" onClick={ () => props.changeViewComponent("repo", "")}>Back to Repositories</div>
            <div> > </div>
            <div>Commits for {props.repoSelected}</div>
        </div>
    )

};

export default BreadCrumbs;