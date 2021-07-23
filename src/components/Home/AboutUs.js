import flimg from '../../imgs/loginImg.jpg'
import '../../css/App.css'
function AboutUs(){

    return(
        <div>
             <div className="row row-cols-1 row-cols-md-2">
               <div className="col text-center">
                   <img src={flimg} alt="Contact us img"id="pdimg"className="w-75 mt-3 mb-3"/>
               </div>
               <div className="col">
                   <p className="pa4">ABOUT US</p>
                   <h5>contactus@boho.com</h5>
                   <p className="para">Sending fresh flowers and gifts is the dream of every individual on their loved ones important days of life.
                        Blossom lane make this dream of yours come to reality through our online gift delivery service in chennai and across India.<br/>

Blossom lane appreciates you if you brighten your loved ones day with gorgeous roses and special gifts. Similar to Valentine’s day,
 mother’s day, women’s day and Rakhi is of equal importance, we help you to convey your thank you’s and love through exotic flower arrangements 
and other gift items. You will find the perfect products for someone you love and care in our gift gallery.<br/>

Blossom lane religiously believes that endowing gifts to someone shows true expression of your
 sincere love towards your loved ones. A gift wrapped in bright colored packing makes someone feel special and happy;
  on their special days of life in today’s scenario online gifting is a trend. Send flowers to Chennai with reliable gifting source,
   to create memories and happy moment’s surprises in life is imperative.</p>
               </div>
        </div>
        </div>
    )
}


export default AboutUs;