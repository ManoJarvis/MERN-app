import ViewUserInfo from './ViewUserInfo';
import EditUserInfo from './EditUserInfo';
import { useState,useEffect } from 'react';
import axios from 'axios'
function UserProfile(){
  
    let [stateChange,setStateChange]=useState(false)
    let [profileMonitor,setProfileMonitor]=useState(1)
    let [userObj,setUserObj]=useState()
    // To Move to Edit page
    const editOnClick=()=>{
        setStateChange(!stateChange)
    }

    // To get user Details
    useEffect(()=>{
        let userDetails=JSON.parse(localStorage.getItem('user'))
        axios.get(`/users/getusers/${userDetails.username}`)
        .then(res=>{ 
            setUserObj(res.data.message)
        })
        .catch(err=>console.log(err.message))
    },[profileMonitor])

    return(
        <div className="my-3">
            <div className="row row-cols-1 mt-5">
            <div className="col-md-4 text-center"> 
                <div className="card bg-secondary shadow-lg text-light w-75 d-block mx-auto">
                    {userObj && <>
                        <img src={userObj.profileImg} width="100%" className="card-img-top"/>
                        <div className="card-body">
                            <h5 className="card-text">Name: {userObj.username}</h5>
                            <h5 className="card-text">Email: {userObj.email}</h5>
                            <h5 className="card-text">Phone No: {userObj.mobile}</h5>
                        </div>
                    </>}
                </div>
            </div>
            <div className="col-md-8 border">
                {
                    stateChange?<EditUserInfo editOnClick={editOnClick} userObj={userObj}
                    profileMonitor={profileMonitor} setProfileMonitor={setProfileMonitor} />
                    :<ViewUserInfo userObj={userObj}/>

                }
                {
                    stateChange?<h1></h1>:<button type="submit" className="btn mx-auto d-block text-light mt-5"style={{backgroundColor:'#c71585'}} onClick={()=>editOnClick()}>EDIT</button>
                }
            </div>
        </div>
    </div>
    )
}

export default UserProfile