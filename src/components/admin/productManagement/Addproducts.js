import {useForm} from 'react-hook-form'
import axios from 'axios';
import {useState} from 'react'
import '../../../css/AddProductsCSS.css'

function Addproducts(){

const {register,handleSubmit,formState:{errors}}=useForm();
const [file,setFile]=useState(null)

const onFormsubmit=(productObj)=>{
    let formData=new FormData();
    //adding image to formdata obj
    formData.append('photo',file,file.name)
    //add userobj to formdata
    formData.append("productObj",JSON.stringify(productObj))
    //pass it to the userapi by http post request
    axios.post('/products/createproduct',formData)
    .then(res=>{
        alert(res.data.message)
        //history.push('/viewproduct')
    })
    .catch(err=>console.log(err))
}

 const onFileSelect=(event)=>{
    console.log(event.target.files[0])
   setFile(event.target.files[0])
}
    return(
        

        <div className="container w-100 mx-auto" >
            <form className="mx-auto d-block" onSubmit={handleSubmit(onFormsubmit)}>
                {/* prdName */}
                
                <h1 className="text-center" style={{fontWeight:'lighter'}} >Product details</h1>

                <label htmlFor="pne" className="form-control-label mt-4" id="pnam">Productname</label>
                <input type="text" id="pnam"className="form-control" required {...register('productname')}></input> 
                   {/*Category*/}
                <label className="form-control-label  mt-4" id="pcat">Catagory</label>
                <select className="form-control" id="pcat"required {...register('catagory')} >
                    <option value="occasion">occasion</option>
                    <option value="type">type</option>
                    <option value="colour">colour</option>
                    <option value="special flowers">special flowers</option>
                    <option value="festive special">festive special</option>
                </select>
                {/* Type */}
                <label htmlFor="pty" className="form-control-label  mt-4" id="pty">Type</label> 
                <input type="text" id="pty" className="form-control" required {...register('type')}></input>
                {/* Price */}
                <label htmlFor="ppr" className="form-control-label  mt-4" id="ppp">Price</label>
                <input type="number" id="ppp"className="form-control" required {...register('price')}></input>
                {/* description */}
                <label className="form-control-label  mt-4" id="pdes">description</label>
                <textarea className="form-control" id="pdes"{...register('description')}></textarea>
                {/* Prd Foto */}
                <input type="file" name="photo" className="form-control mt-3" id="pfil" onChange={(e=>onFileSelect(e))}></input>
               <div className="text-center">
                <button className=" btn btn-primary mt-3" id="sdb">Add products</button>
                </div>
                
        
            </form>
        </div>
       
    )
}
export default Addproducts