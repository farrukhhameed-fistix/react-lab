import React from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Spinner } from "reactstrap";
import { Message, IMessage, MessageType } from "../../../shared/components/Message";
import { Link, useRouteMatch } from "react-router-dom";
import { InquiryStatusModel } from './InquiryStatusModel';
import StatusListItem from "./StatusListItem";


interface IProps {
    statuses: Array<InquiryStatusModel>;
    showLoader: boolean;
    errors: string[]
  }

const StatusListComponent: React.SFC<IProps> = ({showLoader, errors, statuses}) =>{

    let match = useRouteMatch();
    let messages: IMessage[] = errors ? errors.map(error => { return { type: MessageType.error, message: error } }) : [];

    return (
        <React.Fragment>        
        <div className="animated fadeIn">
          <Row>
            <Col xl={12}>
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify" /> Inquiry Statuses
                  <div className="card-header-actions">
                    <Link to={`${match.url}/create`}>
                      <Button color="primary" className="px-4">Create</Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardBody>
                  {showLoader && <Spinner size="sm" color="primary"/>}  
                  {errors && <Message messages = {messages}></Message>}  
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
                      {statuses && statuses.map((status, index) => (
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

export default StatusListComponent;