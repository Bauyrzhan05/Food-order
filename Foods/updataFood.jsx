import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { asset } from "../../assets/admin_assets/assets";
import { useSelector } from "react-redux";

export default function UpdateFood() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Salad");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState("");
    const [menus, setMenus] = useState([]);

    const { id } = useParams(); 

    const fetchFood = async () => {

        try {
            const response = await fetch(`http://localhost:3030/api/food/list`);
            if (response.ok) {
                const foods = await response.json();
                const food = foods.data.find(item => item._id === id);
                
                if (food) {
                    setName(food.name);
                    setDescription(food.description);
                    setCategory(food.category);
                    setPrice(food.price);
                    setPreviewImage(`http://localhost:3030/images/${food.image}`);
                } else {
                    toast.error("Food not found.");
                }
            } else {
                toast.error("Failed to fetch food data.");
            }
        } catch (error) {
            console.error("Error fetching food:", error);
            toast.error("Error loading food.");
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => setPreviewImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleUpdateFood = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("name", name);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("price", price);

        if (image) {
            formData.append("image", image);
        }

        try {
            const response = await fetch(`http://localhost:3030/api/food/${id}`, {
                method: "PATCH",
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                toast.success(data.message);
            } else {
                toast.error("Failed to update food.");
            }
        } catch (error) {
            console.error("Error updating food:", error);
            toast.error("Error during update.");
        }
    };


    const fetchMenus = async () => {
      try {
          fetch("http://localhost:8080/menu_list")
          .then((res) => res.json())
          .then((data) => setMenus(data));
      } catch (error) {
          console.log("Error menus:", error)
      }
  };

  useEffect(() => {
      fetchMenus();
      fetchFood();
  },[])


    return (
        <div className="add">
            <h2>Update Food</h2>
            <form className="flex-col" onSubmit={handleUpdateFood}>
                <div className="add-img-upload flex-col">
                    <p>Food Image</p>
                    <label htmlFor="image">
                        <img src={previewImage || asset.upload_area} alt="Food preview" />
                    </label>
                    <input
                        onChange={handleImageChange}
                        type="file"
                        id="image"
                        accept="image/*"
                        hidden
                    />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product name</p>
                    <input
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        value={name}
                        placeholder="Type here"
                        required
                    />
                </div>
                <div className="add-product-discription flex-col">
                    <p>Product description</p>
                    <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        rows="6"
                        placeholder="Write content here"
                        required
                    />
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product category</p>
                        <select
                            onChange={(e) => setCategory(e.target.value)}
                            value={category}
                            required
                        >
                            {menus.map((menu) => (
                                <option key={menu.id} value={menu.id}>
                                    {menu.menu_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product price</p>
                        <input
                            onChange={(e) => setPrice(e.target.value)}
                            type="number"
                            value={price}
                            placeholder="$20"
                            required
                        />
                    </div>
                </div>
                <button type="submit" className="add-btn">
                    UPDATE
                </button>
            </form>
        </div>
    );
}