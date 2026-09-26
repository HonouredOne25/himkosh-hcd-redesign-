 "use client";
import {useState} from "react";

export default function Header(){
  const [open,setOpen]=useState(false);
  return <header className="header">
    <a className="brand" href="#home"><span className="logo">₹</span><span><b>HimKosh</b><small>e-Challan · Himachal Pradesh</small></span></a>
    <button className="mobileMenu" onClick={()=>setOpen(!open)} aria-label="Toggle navigation">☰</button>
    <nav className={open?"nav open":"nav"}>
      <a href="#tasks" onClick={()=>setOpen(false)}>Pay</a><a href="#verify" onClick={()=>setOpen(false)}>Verify</a><a href="#ai" onClick={()=>setOpen(false)}>AI Guide</a><a href="#help" onClick={()=>setOpen(false)}>Help</a>
      <button className="signIn" onClick={()=>alert("Demo sign-in — no real account is created.")}>Sign in</button>
    </nav>
  </header>
}
