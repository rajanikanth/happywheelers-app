import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  serviceRequest: ['serviceId'],
  serviceAllRequest: ['options'],
  serviceUpdateRequest: ['service'],
  serviceSearchRequest: ['query'],
  serviceDeleteRequest: ['serviceId'],

  serviceSuccess: ['service'],
  serviceAllSuccess: ['services'],
  serviceUpdateSuccess: ['service'],
  serviceSearchSuccess: ['services'],
  serviceDeleteSuccess: [],

  serviceFailure: ['error'],
  serviceAllFailure: ['error'],
  serviceUpdateFailure: ['error'],
  serviceSearchFailure: ['error'],
  serviceDeleteFailure: ['error']
})

export const ServiceTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  searching: null,
  deleting: null,
  service: null,
  services: [],
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
    service: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    services: []
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
  const { service } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    service
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { services } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    services
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { service } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    service
  })
}
// successful api search
export const searchSuccess = (state, action) => {
  const { services } = action
  return state.merge({
    searching: false,
    errorSearching: null,
    services
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    service: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    service: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    services: []
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    service: state.service
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    service: state.service
  })
}
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action
  return state.merge({
    searching: false,
    errorSearching: error,
    services: []
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SERVICE_REQUEST]: request,
  [Types.SERVICE_ALL_REQUEST]: allRequest,
  [Types.SERVICE_UPDATE_REQUEST]: updateRequest,
  [Types.SERVICE_SEARCH_REQUEST]: searchRequest,
  [Types.SERVICE_DELETE_REQUEST]: deleteRequest,

  [Types.SERVICE_SUCCESS]: success,
  [Types.SERVICE_ALL_SUCCESS]: allSuccess,
  [Types.SERVICE_UPDATE_SUCCESS]: updateSuccess,
  [Types.SERVICE_SEARCH_SUCCESS]: searchSuccess,
  [Types.SERVICE_DELETE_SUCCESS]: deleteSuccess,

  [Types.SERVICE_FAILURE]: failure,
  [Types.SERVICE_ALL_FAILURE]: allFailure,
  [Types.SERVICE_UPDATE_FAILURE]: updateFailure,
  [Types.SERVICE_SEARCH_FAILURE]: searchFailure,
  [Types.SERVICE_DELETE_FAILURE]: deleteFailure
})
