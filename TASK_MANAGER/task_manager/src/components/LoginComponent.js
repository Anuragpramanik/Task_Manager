import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import'./taskManager.css';

export function LoginComponent(){
    let navigate = useNavigate();
 

    const formik = useFormik({
        initialValues: {
            "UserName": '',
            "Password": ''
        },
        onSubmit: (values)=>{
            axios({
                method: 'GET',
                url: 'http://127.0.0.1:4000/getusers'
            })
            .then(response=> {
                for(var user of response.data) {
                    if(user.UserName==values.UserName && user.Password==values.Password){
                        
                        navigate("/home");
                        break;
                    } else {
                        navigate("/error");
                    }
                }
            })
        }
    })
    return(
        <div className="container-fluid log">
            <form onSubmit={formik.handleSubmit}>
            <h2>User Login</h2>
            <dl>
                <dt>User Name</dt>
                <dd><input className="form-control m-2 p-2" name="UserName" onChange={formik.handleChange} type="text"/></dd>
                <dt>Password</dt>
                <dd><input className="form-control m-2 p-2" name="Password" onChange={formik.handleChange} type="password"/></dd>
            </dl>
            <button className="btn btn-outline-danger m-2">Login</button>
       
            </form>
        </div>
    )
}