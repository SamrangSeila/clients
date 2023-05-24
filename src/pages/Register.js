import { useEffect, useState } from "react"
import { FormRow, Logo } from "../components"
import Wrapper from "../assets/wrappers/RegisterPage"
import Alert from "../components/Alert"
import { useAppContext } from "../context/appContext"
import { useNavigate } from 'react-router-dom';

const initialState = {

    username: '',
    phone: '',
    password: '',
    isMember: '',

}

const Register = () => {
    const [values, setValues] = useState(initialState)
    const navigate = useNavigate()

    const { user,
        isLoading,
        showAlert,
        displayAlert,
        registerUser,
        loginUser,
        setupUser

    } = useAppContext();

    const toggleMember = () => {
        setValues({ ...values, isMember: !values.isMember })
    }
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })

    }

    const onSubmit = (e) => {

        e.preventDefault();
        const { username, phone, password, isMember } = values
        if (!phone || !password || (!isMember && !username)) {
            displayAlert()
            return
        }

        const currentUser = { username, phone, password }
        if (isMember) {
            setupUser({
                currentUser,
                endPoint: 'login',
                alertText: 'Login Successful! Redirecting ...'
            })
        } else {
            setupUser({
                currentUser,
                endPoint: 'register',
                alertText: 'User Created ! Redirecting ...'
            })
        }
    }

    useEffect(() => {
        if (user) {
            setTimeout(() => {
                navigate('/')
            }, 3000)

        }
    }, [user, navigate])


    return (
        <Wrapper className="full-page">
            <form className="form" onSubmit={onSubmit}>
                <Logo />
                <h3>{values.isMember ? 'Login' : 'Register'}</h3>

                {showAlert && <Alert />}

                {/* name and input */}
                {!values.isMember && (
                    <FormRow type='text' name='username' value={values.username} handleChange={handleChange} />
                )}

                <FormRow type='tel' name='phone' value={values.phone} handleChange={handleChange} />
                <FormRow type='password' name='password' value={values.password} handleChange={handleChange} />


                <button type="submit" className="btn btn-block" disabled={isLoading}>Submit</button>
                <p>
                    {values.isMember ? 'Not Register Yet ?' : 'Aready Register ..!'}
                    <button type="buttom" onClick={toggleMember} className='member-btn'>{values.isMember ? 'Register' : 'Login'}</button>
                </p>
            </form>
        </Wrapper>
    )
}

export default Register