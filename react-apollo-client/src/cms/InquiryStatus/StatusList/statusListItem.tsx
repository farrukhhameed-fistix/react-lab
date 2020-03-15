import React from "react";
import { InquiryStatusModel } from "./InquiryStatusModel";
import { Link } from "react-router-dom";

const StatusListItem: React.SFC<InquiryStatusModel> = (props) =>{
    const statusModel = props;
    const statusLink = `/cms/settings/inquiry-status/edit/${statusModel.id}`
    return <tr key={statusModel.id.toString()}>
    <th scope="row"><Link to={statusLink}>{statusModel.id}</Link></th>
    <td><Link to={statusLink}>{statusModel.title}</Link></td>
    <td>{statusModel.description}</td>
    <td>{statusModel.color}</td>
    <td><Link to={statusLink}>{statusModel.orderIndex}</Link></td>
  </tr>
}

export default StatusListItem;