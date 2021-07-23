import {Tabs,Tab} from 'react-bootstrap'
import axios from "axios"
import {useEffect,useState} from 'react'
import Addproducts from './Addproducts'
import Removeproducts from './RemoveProducts'
import '../../../css/App.css'
function ProductManagement(){

    let[productobj,setproductobj]=useState([])
    
    // UseEffect to render page each time
    useEffect(()=>{
        axios.get('/products/getproducts')
        .then(res=>{
            setproductobj(res.data.message)
        
        })
        .catch(err=>console.log(err.message))
    },[])

    return(
        <div>
               <Tabs defaultActiveKey="Viewproducts" className="mt-5">
               <Tab eventKey="Viewproducts" title={
                     <span><i class="far fa-eye"></i>View Products</span> }>
                         <div className="row">
                         {
            productobj.map((prodObj,ind)=>{
            return(
                <div className="col-md-3 mt-5" key={ind}>
                    <div className="card" style={{height:"480px",width:"320px"}}  id="img1" >
                        <img src={prodObj.profileImage} width="100%" alt={prodObj.productname}></img>
                        <div className="card-body text-center" id="">
                            <h6 className="text-dark">Product Name:{prodObj.productname}</h6>
                            <h6 className="text-dark">Category:{prodObj.catagory}</h6>
                            <h6 className="text-dark">Type:{prodObj.type}</h6>
                            <h6 className="text-sucess">Price:₹{prodObj.price}</h6>
                        </div>
                    </div>
                </div>
                )
            })
        }
                         </div>
               </Tab>
                 {/* add users */}
                 <Tab eventKey="Edit Users" title={
                     <span><i class="fas fa-plus"></i>Add Products </span> }>
                         <div className="row">
                             <Addproducts/>
                         </div>
                    </Tab>

                    {/* remove products */} 
                <Tab eventKey="Remove Users" title={
                     <span><i class="far fa-trash-alt"></i>Remove Products </span>}>
                                             
                    <Removeproducts/>                             
                </Tab>

                   
                                 
            </Tabs>
        </div>
    )
}
export default ProductManagement
