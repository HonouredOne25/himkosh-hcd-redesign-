 "use client";
import {useState} from "react";
const qs=[
["Do I need an account to make a payment?","No account is required for the demo flow. The redesign keeps guest access visible instead of hiding the primary task behind sign-in."],
["What is a HIMGRN?","It is the unique number generated for a challan and can be used to track or verify that transaction."],
["Can I pay manually at a bank?","The redesign presents online and manual payment routes as explicit choices. Actual availability would need to be confirmed against the live government service."],
["What if my account was debited but payment failed?","The safest first step is to verify the challan status using your HIMGRN before attempting another payment."]
];
export default function FAQ(){const [open,setOpen]=useState(-1);return <div className="faqGrid">{qs.map((q,i)=><button className={"faq "+(open===i?"open":"")} onClick={()=>setOpen(open===i?-1:i)} key={q[0]}><span>{q[0]}</span><b>{open===i?"−":"+"}</b>{open===i&&<p>{q[1]}</p>}</button>)}</div>}
