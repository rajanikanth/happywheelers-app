import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  driverRequest: ['driverId'],
  driverAllRequest: ['options'],
  driverUpdateRequest: ['driver'],
  driverSearchRequest: ['query'],
  driverDeleteRequest: ['driverId'],

  driverSuccess: ['driver'],
  driverAllSuccess: ['drivers'],
  driverUpdateSuccess: ['driver'],
  driverSearchSuccess: ['drivers'],
  driverDeleteSuccess: [],

  driverFailure: ['error'],
  driverAllFailure: ['error'],
  driverUpdateFailure: ['error'],
  driverSearchFailure: ['error'],
  driverDeleteFailure: ['error']
})

export const DriverTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  searching: null,
  deleting: null,
  driver: null,
  drivers: [],
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
    driver: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    drivers: []
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
  const { driver } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    driver
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { drivers } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    drivers
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { driver } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    driver
  })
}
// successful api search
export const searchSuccess = (state, action) => {
  const { drivers } = action
  return state.merge({
    searching: false,
    errorSearching: null,
    drivers
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    driver: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    driver: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    drivers: []
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    driver: state.driver
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    driver: state.driver
  })
}
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action
  return state.merge({
    searching: false,
    errorSearching: error,
    drivers: []
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DRIVER_REQUEST]: request,
  [Types.DRIVER_ALL_REQUEST]: allRequest,
  [Types.DRIVER_UPDATE_REQUEST]: updateRequest,
  [Types.DRIVER_SEARCH_REQUEST]: searchRequest,
  [Types.DRIVER_DELETE_REQUEST]: deleteRequest,

  [Types.DRIVER_SUCCESS]: success,
  [Types.DRIVER_ALL_SUCCESS]: allSuccess,
  [Types.DRIVER_UPDATE_SUCCESS]: updateSuccess,
  [Types.DRIVER_SEARCH_SUCCESS]: searchSuccess,
  [Types.DRIVER_DELETE_SUCCESS]: deleteSuccess,

  [Types.DRIVER_FAILURE]: failure,
  [Types.DRIVER_ALL_FAILURE]: allFailure,
  [Types.DRIVER_UPDATE_FAILURE]: updateFailure,
  [Types.DRIVER_SEARCH_FAILURE]: searchFailure,
  [Types.DRIVER_DELETE_FAILURE]: deleteFailure
})
