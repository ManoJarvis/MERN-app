import {Tabs,Tab} from 'react-bootstrap'
import axios from 'axios';
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router';


function QueryManagement(){
    let[queryobj,setQueryobj]=useState([])
    let [changeState,setStateChange]=useState(1)
    let params=useParams()
    
    useEffect(()=>{
        axios.get(`/admin/getqueries`)
        .then(res=>{ 
            setQueryobj(res.data.message)
        })
        .catch(err=>console.log(err.message))
    },[changeState])
    

    // Delete Query
    const deletequery=(queryObj)=>{ 
          axios.delete(`/admin/deletequery/${queryObj}`)
          .then(res=>{
              alert(res.data.message)        
          })
          .catch(err=>console.log(err))
          setStateChange(changeState+1)
     }


    return(
        <div>
           <Tabs defaultActiveKey="All Queries" className="mt-5">
           <Tab eventKey="All Queries" title={
                     <span>Customer queries </span> }>
                         <div className="row mt-5">
                         {
                           queryobj.map((queryObj,ind)=>{
                              return(
                            <div className="col-md-3">
                                <div className="card mb-5" style={{height:"270px"}}>
                                <div className="card-body">
                                    <h6>Username:{queryObj.username}</h6>
                                    <h6>Email:{queryObj.email}</h6>
                                    
                                    <h6>Message:<p className="text-danger">{queryObj.message}</p></h6>
                                        </div>
                                    <div className="card-footer">
                                    <button className="btn btn-danger float-right" onClick={()=>deletequery(queryObj._id)}> Dismiss</button>
                                        </div>                              
                                </div>

                            </div>
                              )
                           })
                        }
                         </div>
                    </Tab>                        
            </Tabs>
      </div>
    )
}
export default QueryManagement