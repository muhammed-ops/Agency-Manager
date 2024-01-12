import Navbar from "../components/Navbar";
import {useState, useEffect} from 'react'
import axios from 'axios';
import ProfileDetails from "../components/profileDetails";
import './home.css'

const Home = () =>{
    const [profiles,setProfiles ] = useState(null)
    const [firstname , setFirstName] = useState('')
    const [lastname , setLastName] = useState('')
    const [jobTitle , setJobTitle] = useState('')
    const [pay , setPay] = useState('')
    const [onHoliday , setOnHoliday] = useState('')
    const [error , setError] = useState(false)



    useEffect(()=>{
        axios.get('/api/profiles')
        .then((response)=>{
            setProfiles(response.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

    const addEmployee = (e) =>{
        e.preventDefault()
        if(firstname === '' || lastname === ''|| jobTitle === ''|| pay === ''|| onHoliday === ''){
            setError(true)
        }else{
        axios.post('/api/profiles',{
            firstname : firstname,
            lastname : lastname,
            jobtitle : jobTitle,
            pay : pay,
            onholiday : onHoliday
        })
        .then((response)=>{
            alert('User Created refresh page')
            console.log(response.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    }
    

    return(
        <>
        <Navbar />
        <div className="container">
            <div className="box1">
                <ProfileDetails profiles = {profiles} />
            </div>
            <div className="box2">
            <form>
            <p className="add">Add Employee</p>
            <label>First Name: <br></br>
            <input type="text"
            value={firstname}
             onChange={(e)=>setFirstName(e.target.value)}/><br></br>
            </label>
            <label>Last Name:<br></br>
            <input type="text"
            value={lastname}
            onChange={(e)=>setLastName(e.target.value) }/> <br></br>
            </label>
            <label>Job Title:<br></br>
            <input type="text"
            value={jobTitle}
                onChange={(e)=>setJobTitle(e.target.value) }/> <br></br>
            </label>
            <label>Pay(/hr):<br></br>
            <input type="number"
            value={pay}
                onChange={(e)=>setPay(e.target.value) }/> <br></br>
            </label>
            <label>On-Holiday:</label>
            <select value={onHoliday} onChange={(e)=>setOnHoliday(e.target.value) }>
                <option disabled selected defaultValue={null}></option>
                <option value='true'>Yes</option>
                <option value='false'>No</option>
            </select> <br></br>
            {error && <p className="error">All input fields are required!!!</p>}
            <button onClick={addEmployee}>Add Employer</button>
            </form>
            </div>
        </div>
        </>
    )
}
export default Home;