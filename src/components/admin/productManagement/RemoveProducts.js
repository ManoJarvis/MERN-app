import {useForm} from 'react-hook-form'
import axios from 'axios';
import {useState,useEffect,useRef} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import "../../../css/RemoveProductsCSS.css"


function Removeproducts(props){
    const {register,handleSubmit,formState:{errors}}=useForm();
    let[prdobj,setPrdObj]=useState([])
    let [searchterm,setSearchterm]=useState('')
    let [productlist,setProductlist]=useState('')
    let setCategoryStatus=props.setCategoryStatus


    // Getting data from input Field
    const prdNameSubmit=(prdName)=>{
        onClickdelete(prdName.productname)
    }

    useEffect(()=>{
    if(searchterm.length>=2){
        axios.get(`/products/getproducts/search/${searchterm}`)
        .then(res=>{
            setProductlist(res.data.message)
        })
    }
    },[searchterm])

    //delete product
    const onClickdelete=(prdName)=>{
        // Make Req to Delete item 
        axios.delete(`/products/deleteproducts/${prdName}`)
        .then(res=>{
            alert(res.data.message)
        })
        .catch(err=>console.log(err))
    }
    

    useEffect(()=>{
        let result=document.getElementById('result')
        document.addEventListener('click',(e)=>{
                e.stopPropagation()
            result.style.display="none"
        })
        let searchbar=document.getElementById('searchbar')
            searchbar.addEventListener('click',(e)=>{
                e.stopPropagation()
            result.style.display="flex"
        })
    })
    return(
        <div>
            <div className="search-bar-dropdown mt-5 mx-auto">
                <label htmlFor="searchbar">PRODUCT NAME:</label>
                <input type="text" id="searchbar" className="form-control w-75"required
                {...register('productname')} onChange={e=>{setSearchterm(e.target.value)}} 
                autoComplete="off"/>
                <ul id="result" className="list-group" >
                {productlist &&
                   productlist.map(prdObj=>{ 
              return(
                    <li  className="list-group-item list-group-item-action" id="rpc">
                       <span>{prdObj.productname}<FontAwesomeIcon icon={faTrashAlt} id="delu" className="float-right"
                       onClick={()=>onClickdelete(prdObj.productname)}></FontAwesomeIcon></span>
                    </li>
                       ) 
                    })
                }
                </ul>
            </div>
        </div>
    )
}
export default Removeproducts;