import SwiperCore, {
  EffectCoverflow,Navigation,Pagination
} from 'swiper/core';
// Import Swiper styles
import "swiper/swiper.min.css";
import 'swiper/swiper-bundle.css';
import "swiper/components/effect-coverflow/effect-coverflow.min.css"
import "swiper/components/navigation/navigation.min.css"
import "swiper/components/pagination/pagination.min.css"
import '../../../css/ScrollingContentCSS.css'
import '../../../css/App.css'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import {animateScroll as scroll} from 'react-scroll'
import axios from "axios"
import {useEffect,useState} from 'react'
import { useHistory } from "react-router-dom"
// install Swiper modules
SwiperCore.use([EffectCoverflow,Pagination,Navigation]);

function ScrollingContent(props) {
  
  let productType=props.productType
  let heading=props.heading
  let width=props.width
  let setScrollMonitor=props.setScrollMonitor
  let scrollMonitor=props.scrollMonitor
  // PrdObj
  let[productobj,setproductobj]=useState([])
  let history=useHistory()
  // To get Product Details
  useEffect(()=>{
    axios.get(`/products/getproducts/bytype/${productType}`)
    .then(res=>{
      setproductobj(res.data.message)
    })
    .catch(err=>console.log(err.message))
   },[productType])
  //  Move to Product Details Page
  const onCardClick=(prdName)=>{
    setScrollMonitor(!scrollMonitor)
    scroll.scrollToTop()
    history.push(`/productdetails/${prdName}`)
  }
  return (
    <>
   
   
    <h1 className="newarrival mt-4" style={{fontWeight:"lighter"}}>{heading}</h1>
    <div classname="container mx-auto w-100">
   <Swiper watchSlidesProgress={true}  navigation={true} 
  watchSlidesVisibility={true} breakpoints={{
      "400": {
          "slidesPerView": 1,
          "spaceBetween": 0
        },
      "550": {
        "slidesPerView": 2,
        "spaceBetween": 0
      },
      "768": {
        "slidesPerView": 3,
        "spaceBetween": 0
      },
      "1024": {
        "slidesPerView": 4,
        "spaceBetween": 0
      }
    }} >
       
   {
          productobj.map((prodObj,ind)=>{
            return(
          <SwiperSlide className=""style={{height:"500px"}}>
         
                    
                <div className="card productcard  mt-5 ms-5 "  onClick={()=>onCardClick(prodObj.productname)} >          
                  <img src={prodObj.profileImage} alt={`${prodObj.productname} img`} className="productimg" ></img>        
                  <div className="card-body text-center "id="">
                    <h6>{prodObj.productname}</h6>
                    <h6 className="text-success">₹{prodObj.price}</h6>
                  </div>
                </div>
                             
          
          </SwiperSlide>

            )
          })
        }
       
    
  </Swiper>
  </div>
 
    </>
  )
}
export default ScrollingContent