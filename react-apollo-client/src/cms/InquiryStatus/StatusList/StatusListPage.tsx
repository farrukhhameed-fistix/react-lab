import React, {Component} from "react";
import StatusListContainer from "./StatusListContainer";


export default class StatusListPage extends Component<any,any>{
    constructor(props: any){
        super(props)
    }

    render(){
        return(
            <React.Fragment>
                <StatusListContainer />
            </React.Fragment>
        );
    }
}     