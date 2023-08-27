import { Link } from "react-router-dom";


export function LoginErrorComponent(){
    return(
        <div >
            <h2 className="text-danger">Invalid User Name / Password</h2>
            <Link to="/login">Try Again</Link>
        </div>
    )
}