import {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHome} from '@fortawesome/free-solid-svg-icons'
import {Nav,NavDropdown,Navbar} from 'react-bootstrap'
import {Link,useHistory, useParams} from 'react-router-dom'
import '../../css/App.css'
import '../../css/CategoryCSS.css'  
function Category(props){
    let url=useParams()
    let setCategoryStatus=props.setCategoryStatus
    let history=useHistory()
    const category=[
        {type:"By Occasion",subType:["Birthday","Congratulations","Get Well Soon","Anniversary"]},
        {type:"By Type",subType:["Gerberas","Roses","Lilies","Carnations","Mixed"]},
        {type:"By Color",subType:["Pink","Red","White","Yellow","Mixed"]},
        {type:"Special Flowers",subType:["Exotic Flowers","Flower Boxes","Flower Basket","Flower Bouquet","Precious Flowers"]},
        {type:"Festive Special",subType:["Women's Day","Mother's Day","Men's Day","Diwali Special","Christmas Special"]}        
                ]
    // Category OnClick
        const categoryOnClick=(categoryObj)=>{
            setCategoryStatus(true)
            // localStorage.setItem("category",categoryObj)
            history.push(`/productlist/${categoryObj}`)
        }
        const [show1, setShow1] = useState(false);
        const [show2, setShow2] = useState(false);
        const [show3, setShow3] = useState(false);
        const [show4, setShow4] = useState(false);
        const [show5, setShow5] = useState(false);
        const showDropdown1 = (e)=>{
            setShow1(!show1); 
        }
        const showDropdown2 = (e)=>{
            setShow2(!show2); 
        }
        const showDropdown3 = (e)=>{
            setShow3(!show3); 
        }
        const showDropdown4 = (e)=>{
            setShow4(!show4); 
        }
        const showDropdown5 = (e)=>{
            setShow5(!show5); 
        }
        const hideDropdown = e => {
            setShow1(false);
            setShow2(false);
            setShow3(false);
            setShow4(false);
            setShow5(false);
        }
        

    return(
        <Navbar collapseOnSelect expand="lg" className="categorymenu text-center mt-2 ">           
            <Nav data-testid="navbar">            
                <Link data-testid="home-link" to="/home" ><span className="icon" style={{fontSize:"22px"}}><i className="fas fa-home"></i></span></Link>          
                
                <div className="submenu text-center">
                    <NavDropdown className="menu" title={category[0].type} id={category[0].type}
                    show={show1} onMouseEnter={showDropdown1} onMouseLeave={hideDropdown}> 
                        {
                        category[0].subType.map((subTypeObj,ind)=>{
                        return(
                            <Link className="dropdown-item " key={ind} 
                            onClick={()=>categoryOnClick(subTypeObj)}>
                                {subTypeObj}
                            </Link> 
                            )
                        })
                        }
                    </NavDropdown>
                </div>
                <div className="submenu">
                    <NavDropdown className="menu" title={category[1].type} id={category[1].type}
                    show={show2} onMouseEnter={showDropdown2} onMouseLeave={hideDropdown}>
                        {
                            category[1].subType.map((subTypeObj,ind)=>{
                            return(
                                <Link className="dropdown-item" key={ind}
                                onClick={()=>categoryOnClick(subTypeObj)}>
                                    {subTypeObj}
                                </Link> 
                                )
                            })
                        }
                    </NavDropdown>
                </div>
                <div className="submenu">
                <NavDropdown className="menu" title={category[2].type} id={category[2].type}
                show={show3} onMouseEnter={showDropdown3} onMouseLeave={hideDropdown}>
                    {
                        category[2].subType.map((subTypeObj,ind)=>{
                        return(
                            <Link className="dropdown-item" key={ind}  
                            onClick={()=>categoryOnClick(subTypeObj)}>
                                {subTypeObj}
                            </Link> 
                            )
                        })
                    }
                </NavDropdown>
                </div>
                <div className="submenu1">
                <NavDropdown className="menu" title={category[3].type} id={category[3].type}
                show={show4} onMouseEnter={showDropdown4} onMouseLeave={hideDropdown}>
                    {
                        category[3].subType.map((subTypeObj,ind)=>{
                        return(
                            <Link className="dropdown-item"  key={ind} 
                            onClick={()=>categoryOnClick(subTypeObj)}>
                                {subTypeObj}
                            </Link> 
                            )
                        })
                    }
                </NavDropdown>
                </div>
                <div className="submenu1">
                <NavDropdown className="menu ms-5" title={category[4].type} id={category[4].type}
                show={show5} onMouseEnter={showDropdown5} onMouseLeave={hideDropdown}>
                    {
                        category[4].subType.map((subTypeObj,ind)=>{
                        return(
                            <Link className="dropdown-item" key={ind} 
                            onClick={()=>categoryOnClick(subTypeObj)}>
                                {subTypeObj}
                            </Link> 
                            )
                        })
                    }
                </NavDropdown>
                </div>
            </Nav>
        </Navbar>

    )
}

export default Category