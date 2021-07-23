import '../../../css/App.css'
import axios from "axios"
import {useHistory} from 'react-router-dom'
import {useEffect,useState} from 'react'
import {animateScroll as scroll} from 'react-scroll'


function ByOccasionCards(props){
    let prdType=props.prdType
    let history =useHistory()
    // Product Obj
    let[productobj,setproductobj]=useState([])
    let [filteredObj,setFilteredObj]=useState([])
    // Get Products from Db
    useEffect(()=>{
        axios.get(`/products/getproducts/bytype/${prdType}`)
        .then(res=>{
            productobj=res.data.message        
            setproductobj(res.data.message)
            //filtering the data 
            filteredObj= productobj.splice(0,4)
            setFilteredObj(filteredObj)            
        })
        .catch(err=>console.log(err.message))
    },[prdType])
    // Handle onClick
    const handleClick=()=>{
        scroll.scrollToTop()
        history.push(`/productlist/${filteredObj[0].type}`)
    }
    // Handle Card click
    const handleCardClick=(prdName)=>{
        scroll.scrollToTop()
        history.push(`/productdetails/${prdName}`)
    }
    return(
     
        <div className="">
            <div className="row mt-2 ms-3">           
            {
                filteredObj.map((prodObj,ind)=>{
                return(
                    <div className="col-md-6 col-lg-3 mt-5 " key={ind}>
                        <div className="card productcard " onClick={()=>handleCardClick(prodObj.productname)} >
                            <img src={prodObj.profileImage} alt={`${prodObj.productname} img`} className="productimg"></img>
                           
                            <div className="card-body">
                                <h6 className="text-center">{prodObj.productname}</h6>
                                <h6 className="text-center"><strong className="text-success ">₹{prodObj.price}</strong></h6>
                            </div>
                        </div>
                    </div>
                    )
                })
            }    
            </div>
            <div className="text-center">
        <button className="buton btn mb-5 mt-5"onClick={()=>handleClick()} >EXPLORE MORE</button>
    </div>
    </div>
   
    )
}

export default ByOccasionCards