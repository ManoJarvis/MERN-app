import '../../css/ProductDetailsCSS.css'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { useParams } from 'react-router'
function ReviewForm(){
    let {register,handleSubmit,formState:{errors}}=useForm()
    let userDetails=JSON.parse(localStorage.getItem('user'))
    let url=useParams()

    // To Add Review
    const onFormSubmit=(userReview)=>{
        if(userDetails!==null){
            let username=userDetails.username
            userReview.productName=url.prdName
            userReview.username=username
             // Make req to save data in cart
             axios.post('/users/addreview',userReview)
             .then(res=>{
                 let responseObj=res.data
                 alert(responseObj.message)
             })
             .catch(err=>console.log(err))
        }else{
            alert("Please Login To write a Review")
        }
    }


    return(
    <div>
        <form onSubmit={handleSubmit(onFormSubmit)} className="m-2">
            {/* Rating Stars */}
            <label htmlFor="rate"className="form-check-label la3">RATING:</label>
            <span class="star-rating">
                <input type="radio" name="rating1" value="1"className="form-check-input"{...register('rating',{required:true})}/><i></i>
                <input type="radio" name="rating1" value="2"className="form-check-input"{...register('rating')}/><i></i>
                <input type="radio" name="rating1" value="3"className="form-check-input"{...register('rating')}/><i></i>
                <input type="radio" name="rating1" value="4"className="form-check-input"{...register('rating')}/><i></i>
                <input type="radio" name="rating1" value="5"className="form-check-input"{...register('rating')}/><i></i>
            </span>
            {errors.rating?.type==='required'&& <p className="text-danger">*Rating is required</p>}
            {/* name */}
            <label htmlFor="un2" className="form-label"></label>
            <input type="text"id="un2"{...register('name',{required:true,minLength:4})} className="form-control mb-3 " autoComplete="off"placeholder="Name"/>
                {errors.name?.type==='required'&& <p className="text-danger">*username is required</p>}
                {errors.name?.type==='minLength'&& <p className="text-danger">*min should be 4</p>}
            {/* summary */}
            <label htmlFor="em2" className="form-label"></label>
            <input type="text"id="em2"{...register('summary',{required:true})} className="form-control mb-3 " autoComplete="off"placeholder="Summary"/>
                {errors.summary && <p className="text-danger">*email is required</p>}
            {/* message */}
            <label htmlFor="mgs2" className="form-label"></label>
            <textarea id="mgs2"{...register('review',{required:true})} className="form-control mb-3 " autoComplete="off" placeholder="your Review"/>
                {errors.review && <p className="text-danger">*Review is required</p>}
            {/* btn */}
            <button type="submit" className="btn btn-left mt-2 mb-4 text-light"id="subbtn"><strong>Submit</strong></button>
        </form>
    </div>
    )
}
export default ReviewForm;