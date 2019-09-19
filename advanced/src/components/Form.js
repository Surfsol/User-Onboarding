import React from 'react'
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup"; 


function LoginForm({ values, errors, touched, status }) { //props passed down from withFormik componenet
    // touched. This prop keeps track of whether you’ve been in this field previously.
    // errors - for Yup
    const [people, setPeople] = useState([])
    useEffect (() => {
      return (
        <Form> //wrapper, takes care of handlesubmit, import Form
            <div>
                <Field type="name" name="name" placeholder="name"/>
            </div>

            <div>
                {touched.email && errors.email && <p>{errors.email}</p>}  // conditional statement
                //if touched and error, write errors.email
                <Field type="email" name="email" placeholder="Email" />
            </div>

            <div>
                {touched.password && errors.password && <p>{errors.password}</p>}
                <Field type="password" name="password" placeholder="Password" />
            </div>

            <label>
                <Field type="checkbox" name="tos" checked={values.tos} />
                Accept TOS
            </label>
            
            <button>Submit!</button>
        </Form>
      )
    }
    
    const FormikLoginForm = withFormik({
      mapPropsToValues({ name, email, password, tos }) {  //goes with Field name = , from above
        return {
          name: name || "",
          email: email || "",  
          password: password || "",
          tos: tos || false,
        };
      },
    
      validationSchema: Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Please provide your name.'),
        email: Yup.string()
          .email("Email not valid") //message printed 
          .required("Email is required"), //make it required 
        password: Yup.string()
          .min(8, "Password must be 8 characters or longer")
          .required("Password is required")
      }),
    
      handleSubmit(values, {}) {
        console.log(values);
        //THIS IS WHERE YOU DO YOUR FORM SUBMISSION CODE... HTTP REQUESTS, ETC.
    axios
        .post ("https://reqres.in/api/users/"), values
        .then(res => {
            setStatus(res.data);
        
        });
        .catch(err => console.log(err.res));
      }
    })(LoginForm);
    
    export default FormikLoginForm;
    