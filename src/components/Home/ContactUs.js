import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkedAlt,faPhoneAlt,faEnvelope, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import '../../css/App.css'
function ContactUs(){

    let {register,handleSubmit,formState:{errors}}=useForm()
    const onFormSubmit=(userobj)=>{
        axios.post('/users/contactus',userobj)
        .then(res=>{
            alert(res.data.message)
        })
        .catch(err=>console.log(err))
    }

    return(
        <div>
            <p className="pa3 text-center">ContactUs</p> 
        <div className="row row-cols-1 row-cols-md-2">
       
        <div className="col">
        
        <ul className="list-unstyled"id="ls4">
                    <li><FontAwesomeIcon className="contactUsIcons4 " icon={faMapMarkedAlt}/>Boho Blooms, Chennai-600018</li>
                    <li><FontAwesomeIcon className="contactUsIcons4 " icon={faPhoneAlt}/>9087654321</li>
                    <li><FontAwesomeIcon className="contactUsIcons4 " icon={faEnvelope}/>contactus@boho.com</li>
                    <li><FontAwesomeIcon className="contactUsIcons4 " icon={faCalendarAlt}/>Mon-Fri/9.00am-10.00pm</li>
                    </ul>     
        </div>
        <div className="col">
        <form onSubmit={handleSubmit(onFormSubmit)} className="m-2 mt-3">
      
        <label htmlFor="un2" className="form-label"></label>
            <input type="text"id="un2"{...register('username',{required:true,minLength:4})} className="form-control mb-3 " autoComplete="off"placeholder="username"/>
                {errors.username?.type==='required'&& <p className="text-danger">*username is required</p>}
                {errors.username?.type==='minLength'&& <p className="text-danger">*min should be 4</p>}
            {/* email */}
            <label htmlFor="em2" className="form-label"></label>
            <input type="email"id="em2"{...register('email',{required:true})} className="form-control mb-3 " autoComplete="off"placeholder="email"/>
                {errors.email && <p className="text-danger">*email is required</p>}
            {/* message */}
            <label htmlFor="mgs2" className="form-label"></label>
            <textarea id="mgs2"{...register('message',{required:true})} className="form-control mb-3 " autoComplete="off" placeholder="your message"/>
                {errors.message && <p className="text-danger">*message is required</p>}
            {/* btn */}
            <button type="submit" className="btn mt-2 mb-4 text-light"id="subbtn"><strong>Submit</strong></button>
            </form></div>
        
        </div></div>
    )
}


export default ContactUs