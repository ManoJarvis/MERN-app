import { useForm } from 'react-hook-form';
import axios from 'axios'
import { useState} from 'react'
import "../../../css/UserProfileCSS.css";
function EditUserInfo(props){
    let editOnClick=props.editOnClick
    let setProfileMonitor=props.setProfileMonitor
    let profileMonitor=props.profileMonitor
    let userObj=props.userObj
    // let userDetails=JSON.parse(localStorage.getItem('user'))
    const {register,handleSubmit,formState:{errors}}=useForm();
    // For storing img
    const [file,setFile]=useState(null)

      //Form on submit 
      const onFormsubmit=(usrObj)=>{
          usrObj.username=userObj.username
        //   pass it to the userapi by http post request
          axios.post('/users/updateuser',usrObj)
          .then(res=>{
              if(res.data.message==="Data modified"){
                setProfileMonitor(profileMonitor+1)
                  alert("Userprofile updated successfully")   
              }
          })
          .catch(err=>console.log(err))
           editOnClick()
    }

   
    return(
        <div>
            <h3 className="h3 text-center info mb-3">User Information</h3>
            <form className="w-50 mx-auto d-block" onSubmit={handleSubmit(onFormsubmit)}>
                {/* Username */}
                <div className="mb-3">
                    <label htmlFor="username" className="form-label inpc"><strong>UserName: </strong>{userObj.username}</label>
                </div>
                {/* Email */}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label inpc"><strong>Email</strong></label>
                    <input type="email" className="form-control inpc1" id="email" defaultValue={userObj.email}  {...register('email')}/>
                </div>
                {/* Ph Number */}
                <div className="mb-3">
                    <label htmlFor="ph" className="form-label inpc"><strong>Phone Number</strong></label>
                    <input type="number" className="form-control inpc1" id="ph" defaultValue={userObj.mobile} {...register('mobile')}/>
                </div>
                {/* Password Number */}
                <div className="mb-3">
                    <label htmlFor="ps" className="form-label inpc"><strong>Password</strong></label>
                    <input type="password" className="form-control inpc1" id="ps" {...register('password')}/>
                </div>
                 {/* profile pic
                <input type="file" name="photo" className="profile w-50 mb-2 mt-3"{...register('dp')} 
                 onChange={(e=>onFileSelect(e))}></input> */}
                <button type="submit" className="btn mx-auto d-block "id="sbtnn">Submit</button>
            </form>   
        </div>
    )
}

export default EditUserInfo;