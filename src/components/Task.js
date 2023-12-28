import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "./Navbar";

const Task = () =>{
    const [cat,setCat]=useState([])
    const [data,setData]=useState([])
    const [tasking,setTasking]=useState("");
    const [statusing,setStatusing]=useState("");
    const [dueing,setDueing]=useState("");
    const [remindeing,setRemindering]=useState("");
    const [categoring,setCategoring]=useState("");
    const [priority,setPriority]=useState("");
    const [description,setDescription]=useState("")
    const [searching,setSearching]=useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [flag,setFlag]=useState(false)
    const [indexing,setIndexing]=useState("")
    
    
    const [inputValue, setInputValue] = useState('');
    
    const [selectedValue, setSelectedValue] = useState(''); 
    const [categoryValue,setCategoryValue]=useState("");
    const [priorityValue,setPriorityValue] = useState("")
    
    
    

useEffect(()=>{
    ongetDatasearch()
    ongetData()
},[])

useEffect(() => {
    // Filter data based on both input value and selected value
    const filteredData = data.filter(item =>
      item.task.toLowerCase().includes(inputValue.toLowerCase()) &&
      (selectedValue === '' || item.status === selectedValue)  &&
      (priorityValue === '' || item.priority === priorityValue) 
      &&
      (categoryValue === '' || item.category === categoryValue) 
    );
    setFilteredData(filteredData);
  }, [data, inputValue, selectedValue,categoryValue,priorityValue]);

  const oncategory = (e) =>{
    setCategoryValue(e.target.value)

  }
  const onpriorityHandler = (e) =>{
    setPriorityValue(e.target.value)

  }
const ongetData = async() =>{

    try {
        let a = localStorage.getItem("email");
            let b = {
                email:a
            }
            console.log("emailing",b)
        const response = await axios.post("https://faizan-hackathon.vercel.app/todo/get-todo",b);
        console.log(response.data)
        setData(response.data.Todo)
        console.log(response.data.Todo)
        
    } catch (error) {
        
    }
}

const onSearchHandler = (e) =>{
    
    const searchTerm = e.target.value;
        setSearching(searchTerm);
        filterData(searchTerm);


}
const filterData = (searchTerm) => {
    if (searchTerm.trim() === '') {
        // If the search term is empty, show all data
        setFilteredData(data);
    } else {
        // Filter data based on the search term
        const filtered = data.filter((item) =>
            item.task.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filtered);
    }
};
const onStatusHandler = (e) =>{
    setSelectedValue(e.target.value)
    
    

}

    const ongetDatasearch = async() =>{
        try {
            let a = localStorage.getItem("email");
            let b = {
                email:a
            }
            console.log(b)
        
        const response = await axios.post("https://faizan-hackathon.vercel.app/cat/get-categorysearch",b);
        setCat(response.data.Todos)
            
        } catch (error) {
            console.log(error)
            
        }
         
    }
    const one = (e) =>{
        setTasking(e.target.value)

    }
    const two = (e) =>{
        setStatusing(e.target.value)
        console.log(e.target.value)

    }
    const three = (e) =>{
        setDueing(e.target.value)

    }
    const four = (e) =>{
        setRemindering(e.target.value)
        
    }
    const five = (e) =>{
        setCategoring(e.target.value)
        console.log(e.target.value)
        
    }
    const six = (e) =>{
        setPriority(e.target.value)

    }
    const seven = (e) =>{
        setDescription(e.target.value)
        
    }
    const onAddHandler = async() =>{
        try {
            let b = localStorage.getItem('email')
        let a = {
            task: tasking,
            status:statusing,
            duedate:dueing,
            reminderdate:remindeing,
            category:categoring,
            priority:priority,
            description:description,
            email:b
        }
        console.log(a)
       if(tasking && statusing && dueing && remindeing && categoring && priority && description !==""){
        const response = await axios.post("https://faizan-hackathon.vercel.app/todo/add-todo",a);
        toast.success(response.data.message)
        let c = {
            email:b
        }
        console.log("emailing",b)
    const respons = await axios.post("https://faizan-hackathon.vercel.app/todo/get-todo",c);
    console.log(response)
    setData(respons.data.Todo)
        setTasking("")
        setCategoring("")
        setDescription("")
        setDueing("")
        setRemindering("")
        setStatusing("")
        setPriority("")

       }
       else{
        toast.error("Please fill all the inputs")
       }
            
        } catch (error) {
            console.log(error)
            
        }
        
    }
    const onDeleteHandler = async(iding) =>{
        try {
            const response = await axios.delete(`https://faizan-hackathon.vercel.app/todo/delete-todo/${iding}`);

            toast.success(response.data.message)
            let a = localStorage.getItem("email");
            let b = {
                email:a
            }
            console.log("emailing",b)
        const respons = await axios.post("https://faizan-hackathon.vercel.app/todo/get-todo",b);
        console.log(response)
        setData(respons.data.Todo)
            
        } catch (error) {
            
        }

    }

    const onUpdateHandler = (valueing,inding) =>{
        setIndexing(inding)
        setFlag(true)
        setTasking(valueing.task)
        setCategoring(valueing.category)
        setDescription(valueing.description)
        setDueing(valueing.duedate)
        setRemindering(valueing.reminderdate)
        setStatusing(valueing.status)
        setPriority(valueing.priority)
        // task: tasking,
        //     status:statusing,
        //     duedate:dueing,
        //     reminderdate:remindeing,
        //     category:categoring,
        //     priority:priority,
        //     description:description,
        //     email:b
        

    }
    const onEditHandler = async() =>{
        try {
            
        let a = {
            task: tasking,
            status:statusing,
            duedate:dueing,
            reminderdate:remindeing,
            category:categoring,
            priority:priority,
            description:description,
            
        }
       if(tasking && statusing && dueing && remindeing && categoring && priority && description !==""){
        const response = await axios.put(`https://faizan-hackathon.vercel.app/todo/update-todo/${indexing}`,a);
        toast.success(response.data.message)
        let b = localStorage.getItem("email")
        let c = {
            email:b
        }
        console.log("emailing",b)
    const respons = await axios.post("https://faizan-hackathon.vercel.app/todo/get-todo",c);
    console.log(response)
    setData(respons.data.Todo)
    setFlag(false)
        setTasking("")
        setCategoring("")
        setDescription("")
        setDueing("")
        setRemindering("")
        setStatusing("")
        setPriority("")

       }
       else{
        toast.error("Please fill all the inputs")
       }
            
        } catch (error) {
            console.log(error)
            
        }

    }

   


    return(
        <div className="pb-5">
            <Navbar />
        <div className="container mx-auto px-[1rem]">
            <ToastContainer />
          
            <div>
                

    <div class="grid gap-6 mb-6 md:grid-cols-2 mt-3">
        <div>
            <label for="first_name"  class="block mb-2  text-sm font-medium text-gray-900 dark:text-white">Task</label>
            <input type="text" value={tasking} id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={one} placeholder="John" required/>
        


        </div>
        <div>
        <label for="countries"  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
<select id="countries" onChange={two} value={statusing} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
<option  value="">Select select</option>
  <option  value="Pending">Pending</option>
  <option value="Completed">Completed</option>

</select>
        </div>
        <div>
            <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Due Date</label>
            <input type="date" value={dueing} id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={three} placeholder="Flowbite" required/>
        </div>  
        <div>
            <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Reminder Date</label>
            <input type="date" value={remindeing} id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={four} placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required/>
        </div>
        <div>
        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
<select id="countries" onChange={five} value={categoring} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
<option value="">Select Category</option>
{cat?.map((option, index) => (

   
          <option key={index} value={option.category}>
            {option.category}
          </option>
        ))}

</select>
        </div>
        <div>
        <label for="countries"  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Priority</label>
<select id="countries" value={priority} onChange={six} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
<option value="">Select Priority</option>
  <option value="Low">Low</option>
  <option value="Medium">Medium</option>
  <option value="High">High</option>

</select>
        </div>
    </div>
    <div class="mb-6">
    <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
    <textarea id="description" value={description} onChange={seven} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter description..." required></textarea>
</div>
   
   {
    flag?<button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={onEditHandler}>Update</button>:
   
   
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={onAddHandler}>Submit</button>}


            </div>


            <div className="grid lg:grid-cols-2 lg:gap-2 mt-3">
                <div className="mt-3">
                <input type="text" onChange={onSearchHandler} id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search with title" required />
                </div>
                <div className="grid lg:grid-cols-3 lg:gap-2">
                    <div className="mt-3">
                    <select id="countries" onChange={onStatusHandler} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option >Status:</option>
  <option value="">All</option>
  <option value="Completed">Completed</option>
  <option value="Pending">Pending</option>
  
</select>
                    </div>
                    <div className="mt-3">
                    <select id="countries" onChange={oncategory} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  
  <option >Category</option>
{cat?.map((option, index) => (

   
          <option key={index} value={option.category}>
            {option.category}
          </option>
        ))}
  
</select>
                    </div>
                    <div className="mt-3">
                    <select id="countries" onChange={onpriorityHandler} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  
  <option >Priority</option>
  <option value="High">High</option>
  <option value="Medium">Medium</option>
  <option value="Low">Low</option>
</select>
                    </div>
                    
                </div>

            </div>
            

<div class="relative overflow-x-auto mt-4">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    #
                </th>
                <th scope="col" class="px-6 py-3">
                    Title
                </th>
                <th scope="col" class="px-6 py-3">
                    Description
                </th>
                <th scope="col" class="px-6 py-3">
                    Category
                </th>
                <th scope="col" class="px-6 py-3">
                    Due Date
                </th>
                <th scope="col" class="px-6 py-3">
                    Reminder
                </th>
                <th scope="col" class="px-6 py-3">
                    Status
                </th>
                <th scope="col" class="px-6 py-3">
                    Priority
                </th>
                <th scope="col" class="px-6 py-3">
                    Actions
                </th>
            </tr>
        </thead>
        {
            filteredData?.map((value,index)=>{
                return(
                    <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {index+1}
                </th>
                <td class="px-6 py-4">
                    {value.task}
                </td>
                <td class="px-6 py-4">
                    {value.description}
                </td>
                <td class="px-6 py-4">
                    {value.category}
                </td>
                <td class="px-6 py-4">
                    {value.duedate}
                </td>
                <td class="px-6 py-4">
                    {value.reminderdate}
                </td>
                <td class="px-6 py-4">
                    {value.status}
                </td>
                <td class="px-6 py-4">
                    {value.priority}
                </td>
                <td class="px-6 py-4">
                <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=>onUpdateHandler(value,value._id)}>Update</button>
                <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={()=>onDeleteHandler(value._id)}>Delete</button>
                </td>
            </tr>
            
            
        </tbody>

                )

            })
        }
        
    </table>
</div>

            


        </div>
        </div>
    )
}
export default Task;