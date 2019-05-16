import React, { FunctionComponent } from "react";
import EditStatus from "./EditStatus";

const EditStatusPage: FunctionComponent = (props:any) => {
  return <EditStatus id={props.match.params.id} />;
};

export default EditStatusPage;
