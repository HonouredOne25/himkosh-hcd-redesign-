 "use client";
import {useState} from "react";
export default function Verify(){
 const [id,setId]=useState(""); const [result,setResult]=useState(null);
 function check(){if(!id.trim()){setResult({bad:true,text:"Enter your HIMGRN number to check the status."});return}setResult({bad:false,text:`Demo result: ${id} is marked “Paid”. This is simulated data for the prototype.`})}
 return <section className="section verifySection" id="verify"><div className="sectionHead"><div><p className="eyebrow">Fast verification</p><h2>Already have a challan?</h2></div><p>Check a receipt without navigating through multiple pages.</p></div><div className="verifyBox"><span className="verifyIcon">✓</span><div><label htmlFor="himgrn">HIMGRN number</label><input id="himgrn" value={id} onChange={e=>setId(e.target.value)} placeholder="e.g. HP2026XXXXXXXX"/><small>Find your HIMGRN on the challan receipt.</small></div><button className="primary" onClick={check}>Check status</button></div>{result&&<div className={"result "+(result.bad?"bad":"")}>{result.text}</div>}</section>
}
