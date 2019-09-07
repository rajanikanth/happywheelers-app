import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import ServiceActions from './services.reducer'

export function * getService (api, action) {
  const { serviceId } = action
  // make the call to the api
  const apiCall = call(api.getService, serviceId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ServiceActions.serviceSuccess(response.data))
  } else {
    yield put(ServiceActions.serviceFailure(response.data))
  }
}

export function * getServices (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getServices, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ServiceActions.serviceAllSuccess(response.data))
  } else {
    yield put(ServiceActions.serviceAllFailure(response.data))
  }
}

export function * updateService (api, action) {
  const { service } = action
  // make the call to the api
  const idIsNotNull = !!service.id
  const apiCall = call(idIsNotNull ? api.updateService : api.createService, service)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ServiceActions.serviceUpdateSuccess(response.data))
  } else {
    yield put(ServiceActions.serviceUpdateFailure(response.data))
  }
}

export function * searchServices (api, action) {
  const { query } = action
  // make the call to the api
  const apiCall = call(api.searchServices, query)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ServiceActions.serviceSearchSuccess(response.data))
  } else {
    yield put(ServiceActions.serviceSearchFailure(response.data))
  }
}
export function * deleteService (api, action) {
  const { serviceId } = action
  // make the call to the api
  const apiCall = call(api.deleteService, serviceId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ServiceActions.serviceDeleteSuccess())
  } else {
    yield put(ServiceActions.serviceDeleteFailure(response.data))
  }
}
