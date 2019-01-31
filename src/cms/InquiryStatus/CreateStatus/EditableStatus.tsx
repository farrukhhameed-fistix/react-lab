import React, { FunctionComponent, Fragment, PureComponent } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Form,
  Label,
  Input,
  FormFeedback,
  FormGroup
} from "reactstrap";
import { StatusModel } from "./StatusModel";

interface IProp {
  formMode: string;
  statusModel: StatusModel;
  isTitleUnique?: boolean;
  isTitleUniuqueVerifyRequestInProgress?: boolean;
  verifyUniqueTitle: (title: string) => void;
}

interface IState {
  statusModel: StatusModel;
  touchFields: ITouchField;
}

interface ITouchField {
  title: boolean;
  description: boolean;
  isActive: boolean;
  color: boolean;
}

class EditableStatus extends PureComponent<IProp, IState> {
  constructor(props: IProp) {
    super(props);
    this.state = this.inItState(props);
  }

  inItState(props: IProp): IState {
    return {
      statusModel: props.statusModel,
      touchFields: {
        title: false,
        description: false,
        isActive: false,
        color: false
      }
    };
  }

  isValidId() {
    return (
      this.props.formMode == "Create" &&
      (!this.state.statusModel.id || this.state.statusModel.id == 0)
    );
  }

  isValidTitle() {
    return this.state.statusModel.title &&
      this.state.statusModel.title.length >= 3 &&
      this.state.statusModel.title.length <= 10
      ? true
      : false;
  }

  validateTitle = () => {
    if (
      this.props.statusModel.title.toLowerCase() !=
      this.state.statusModel.title.trim().toLowerCase()
    ) {
      this.props.verifyUniqueTitle(this.state.statusModel.title.trim());
    }
  };

  updateFieldValue(fieldName: string, value: any) {
    this.setState((prevState, props) => ({
      statusModel: Object.assign({}, prevState.statusModel, {
        [fieldName]: value
      }),
      touchFields: Object.assign({}, prevState.touchFields, {
        [fieldName]: true
      })
    }));
  }

  render() {
    return (
      <Card>
        <CardHeader>
          <strong>{this.props.formMode}</strong> Status
        </CardHeader>
        <CardBody>
          <Form>
            <FormGroup>
              <Label htmlFor="code">Code</Label>
              <Input
                type="text"
                id="code"
                valid={this.isValidId()}
                invalid={!this.isValidId()}
                value={this.state.statusModel.id}
                readOnly
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                id="title"
                required
                invalid={
                  this.state.touchFields.title && this.isValidTitle() == false
                }
                value={this.state.statusModel.title}
                onChange={e => this.updateFieldValue("title", e.target.value)}
                onBlur={this.validateTitle}
              />
              <FormFeedback invalid="true" className="help-block">
                Please provide valid title
              </FormFeedback>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    );
  }
}

export default EditableStatus;
