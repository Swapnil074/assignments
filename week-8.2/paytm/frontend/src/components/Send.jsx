import axios from "axios"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

function Send() {
  const location=useLocation()
  const navigate=useNavigate()
  const [amount, setAmount]=useState(0)
  const handleTransfer=async()=>{
    const res=await axios.post('http://localhost:8000/api/v1/account/transfer',{
      amount:amount,
      to:location.state.to,
    },{
      headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
    })
    if(res.status===200)
      navigate('/dashboard')
    else{
      alert(res.data.message)
    }
  }
  return (
    <div>
      <p>Send Money</p>
      <div className='profile-avatar'>{location.state.name.slice(0)[0].toUpperCase()}</div>
      <p>{location.state.name} </p>
      <input value={amount} placeholder="Enter Amount" onChange={e=>setAmount(e.target.value)}/>
      <button className="transfer-button" onClick={() =>handleTransfer() }>
        Initiate Transfer
      </button>
    </div>
  )
}

export default Send