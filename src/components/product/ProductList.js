import axios from "axios"
import {useEffect,useState} from 'react'
import {Navbar} from 'react-bootstrap'
import {useHistory, useParams} from 'react-router-dom'
import {animateScroll as scroll} from 'react-scroll'
import '../../css/ProductListCSS.css'

function ProductList(props){
    let url=useParams()
    let categoryMonitor=props.categoryMonitor
    let history=useHistory()
    // Product Obj
    let[productobj,setproductobj]=useState([])
   

    // UseEffect to render page emach time
    useEffect(()=>{
        axios.get(`/products/getproducts/bytype/${url.prdList}`)
        .then(res=>{     
            setproductobj(res.data.message)
        })
        .catch(err=>console.log(err.message))    
    },[categoryMonitor])

    // For Filtering Data
    const handlesubmit=(filterPrice)=>{
        let filterObj=[filterPrice,url.prdList]
        // To get Filtered Prd
        axios.post(`/products/getproducts/filter`,filterObj)
        .then(res=>setproductobj(res.data.message))
        .catch(err=>console.log(err))
    }


    // Going to Product Details Page
    const onCardClick=(prdName)=>{
        scroll.scrollToTop()
        history.push(`/productdetails/${prdName}`)
      }



    return(
     <>
      <h1 className="filterheading mt-5 mb-5 text-center">{url.prdList} Flowers</h1> 
   <div className="row">  
   <Navbar expand="lg"> 
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="togglebtn" >
              <h4>Filter<i class="fas fa-filter"></i></h4> 
              </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
       <div className="col-md-3">
              <p className="filterhead">Filter</p>
           <form className="productfilter " onSubmit={handlesubmit}>
               <hr></hr>
               <label className="filterlabel">PRICE:</label><br></br>
               {/* All */}
               <input type="radio" name="priceFilter" id="all" value="all" onChange={(e)=>handlesubmit(e.target.value)}  className=" m-3 " />
                <label htmlFor="all" className="" >All</label><br></br>
               {/* above500 */}
               <input type="radio" id="above500"name="priceFilter"value="above500" onChange={(e)=>handlesubmit(e.target.value)} className=" m-3 "/>
               <label htmlFor="above500" className="" >₹500-₹1000</label><br></br>
               {/* 1000-2000 */}
               <input type="radio" id="above1000"name="priceFilter"value="above1000" onChange={(e)=>handlesubmit(e.target.value)} className=" m-3 "/>
               <label htmlFor="above1000" className="" >₹1000-₹2000</label><br></br>
               {/* above 2000 */}
               <input type="radio" id="above2000"name="priceFilter"value="above2000" onChange={(e)=>handlesubmit(e.target.value)} className=" m-3 "/>
               <label htmlFor="above2000" className="" >₹2000- ₹3000</label><br></br>
               {/* above 3000 */}
               <input type="radio" id="above3000"name="priceFilter"value="above3000" onChange={(e)=>handlesubmit(e.target.value)} className=" m-3 "/>
               <label htmlFor="above3000" className="" >Above ₹3000</label><hr></hr>            
           </form>
       </div>
       </Navbar.Collapse>
      </Navbar>
      
       <div className="col-md-9 me-5">
       <div className="row mt-4 ms-3">           
        {      
                     productobj.map((prodObj,ind)=>{return(
                        
                        <div className="col-md-4 w3-animate-zoom" key={ind}>
                        <div className="productcard mb-4 card" onClick={()=>onCardClick(prodObj.productname)} >
                            <img src={prodObj.profileImage} alt={`${prodObj.productname} img`} width="100%"></img>
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
         </div> 
         </div>    
   </>
    )

}
export default ProductList