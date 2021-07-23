import {Navbar,Dropdown,NavDropdown} from 'react-bootstrap'
import {BrowserRouter,Link,Switch,Route,Redirect,useHistory} from 'react-router-dom'
import UserManagement from './userManagement/UserManagement'
import ProductManagement from './productManagement/ProductManagement';
import { faSignOutAlt} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import OrderManagement from './OrderManagement/OrderManagement'
import ReviewManagement from './ReviewManagement/ReviewManagement';
import QueryManagement from './queryManagement/QueryManagement';


function AdminDashBoard(props){
    let setAdminStatus=props.setAdminStatus
    let setLoginMonitor=props.setLoginMonitor
    let history=useHistory()
    const adminLogout=async()=>{
        await setLoginMonitor(false)
        await setAdminStatus(false)
        localStorage.clear()
        history.push('/home')
    }

    return(
       <BrowserRouter>
       <Navbar expand="lg"className="bg-dark">
           <div className="col-lg-11 col-md-8 col-sm-4 col-xs-4">
           <h4 className="text-light"style={{fontWeight:'lighter',fontSize:'20px'}}>Welcome Admin</h4></div>
           <div className="col-lg-1 col-md-4 col-sm-8 col-xs-8">
           <ul className="nav mx-auto">
               <li className="nav-item">
               {/* <button className="btn me-auto" onClick={()=>adminLogout()}>LOGOUT</button> */}
               <button className="nav-link active me-auto" aria-current="page"  onClick={()=>adminLogout()} >
                   <span>LOGOUT
                       <FontAwesomeIcon className="ms-2 ps-2" icon={faSignOutAlt}/></span></button>
               </li>
           </ul></div>
      
       </Navbar>
      
       <Navbar expand="lg"> 
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="togglebtn" >
              </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
            <ul className="nav mx-auto">
               <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/adminprofile/admin/userManagement" >User Management</Link>
               </li>
               {/* product management */}
              <li className="nav-item">
                  <Link className="nav-link " aria-current="page" to="/adminprofile/admin/productManagement" >Product Management</Link>
              </li>
              {/* order management */}
               <li className="nav-item">
                   <Link className="nav-link " aria-current="page" to="/adminprofile/admin/OrderManagement" >Order Management</Link>
               </li>
               {/* review management */}
               <li className="nav-item">
                     <Link className="nav-link " aria-current="page" to="/adminprofile/admin/ReviewManagement" >Review Management</Link>
               </li>
                {/* Query management */}
                <li className="nav-item">
                     <Link className="nav-link " aria-current="page" to="/adminprofile/admin/QueryManagement" >Query Management</Link>
               </li>
            </ul>
       </Navbar.Collapse>     
</Navbar>
<Switch>

            <Route path="/adminprofile/admin/usermanagement">
              <UserManagement/>
            </Route>
            <Route path="/adminprofile/admin/productmanagement">
                <ProductManagement/>
            </Route>
             <Route path="/adminprofile/admin/OrderManagement">
                <OrderManagement/>
            </Route> 
            <Route path="/adminprofile/admin/ReviewManagement">
                <ReviewManagement/>
            </Route>
            <Route path="/adminprofile/admin/QueryManagement">
                <QueryManagement/>
            </Route>
            <Route path="/adminprofile/admin">
              <Redirect to="/adminprofile/admin/usermanagement"/>
            </Route>  
            
</Switch>
       </BrowserRouter>
    )
}

export default AdminDashBoard
