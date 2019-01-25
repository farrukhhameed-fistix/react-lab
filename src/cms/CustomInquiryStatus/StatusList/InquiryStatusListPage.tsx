import React, {Component} from "react";
import StatusListComponent from "./StatusListComponent";


export default class InquiryStatusListPage extends Component<any,any>{
    constructor(props: any){
        super(props)
    }

    render(){
        return(
            <React.Fragment>
                <StatusListComponent />
            </React.Fragment>
        );
    }
}     