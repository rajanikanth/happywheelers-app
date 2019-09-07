import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getService, getServices, updateService, deleteService, searchServices } from '../../../../../app/modules/entities/services/services.sagas'
import ServiceActions from '../../../../../app/modules/entities/services/services.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getService(1)
  const step = stepper(getService(FixtureAPI, { serviceId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ServiceActions.serviceSuccess({ id: 1 })))
})

test('get failure path', () => {
  const response = { ok: false }
  const step = stepper(getService(FixtureAPI, { serviceId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ServiceActions.serviceFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getServices()
  const step = stepper(getServices(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ServiceActions.serviceAllSuccess([{ id: 1 }, { id: 2 }])))
})

test('getAll failure path', () => {
  const response = { ok: false }
  const step = stepper(getServices(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ServiceActions.serviceAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateService({ id: 1 })
  const step = stepper(updateService(FixtureAPI, { service: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ServiceActions.serviceUpdateSuccess({ id: 1 })))
})

test('update failure path', () => {
  const response = { ok: false }
  const step = stepper(updateService(FixtureAPI, { service: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ServiceActions.serviceUpdateFailure()))
})

test('search success path', () => {
  const response = FixtureAPI.searchServices()
  const step = stepper(searchServices(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ServiceActions.serviceSearchSuccess([{ id: 1 }, { id: 2 }])))
})

test('search failure path', () => {
  const response = { ok: false }
  const step = stepper(searchServices(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ServiceActions.serviceSearchFailure()))
})
test('delete success path', () => {
  const response = FixtureAPI.deleteService({ id: 1 })
  const step = stepper(deleteService(FixtureAPI, { serviceId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ServiceActions.serviceDeleteSuccess({ id: 1 })))
})

test('delete failure path', () => {
  const response = { ok: false }
  const step = stepper(deleteService(FixtureAPI, { serviceId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ServiceActions.serviceDeleteFailure()))
})
