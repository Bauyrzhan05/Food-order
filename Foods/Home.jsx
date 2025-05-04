import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import FoodItem from "./FoodItem";
import './index.css';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { assets } from "../../assets/frontend_assets/assets";
import menu_1 from '../../assets/frontend_assets/menu_1.png'
import menu_2 from '../../assets/frontend_assets/menu_2.png'
import menu_3 from '../../assets/frontend_assets/menu_3.png'
import menu_4 from '../../assets/frontend_assets/menu_4.png'
import menu_5 from '../../assets/frontend_assets/menu_5.png'
import menu_6 from '../../assets/frontend_assets/menu_6.png'
import menu_7 from '../../assets/frontend_assets/menu_7.png'
import menu_8 from '../../assets/frontend_assets/menu_8.png'
import menu_9 from '../../assets/frontend_assets/menu_1.png'
import menu_10 from '../../assets/frontend_assets/menu_3.png'
import '../Foods/sidebar/animation.css';

export default function Home(){

  const user = useSelector((state) => state.auth.user);
  

    const [foods, setFoods] = useState([]);
    const [category, setCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    
    const fetchCategories = async () => {
        try {
            fetch("http://localhost:8080/menu_list")
            .then((res) => res.json())
            .then((data) => setCategory(data));
        } catch (error) {
            console.log("Error categores:", error)
        }
    };

    const fetchFoods = async () => {
      try {
        fetch("http://localhost:3030/api/food/list")
        .then(res => res.json())
        .then(data => setFoods(data.data));
      }catch(error){
        console.log("Error foods:", error)
      }
    }


      useEffect(() => {
        fetchCategories();
        fetchFoods();
      },[])

// to filter the foods
      const filtredFoods = selectedCategory 
      ? foods.filter((food) => (food.category === selectedCategory.id))
      : foods;

    return(
      <>
      <div className="photo">
        <div className="header-contents">
          <h2> Order your favourite food here</h2>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente officia aut inventore culpa quisquam distinctio maxime ad cumque sequi tempora dolorum commodi, sunt maiores eum officiis aliquid sit, necessitatibus cum?</p>
        </div>
      </div>
      <br></br>
      <div className="home">
      
      {user?.role === 'admin' 
      ?<div className="admin-panel-link-container">
        <Link to="/admin-panel" className="admin-panel-link">
          <span className="link-text">Admin Panel</span>
          <span className="link-glow"></span>
        </Link>
      </div>
      : <></>
      }
      {user?.role === 'manager' 
      ?<div className="admin-panel-link-container">
        <Link to="/orders-manager" className="admin-panel-link">
          <span className="link-text">Manager order panel</span>
          <span className="link-glow"></span>
        </Link>
      </div>
      : <></>
      }
      <div className="banner">
        <div className="slider" style={{"--quantity": 10}}>
          {[menu_1, menu_2, menu_3, menu_9, menu_4, menu_5, menu_6, menu_10, menu_7, menu_8].map((img, index) => (
            <div className="item" style={{"--position": index+1}} key={index}>
              <img src={img} alt="" className="slider-img" />
            </div>
          ))}
        </div>
        <div className="content">
          <h1>Chef</h1>
          <div className="modul"></div>
        </div>
      </div>
          <div className="menu-section">
            <div className="menu-header">
              <h1 className="menu-title">Explore Our Menu</h1>
              <div className="title-divider">
                <div className="divider-line"></div>
                <div className="divider-icon">✻</div>
                <div className="divider-line"></div>
              </div>
              <p className="menu-description">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id cupiditate provident dolore culpa fugiat necessitatibus natus minus, illum at numquam impedit!
              </p>
            </div>

            <div className="menu-categories">
              {category.map((i) => (
                <Menu 
                  key={i.id} 
                  name={i.menu_name} 
                  onClick={() => setSelectedCategory(i)}
                  isActive={selectedCategory?.id === i.id}
                />
              ))}
            </div>
          </div> 
        <h1 className="title">Foods</h1>
        <hr></hr>
        <div className="food-container">
          {
            filtredFoods.map((food) => {
              return <FoodItem key={food.id} id={food._id} name={food.name} price={food.price} description={food.description} image={food.image} />
            })
          }
        </div>
        <br></br><br></br>

        <div className="app-download" id="app-download">
            <p>For better experience Download</p>
            <div className="app-download-platforms">
                <img src={assets.play_store}/>
                <img src={assets.app_store}/>
            </div>
        </div>
      </div>
      </>  
    )
}