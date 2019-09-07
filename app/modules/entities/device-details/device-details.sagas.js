import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import DeviceDetailActions from './device-details.reducer'

export function * getDeviceDetail (api, action) {
  const { deviceDetailId } = action
  // make the call to the api
  const apiCall = call(api.getDeviceDetail, deviceDetailId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(DeviceDetailActions.deviceDetailSuccess(response.data))
  } else {
    yield put(DeviceDetailActions.deviceDetailFailure(response.data))
  }
}

export function * getDeviceDetails (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getDeviceDetails, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(DeviceDetailActions.deviceDetailAllSuccess(response.data))
  } else {
    yield put(DeviceDetailActions.deviceDetailAllFailure(response.data))
  }
}

export function * updateDeviceDetail (api, action) {
  const { deviceDetail } = action
  // make the call to the api
  const idIsNotNull = !!deviceDetail.id
  const apiCall = call(idIsNotNull ? api.updateDeviceDetail : api.createDeviceDetail, deviceDetail)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(DeviceDetailActions.deviceDetailUpdateSuccess(response.data))
  } else {
    yield put(DeviceDetailActions.deviceDetailUpdateFailure(response.data))
  }
}

export function * searchDeviceDetails (api, action) {
  const { query } = action
  // make the call to the api
  const apiCall = call(api.searchDeviceDetails, query)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(DeviceDetailActions.deviceDetailSearchSuccess(response.data))
  } else {
    yield put(DeviceDetailActions.deviceDetailSearchFailure(response.data))
  }
}
export function * deleteDeviceDetail (api, action) {
  const { deviceDetailId } = action
  // make the call to the api
  const apiCall = call(api.deleteDeviceDetail, deviceDetailId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(DeviceDetailActions.deviceDetailDeleteSuccess())
  } else {
    yield put(DeviceDetailActions.deviceDetailDeleteFailure(response.data))
  }
}
