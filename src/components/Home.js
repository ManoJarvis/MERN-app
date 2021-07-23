// Import Packages
import {useState} from 'react'
import {Carousel} from 'react-bootstrap'

// Import Carousel Img
import img3 from '../imgs/caresol/img1.jpg'
import img2 from '../imgs/caresol/img2.jpg'
import img1 from '../imgs/caresol/img3.jpg'
import ScrollingContent from './Home/ScrollingContent/ScrollingContent'
import '../css/HomeCSS.css'
import BirthdayCard from './Home/BirthdayCard'
import ByOccasions from './Home/ByOccasion component/ByOccasions'
import {useHistory} from 'react-router-dom'

function Home(){
    let history=useHistory();
    // For Scrolling
    let [scrollMonitor,setScrollMonitor]=useState(true)
    // For Carousel Control
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };

    // On category Click
    const categoryOnClick=(cat)=>{
        history.push(`/productlist/${cat}`)
    }

    return(
        <>
        <Carousel fade activeIndex={index} onSelect={handleSelect} className="mt-3 mb-3">
            <Carousel.Item>
                <img className="car d-block w-100" src={img1} alt="First slide"/>
                <Carousel.Caption className="carousel-caption">
                    <h1 className="h11">Any Special Events</h1>
                    <h3 className="h11">Flowers Anywhere,Anytime</h3>
                    <button onClick={()=>categoryOnClick("Flower Basket")} className="btn bt">SHOP NOW</button>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="car d-block w-100" src={img2} alt="Second slide"/>
                <Carousel.Caption>
                    <h1 className="h11">Any Special Events</h1>
                    <h3 className="h11">Flowers Anywhere,Anytime</h3>
                    <button  onClick={()=>categoryOnClick("Mother's Day")} className="btn bt">SHOP NOW</button>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="car d-block w-100" src={img3} alt="Third slide"/>
                <Carousel.Caption>
                    <h1 className="h11">You are Special</h1>
                    <h3 className="h11">Say it with a Bouquet</h3>
                    <button  onClick={()=>categoryOnClick("Flower Bouquet")} className="btn bt">SHOP NOW</button>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
        {/* Scrolling Content */}
        <ScrollingContent scrollMonitor={scrollMonitor} setScrollMonitor={setScrollMonitor}
         productType="Anniversary" heading="New Arrivals"/>
        {/* Birthday Card */}
        <BirthdayCard/>
        {/* By Occasion */}
        <ByOccasions/>
        </>
        )
}

export default Home;
