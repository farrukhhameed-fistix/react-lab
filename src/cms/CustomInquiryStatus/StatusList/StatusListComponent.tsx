import React, { Component } from "react";
import {connect} from 'react-redux'

import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";

import { FetchListRequest, FetchListRequestSucceed } from "./actions";
import { InquiryStatusModel } from "./InquiryStatusModel";
import StatusListItem from "./statusListItem";
import { ApplicationState } from "../../../store";

interface IState {
   readonly Statuses: Array<InquiryStatusModel>;
}

interface IProp {
  message: string;
  Statuses: InquiryStatusModel[]
  FetchListRequestSucceed: (payload:InquiryStatusModel[])=>{};
}
class StatusListComponent extends Component<IProp, IState> {
  constructor(props: IProp) {
    super(props);
    this.state = this.getInItState(props);
  }

  private unSubscribeStoreListener!: () => {};

  getInItState(props: IProp): IState {
    let statuses = new Array<InquiryStatusModel>();

    // statuses.push(new InquiryStatusModel(1, "stats 1", "#123456"));

    // statuses.push(new InquiryStatusModel(2, "stats 2", "#123456"));
    // statuses.push(new InquiryStatusModel(3, "stats 3", "#123456"));
    return {
      Statuses: statuses
    };
  }



  componentDidMount=()=>{

    // this.unSubscribeStoreListener = window.store.subscribe(()=> this.setState({Statuses: window.store.getState().inquiryStatusList.statuses}));
    
    let statuses = new Array<InquiryStatusModel>();
    statuses.push(new InquiryStatusModel(1, "stats 1", "#123456"));
    statuses.push(new InquiryStatusModel(2, "stats 2", "#123456"));
    statuses.push(new InquiryStatusModel(3, "stats 3", "#123456"));
    
    // window.store.dispatch(FetchListRequest());
    // window.store.dispatch(FetchListRequestSucceed(statuses));
    this.props.FetchListRequestSucceed(statuses);
  }

  render() {
    return (
      <React.Fragment>
        <div className="animated fadeIn">
          <Row>
            <Col xl={6}>
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify" /> Inquiry Statuses
                </CardHeader>
                <CardBody>
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th scope="col">id</th>
                        <th scope="col">title</th>
                        <th scope="col">description</th>
                        <th scope="col">color</th>
                        <th scope="col">order</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.Statuses.map((status, index) => (
                        <StatusListItem key={index} {...status} />
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }

  componentWillUnmount= () =>{
    // this.unSubscribeStoreListener();
  }
}

const mapStateToProps = (state: ApplicationState) => {
  return{
    Statuses: state.InquiryStatus.inquiryStatusList.statuses
  }
}

const mapDispatchToProps = {
  FetchListRequest, 
  FetchListRequestSucceed
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusListComponent)
