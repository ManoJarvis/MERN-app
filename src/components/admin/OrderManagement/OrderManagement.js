import { Tabs,Tab } from "react-bootstrap";
import { faEye} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Modal} from 'react-bootstrap'
import axios from "axios"
import { useEffect, useState } from "react"
import OrderDetails from "./OrderDetails";

function OrderManagement(){
    let [orderDetails,setOrderDetails]=useState([])
    let [userOrdObj,setUserOrdObj]=useState()
    // Get Order Details
    useEffect(()=>{
        axios.get( `/admin/getorders`)
        .then(res=>{
            if(res.data.message==="No orders found"){
                setOrderDetails(false)
            }else{
                let temp=[]
               res.data.message.map(ordObj=>{return ordObj})
               .map(ordObj=>{return [ordObj.userDetails,ordObj.productDetails]})
               .map(ordObj=>{
                   temp=[...temp,ordObj]
               })
               setOrderDetails(temp)
            }
        })
        .catch(err=>console.log(err))
    },[])

    // For Modal Functionality
    const [show, setShow] = useState(false);
    const handleClose = () =>{
      setShow(false)
    };
    const handleOpen=(ord)=>{
        setUserOrdObj(ord)
        setShow(true)
    }
    
    

    return(
        <div>
            <h4 className="text-center"style={{fontWeight:'normal'}}>Order Management</h4>
            <Tabs defaultActiveKey="View" transition={false} id="noanim-tab-example"className="mt-5">
                <Tab eventKey="View" title={<span><FontAwesomeIcon icon={faEye}/>View</span>}>
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead className="text-center">
                                <th className="text-center">ID</th>
                                <th className="text-center">Customer Name</th>
                                <th className="text-center">Mobile Number</th>
                                <th className="text-center">Payment</th>
                                <th className="text-center">Orders</th>
                            </thead>
                            <tbody>
                            {
                                orderDetails.map(ordObj=>{
                                    return(
                                        <tr>
                                            <td className="text-center">{ordObj[0].orderid}</td>
                                            <td className="text-center">{ordObj[0].name}</td>
                                            <td className="text-center">{ordObj[0].mobile}</td>
                                            <td className="text-center">{ordObj[0].paymentStatus}</td>
                                            <td onClick={()=>handleOpen(ordObj)} className="text-center"><p className="text-primary"style={{cursor:'pointer'}}> Order Details</p></td>
                                            <Modal centered show={show} onHide={handleClose}>
                                                <Modal.Header closeButton style={{fontWeight:'normal',fontSize:'25px'}}>customer Details</Modal.Header>
                                                <Modal.Body>
                                                  
                                                    {userOrdObj &&
                                                        <OrderDetails userOrdObj={userOrdObj} />
                                                    }
                                                </Modal.Body>
                                            </Modal>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </Tab>
            </Tabs>

        </div>
    )
}

export default OrderManagement