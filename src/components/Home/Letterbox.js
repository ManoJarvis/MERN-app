import '../../css/LetterboxCSS.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faVirus } from '@fortawesome/free-solid-svg-icons'
function Letterbox(){
    let reviewObj={
        heading:'WHAT THEY TALK ABOUT US',
        username:"Opinion About Us",
        review:'Got a bouquet of beautiful really fresh sunflowers ❤. Neatly packed. Very professional service. Can easily rely on them for any occasion . Got it delivered within hours of ordering . Loved the packing !!'
    }

    return(
        <div>
        <div className="row row-cols-1 row-cols-md-2 letterBox">
        <div className="col mt-2 ">
        <div className="full-width-image">
        <h1 className=" p-3 text-center">{reviewObj.heading}</h1>
        <h3 className="pt-3 text-center">{reviewObj.username}</h3>
        <h3 className="pt-3 text-center pb-5">❝ {reviewObj.review} ❞</h3>
      
        </div>
    </div>
     <div className="col mt-2 letterBox">
         <h1 className="pt-5 pb-3 text-center">SAFE DELIVERY AGAINST THE MONSTER!!!</h1>
        
         <FontAwesomeIcon icon={faVirus} style={{fontSize:'150px',color:'#c71585'}} className="text-center mx-auto d-block  "/>
         

     </div>
     </div></div>
    )
}

export default Letterbox