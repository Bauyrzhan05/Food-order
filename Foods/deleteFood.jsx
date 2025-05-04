import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


export default function DeleteFood(){

    const [foods, setFoods] = useState([]);

      useEffect(() => {
        const fetchFoods = async () => {
            try {
              fetch("http://localhost:3030/api/food/list")
              .then(res => res.json())
              .then(data => setFoods(data.data));
            }catch(error){
              console.log("Error foods:", error)
            }
          }
          fetchFoods();
      }, [])

      const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3030/api/food/remove`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id: id })
          });
    
          if (response.ok) {
            toast.success(`Food deleted successfully!`);
            setFoods(foods.filter((food) => food._id !== id)); // Update UI
          } else {
            toast.error("Failed to delete food");
          }
        } catch (error) {
          console.error("Error deleting food:", error);
        }
      };

      const confirmDelete = (id) => {
        // Toast container styles
        const toastContainerStyle = {
            textAlign: 'center',
            padding: '24px',
            borderRadius: '12px',
            background: 'linear-gradient(145deg, #232340, #1a1a2e)',
            color: '#fff',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            maxWidth: '420px',
            margin: 'auto',
            border: '1px solid rgba(255, 255, 255, 0.08)'
        };
    
        // Header styles
        const headerStyle = {
            margin: '0 0 12px',
            fontSize: '20px',
            color: '#f5f5f5',
            fontWeight: '600',
            letterSpacing: '0.5px'
        };
    
        // Message styles
        const messageStyle = {
            fontSize: '15px',
            color: 'rgba(255, 255, 255, 0.7)',
            marginBottom: '24px',
            lineHeight: '1.5'
        };
    
        // Button container styles
        const buttonContainerStyle = {
            display: 'flex',
            justifyContent: 'center',
            gap: '16px'
        };
    
        // Base button styles
        const baseButtonStyle = {
            padding: '12px 20px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontSize: '14px',
            fontWeight: '500',
            letterSpacing: '0.5px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            minWidth: '140px',
            justifyContent: 'center'
        };
    
        // Confirm button styles
        const confirmButtonStyle = {
            ...baseButtonStyle,
            background: 'linear-gradient(145deg, #2ecc71, #27ae60)',
            color: '#fff',
            boxShadow: '0 2px 8px rgba(46, 204, 113, 0.3)'
        };
    
        // Cancel button styles
        const cancelButtonStyle = {
            ...baseButtonStyle,
            background: 'linear-gradient(145deg, #e74c3c, #c0392b)',
            color: '#fff',
            boxShadow: '0 2px 8px rgba(231, 76, 60, 0.3)'
        };
    
        // Hover effects
        const handleMouseEnter = (e, isConfirm) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = isConfirm 
                ? '0 4px 12px rgba(46, 204, 113, 0.4)' 
                : '0 4px 12px rgba(231, 76, 60, 0.4)';
        };
    
        const handleMouseLeave = (e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = e.target.style.background.includes('2ecc71') 
                ? '0 2px 8px rgba(46, 204, 113, 0.3)' 
                : '0 2px 8px rgba(231, 76, 60, 0.3)';
        };
    
        // Render the toast
        toast(
            ({ closeToast }) => (
                <div style={toastContainerStyle}>
                    <h3 style={headerStyle}>Confirm Deletion</h3>
                    <p style={messageStyle}>
                        This action cannot be undone. Are you sure you want to permanently delete this item?
                    </p>
    
                    <div style={buttonContainerStyle}>
                        <button
                            onClick={() => {
                                handleDelete(id);
                                closeToast();
                            }}
                            style={confirmButtonStyle}
                            onMouseEnter={(e) => handleMouseEnter(e, true)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <span>✔</span> Delete
                        </button>
    
                        <button
                            onClick={() => {
                                toast.info("Deletion cancelled!");
                                closeToast();
                            }}
                            style={cancelButtonStyle}
                            onMouseEnter={(e) => handleMouseEnter(e, false)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <span>✖</span> Cancel
                        </button>
                    </div>
                </div>
            ),
            {
                position: "top-center",
                autoClose: false,
                closeOnClick: false,
                closeButton: false,
                toastId: 'delete-confirmation' // Prevent multiple toasts
            }
        );
    };
    

    return(
        <div className="list add flex-col">
            <p className="list">All Foods List</p>
            <div className="list-table">
                <div className="list-table-format">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Price</b>
                    <b>Update</b>
                    <b>Delete</b>
                </div>
                {
                    foods.map((food, index) => {
                        return(
                            <div key={index} className='list-table-format'>
                                <img src={`http://localhost:3030/images/${food.image}`} alt="" />
                                <p>{food.name}</p>
                                <p>${food.price}</p>
                                <Link to={`/update-food/${food._id}`}>update</Link>
                                <p onClick={() => confirmDelete(food._id)} className="curser">X</p>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
}