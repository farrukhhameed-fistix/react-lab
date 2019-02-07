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

import { Formik, Field, Form, FormikActions, ErrorMessage, FormikProps, FormikValues } from 'formik';
import {SketchPicker} from 'react-color';
import * as Yup from 'yup';
import { StatusModel } from "./StatusModel";
import IApiCallState from "../ApiCallState";

interface IProp {
  formMode: string;
  statusModel: StatusModel;
  isTitleUnique?: boolean;
  //isTitleUniuqueVerifyRequestInProgress?: boolean;
  saveApiCallStatus: IApiCallState;
  uniqueTitleVerifyApiCallStatus: IApiCallState;

  verifyUniqueTitle: (title: string) => void;
  saveStatus: (model:StatusModel) => void;  
}

interface ICombineProp{
  parentProps: IProp;
  formikProps: FormikProps<StatusModel>
}
const EditableStatusFormikForm = ({formikProps, parentProps} : ICombineProp) => (
  <Card>
    <CardHeader>
      <strong>{parentProps.formMode}</strong> Status
    </CardHeader>
    <CardBody>
      <Form>
        <FormGroup>
          <Label htmlFor="id">Code</Label>
          <Input
            type="text"
            id="id"          
            value={formikProps.values.id}
            readOnly
          />
        </FormGroup>
        <FormGroup>
          <Row>
            <Col xs="10" sm="11">
          <Label htmlFor="title">Title</Label> 
          </Col>
          <Col xs="2" sm="1">
          { parentProps.uniqueTitleVerifyApiCallStatus.isRequestInProgress &&            
            <Spinner size="sm" color="primary"/>                
          }    
          </Col>
          </Row>                                       
          <Input
            type="text"
            id="title"    
            valid={parentProps.uniqueTitleVerifyApiCallStatus.message !== undefined && parentProps.uniqueTitleVerifyApiCallStatus.message.length == 0}        
            invalid={(formikProps.errors && formikProps.errors.title != undefined) 
              || (parentProps.uniqueTitleVerifyApiCallStatus.message !== undefined && parentProps.uniqueTitleVerifyApiCallStatus.message.length > 0)
              // formikProps.touched && formikProps.touched.title && formikProps.errors && formikProps.errors.title != undefined
            }
            value={formikProps.values.title}
            onChange={e => {
              formikProps.handleChange(e); 
              //this.updateFieldValue("title", e.target.value)
            }}
            onBlur={ e => {
              formikProps.handleBlur(e);
              // this.validateTitle
              if (
                ( !formikProps.errors || (formikProps.errors && !formikProps.errors.title)) &&
                parentProps.statusModel.title.toLowerCase() !=
                formikProps.values.title.trim().toLowerCase()
              ) {
                parentProps.verifyUniqueTitle(formikProps.values.title);
              }
            }
          }
          />               
          <FormFeedback invalid="true" className="help-block">
            {formikProps.errors.title ?  formikProps.errors.title : ((parentProps.uniqueTitleVerifyApiCallStatus.message !== undefined && parentProps.uniqueTitleVerifyApiCallStatus.message.length > 0) ? parentProps.uniqueTitleVerifyApiCallStatus.message : '')}
          </FormFeedback>
        </FormGroup>
        <FormGroup>              
          <Label htmlFor="isActive">Active</Label>             
          <CustomInput type="switch" id="isActive" name="isActive"
            onChange={
              e => {
                formikProps.handleChange(e);
              }
            }
            checked={formikProps.values.isActive}
          />

        </FormGroup>
        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <Input
            type="textarea"
            id="description"                
            invalid={formikProps.touched && formikProps.touched.description && formikProps.errors && formikProps.errors.description != undefined}
            value={formikProps.values.description}
            onChange={formikProps.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="color">Color</Label>
          <SketchPicker
            id="color"
            name="color"
            type="color"
            color={formikProps.values.color}
            onChangeComplete={(color:any) => {
              formikProps.setFieldValue("color", color.hex)
            }}
          />             
        </FormGroup>
        <div className="form-actions">
          <Button type="submit" color="primary">Save changes</Button>
          <Button color="secondary">Cancel</Button>
        </div>
        
      </Form>
    </CardBody>
  </Card>
)

const EditableStatusForm: React.FunctionComponent<IProp> = (props: IProp) =>
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

    component={(formikProps) => EditableStatusFormikForm({formikProps: formikProps, parentProps: props})}
  />

export default EditableStatusForm;
