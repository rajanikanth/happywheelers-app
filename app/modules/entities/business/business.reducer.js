import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  businessRequest: ['businessId'],
  businessAllRequest: ['options'],
  businessUpdateRequest: ['business'],
  businessSearchRequest: ['query'],
  businessDeleteRequest: ['businessId'],

  businessSuccess: ['business'],
  businessAllSuccess: ['businesses'],
  businessUpdateSuccess: ['business'],
  businessSearchSuccess: ['businesses'],
  businessDeleteSuccess: [],

  businessFailure: ['error'],
  businessAllFailure: ['error'],
  businessUpdateFailure: ['error'],
  businessSearchFailure: ['error'],
  businessDeleteFailure: ['error']
})

export const BusinessTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  searching: null,
  deleting: null,
  business: null,
  businesses: [],
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
    business: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    businesses: []
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
  const { business } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    business
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { businesses } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    businesses
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { business } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    business
  })
}
// successful api search
export const searchSuccess = (state, action) => {
  const { businesses } = action
  return state.merge({
    searching: false,
    errorSearching: null,
    businesses
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    business: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    business: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    businesses: []
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    business: state.business
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    business: state.business
  })
}
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action
  return state.merge({
    searching: false,
    errorSearching: error,
    businesses: []
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.BUSINESS_REQUEST]: request,
  [Types.BUSINESS_ALL_REQUEST]: allRequest,
  [Types.BUSINESS_UPDATE_REQUEST]: updateRequest,
  [Types.BUSINESS_SEARCH_REQUEST]: searchRequest,
  [Types.BUSINESS_DELETE_REQUEST]: deleteRequest,

  [Types.BUSINESS_SUCCESS]: success,
  [Types.BUSINESS_ALL_SUCCESS]: allSuccess,
  [Types.BUSINESS_UPDATE_SUCCESS]: updateSuccess,
  [Types.BUSINESS_SEARCH_SUCCESS]: searchSuccess,
  [Types.BUSINESS_DELETE_SUCCESS]: deleteSuccess,

  [Types.BUSINESS_FAILURE]: failure,
  [Types.BUSINESS_ALL_FAILURE]: allFailure,
  [Types.BUSINESS_UPDATE_FAILURE]: updateFailure,
  [Types.BUSINESS_SEARCH_FAILURE]: searchFailure,
  [Types.BUSINESS_DELETE_FAILURE]: deleteFailure
})
