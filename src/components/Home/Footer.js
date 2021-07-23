import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkedAlt,faPhoneAlt,faEnvelope, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { faYoutubeSquare, faTwitter, faFacebook,faInstagram} from '@fortawesome/free-brands-svg-icons'
import {useHistory} from 'react-router-dom'
import {animateScroll as scroll} from 'react-scroll'
import '../../css/FooterCSS.css'

function Footer(props){
    let history=useHistory()
    let setCategoryStatus=props.setCategoryStatus
    let userDetails=JSON.parse(localStorage.getItem('user'))

    // On Category Selection
    const onCatSelect=(prdType)=>{
        scroll.scrollToTop()
        setCategoryStatus(true)
        history.push(`/productlist/${prdType}`)
    }
    // About Us
    const onAbout=()=>{
        scroll.scrollToTop()
        history.push('/aboutus')
    }
    // Contact us
    const onContact=()=>{
        scroll.scrollToTop()
        history.push('/contactus')
    }
    // My profile
    const onMyProfile=()=>{
        if(userDetails!==null){
            scroll.scrollToTop()
            history.push(`/userprofile/${userDetails.username}`)
        }else{
            alert("Login to Access your account")
        }
    }
    // My Cart
    const onMycart=()=>{
        if(userDetails!==null){
            scroll.scrollToTop()
            history.push(`/${userDetails.username}/cart`)
        }else{
            alert("Login to Access your Cart")
        }
    }
    // My wishlist
    const onMyWishlist=()=>{
        if(userDetails!==null){
            scroll.scrollToTop()
            history.push(`/${userDetails.username}/wishlist`)
        }else{
            alert("Login to Access Wishlist")
        }
    }

    // Policy
    const onPolicy=()=>{
        scroll.scrollToTop()
        history.push(`/policy`)
    }
    // Terms
    const onTerms=()=>{
        scroll.scrollToTop()
        history.push('/terms')
    }

    return(
        <div className="footer mt-3 p-5">
            <div className="container">
            <div className="row row-cols-1 row-cols-md-3 row-cols-lg-5">
                <div className="col">
                <ul className="list-unstyled">
                    <strong className="tithov">CATEGORIES</strong>
                    <li className="tithov" onClick={()=>onCatSelect("Roses")}>By Occasion</li>
                    <li className="tithov" onClick={()=>onCatSelect("Roses")}>By Type</li>
                    <li className="tithov" onClick={()=>onCatSelect("Yellow")}>By Color</li>
                    <li className="tithov" onClick={()=>onCatSelect("Flower Bouquet")}>Special Flowers</li>
                    <li className="tithov" onClick={()=>onCatSelect("Women's Day")}>Festive Special</li>
                </ul>
                </div>
                <div className="col">
                    <ul className="list-unstyled">
                        <strong className="tithov">INFORMATION</strong>
                        <li className="tithov" onClick={()=>onAbout()}>About Us</li>
                        <li className="tithov" onClick={()=>onContact()}>Contact Us</li>
                    </ul>
                </div>
                <div className="col">
                    <ul className="list-unstyled">
                        <strong className="tithov">OUR SERVICES</strong>
                        <li className="tithov" onClick={()=>onPolicy()}>Privacy policy</li>
                        <li className="tithov" onClick={()=>onTerms()}>Terms And Conditions</li>
                    </ul>
                </div>
                <div className="col">
                    <ul className="list-unstyled">
                        <strong className="tithov">MY ACCOUNT</strong>
                        <li className="tithov" onClick={()=>onMyProfile()}>My Account</li>
                        <li className="tithov" onClick={()=>onMycart()}>My Cart</li>
                        <li  className="tithov"onClick={()=>onMyWishlist()}>My WishList</li>
                    </ul>
                </div>
                <div className="col">
                    <ul className="list-unstyled">
                    <li><FontAwesomeIcon className="contactUsIcons p-1" icon={faMapMarkedAlt}/>Boho Blooms, Chennai-600018</li>
                    <li><FontAwesomeIcon className="contactUsIcons p-1" icon={faPhoneAlt}/>9087654321</li>
                    <li><FontAwesomeIcon className="contactUsIcons p-1" icon={faEnvelope}/>contactus@boho.com</li>
                    <li><FontAwesomeIcon className="contactUsIcons p-1" icon={faCalendarAlt}/>Mon-Fri/9.00am-10.00pm</li>
                    </ul>     
                    <div className="icons p-2">
                       <a href="https://en-gb.facebook.com/" target="blank"><FontAwesomeIcon className="fbicon mt-2 ms-2" icon={faFacebook}/></a>
                       <a href="https://www.instagram.com/" target="blank"> <FontAwesomeIcon className="instaicon mt-2 ms-2 ps-1" icon={faInstagram}/></a>
                       <a href="https://twitter.com/" target="blank"> <FontAwesomeIcon className="twittericon mt-2 ms-2 ps-1" icon={faTwitter}/></a>
                       <a href="https://www.youtube.com/" target="blank"><FontAwesomeIcon className="youtubeicon mt-2 ms-2 ps-1" icon={faYoutubeSquare}/></a>
                   </div>
                 </div>
                </div>
                <div className="col-12 col-md-6 text-left mt-3">
                    <p style={{marginLeft:'0px'}}>copyright @ 2021 by Boho All Rights Reserved</p>
                </div>
            </div>
        </div>
    )
}


export default Footer