import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import VehicleActions from './vehicle.reducer'

export function * getVehicle (api, action) {
  const { vehicleId } = action
  // make the call to the api
  const apiCall = call(api.getVehicle, vehicleId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data)
    yield put(VehicleActions.vehicleSuccess(response.data))
  } else {
    yield put(VehicleActions.vehicleFailure(response.data))
  }
}

export function * getVehicles (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getVehicles, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(VehicleActions.vehicleAllSuccess(response.data))
  } else {
    yield put(VehicleActions.vehicleAllFailure(response.data))
  }
}

export function * updateVehicle (api, action) {
  const { vehicle } = action
  // make the call to the api
  const idIsNotNull = !!vehicle.id
  const apiCall = call(idIsNotNull ? api.updateVehicle : api.createVehicle, vehicle)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data)
    yield put(VehicleActions.vehicleUpdateSuccess(response.data))
  } else {
    yield put(VehicleActions.vehicleUpdateFailure(response.data))
  }
}

export function * searchVehicles (api, action) {
  const { query } = action
  // make the call to the api
  const apiCall = call(api.searchVehicles, query)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(VehicleActions.vehicleSearchSuccess(response.data))
  } else {
    yield put(VehicleActions.vehicleSearchFailure(response.data))
  }
}
export function * deleteVehicle (api, action) {
  const { vehicleId } = action
  // make the call to the api
  const apiCall = call(api.deleteVehicle, vehicleId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(VehicleActions.vehicleDeleteSuccess())
  } else {
    yield put(VehicleActions.vehicleDeleteFailure(response.data))
  }
}
function mapDateFields (data) {
  if (data.registrationExpDate) {
    data.registrationExpDate = new Date(data.registrationExpDate)
  }
  return data
}
