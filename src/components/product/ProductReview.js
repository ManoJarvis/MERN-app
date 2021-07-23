import React, { useRef,useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import "swiper/components/navigation/navigation.min.css"
import axios from "axios"
import { useParams } from "react-router"
import '../../css/App.css'




// import Swiper core and required modules
import SwiperCore, {
  Keyboard,Pagination,Navigation
} from 'swiper/core';

// install Swiper modules
SwiperCore.use([Keyboard,Pagination,Navigation]);

function ProductReview() {
    let url=useParams()
    let [reviewItem,setReviewItem]=useState([])
    let [reviewUpdate,setReviewUpdate]=useState(false)
    let [ovrallRating,setOvrAllRating]=useState(0)
    // To get Reviews
    useEffect(()=>{
        axios.get(`/users/getreviews/${url.prdName}`)
        .then(res=>{
           if(res.data.message==="No Reviews Found"){
               setReviewUpdate(false)
           }else{
           
               setReviewUpdate(true)
               setReviewItem(res.data.message)
               
           }
        })
        .catch(err=>console.log(err))
    },[url.prdName])
    
    // For Overall Review
    useEffect(()=>{
      let temp=0;
      if(reviewItem!==[]){
        reviewItem.map(reviewObj=>{
          temp+=parseInt(reviewObj.rating)
        })
        temp=temp/reviewItem.length
      }
      setOvrAllRating(temp.toFixed(1))
    },[reviewItem])
  
  
  return (
    <>
    <h1 className="text-center mt-5 mb-5" style={{fontWeight:"lighter"}}>Customer Reviews </h1>
    {reviewUpdate?
    <>
    <h2 className="h2 ms-3" style={{fontWeight:"lighter"}}>Overall Rating:<strong>{ovrallRating}</strong>/5</h2>
    <Swiper  pagination={{"clickable": true}} grabCursor={true}  breakpoints={{
      "640": {
        "slidesPerView": 2,
        "spaceBetween": 20
      },
      "768": {
        "slidesPerView": 5,
        "spaceBetween": 10
      },
      "1024": {
        "slidesPerView": 5,
        "spaceBetween": 10
      }
    }} navigation={true}>
    <div className="reviewcard container mt-5">
          { 
          reviewItem.map((reviewObj,ind)=>{
            return(
              <SwiperSlide className="" style={{height:"500px"}}>
                <div className="reviewcards card shadow mt-5" style={{width:"250px",marginLeft:"40px"}}>                    
                  <h5 className="text-center mt-3">{reviewObj.name}</h5><hr></hr>
                  <h6 className="text-center">{reviewObj.summary}</h6>
                  <p className="text-center"><span style={{ color: "#FDCC0D"}}><i class="fas fa-star"></i></span>{reviewObj.rating} out of 5</p>
                  <p className="text-success responsive">{reviewObj.review}</p> 
                </div>       
              </SwiperSlide>
            )
          })
          }
    </div>
    </Swiper>
    </>
     :<h5 style={{fontWeight:"lighter"}}>Be the first one to review</h5>
    }
  
    </>
  )
}
export default ProductReview