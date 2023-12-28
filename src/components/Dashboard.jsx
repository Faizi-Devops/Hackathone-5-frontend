import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
const Dashboard = () =>{
    const [dato,setDato]=useState([])
    const [completed,setCompleted]=useState(0);
    const [pending,setPending]=useState(0);
    console.log(completed,pending)
    
    let data = localStorage.getItem('name');

    useEffect(()=>{
        getData()
    },[])
    const getData = async() =>{
        let a = localStorage.getItem("email");
            let b = {
                email:a
            }
            console.log("emailing",b)
        const respons = await axios.post("https://faizan-hackathon.vercel.app/todo/get-todo",b);
        let c = respons.data.Todo
        setDato(c)
        console.log(c)
        let completedCount = 0;
    let pendingCount = 0;

    c.forEach(task => {
      if (task.status === "Completed") {
        completedCount++;
      } else if (task.status === "Pending") {
        pendingCount++;
      }
      setCompleted(completedCount);
    setPending(pendingCount);
      // You can add more conditions based on other status types if needed
    });
    }
    return(
        <div className="mb-5">
            <Navbar />
        <div className="container mx-auto">
            
            <p className="text-center font-bold lg:text-[30px] text-[20px] px-[1rem] pt-6 pt-[1rem]">Wellcome {data}</p>
            <div className="text-center">
                <div className="grid lg:grid-cols-3 flex justify-center px-[2rem] mt-6 lg:px-[0rem]">
                    
<div  class="block max-w-sm p-6 bg-white border mt-[1rem] border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>

<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Total Tasks</h5>
<p class="font-normal text-gray-700 dark:text-gray-400">{dato.length }</p>
</div>
<div  class="block max-w-sm p-6 bg-white border mt-[1rem] border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>

<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Completed Tasks</h5>
<p class="font-normal text-gray-700 dark:text-gray-400">{completed}</p>
</div>
<div  class="block max-w-sm p-6 bg-white border mt-[1rem] border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>

<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Pending Tasks</h5>
<p class="font-normal text-gray-700 dark:text-gray-400">{pending}</p>
</div>


                </div>
            {/* <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
 Logout
</button> */}
            </div>


        </div>
        </div>
    )
}
export default Dashboard;