import { BrowserRouter, Route, Routes } from "react-router-dom";

import { LoginComponent } from "./LoginComponent";
import { LoginErrorComponent } from "./LoginErrorComponent";
import { TaskManager } from "./taskManager";

export function TaskIndex(){
    return(
        <div className="container-fluid bg-black ">
           <BrowserRouter>
             <header className="d-flex justify-content-center text-white p-2">
            <h1 className=" p-3 m-2" style={{textDecoration:'underline'}}>__--TASK-MANAGER--__</h1>
            
             </header>
             <section>
                <Routes>
                    <Route path="/home" element={<TaskManager/>} />
                    <Route path="/login" element={<LoginComponent />} />
                    <Route path="/error" element={<LoginErrorComponent />} />
                    <Route path="/" element={<LoginComponent/>} />
                    <Route path="*" element={<h1><code>Page You Requested Not Found</code></h1>} />
                </Routes>
             </section>
             
                
           </BrowserRouter>
        </div>
    )
}