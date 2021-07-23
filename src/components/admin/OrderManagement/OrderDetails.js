function OrderDetails(props){
    let userOrdObj=props.userOrdObj 
    return(
        <div className="table-responsive">
            <h5 style={{fontWeight:'normal'}} className="mt-3" ><strong>Name:</strong> {userOrdObj[0].name}</h5>
            <div className="row">
            <div className="col-md-6">
            <h5 style={{fontWeight:'normal'}}className="mt-3"><strong>Mobile:</strong> {userOrdObj[0].mobile}</h5></div>
            <div className="col-md-6">
            <h5 style={{fontWeight:'normal'}}className="mt-3"><strong>Email:</strong> {userOrdObj[0].email}</h5></div></div>
            <div className="row">
            <div className="col-md-6">
            <h5 style={{fontWeight:'normal'}}className="mt-3"><strong>Street:</strong> {userOrdObj[0].street}</h5></div>
            <div className="col-md-6">
            <h5 style={{fontWeight:'normal'}}className="mt-3"><strong>pincode:</strong> {userOrdObj[0].pincode}</h5></div></div>
            <div className="row">
            <div className="col-md-6">
            <h5 style={{fontWeight:'normal'}}className="mt-3"><strong>State:</strong> {userOrdObj[0].state}</h5></div>
            <div className="col-md-6">
            <h5 style={{fontWeight:'normal'}}className="mt-3"><strong>City: </strong>{userOrdObj[0].city}</h5></div></div>
            <h5 style={{fontWeight:'normal'}}className="mt-3"><strong>Message: </strong>{userOrdObj[0].message}</h5>
            <table className="table">
                <thead>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                    <th>Date Of Delivery</th>
                </thead>
                <tbody>
                    {
                        userOrdObj[1].map(ordObj=>{
                            return(
                                <tr>
                                    <td>{ordObj.productname}</td>
                                    <td>{ordObj.quantity}</td>
                                    <td>{ordObj.totalprice}</td>
                                    <td>{ordObj.dateOfDelivery}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default OrderDetails