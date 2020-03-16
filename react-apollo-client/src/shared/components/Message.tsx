import React, { FunctionComponent, Fragment } from "react";
import { Alert } from "reactstrap";

export enum MessageType {
  success = "primary",
  error = "danger",
  info = "info"
}

interface IProp {
  messages: IMessage[];
}
export interface IMessage {
  type: MessageType;
  message: string;
}
export const Message: FunctionComponent<IProp> = props => {
  return (
    <Fragment>
      {props.messages &&
        props.messages.map((message, index) => {
          return <Alert key={index} color={message.type}>{message.message}</Alert>;
        })}
    </Fragment>
  );
};
