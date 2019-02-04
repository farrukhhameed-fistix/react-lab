import React, { FunctionComponent, Fragment, PureComponent } from "react";
import {
  Card,
  CardHeader,
  CardBody,  
  Label,
  Input,
  FormFeedback,
  FormGroup,
  Spinner,
  Row,
  Col,
  CustomInput,
  Button
} from "reactstrap";

import { Formik, Field, Form, FormikActions, ErrorMessage } from 'formik';
import {SketchPicker} from 'react-color';
import * as Yup from 'yup';
import { StatusModel } from "./StatusModel";

interface IProp {
  formMode: string;
  statusModel: StatusModel;
  isTitleUnique?: boolean;
  isTitleUniuqueVerifyRequestInProgress?: boolean;
  verifyUniqueTitle: (title: string) => void;
  saveStatus: (model:StatusModel) => void;
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

class EditableStatus1 extends PureComponent<IProp, IState> {
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
              <Row>
                <Col xs="10" sm="11">
              <Label htmlFor="title">Title</Label> 
              </Col>
              <Col xs="2" sm="1">
              { this.props.isTitleUniuqueVerifyRequestInProgress &&            
                <Spinner size="sm" color="primary"/>
              }    
              </Col>
              </Row>                                       
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


const EditableStatus: React.FunctionComponent<IProp> = (props:IProp) => {

  return <Card>
    <CardHeader>
      <strong>{props.formMode}</strong> Status
        </CardHeader>
    <CardBody>
      <Formik

        initialValues={props.statusModel}
        onSubmit={(values: StatusModel, { setSubmitting }: FormikActions<StatusModel>) => {
          console.log(values);
          props.saveStatus(values);
        }}
         

        validationSchema={Yup.object().shape({
          id: Yup.string().required(),
          title: Yup.string().min(9).required()
        })}

        render={(formProps) => (
          <Form>
            <FormGroup>
              <Label htmlFor="id">Code</Label>
              <Input
                type="text"
                id="id"
                valid={(!formProps.errors || !formProps.errors.id)}
                invalid={formProps.touched && formProps.touched.id && formProps.errors && (formProps.errors.id || '').length > 0}
                value={formProps.values.id}
                onChange={e => {
                  formProps.handleChange(e); 
                  //this.updateFieldValue("title", e.target.value)
                }}
                readOnly
              />
            </FormGroup>
            <FormGroup>
              <Row>
                <Col xs="10" sm="11">
              <Label htmlFor="title">Title</Label> 
              </Col>
              <Col xs="2" sm="1">
              { props.isTitleUniuqueVerifyRequestInProgress &&            
                <Spinner size="sm" color="primary"/>                
              }    
              </Col>
              </Row>                                       
              <Input
                type="text"
                id="title"
                required
                invalid={formProps.touched && formProps.touched.title && formProps.errors && (formProps.errors.title || '').length > 0}
                value={formProps.values.title}
                onChange={e => {
                  formProps.handleChange(e); 
                  //this.updateFieldValue("title", e.target.value)
                }}
                onBlur={ e => {
                  formProps.handleBlur(e);
                  // this.validateTitle
                  if (!formProps.errors.title &&
                    props.statusModel.title.toLowerCase() !=
                    formProps.values.title.trim().toLowerCase()
                  ) {
                    props.verifyUniqueTitle(formProps.values.title);
                  }
                }
              }
              />               
              <FormFeedback invalid="true" className="help-block">
                Please provide valid title
              </FormFeedback>
            </FormGroup>
            <FormGroup>              
              <Label htmlFor="isActive">Active</Label>             
              <CustomInput type="switch" id="isActive" name="isActive" 
                onChange={
                  e=>{
                   formProps.handleChange(e);
                  }
                }
                value={
                  formProps.values.isActive ? "true" : "false"
                }
              />                                                  
              
            </FormGroup>
            <FormGroup>
              <Label htmlFor="description">Description</Label>
              <Input
                type="textarea"
                id="description"                
                invalid={formProps.touched && formProps.touched.description && formProps.errors && (formProps.errors.description || '').length > 0}
                value={formProps.values.description}
                onChange={formProps.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="color">Color</Label>
              <SketchPicker
                id="color"
                name="color"
                type="color"
                color={formProps.values.color}
                onChangeComplete={(color:any) => {
                  formProps.setFieldValue("color", color.hex)
                }}
              />             
            </FormGroup>
            <div className="form-actions">
              <Button type="submit" color="primary">Save changes</Button>
              <Button color="secondary">Cancel</Button>
            </div>
            
          </Form>
        )}
        />

    </CardBody>
  </Card>
}

export default EditableStatus;
