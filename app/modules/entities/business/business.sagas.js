import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import BusinessActions from './business.reducer'

export function * getBusiness (api, action) {
  const { businessId } = action
  // make the call to the api
  const apiCall = call(api.getBusiness, businessId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(BusinessActions.businessSuccess(response.data))
  } else {
    yield put(BusinessActions.businessFailure(response.data))
  }
}

export function * getBusinesses (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getBusinesses, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(BusinessActions.businessAllSuccess(response.data))
  } else {
    yield put(BusinessActions.businessAllFailure(response.data))
  }
}

export function * updateBusiness (api, action) {
  const { business } = action
  // make the call to the api
  const idIsNotNull = !!business.id
  const apiCall = call(idIsNotNull ? api.updateBusiness : api.createBusiness, business)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(BusinessActions.businessUpdateSuccess(response.data))
  } else {
    yield put(BusinessActions.businessUpdateFailure(response.data))
  }
}

export function * searchBusinesses (api, action) {
  const { query } = action
  // make the call to the api
  const apiCall = call(api.searchBusinesses, query)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(BusinessActions.businessSearchSuccess(response.data))
  } else {
    yield put(BusinessActions.businessSearchFailure(response.data))
  }
}
export function * deleteBusiness (api, action) {
  const { businessId } = action
  // make the call to the api
  const apiCall = call(api.deleteBusiness, businessId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(BusinessActions.businessDeleteSuccess())
  } else {
    yield put(BusinessActions.businessDeleteFailure(response.data))
  }
}
