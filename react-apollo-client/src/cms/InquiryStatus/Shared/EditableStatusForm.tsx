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

import { Formik, Field, Form, FormikActions, ErrorMessage, FormikProps, FormikValues, FormikBag } from 'formik';
import {SketchPicker} from 'react-color';
import {toast} from 'react-toastify';

import * as Yup from 'yup';
import { StatusViewModel } from "./StatusViewModel";
import IApiCallState from "./ApiCallState";
import { Link } from "react-router-dom";

interface IProp {
  formMode: string;
  isFormReadonly?: boolean;
  statusModel: StatusViewModel; 
  saveApiCallStatus: IApiCallState;
  uniqueTitleVerifyApiCallStatus: IApiCallState;

  verifyUniqueTitle: (title: string) => void;
  saveStatus: (model:StatusViewModel) => void;  
  resetForm: ()=>void;
}
interface ICombineProp{
  parentProps: IProp;
  formikProps: FormikProps<StatusViewModel>
}

const EditableStatusFormikForm = ({formikProps, parentProps} : ICombineProp) => (
  <Card>

    <CardHeader>
      <strong>{parentProps.formMode}</strong> Status
    </CardHeader>
    <CardBody>
      <Form>
        <FormGroup>
          <Label htmlFor="id">Code</Label>{parentProps.statusModel.id}
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
            invalid={(formikProps.touched && formikProps.touched.title && formikProps.errors && formikProps.errors.title != undefined) 
              || (parentProps.uniqueTitleVerifyApiCallStatus.message !== undefined && parentProps.uniqueTitleVerifyApiCallStatus.message.length > 0)              
            }
            value={formikProps.values.title}
            onChange={e => {
              formikProps.handleChange(e);               
            }}
            onBlur={e => {
              if (!parentProps.isFormReadonly) {
                formikProps.handleBlur(e);
                if (
                  (!formikProps.errors || (formikProps.errors && !formikProps.errors.title)) &&
                  parentProps.statusModel.title.toLowerCase() != formikProps.values.title.trim().toLowerCase()
                ) {
                  parentProps.verifyUniqueTitle(formikProps.values.title);
                }
              }
            }
          }
          readOnly={parentProps.uniqueTitleVerifyApiCallStatus.isRequestInProgress || parentProps.isFormReadonly}
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
            onBlur={formikProps.handleBlur}
            checked={formikProps.values.isActive}
            disabled={parentProps.isFormReadonly}            
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
            onBlur={formikProps.handleBlur}
            readOnly={parentProps.isFormReadonly}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="color">Color</Label>
          <SketchPicker            
            color={formikProps.values.color}
            onChangeComplete={(color:any) => {
              formikProps.setFieldValue("color", color.hex)
            }}            
          />             
        </FormGroup>
        <div className="form-actions">
          <Button className="mr-1" type="submit" color="primary" disabled={parentProps.saveApiCallStatus.isRequestInProgress || parentProps.isFormReadonly}>Submit</Button>

          {
            parentProps.formMode == "Create" && parentProps.saveApiCallStatus.isRequestInProgress === false && parentProps.saveApiCallStatus.isRequestSucceed &&
            <Link to={`/cms/inquiry-status/edit/${formikProps.values.id}`} >
              <Button className="mr-1" color="primary">Edit</Button>
            </Link>
          }

          {
            parentProps.formMode == "Create" && parentProps.saveApiCallStatus.isRequestInProgress === false && parentProps.saveApiCallStatus.isRequestSucceed &&            
            <Button className="mr-1" color="primary" onClick={
              () => {
                formikProps.resetForm();
                parentProps.resetForm();
              }
            }>Add Another Status</Button>
          }

          <Link to="/cms/inquiry-status">
            <Button className="mr-1" color="secondary" disabled={parentProps.saveApiCallStatus.isRequestInProgress}>Cancel</Button>
          </Link>

          { 
            parentProps.saveApiCallStatus.isRequestInProgress &&            
            <Spinner size="lg" color="primary"/>                
          }
        </div>                                    
      </Form>
    </CardBody>
  </Card>
)

const EditableStatusForm: React.FunctionComponent<IProp> = (props: IProp) =>
  <Formik    
    initialValues={props.statusModel}
    enableReinitialize = {true}
    onSubmit={(values: StatusViewModel, { setSubmitting }: FormikActions<StatusViewModel>) => {
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
