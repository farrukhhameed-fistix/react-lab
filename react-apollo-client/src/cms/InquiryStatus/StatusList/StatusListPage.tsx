import React, {Component} from "react";
import StatusListComponent from "./StatusListComponent";


export default class StatusListPage extends Component<any,any>{
    constructor(props: any){
        super(props)
    }

    render(){
        return(
            <React.Fragment>
                <StatusListComponent statuses={[]} showLoader={false} errors={[]}/>
            </React.Fragment>
        );
    }
}     