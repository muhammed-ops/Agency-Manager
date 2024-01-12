import './profiledetails.css'
import axios from 'axios'
const ProfileDetails = ({profiles}) =>{

    const deleteProfile = (id) =>{
        axios.delete(`api/profiles/${id}`)
        .then(()=>{
            alert('User deleted')
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    
return(
    <>
    {profiles && profiles.map((profile)=>(
        <div className='content' key={profile._id}> 
        <p className='name'>{profile.firstname} {profile.lastname}</p> <button className='delete' onClick={()=>{deleteProfile(profile._id)}}>🗑️</button>
        <p><span className='job'>Job</span> : {profile.jobtitle[0].toUpperCase().concat(profile.jobtitle.slice(1))}</p>
        <p> <span className='pay'>Pay(/hr) </span>: {profile.pay}</p>
        {profile.onholiday?<p> <span className='holiday'>On-Holiday</span> : Yes</p> : <p> <span className='holiday'>On-Holiday</span> : No</p>}
        </div>

        ))}
    </>
)
}
export default ProfileDetails