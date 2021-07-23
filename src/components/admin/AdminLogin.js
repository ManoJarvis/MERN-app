import {useForm} from 'react-hook-form'
import {Switch, useHistory,useRouteMatch} from 'react-router-dom'
import axios from 'axios';

function AdminLogin(props){
    let setAdminStatus=props.setAdminStatus
    let {register,handleSubmit,formState:{errors}}=useForm()
    let history=useHistory();
    const onFormSubmit=(credientials)=>{
         
        axios.post('admin/login',credientials)
        .then(res=>{
            let responseObj=res.data
            if(responseObj.message==='login successfull'){
                localStorage.setItem("token",responseObj.token)
                localStorage.setItem("user",JSON.stringify(responseObj.user))
                setAdminStatus(true)    
                history.push('/adminprofile/admin')                  
            }
            //if login failed
            else{
                alert(responseObj.message)
            }
        })                            
    }

    return(
        <div id="lg mt-5 mb-5 p-5 ">
            <h1 className="text-center mt-5" style={{fontWeight:"lighter"}}>Admin login</h1>
        
       <form className="adm w-25 d-block mx-auto mt-5"onSubmit={handleSubmit(onFormSubmit)}>
      
       {/* Username */}
       <div className="form-group">
       <label htmlFor="Username" className="form-label justify-content-center text-aligns-center">Username</label>
       <input type="text" id="Username" {...register('username',{required:true,minLength:4})} className="form-control mb-3  " autoComplete="off"/>
       {errors.username?.type==='required'&& <p className="text-danger"style={{marginLeft:'0px'}}>*username is required</p>}
       {errors.username?.type==='minLength'&& <p className="text-danger">*min should be 4</p>}
       <label htmlFor="Password" className="form-label mx-auto">Password</label>
       {/* password */}
       <input type="password" id="Password" {...register('password',{required:true,minLength:5})} className="form-control ms-5 mb-3"/>
       {errors.password?.type==='required' && <p className="text-danger"style={{marginLeft:'0px'}}>*password is required</p>}
       {errors.password?.type==='minLength' && <p className="text-danger">*min should be 5</p>}
       {/* Submit */}
       <button type="submit" className="btn d-block mx-auto mt-2 mb-4"id="logbtn"><strong>Login</strong></button>
       </div>
       </form>
       </div>
       


   
   
    )
}

export default AdminLogin