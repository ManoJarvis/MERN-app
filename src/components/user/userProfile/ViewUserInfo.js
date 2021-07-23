import "../../../css/UserProfileCSS.css";
function ViewUserInfo(props){
    let userObj=props.userObj
    
    return(
        <div>
            <h1 className="text-center mt-4 info">User Info</h1>
            {userObj &&
                <>
                <h5 className="usrInfo card-text"><strong>Name:</strong> {userObj.username}</h5>
                <h5 className="usrInfo card-text"><strong>Email: </strong>{userObj.email}</h5>
                <h5 className="usrInfo card-text"><strong>Phone No: </strong>{userObj.mobile}</h5>
                </>
            }
        </div>
    )
}

export default ViewUserInfo;