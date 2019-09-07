import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  vehicleRequest: ['vehicleId'],
  vehicleAllRequest: ['options'],
  vehicleUpdateRequest: ['vehicle'],
  vehicleSearchRequest: ['query'],
  vehicleDeleteRequest: ['vehicleId'],

  vehicleSuccess: ['vehicle'],
  vehicleAllSuccess: ['vehicles'],
  vehicleUpdateSuccess: ['vehicle'],
  vehicleSearchSuccess: ['vehicles'],
  vehicleDeleteSuccess: [],

  vehicleFailure: ['error'],
  vehicleAllFailure: ['error'],
  vehicleUpdateFailure: ['error'],
  vehicleSearchFailure: ['error'],
  vehicleDeleteFailure: ['error']
})

export const VehicleTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  searching: null,
  deleting: null,
  vehicle: null,
  vehicles: [],
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
    vehicle: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    vehicles: []
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
  const { vehicle } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    vehicle
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { vehicles } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    vehicles
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { vehicle } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    vehicle
  })
}
// successful api search
export const searchSuccess = (state, action) => {
  const { vehicles } = action
  return state.merge({
    searching: false,
    errorSearching: null,
    vehicles
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    vehicle: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    vehicle: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    vehicles: []
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    vehicle: state.vehicle
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    vehicle: state.vehicle
  })
}
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action
  return state.merge({
    searching: false,
    errorSearching: error,
    vehicles: []
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.VEHICLE_REQUEST]: request,
  [Types.VEHICLE_ALL_REQUEST]: allRequest,
  [Types.VEHICLE_UPDATE_REQUEST]: updateRequest,
  [Types.VEHICLE_SEARCH_REQUEST]: searchRequest,
  [Types.VEHICLE_DELETE_REQUEST]: deleteRequest,

  [Types.VEHICLE_SUCCESS]: success,
  [Types.VEHICLE_ALL_SUCCESS]: allSuccess,
  [Types.VEHICLE_UPDATE_SUCCESS]: updateSuccess,
  [Types.VEHICLE_SEARCH_SUCCESS]: searchSuccess,
  [Types.VEHICLE_DELETE_SUCCESS]: deleteSuccess,

  [Types.VEHICLE_FAILURE]: failure,
  [Types.VEHICLE_ALL_FAILURE]: allFailure,
  [Types.VEHICLE_UPDATE_FAILURE]: updateFailure,
  [Types.VEHICLE_SEARCH_FAILURE]: searchFailure,
  [Types.VEHICLE_DELETE_FAILURE]: deleteFailure
})
