import '../../../css/App.css'
import {useState} from 'react'
import ByOccasionCards from './ByOccasionCards'
import {Link} from 'react-router-dom'
function ByOccasions(){
    let [prdType,setPrdType]=useState('Love And Affection')
    // OnClick to Change Prd Type
    const onClick=(type)=>{
        setPrdType(type)
    }
    return(
        <div className="mt-lg-5">
            <h1 className= "heading text-center mb-4 mt-4">Shop By Occasions</h1>  
            <ul className="category  nav text-center">
                <li className=" category-item nav-item">
                    <Link className="links" onClick={()=>onClick("Birthday")}>BIRTHDAY</Link>
                </li>
                <li className=" category-item nav-item">
                    <Link className="links" onClick={()=>onClick("Anniversary")}>ANNIVERSARY</Link>
                </li>
                <li className=" category-item nav-item">
                    <Link className="links" onClick={()=>onClick("Love And Affection")}>LOVE AND AFFECTION</Link>
                </li>
                <li className=" category-item nav-item">
                    <Link className="links" onClick={()=>onClick("Get Well Soon")}>GET WELL SOON</Link>
                </li>
            </ul>
            <ByOccasionCards prdType={prdType} />
        </div>
    )
}

export default ByOccasions