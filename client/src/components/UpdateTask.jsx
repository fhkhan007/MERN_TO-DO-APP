import { useEffect, useState } from 'react'
import '../style/addtask.css'
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdateTask(){

    const [taskData,setTaskData]=useState({
        title:'',
        description:''
    });

    const navigate = useNavigate()
    const {id} =useParams()

    useEffect(()=>{
        getTask(id)
    },[id])

    const getTask = async(id)=>{
        let task= await fetch(`http://localhost:3200/task/${id}`);
        task = await task.json()

        if(task.result){
            setTaskData(task.result)
        }
    }

    const updateTask= async ()=>{
        console.log("function called",taskData);

        let task = await fetch(`http://localhost:3200/update-task/${id}`,{
            method:'PUT',
            body:JSON.stringify(taskData),
            headers:{
                'Content-Type':'application/json'
            }
        });

        task= await task.json()

        if(task.success){
            navigate('/')
        } else {
            alert("Update failed")
        }
    }

    return(
        <div className="container">
            <h1>Update Task</h1>
            
            <label>Title</label>
            <input 
                value={taskData.title}
                onChange={(e)=>setTaskData({...taskData,title:e.target.value})} 
                type="text"
                placeholder="Enter task title"
            />

            <label>Description</label>
            <textarea 
                value={taskData.description}
                onChange={(e)=>setTaskData({...taskData,description:e.target.value})} 
                rows={4}
                placeholder="Enter task description"
            ></textarea>

            <button onClick={updateTask} className="submit">Update Task</button>
        </div>
    )
}