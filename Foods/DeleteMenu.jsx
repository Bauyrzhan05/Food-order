import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function DeleteMenu(){

    const [menus, setMenus] = useState([]);

    const fetchShow = async () => {
        try {
            fetch("http://localhost:8080/menu_list")
            .then(res => res.json())
            .then((data) => setMenus(data))
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        fetchShow();
    },[])

    const deleteMenu = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/menu_list/${id}`,{
                method: "DELETE"
            });
            
            if (response){
                toast.success("Menu deleted");
                setMenus(menus.filter((menu) => {
                    return menu.id != id
                }));
            }
        }catch(error){
            console.log(error)
        }
    }

    return(
        <div className="list add flex-col">
            <p className="list">All Menu List</p>
            <div className="list-table">
                <div className="list-table-format">
                    <b>Name</b>
                    <b>Updata</b>
                    <b>Delete</b>
                </div>
                {
                    menus.map((menu) => {
                        return(
                            <div key={menu.id} className='list-table-format'>
                                <p>{menu.menu_name}</p>
                                <Link to={`/updata-menu/${menu.id}`}>Update</Link>
                                <p onClick={() => deleteMenu(menu.id)} className="curser">X</p>
                            </div>
                        );
                    })
                }
            
            </div>
        </div>
    )
}