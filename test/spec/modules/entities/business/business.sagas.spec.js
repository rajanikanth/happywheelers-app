import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getBusiness, getBusinesses, updateBusiness, deleteBusiness, searchBusinesses } from '../../../../../app/modules/entities/business/business.sagas'
import BusinessActions from '../../../../../app/modules/entities/business/business.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getBusiness(1)
  const step = stepper(getBusiness(FixtureAPI, { businessId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(BusinessActions.businessSuccess({ id: 1 })))
})

test('get failure path', () => {
  const response = { ok: false }
  const step = stepper(getBusiness(FixtureAPI, { businessId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(BusinessActions.businessFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getBusinesses()
  const step = stepper(getBusinesses(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(BusinessActions.businessAllSuccess([{ id: 1 }, { id: 2 }])))
})

test('getAll failure path', () => {
  const response = { ok: false }
  const step = stepper(getBusinesses(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(BusinessActions.businessAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateBusiness({ id: 1 })
  const step = stepper(updateBusiness(FixtureAPI, { business: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(BusinessActions.businessUpdateSuccess({ id: 1 })))
})

test('update failure path', () => {
  const response = { ok: false }
  const step = stepper(updateBusiness(FixtureAPI, { business: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(BusinessActions.businessUpdateFailure()))
})

test('search success path', () => {
  const response = FixtureAPI.searchBusinesses()
  const step = stepper(searchBusinesses(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(BusinessActions.businessSearchSuccess([{ id: 1 }, { id: 2 }])))
})

test('search failure path', () => {
  const response = { ok: false }
  const step = stepper(searchBusinesses(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(BusinessActions.businessSearchFailure()))
})
test('delete success path', () => {
  const response = FixtureAPI.deleteBusiness({ id: 1 })
  const step = stepper(deleteBusiness(FixtureAPI, { businessId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(BusinessActions.businessDeleteSuccess({ id: 1 })))
})

test('delete failure path', () => {
  const response = { ok: false }
  const step = stepper(deleteBusiness(FixtureAPI, { businessId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(BusinessActions.businessDeleteFailure()))
})
