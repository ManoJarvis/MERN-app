import "../../css/ScrollingContentCSS.css"
import '../../css/App.css'
import axios from "axios"
import {useEffect,useState} from 'react'
import {useHistory} from 'react-router-dom'
import {animateScroll as scroll} from 'react-scroll'
function BirthdayCard(){
    let history=useHistory()
    // prdObj
    let[productobj,setproductobj]=useState([])
    let [filteredObj,setFilteredObj]=useState([])
    // To get Product Details
    useEffect(()=>{
        axios.get(`products/getproducts/bytype/Birthday`)
        .then(res=>{
            productobj=res.data.message 
            setproductobj(res.data.message)
            filteredObj= productobj.splice(0,3)
            setFilteredObj(filteredObj) 
        })
        .catch(err=>console.log(err.message))
    },[])   
    // Handle Card click
    const handleCardClick=(prdName)=>{
        scroll.scrollToTop()
        localStorage.setItem("prdName",prdName)
        history.push(`/productdetails/${prdName}`)
    }
    //handle onclick// 
    const handleClick=()=>{
        scroll.scrollToTop()
        history.push(`/productlist/${filteredObj[0].type}`)
    }
    return(
        <div className="Birthdaycard  row row-cols-1 row-cols-md-4 ms-3 pt-3" style={{backgroundColor:"#ffeff6"}}>
        <div className="col">
            <h1 className="text-center" id="bdcard">Birthday Flowers</h1>
            <h6 className="text-center">Best Flower Bouquets Curated Specially for Birthday Occasion.</h6>
            <button className="buton btn mx-auto d-block mt-5  text-light"onClick={()=>handleClick()}>Explore More</button>
        </div>    
        {
            filteredObj.map((prodObj,ind)=>{
            return(
                <div className="col mt-5" key={ind}>
                    <div className="card productcard" onClick={()=>handleCardClick(prodObj.productname)} >
                        <img src={prodObj.profileImage} className="productimg"alt={`${prodObj.productname} img`} width="100%"></img>
                        <div className="card-body text-center" id="">
                            <h6 className="text-dark"><strong className="text-dark"></strong>{prodObj.productname}</h6>
                            <h6 className="text-success"><strong className="success"></strong>₹{prodObj.price}</h6>
                        </div>
                    </div>
                </div>
                )
            })
        }
    </div>
            
    )
}

export default BirthdayCard