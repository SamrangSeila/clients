import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
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

} from "./actions";

import { initialState } from "./appContext";

const reducer = (state, action) => {

  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Please Provide all the values..!'
    }
  }

  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: ''
    }
  }
  // Register User Begin
  if (action.type === REGISTER_USER_BEGIN) {
    return {
      ...state,
      isLoading: true
    }
  }

  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      showAlert: true,
      alertType: 'success',
      alertText: 'User Created ! Redirect ..!'
    }
  }

  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }
  // register user end

  // Login Start
  if (action.type === LOGIN_USER_BEGIN) {
    return {
      ...state,
      isLoading: true
    }
  }

  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      showAlert: true,
      alertType: 'success',
      alertText: 'Login Successfull ..! Redirect ..!'
    }
  }

  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }
  // Login End

  // Setup User Start
  if (action.type === SETUP_USER_BEGIN) {
    return {
      ...state,
      isLoading: true
    }
  }

  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      showAlert: true,
      alertType: 'success',
      alertText: action.payload.alertText
    }
  }

  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }
  // Setup User end

  // sidebar hid and show menu start
  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar
    }
  }
  // sidebar hid and show menu end

  // Logout
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null
    }
  }


  // Setup User Start
  if (action.type === UPDATE_USER_BEGIN) {
    return {
      ...state,
      isLoading: true
    }
  }

  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      showAlert: true,
      alertType: 'success',
      alertText: 'User profile updated'
    }
  }

  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }
  // Setup User end

  // handle chnage sale property post
  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      [action.payload.name]: action.payload.value
    }
  }

  // handle clear all input inside the sale property post
  if (action.type === CLEAR_VALUES) {
    const initialState = {
      isEditing: false,
      editPropertyId: '',
      propertyTypeLand: ['Soft-Title', 'Hard-Title'],
      propertyType: 'Soft-Title',
      statusOption: ['active', 'declined', 'pending'],
      status: 'pending',
      title: '',
      price: '',
      size: '',
      landTitle: '',
      desc: '',
      phone: '',

    }
    return {
      ...state,
      ...initialState,
    }
  }

  // Create Property functions
  if (action.type === CREATE_SALE_PROPERTY_BEGIN) {
    return { ...state, isLoading: true }
  }
  if (action.type === CREATE_SALE_PROPERTY_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'New Property Created',
    }
  }
  if (action.type === CREATE_SALE_PROPERTY_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }
  // Create Property functions end

  // get property all
  if (action.type === GET_SALE_PROPERTY_BEGIN) {
    return { ...state, isLoading: true, showAlert: false }
  }
  if (action.type === GET_SALE_PROPERTY_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      saleProperty: action.payload.saleProperty,
      totalSaleProperty: action.payload.totalSaleProperty,
      numOfPages: action.payload.numOfPages
    }
  }

  // Edit Property
  if (action.type === SET_EDIT_SALE_PROPERTY) {
    const sale_property = state.saleProperty.find((saleProperty) => saleProperty._id === action.payload.id)

    const {
      _id,
      status,
      title,
      price,
      size,
      landTitle,
      desc,
      phone,
    } = sale_property

    return {
      ...state,
      isEditing: true,
      editPropertyId: _id,

      status,
      title,
      price,
      size,
      landTitle,
      desc,
      phone,
    }
  }

  // Delete Action property
  if (action.type === DELETE_SALE_PROPERTY_BEGIN) {
    return {
      ...state,
      isLoading: true,
    }
  }

  throw new Error(`No such action : ${action.type}`)
}


export default reducer;