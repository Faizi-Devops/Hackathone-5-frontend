import { Field, Formik, useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
const Category = () => {
    const [flag,setFlag]=useState(false);
    const [data,setData]=useState([])
    const [flaggin,setFlaggin]=useState(false)
    const [indexing,setIndexing]=useState()
    const [category,setCategory]=useState("")
useEffect(()=>{
    getCategory()

},[])
    const getCategory = async()=> {
         try {
          
            let a = localStorage.getItem("email");
            let b = {
                email:a
            }
            console.log(b)
        
        const response = await axios.post("https://faizan-hackathon.vercel.app/cat/get-categorysearch",b);
        setData(response.data.Todos)
          
         } catch (error) {
          
         }
    }

    const oncategory = (e) =>{
setCategory(e.target.value)
console.log(e.target.value)
    }

    const onAddHandler = async() =>{
      if(category !==""){
        let b = localStorage.getItem('email');
      let a = {
        email:b,
        category:category  
      }
      console.log(a)

        try {
          setFlag(true);
          const response = await axios.post(
            "https://faizan-hackathon.vercel.app/cat/add-category",
            a
          );
          
          let b = {
            email:a
        }
        console.log("emailingsddf",b.email)
    
    const respons = await axios.post("https://faizan-hackathon.vercel.app/cat/get-categorysearch",b.email);
    console.log("getData",respons)
          setData(respons.data.Todos)
          console.log("statusing",response.data)
          setCategory("")
          

          if (response.data.status === "201") {
            console.log(response.status);
            toast.success("Category Succesfully added")
            
          } else {
            toast.error(response.data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
        } catch (error) {}

      }
      else{
        toast.error("Please fill the input")
      }

    }
  // const formik = useFormik({
  //   initialValues: {
  //       Category: "",
     
  //   },
  //   validationSchema: Yup.object({
  //     Category: Yup.string()
  //       .required("Category is required")
  //       .matches(
  //         /^[a-zA-Z ]*$/,
  //         "Category can only contain alphabets and spaces"
  //       )
  //       .min(3, "Category must be at least 3 characters")
  //       .max(15, "Category must not exceed 15 characters"),
  //   }),
  //   onSubmit: async (values,{resetForm}) => {
  //     console.log(values.Category)
  //     let b = localStorage.getItem('email');
  //     let a = {
  //       email:b,
  //       category:values.Category  
  //     }
  //     console.log(a)

  //       try {
  //         setFlag(true);
  //         const response = await axios.post(
  //           "http://localhost:5000/cat/add-category",
  //           a
  //         );
  //         setFlag(false);
  //         const fetchResponse = await axios.get("http://localhost:5000/cat/get-category");
  //         setData(fetchResponse.data.Todo)
  //         console.log("statusing",response.data)
  //         resetForm({
  //           Category: "" // Resetting the Category field to an empty string
  //         });

  //         if (response.data.status === "201") {
  //           console.log(response.status);
  //           toast.success("Category Succesfully added")
            
  //         } else {
  //           toast.error(response.data.message, {
  //             position: "top-right",
  //             autoClose: 5000,
  //             hideProgressBar: false,
  //             closeOnClick: true,
  //             pauseOnHover: true,
  //             draggable: true,
  //             progress: undefined,
  //             theme: "colored",
  //           });
  //         }
  //       } catch (error) {}
  //   },
  // });
  const onDeleteHandler = async(iding) =>{
    try {
        const response =await axios.delete(`https://faizan-hackathon.vercel.app/cat/delete-category/${iding}`);
       
            // Successfully deleted, now fetch updated data from the backend
            let b = localStorage.getItem('email');
            let a = {
              email:b,
              category:category  
            }
            let c = {
              email:a
          }
          console.log("emailingsddf",b.email)
      
      const respons = await axios.post("https://faizan-hackathon.vercel.app/cat/get-categorysearch",c.email);
      console.log("getData",respons)
            setData(respons.data.Todos)
            toast.success("Successfully deleted");
          
    } catch (error) {
        toast.error(error)
        
    }

  }
  const updateCategoryField = (categoryValue,iding) => {
    
    
    setIndexing(iding)
    setCategory(categoryValue)
   setFlaggin(true)
//    try {
//     const response = axios.put(`http://localhost:5000/cat/update-category/${iding}`)
//    } catch (error) {
    
//    }
     
  };
  const onUpdateHandler = async() =>{

   
  setFlaggin(false)
  try {
    let d = {
      
      category:category  
    }
        const response = await axios.put(`https://faizan-hackathon.vercel.app/cat/update-category/${indexing}`,d);
        let b = localStorage.getItem('email');
        let a = {
          email:b,
          category:category  
        }
        let c = {
          email:a
      }
      console.log("emailingsddf",b.email)
  
  const respons = await axios.post("https://faizan-hackathon.vercel.app/cat/get-categorysearch",c.email);
  console.log("getData",respons)
        setData(respons.data.Todos)
        
          toast.success("Category Updated Successfully")
          setCategory("")

        
       } catch (error) {
        
       }

  }
  return (
    <div className="pb-5">
      <Navbar />
    <div className="text-center container mx-auto">
      <ToastContainer />
      <p className="pt-4">Categories</p>
      <div className="flex justify-center pt-6 px-[1rem]">
        <a
          href="#"
          className="block max-w-sm w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Add Category
          </h5>
          
            <input
              type="text"
              name="Category"
              value={category}
              onChange={oncategory}
              className="bg-gray-50 mt-3 border text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none dark:bg-gray-700 dark:text-white dark:focus:outline-none dark:placeholder-gray-400"
              
              
              placeholder="Add Category..."
             
            />
          {
            flaggin?<button
            className="bg-blue-500 hover:bg-blue-700 mt-3 text-white font-bold py-2 px-4 rounded-lg" onClick={onUpdateHandler}>Update</button>
          :
           <button className="bg-blue-500 hover:bg-blue-700 mt-3 text-white font-bold py-2 px-4 rounded-lg" onClick={onAddHandler}>Add</button>
}
          
        </a>
        
      </div>
      

<div className="relative overflow-x-auto px-[1rem]">
    <table className="w-full text-sm text-left mt-6 rounded rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3 text-center">
                    #
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    Name
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    Actions
                </th>
                
            </tr>
        </thead>
        {
            data?.map((value,index)=>{
                return(
                    <tbody key={index}>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 text-center py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {index+1}
                </th>
                <td className="px-6 py-4 text-center">
                    {value.category}
                </td>
                <td className="px-6 py-4 text-center">
                <button type="button" onClick={() => updateCategoryField(value.category,value._id)} class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
                <button type="button" onClick={()=>onDeleteHandler(value._id)} class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
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
  );
};
export default Category;
