 "use client";
const tasks=[
 ["₹","Make a payment","Generate a challan and choose a payment route."],
 ["✓","Verify a challan","Check whether a payment or receipt has been recorded."],
 ["⌕","Find a receipt","Search for a previous transaction using HIMGRN."],
 ["?","Get help","Understand documents, terminology, errors and FAQs."]
];
export default function TaskCards(){return <div className="taskGrid">{tasks.map((t,i)=><button className={"taskCard "+(i===0?"featured":"")} key={t[1]} onClick={()=>i===0?document.querySelector("#payment").scrollIntoView({behavior:"smooth"}):i===1?document.querySelector("#verify").scrollIntoView({behavior:"smooth"}):i===3?document.querySelector("#help").scrollIntoView({behavior:"smooth"}):alert("Demo receipt search — connect a database to make this persistent.")}><span className="taskIcon">{t[0]}</span><b>{t[1]}</b><span>{t[2]}</span><strong>{i===3?"Learn →":"Start →"}</strong></button>)}</div>}
