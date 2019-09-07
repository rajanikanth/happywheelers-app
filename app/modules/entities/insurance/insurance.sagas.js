import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import InsuranceActions from './insurance.reducer'

export function * getInsurance (api, action) {
  const { insuranceId } = action
  // make the call to the api
  const apiCall = call(api.getInsurance, insuranceId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data)
    yield put(InsuranceActions.insuranceSuccess(response.data))
  } else {
    yield put(InsuranceActions.insuranceFailure(response.data))
  }
}

export function * getInsurances (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getInsurances, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(InsuranceActions.insuranceAllSuccess(response.data))
  } else {
    yield put(InsuranceActions.insuranceAllFailure(response.data))
  }
}

export function * updateInsurance (api, action) {
  const { insurance } = action
  // make the call to the api
  const idIsNotNull = !!insurance.id
  const apiCall = call(idIsNotNull ? api.updateInsurance : api.createInsurance, insurance)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data)
    yield put(InsuranceActions.insuranceUpdateSuccess(response.data))
  } else {
    yield put(InsuranceActions.insuranceUpdateFailure(response.data))
  }
}

export function * searchInsurances (api, action) {
  const { query } = action
  // make the call to the api
  const apiCall = call(api.searchInsurances, query)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(InsuranceActions.insuranceSearchSuccess(response.data))
  } else {
    yield put(InsuranceActions.insuranceSearchFailure(response.data))
  }
}
export function * deleteInsurance (api, action) {
  const { insuranceId } = action
  // make the call to the api
  const apiCall = call(api.deleteInsurance, insuranceId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(InsuranceActions.insuranceDeleteSuccess())
  } else {
    yield put(InsuranceActions.insuranceDeleteFailure(response.data))
  }
}
function mapDateFields (data) {
  if (data.insuranceExpDate) {
    data.insuranceExpDate = new Date(data.insuranceExpDate)
  }
  return data
}
