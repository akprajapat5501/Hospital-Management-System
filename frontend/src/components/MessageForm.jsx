import React, { useState } from 'react'
import { toast } from 'react-toastify';


const MessageForm = () => {

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleMessage = async(e) =>{
    e.preventDefault()

    try {
      const res = await fetch("http://localhost:4000/api/v1/message/send", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({firstName, lastName, phone, email, message})
      })

      const data = await res.json();
      if(!res.ok) throw new Error(data.message || "Failed to send message");
      console.log(data);

      toast.success("Message sent successfully");
      // clear form
      setFirstName("");
      setLastName("");
      setPhone("");
      setEmail("");
      setMessage("");
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <div className="container form-component message-form">
      <h2>Send Us A Message</h2>
      <form onSubmit={handleMessage}>
        <div>
          <input type="text"
          placeholder="Enter your firstName"
          value={firstName}
          onChange = {e => setFirstName(e.target.value)}
          />

          <input type="text"
          placeholder="Enter your lastName"
          value={lastName}
          onChange = {e => setLastName(e.target.value)}
          />
        </div>

        <div>
           <input type="phone"
          placeholder="Enter your phone"
          value={phone}
          onChange = {e => setPhone(e.target.value)}
          />

          <input type="text"
          placeholder="Enter your email"
          value={email}
          onChange = {e => setEmail(e.target.value)}
          />
        </div>
        
        <textarea
        rows={7}
        placeholder="Enter your message"
        value={message}
        onChange = {e => setMessage(e.target.value)}
        ></textarea>
        <div style= {{justifyContent: 'center', alignItems: 'center'}}>
          <button type="submit">Send Message</button>
          </div>
      </form>
    </div>
  )
}

export default MessageForm