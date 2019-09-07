import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getInsurance, getInsurances, updateInsurance, deleteInsurance, searchInsurances } from '../../../../../app/modules/entities/insurance/insurance.sagas'
import InsuranceActions from '../../../../../app/modules/entities/insurance/insurance.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getInsurance(1)
  const step = stepper(getInsurance(FixtureAPI, { insuranceId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(InsuranceActions.insuranceSuccess({ id: 1 })))
})

test('get failure path', () => {
  const response = { ok: false }
  const step = stepper(getInsurance(FixtureAPI, { insuranceId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(InsuranceActions.insuranceFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getInsurances()
  const step = stepper(getInsurances(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(InsuranceActions.insuranceAllSuccess([{ id: 1 }, { id: 2 }])))
})

test('getAll failure path', () => {
  const response = { ok: false }
  const step = stepper(getInsurances(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(InsuranceActions.insuranceAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateInsurance({ id: 1 })
  const step = stepper(updateInsurance(FixtureAPI, { insurance: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(InsuranceActions.insuranceUpdateSuccess({ id: 1 })))
})

test('update failure path', () => {
  const response = { ok: false }
  const step = stepper(updateInsurance(FixtureAPI, { insurance: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(InsuranceActions.insuranceUpdateFailure()))
})

test('search success path', () => {
  const response = FixtureAPI.searchInsurances()
  const step = stepper(searchInsurances(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(InsuranceActions.insuranceSearchSuccess([{ id: 1 }, { id: 2 }])))
})

test('search failure path', () => {
  const response = { ok: false }
  const step = stepper(searchInsurances(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(InsuranceActions.insuranceSearchFailure()))
})
test('delete success path', () => {
  const response = FixtureAPI.deleteInsurance({ id: 1 })
  const step = stepper(deleteInsurance(FixtureAPI, { insuranceId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(InsuranceActions.insuranceDeleteSuccess({ id: 1 })))
})

test('delete failure path', () => {
  const response = { ok: false }
  const step = stepper(deleteInsurance(FixtureAPI, { insuranceId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(InsuranceActions.insuranceDeleteFailure()))
})
