import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";


export default function UpdataMenu(){

    const [menu_name, setMenu_name] = useState("");
    
    const {id} = useParams();

    const fetchMenu = async () =>{
        try { 
            const response = await fetch(`http://localhost:8080/menu_list/${id}`);
            if (response){
                const menu = await response.json();
                setMenu_name(menu.menu_name);
            } else {
                alert("Menu not found!");
            }
        
        }catch (error){
            console.log(error);
        }
    }

    const updataMenu = async (e) => {
        e.preventDefault();

        try {
            const response =  await fetch(`http://localhost:8080/menu_list/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({menu_name})
            })

            if (response){
                toast.success("Menu updated")
            }else{
                toast.error("something is wrong in updataing")
            }
        }catch (error){
            console.log(error)
        }
    }

    useEffect(() => {
        fetchMenu();
    }, [])


    return(
        <div className="add-menu">
            <h1>Updata menu</h1>
            <input type="text" onChange={(e) => setMenu_name(e.target.value)} value={menu_name}/>
            <button onClick={updataMenu}>UPDATA</button>
        </div>
    )
}