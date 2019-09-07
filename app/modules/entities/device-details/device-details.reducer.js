import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  deviceDetailRequest: ['deviceDetailId'],
  deviceDetailAllRequest: ['options'],
  deviceDetailUpdateRequest: ['deviceDetail'],
  deviceDetailSearchRequest: ['query'],
  deviceDetailDeleteRequest: ['deviceDetailId'],

  deviceDetailSuccess: ['deviceDetail'],
  deviceDetailAllSuccess: ['deviceDetails'],
  deviceDetailUpdateSuccess: ['deviceDetail'],
  deviceDetailSearchSuccess: ['deviceDetails'],
  deviceDetailDeleteSuccess: [],

  deviceDetailFailure: ['error'],
  deviceDetailAllFailure: ['error'],
  deviceDetailUpdateFailure: ['error'],
  deviceDetailSearchFailure: ['error'],
  deviceDetailDeleteFailure: ['error']
})

export const DeviceDetailTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  searching: null,
  deleting: null,
  deviceDetail: null,
  deviceDetails: [],
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
    deviceDetail: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    deviceDetails: []
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
  const { deviceDetail } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    deviceDetail
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { deviceDetails } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    deviceDetails
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { deviceDetail } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    deviceDetail
  })
}
// successful api search
export const searchSuccess = (state, action) => {
  const { deviceDetails } = action
  return state.merge({
    searching: false,
    errorSearching: null,
    deviceDetails
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    deviceDetail: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    deviceDetail: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    deviceDetails: []
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    deviceDetail: state.deviceDetail
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    deviceDetail: state.deviceDetail
  })
}
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action
  return state.merge({
    searching: false,
    errorSearching: error,
    deviceDetails: []
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DEVICE_DETAIL_REQUEST]: request,
  [Types.DEVICE_DETAIL_ALL_REQUEST]: allRequest,
  [Types.DEVICE_DETAIL_UPDATE_REQUEST]: updateRequest,
  [Types.DEVICE_DETAIL_SEARCH_REQUEST]: searchRequest,
  [Types.DEVICE_DETAIL_DELETE_REQUEST]: deleteRequest,

  [Types.DEVICE_DETAIL_SUCCESS]: success,
  [Types.DEVICE_DETAIL_ALL_SUCCESS]: allSuccess,
  [Types.DEVICE_DETAIL_UPDATE_SUCCESS]: updateSuccess,
  [Types.DEVICE_DETAIL_SEARCH_SUCCESS]: searchSuccess,
  [Types.DEVICE_DETAIL_DELETE_SUCCESS]: deleteSuccess,

  [Types.DEVICE_DETAIL_FAILURE]: failure,
  [Types.DEVICE_DETAIL_ALL_FAILURE]: allFailure,
  [Types.DEVICE_DETAIL_UPDATE_FAILURE]: updateFailure,
  [Types.DEVICE_DETAIL_SEARCH_FAILURE]: searchFailure,
  [Types.DEVICE_DETAIL_DELETE_FAILURE]: deleteFailure
})
