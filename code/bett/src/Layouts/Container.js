import { Outlet } from "react-router-dom";

export default function Container(){
    return (
        <div>
            <div id="container">
                <Outlet />
            </div>
        </div>
    );
}