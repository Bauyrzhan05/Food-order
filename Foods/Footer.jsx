import React from "react";
import '../../components/footer/footer.css';
import { assets } from "../../assets/frontend_assets/assets";

export default function Footer() {
    
    return(
        <div className="footer" id="footer">
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo}/>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi unde totam doloremque eaque, mollitia veritatis natus itaque tempora inventore magnam dicta, odio accusamus harum minus rem ipsam voluptas, accusantium impedit.</p>
                    <div className="footer-social-icons">
                    <img src={assets.facebook_icon}/>
                    <img src={assets.twitter_icon}/>
                    <img src={assets.linkedin_icon}/>
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>    
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>GET IM TOUCH</h2>
                    <ul>
                        <li>+7-777-77-77</li>
                        <li>contact@tometo.com</li>
                    </ul>    
                </div>
            </div>
            <hr/>
            <p className="footer-copyright">Copyright 2025 Tometo.com - All Right Reserved.</p>
        </div>
    );
}