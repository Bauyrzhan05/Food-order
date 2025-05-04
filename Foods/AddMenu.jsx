import React, { useState } from "react";
import { toast } from "react-toastify";


export default function AddMenu(){

    const [menu_name, setMenu_name] = useState("");

    const AddMenuName = async (e)  => {
        e.preventDefault();
        
        try{
            const response  = await fetch("http://localhost:8080/menu_list", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({menu_name})
            });

            if (response.ok){
                toast.success("Menu added");
            }else{
                toast.error("Failed to add menu");
            }   
        }catch (error){
            console.log(error);
        }
    }


    return(
        <div className="add-menu">
            <h5>Add menu</h5>
            <input type="text" onChange={(e) => setMenu_name(e.target.value)}/>
            <button onClick={AddMenuName}>ADD</button>
        </div>

    )
}