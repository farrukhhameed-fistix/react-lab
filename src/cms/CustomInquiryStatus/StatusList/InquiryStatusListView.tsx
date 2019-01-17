import React, {Component} from "react";
import StatusListComponent from "./StatusListComponent";


export default class InquiryStatusListView extends Component<any,any>{
    constructor(props: any){
        super(props)
    }

    render(){
        return(
            <React.Fragment>
                <StatusListComponent message="Hello World"/>
            </React.Fragment>
        );
    }
}     