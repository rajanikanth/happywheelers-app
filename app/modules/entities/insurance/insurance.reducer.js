import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  insuranceRequest: ['insuranceId'],
  insuranceAllRequest: ['options'],
  insuranceUpdateRequest: ['insurance'],
  insuranceSearchRequest: ['query'],
  insuranceDeleteRequest: ['insuranceId'],

  insuranceSuccess: ['insurance'],
  insuranceAllSuccess: ['insurances'],
  insuranceUpdateSuccess: ['insurance'],
  insuranceSearchSuccess: ['insurances'],
  insuranceDeleteSuccess: [],

  insuranceFailure: ['error'],
  insuranceAllFailure: ['error'],
  insuranceUpdateFailure: ['error'],
  insuranceSearchFailure: ['error'],
  insuranceDeleteFailure: ['error']
})

export const InsuranceTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  searching: null,
  deleting: null,
  insurance: null,
  insurances: [],
  errorOne: null,
  errorAll: null,
  errorUpdating: null,
  errorSearching: null,
  errorDeleting: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({
    fetchingOne: true,
    insurance: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    insurances: []
  })

// request to update from an api
export const updateRequest = (state) =>
  state.merge({
    updating: true
  })
// request to search from an api
export const searchRequest = (state) =>
  state.merge({
    searching: true
  })
// request to delete from an api
export const deleteRequest = (state) =>
  state.merge({
    deleting: true
  })

// successful api lookup for single entity
export const success = (state, action) => {
  const { insurance } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    insurance
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { insurances } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    insurances
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { insurance } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    insurance
  })
}
// successful api search
export const searchSuccess = (state, action) => {
  const { insurances } = action
  return state.merge({
    searching: false,
    errorSearching: null,
    insurances
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    insurance: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    insurance: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    insurances: []
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    insurance: state.insurance
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    insurance: state.insurance
  })
}
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action
  return state.merge({
    searching: false,
    errorSearching: error,
    insurances: []
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.INSURANCE_REQUEST]: request,
  [Types.INSURANCE_ALL_REQUEST]: allRequest,
  [Types.INSURANCE_UPDATE_REQUEST]: updateRequest,
  [Types.INSURANCE_SEARCH_REQUEST]: searchRequest,
  [Types.INSURANCE_DELETE_REQUEST]: deleteRequest,

  [Types.INSURANCE_SUCCESS]: success,
  [Types.INSURANCE_ALL_SUCCESS]: allSuccess,
  [Types.INSURANCE_UPDATE_SUCCESS]: updateSuccess,
  [Types.INSURANCE_SEARCH_SUCCESS]: searchSuccess,
  [Types.INSURANCE_DELETE_SUCCESS]: deleteSuccess,

  [Types.INSURANCE_FAILURE]: failure,
  [Types.INSURANCE_ALL_FAILURE]: allFailure,
  [Types.INSURANCE_UPDATE_FAILURE]: updateFailure,
  [Types.INSURANCE_SEARCH_FAILURE]: searchFailure,
  [Types.INSURANCE_DELETE_FAILURE]: deleteFailure
})
