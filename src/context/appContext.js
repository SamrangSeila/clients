import React, { useReducer, useContext, useEffect } from 'react';
import reducer from './reducer';
import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_BEGIN,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  SETUP_USER_BEGIN,
  SETUP_USER_ERROR,
  SETUP_USER_SUCCESS,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_SALE_PROPERTY_BEGIN,
  CREATE_SALE_PROPERTY_SUCCESS,
  CREATE_SALE_PROPERTY_ERROR,
  GET_SALE_PROPERTY_BEGIN,
  GET_SALE_PROPERTY_SUCCESS,

  SET_EDIT_SALE_PROPERTY,

  DELETE_SALE_PROPERTY_BEGIN,
  DELETE_SALE_PROPERTY_ERROR,

  EDIT_SALE_PROPERTY_BEGIN,
  EDIT_SALE_PROPERTY_SUCCESS,
  EDIT_SALE_PROPERTY_ERROR

} from './actions';
import axios from 'axios';

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')

const initialState = {

  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token,

  isEditing: false,
  editPropertyId: '',
  propertyTypeLand: ['Soft-Title', 'Hard-Title'],
  propertyType: 'Soft-Title',
  statusOption: ['active', 'declined', 'pending'],
  status: 'active',

  saleProperty: [],
  totalSaleProperty: 0,
  numOfPages: 1,
  page: 1,

  showSidebar: false,

};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Globle API
  // axios.defaults.headers['Authorization'] = `Bearer ${state.token}`
  const authFetch = axios.create({
    baseURL: '/api/v1',
  })
  // interceptors request
  authFetch.interceptors.request.use((config) => {
    config.headers['Authorization'] = `Bearer ${state.token}`

    return config
  }, (error) => {
    return Promise.reject(error);
  })
  // interceptors response
  authFetch.interceptors.response.use((response) => {

    return response
  }, (error) => {
    console.log(error.response)
    if (error.response.status === 401) {
      logoutUser()
    }
    return Promise.reject(error);
  })

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT })
    clearAlert()
  }

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT })
    }, 3000)
  }

  // add user to localStorage
  const addUseToLocalStorage = ({ user, token }) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
  }
  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  // Register User
  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN })

    try {
      const response = await axios.post('/api/v1/auth/register', currentUser);
      console.log(response)

      const { user, token } = response.data
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { user, token }
      })

      addUseToLocalStorage({ user, token })
    } catch (error) {
      console.log(error.response);
      dispatch({ type: REGISTER_USER_ERROR, payload: { msg: error.response.data.msg } })
    }
    clearAlert()
  }

  // LOGIN USER
  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN })

    try {
      const { data } = await axios.post('/api/v1/auth/login', currentUser);
      const { user, token } = data
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token }
      })

      addUseToLocalStorage({ user, token })
    } catch (error) {
      // console.log(error.response);
      dispatch({ type: LOGIN_USER_ERROR, payload: { msg: error.response.data.msg } })
    }
    clearAlert()
  }
  // Login User End

  // setup user start
  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN })

    try {
      const { data } = await axios.post(`/api/v1/auth/${endPoint}`, currentUser);
      const { user, token } = data
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, alertText }
      })

      addUseToLocalStorage({ user, token })
    } catch (error) {
      // console.log(error.response);
      dispatch({ type: SETUP_USER_ERROR, payload: { msg: error.response.data.msg } })
    }
    clearAlert()
  }
  // setup user end

  // Hide and Show Sidebar Admin start
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR })
  }
  // Hide and Show Sidebar Admin End

  // Logout User
  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER })
    removeUserFromLocalStorage()
  }

  // UPDATE USER
  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN })
    try {
      const { data } = await authFetch.patch('/auth/updateUser', currentUser)
      // const { data: tours } = await axios.get()

      const { user, token } = data
      dispatch({ type: UPDATE_USER_SUCCESS, payload: { user, token } })
      addUseToLocalStorage({ user, token })

    } catch (error) {
      if (error.response.status !== 401) {

        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { smg: error.response.data.smg }
        })
      }
    }
    clearAlert();
  }


  // Handle change value
  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } })
  }

  //  Clear all input in sale property 
  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES })
  }

  // Create Property to DB
  const createProperty = async () => {
    dispatch({ type: CREATE_SALE_PROPERTY_BEGIN })

    try {
      const {
        status,
        title,
        price,
        size,
        landTitle,
        desc,
        phone
      } = state
      await authFetch.post('/property', {
        status,
        title,
        price,
        size,
        landTitle,
        desc,
        phone
      });

      dispatch({ type: CREATE_SALE_PROPERTY_SUCCESS })
      dispatch({ type: CLEAR_VALUES })

    } catch (error) {
      if (error.response.status === 401)

        return

      dispatch({
        type: CREATE_SALE_PROPERTY_ERROR, payload: { msg: error.response.data.msg },

      })
    }
    clearAlert()
  }

  // Get All the Sale Property
  const getSaleProperty = async () => {
    let url = `/property`

    dispatch({ type: GET_SALE_PROPERTY_BEGIN })
    try {
      const { data } = await authFetch(url);
      const { saleProperty, totalSaleProperty, numOfPages } = data

      dispatch({
        type: GET_SALE_PROPERTY_SUCCESS,
        payload: {
          saleProperty,
          totalSaleProperty,
          numOfPages
        }
      })
    } catch (error) {
      console.log(error.response)

    }

    clearAlert()
  }

  const setEditsaleProperty = (id) => {
    // console.log(`set edit property ; ${id}`)
    dispatch({
      type: SET_EDIT_SALE_PROPERTY,
      payload: { id }
    })
  }
  const editSaleProperty = async () => {
    dispatch({ type: EDIT_SALE_PROPERTY_BEGIN })

    try {
      const {
        status,
        title,
        price,
        size,
        landTitle,
        desc,
        phone,
      } = state

      await authFetch.patch(`/property/${state.editPropertyId},{
        status,
        title,
        price,
        size,
        landTitle,
        desc,
        phone,
      }`)
    } catch (error) {
      console.log(error.response)
    }
  }

  // Delete Property 
  const deleteSaleProperty = async (propertyId) => {

    dispatch({ type: DELETE_SALE_PROPERTY_BEGIN })

    try {
      await authFetch.delete(`/property/${propertyId}`)
      getSaleProperty()
    } catch (error) {
      console.log(error.response)
    }
  }

  return (
    <AppContext.Provider
      value={{
        ...state, displayAlert,
        registerUser,
        loginUser,
        logoutUser,
        updateUser,
        setupUser,
        toggleSidebar,
        handleChange,
        clearValues,
        createProperty,
        getSaleProperty,

        setEditsaleProperty,
        editSaleProperty,

        deleteSaleProperty
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
