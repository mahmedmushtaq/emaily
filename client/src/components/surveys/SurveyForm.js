import React from "react";
import {reduxForm,Field} from "redux-form";
import SurveyField from "./SurveyField";
import {Link} from "react-router-dom";
import validateEmails from '../../utils/validateEmail';
import fields from "./formFields";


class SurveyForm extends React.Component{
    renderFields(){
        return(
            <div>
                {
                    fields.map(({label,name})=>(
                        <Field
                            name={name}
                            key={name}
                            label={label}
                            component={SurveyField}
                            type={"text"}
                        />
                    ))
                }



            </div>
        )
    }
    render() {
        return(
            <div>
               <form onSubmit={this.props.onSurveySubmit}>

                   {this.renderFields()}
                   <Link to={"/surveys"}>
                       <button className="red btn-flat white-text">
                           Cancel
                       </button>
                   </Link>
                  <button className={"teal btn-flat right white-text"} type={"submit"}>
                      Next
                      <i className="material-icons right">done</i>
                  </button>

               </form>
            </div>
        )
    }
}

function validate(values) {
    const errors = {};

    errors.recipients = validateEmails(values.recipients || '');

    fields.forEach(({name})=>{
        if(!values[name]){
            errors[name] = "You must provide a value";
        }
    });

    return errors;

}

export default reduxForm({
    validate,
    form:'surveyForm',
    destroyOnUnmount:false,
})(SurveyForm);