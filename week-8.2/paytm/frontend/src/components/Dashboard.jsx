import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate=useNavigate()

  console.log(localStorage.getItem('token'))
  const [balance, setBalance]=useState()
  const [users, setUsers]=useState()
  const [searchedUsers, setSearchedUsers]=useState()
  const [searchParams, setSearchParams]=useState()
  const [logoutVisible, setLogoutVisible] = useState(false);
  useEffect(()=>{
    console.log('token check')
    if(localStorage.getItem('token')===null)
    navigate('/signin')
  },[])

  const fetchBalance=async()=>{
    const res=await axios.get('http://localhost:8000/api/v1/account/balance',{
      headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
    })
    console.log(res.data.balance)
    setBalance(res.data.balance)
  }
  const handleLogout=()=>{
    localStorage.clear()
    navigate('/signin')
  }

  const fetchUser=async()=>{
    const res=await axios.get('http://localhost:8000/api/v1/user/bulk',{
      headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
    })
    console.log(res)
    setUsers(res.data.user)
  }
  const handleSearch=async()=>{
    const res=await axios.get(`http://localhost:8000/api/v1/user/bulk?filter=${searchParams}`,{
      headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
    })
    console.log(res.data.user)
    setSearchedUsers(res.data.user)
  }


  useEffect(()=>{

    fetchBalance()
  },[])
  useEffect(()=>{
    if(searchParams)
    handleSearch()
  },[searchParams])
  const firstName=JSON.parse(localStorage.getItem('userInfo')).firstName
  const firstLetter=firstName.slice(0)[0].toUpperCase()
  

  return (
    <>
    <div className='navbar'>
      <div className='header-left'>
          <p>Payments App</p>
      </div>
      <div className='header-right'>
        <p>Hello, {firstName}</p>
        <div className='profile-avatar' style={{cursor: 'pointer'}} onClick={()=>setLogoutVisible(prevState=>!prevState)}>{firstLetter}</div>
        {logoutVisible && <div className='logout-button' onClick={()=>handleLogout()}>Logout</div>}
      </div>
    </div>
    <div className='divider'>
      {" "}
    </div>
    <div className='balance'>
      <p><b>Your Balance</b>  Rs.{balance?.toFixed(2)}</p>
    </div>
    <div className='search-container'>
      <p style={{
        fontSize:"large"
      }}><b>Users</b></p>
      <input value={searchParams} placeholder='Search users...' onChange={(e)=>setSearchParams(e.target.value)}></input>
      <div className='search-results-container'>
  {searchedUsers && searchedUsers.map(user => (
    <div className='search-result' key={user?._id}>
      <div className='user-name'>
      <div className='profile-avatar'>{user?.firstName?.slice(0)[0]?.toUpperCase()}</div>
      <p>{user?.firstName} {user?.lastName}</p>
      </div>
      <button className="send-button" onClick={() => navigate('/send', { state: { to: user._id, name:user.firstName } })}>
        Send Money
      </button>
    </div>
  ))}
</div>
    </div>
   
    </>
    )
}

export default Dashboard