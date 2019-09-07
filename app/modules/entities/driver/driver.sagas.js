import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import DriverActions from './driver.reducer'

export function * getDriver (api, action) {
  const { driverId } = action
  // make the call to the api
  const apiCall = call(api.getDriver, driverId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data)
    yield put(DriverActions.driverSuccess(response.data))
  } else {
    yield put(DriverActions.driverFailure(response.data))
  }
}

export function * getDrivers (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getDrivers, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(DriverActions.driverAllSuccess(response.data))
  } else {
    yield put(DriverActions.driverAllFailure(response.data))
  }
}

export function * updateDriver (api, action) {
  const { driver } = action
  // make the call to the api
  const idIsNotNull = !!driver.id
  const apiCall = call(idIsNotNull ? api.updateDriver : api.createDriver, driver)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data)
    yield put(DriverActions.driverUpdateSuccess(response.data))
  } else {
    yield put(DriverActions.driverUpdateFailure(response.data))
  }
}

export function * searchDrivers (api, action) {
  const { query } = action
  // make the call to the api
  const apiCall = call(api.searchDrivers, query)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(DriverActions.driverSearchSuccess(response.data))
  } else {
    yield put(DriverActions.driverSearchFailure(response.data))
  }
}
export function * deleteDriver (api, action) {
  const { driverId } = action
  // make the call to the api
  const apiCall = call(api.deleteDriver, driverId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(DriverActions.driverDeleteSuccess())
  } else {
    yield put(DriverActions.driverDeleteFailure(response.data))
  }
}
function mapDateFields (data) {
  if (data.oneTimeExpirationTime) {
    data.oneTimeExpirationTime = new Date(data.oneTimeExpirationTime)
  }
  return data
}
