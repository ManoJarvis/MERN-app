import {Tabs,Tab} from 'react-bootstrap'
import axios from 'axios';
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons'

import "../../../css/UserManagementCSS.css"


function UserManagement(){
    let[userobj,setUserobj]=useState([])
    let [stateMonitor,setStateMonitor]=useState(1)
    useEffect(()=>{
        axios.get(`/admin/getusers`)
        .then(res=>{ 
            setUserobj(res.data.message)
        
        })
        .catch(err=>console.log(err.message))
    },[stateMonitor])


    //delete users
    const deleteuser=(username)=>{
         axios.delete(`/admin/deleteuser/${username}`)
         .then(res=>{
             alert(res.data.message)
             setUserobj(userobj)
             setStateMonitor(stateMonitor+1)
             
         })
         .catch(err=>console.log(err))
         
    }

    return(
        <div>
        <div id="userm"> User Management</div>
               <Tabs defaultActiveKey="viewusers" className="mt-5 ms-5">
               <Tab eventKey="viewusers" title={
                     <span><i class="far fa-eye"></i>View Users</span> }>
                         <div className="table-responsive">
             
                         <p className="text-center" id="udname">User details</p>
                     <table class="table table-bordered w-75 mx-auto">
                        
                         
                        <tr><th className="text-center">Username</th>
                        <th className="w-50 text-center">Email</th>
                        <th className="text-center">Mobile</th>
                        <th className="text-center">Newsletter</th>
                        <th></th></tr>
                        {
                           userobj.map((userObj,ind)=>{
                              return(
                                <tr key={ind}>
                                
                                <td>{userObj.username}</td>
                                <td className="w-50">{userObj.email}</td>
                                <td>{userObj.mobile} </td>
                                <td>{userObj.acceptNewsletter}</td>
                                <td><FontAwesomeIcon icon={faTrashAlt} id="delum"onClick={()=>deleteuser(userObj.username)}/></td>
                              </tr>
                )
            })
        }
        </table>
                         </div>
               </Tab>
               
                

                   
                                 
            </Tabs>
        </div>
    )
}
export default UserManagement
