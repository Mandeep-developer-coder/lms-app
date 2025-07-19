export const StudentPage=()=>

{ 
    const user = JSON.parse(localStorage.getItem("user"));
    
    return(
        <>
        <h1>Welcome {user.userName}</h1>
        </>
    )
}