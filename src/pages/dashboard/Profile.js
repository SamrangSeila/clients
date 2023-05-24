import { useState } from 'react'
import { FormRow, Alert } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
const Profile = () => {
    const { user, showAlert, displayAlert, updateUser, isLoading } =
        useAppContext()

    const [username, setUsername] = useState(user?.username)
    const [phone, setPhone] = useState(user?.phone)


    const handleSubmit = (e) => {
        e.preventDefault()
        if (!username || !phone) {
            displayAlert()
            return
        }
        updateUser({ username, phone })
    }

    return (
        <Wrapper>
            <form className='form' onSubmit={handleSubmit}>
                <h3>profile</h3>
                {showAlert && <Alert />}
                <div className='form-center'>
                    <FormRow
                        type='text'
                        name='username'
                        value={username}
                        handleChange={(e) => setUsername(e.target.value)}
                    />

                    <FormRow
                        type='tel'
                        name='phone'
                        value={phone}
                        handleChange={(e) => setPhone(e.target.value)}
                    />

                    <button className='btn btn-block' type='submit' disabled={isLoading}>
                        {isLoading ? 'Please Wait...' : 'save changes'}
                    </button>
                </div>
            </form>
        </Wrapper>
    )
}

export default Profile
