import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {useHistory} from 'react-router-dom'
import {animateScroll as scroll} from 'react-scroll'
import '../../css/App.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
function Checkout(){
    const {register,handleSubmit,formState:{errors}}=useForm();
    let [cartObj,setCartObj]=useState([])
    let [grandTotal,setGrandTotal]=useState(0)
    let userDetails=JSON.parse(localStorage.getItem('user'))
    let history=useHistory()
    // Submit Order
    const onFormsubmit=(userObj)=>{
        let username=userDetails.username
        let myOrders=[userObj,cartObj,username]
        axios.post('/users/myorders',myOrders)
        .then(res=>{
            alert(res.data.message)
            scroll.scrollToTop()
            history.push(`/${username}/myorders`)
        })
        .catch(err=>console.log(err))
    }

    // Display Cart Info
    useEffect(()=>{
        let userDetails=JSON.parse(localStorage.getItem('user'))
        axios.get(`/users/getproducts/fromcart/${userDetails.username}`)
            .then(res=>{
                setCartObj(res.data.message.products)
                setGrandTotal(0)
            })
            .catch(err=>console.log(err))
    },[])

    // To find Total Price
    useEffect(()=>{
        let gt=0
        cartObj.map((cartObj)=>{
            gt += cartObj.totalprice
            
        })
        setGrandTotal(gt)
    },[cartObj])
    let minimum = new Date();
  minimum.setMonth(minimum.getMonth() +1);
    const [expiryDate, setexpiryDate] = useState('');
    
    return(
        <div className="w-100">
        <h1 className="heading mt-5">Checkout</h1>
        <div className="row" style={{paddingLeft:"15px"}}>
           <div className="col-md-8">
               <form className="paymentform ms-5" onSubmit={handleSubmit(onFormsubmit)}>

           {/* delivery details */}
           <div className="checkout card mt-5 ">
                <div className="card-title">
                    <h6 className="yourdetail ms-5 pt-2 " style={{height:"45px",paddingLeft:"12px"}}>Delivery details</h6>
                </div>
            <div className="row ms-4" style={{paddingLeft:"15px"}}>
                <div className="col-md-12">
            {/* name */}
           <label className=" form-control-label ms-5 mt-2" >Name*</label>
           <input type="text" className=" form-control w-100 "  required {...register('name')}></input>
           
           {/* Email */}
           <label className=" form-control-label ms-5 mt-2" >Email*</label>
           <input type="email" className=" form-control w-100 ms-3 " required {...register('email')}></input>
           {/* street */}
           <label className=" form-control-label ms-5 mt-2" >Street Address line*</label>
           <input type="text" className=" form-control w-100 ms-3 " required {...register('street')}></input>
           {/* city */}
           <label className=" form-control-label ms-5 mt-2" >City*</label>
           <input type="text" className=" form-control w-100 ms-3 " required {...register('city')}></input>
           {/* state and country */}
           <div className="row">
               <div className="col-md-6">
                   {/* country */}
           <label className=" form-control-label ms-5 mt-2" >State</label>
           <input type="text" className=" form-control w-100 ms-3 " required {...register('state')}></input>
           </div>
           <div className="col-md-6">
               {/* state */}
           <label className=" form-control-label ms-2 mt-2" >Pincode</label>     
           <input type="number" className=" form-control w-100 ms-3 " required minLength="7" {...register('pincode')}></input>
           </div>
           </div>
           {/* mobile */}
           <label className=" form-control-label ms-5 mt-2" >Phone Number*</label>
           <input type="text" className=" form-control w-100 mb-3 " required {...register('mobile')}></input>
         

           </div>
           </div>
           </div>


        {/* card message */}
        <div className="checkout card mt-5">
                <div className="card-title">
                    <h6 className="yourdetail ms-5 pt-2 " style={{height:"45px",paddingLeft:"12px"}}>Card Message</h6>
                </div>
               
           <textarea className=" form-control w-100 " rows="4" required {...register('message')}/>
           
        </div>
        {/* payment method */}

        <div className="checkout card mt-6">
                <div className="card-title">
                <h6 className="yourdetail ms-5 pt-2 " style={{height:"45px",paddingLeft:"12px"}}>Payment Method</h6>
                </div>

                <h4 className="text-center mb-5" style={{fontWeight:"lighter"}}>Card details <i class="far fa-credit-card"></i></h4>
                
                     {/* radio */}    
                     <div className="row mt-2 " style={{paddingLeft:"15px"}}>
                         <div className="col-md-6 ms-5">
                      <label htmlFor="cardnumber">Card Number</label> 
                 <input type="number" className="form-control w-75 ms-3" id="cardnumber" placeholder="Enter your Card number" autoComplete="off" {...register('cardnumber',{required:true,minLength:16,maxLength:16})}/>  
                 {errors.cardnumber?.type==='required' && <p className="text-danger">card number required</p>}
                 {errors.cardnumber?.type==='maxLength' && <p className=" text-danger" >Invalid card number</p>}             
                 {errors.cardnumber?.type==='minLength' && <p className=" text-danger" >Invalid card number</p>}             
                  </div>
                    <div className="col-md-6">
                     <label htmlFor="cardholdername">Cardholder's Name</label> 
                     <input type="text" className="form-control w-75" id="cardholdername" placeholder="Enter the Cardholder's Name" autoComplete="off" {...register('cardholdername',{required:true})}/>
                     {errors.cardholdername?.type==='required' && <p className="text-danger">cardholdername required</p>}

                    </div>
                 </div>

                 <div className="row " style={{paddingLeft:"15px"}}>
                 <div className="col-md-6">
                  <label className=" form-control-label ms-2 mt-4" >Expiry date</label> <br></br>
                  <DatePicker selected={expiryDate} className="form-control w-75"
                         onChange={date=>setexpiryDate(date)}
                         value={expiryDate} required={true}
                         placeholderText="mm/yy"
                         minDate={minimum}
                         dateFormat="MM/yy"
                         showMonthYearPicker
                         />  
                 {/* <input type="month" className="form-control " {...register('expiry',{required:true})}/> */}
                 {errors.expiry?.type==='required' && <p className="text-danger">Expiry date required</p>}
          
                     </div>
              <div class="col-md-6">
             <label className=" form-control-label ms-2 mt-4" >CVV</label>  
             <input type="number" className="form-control w-75 " placeholder="Enter CVV number" aria-label="ccv" autoComplete="off" {...register('cvv',{required:true,minLength:3,maxLength:3})}/>
             {errors.cvv?.type==='required' && <p className="text-danger">CVV required</p>}
             {errors.cvv?.type==='minLength' && <p className=" text-danger" >Invalid cvv</p>}    
             {errors.cvv?.type==='maxLength' && <p className=" text-danger">Invalid cvv</p>} 

        
               </div>
               </div>
               <span style={{fontSize:"40px",color:"skyblue",marginTop:"20px"}}><i style={{marginLeft:"20px",color:"darkblue"}} class="fab fa-cc-visa"></i>
               <i style={{marginLeft:"20px",color:"orange"}} class="fab fa-cc-mastercard"></i>
               <i style={{marginLeft:"20px",color:"blue"}} class="fab fa-google-pay"></i>
               <i style={{marginLeft:"20px"}} class="fab fa-paypal"></i>
               </span>
                    <button type="submit" className="buton btn mx-auto mb-5 mt-5">Proceed To Pay</button>
        </div>
        </form>
        </div>
        <div className="col-md-4">
            <div className="card mt-5" style={{borderRadius:"5px"}}>           
                <div className="card-title">
                <h6 className="yourdetail ms-5 pt-2 " style={{height:"45px",paddingLeft:"12px"}}>Summary</h6>
                </div>
                    <table className="table">
                       <thead>
                            <th>Product Name</th>
                            <th></th>
                            <th className="text-center">Quantity</th>
                            <th>Price</th>
                       </thead>
                        <tbody>
                            {
                            cartObj.map(cartObj=>{
                            return(
                               <tr>
                               <td>{cartObj.productname}</td>
                               <td>X</td>
                               <td className="text-center">{cartObj.quantity}</td>
                               <td> ₹{cartObj.totalprice}</td>
                               </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                    <hr></hr>
                    <h5 className="text-success text-right p-2">Order Total: ₹{grandTotal}</h5>
                    
                </div>
            </div>
        </div>
    </div>
    )
}
export default Checkout