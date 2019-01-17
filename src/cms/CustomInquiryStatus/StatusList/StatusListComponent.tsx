import React, { Component } from "react";
import { InquiryStatusModel } from "./InquiryStatusModel";
import StatusListItem from "./statusListItem";
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";

interface IState {
  Statuses: Array<InquiryStatusModel>;
}

interface IProp {
  message: string;
}
export default class StatusListComponent extends Component<IProp, IState> {
  constructor(props: IProp) {
    super(props);
    this.state = this.getInItState(props);
  }

  getInItState(props: IProp): IState {
    let statuses = new Array<InquiryStatusModel>();

    statuses.push(new InquiryStatusModel(1, "stats 1", "#123456"));

    statuses.push(new InquiryStatusModel(2, "stats 2", "#123456"));
    statuses.push(new InquiryStatusModel(3, "stats 3", "#123456"));
    return {
      Statuses: statuses
    };
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
                      {this.state.Statuses.map((status, index) => (
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
}
