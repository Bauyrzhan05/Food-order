import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { asset } from "../../assets/admin_assets/assets";


export default function AddFood(){

    const [image, setImage] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] =  useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Salad");
    const [menus, setMenus] = useState([]);


    const onSubmitHandler =  async (event) => {
            event.preventDefault();
    
            const formData = new FormData(); // to get image in the request
    
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", Number(price));
            formData.append("category", category);
            formData.append("image", image);
    
            const response = await fetch(`http://localhost:3030/api/food/add`, {
                method: "POST",
                body: formData 
            });
    
            const data = await response.json();
    
            if (data.success) {
                setName("");
                setDescription("");
                setPrice("");
                setCategory("Salad");
                setImage(false);
        
                toast.success(data.message);
            }else{
                toast.error(data.message);
            }
        }


    const fetchMenus = async () => {
        try {
            fetch(`http://localhost:8080/menu_list`)
            .then((res) => res.json())
            .then((data) => setMenus(data));
        } catch (error) {
            console.log("Error menus:", error)
        }   
    };
    useEffect(() => {
        fetchMenus();
    },[])


    return(
        <div className="add">
            <h1>Add food</h1>
            <form className="flex-col" onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : asset.upload_area}/>
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required/>
                </div>
                <div className="add-product-name flex-col">
                    <p>Product name</p>
                    <input onChange={(e) => setName(e.target.value)} type="text" value={name} placeholder="Type here"/>
                </div>
                <div className="add-product-discription flex-col">
                    <p>Product description</p>
                    <textarea onChange={(e) => setDescription(e.target.value)} value={description} rows="6" placeholder="Write content here" required/>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product category</p>
                        <select onChange={(e) => setCategory(e.target.value)} value={category}>
                            {
                                menus.map((i) => {
                                    return <option key={i.id} value={i.id}>{i.menu_name}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product price</p>
                        <input onChange={(e) => setPrice(e.target.value)} type="text" value={price} placeholder="$20"/>
                    </div>
                </div>
                <button type="submit" className="add-btn">ADD</button>
            </form>
        </div>
    )
}