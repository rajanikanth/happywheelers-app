import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getDriver, getDrivers, updateDriver, deleteDriver, searchDrivers } from '../../../../../app/modules/entities/driver/driver.sagas'
import DriverActions from '../../../../../app/modules/entities/driver/driver.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getDriver(1)
  const step = stepper(getDriver(FixtureAPI, { driverId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(DriverActions.driverSuccess({ id: 1 })))
})

test('get failure path', () => {
  const response = { ok: false }
  const step = stepper(getDriver(FixtureAPI, { driverId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(DriverActions.driverFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getDrivers()
  const step = stepper(getDrivers(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(DriverActions.driverAllSuccess([{ id: 1 }, { id: 2 }])))
})

test('getAll failure path', () => {
  const response = { ok: false }
  const step = stepper(getDrivers(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(DriverActions.driverAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateDriver({ id: 1 })
  const step = stepper(updateDriver(FixtureAPI, { driver: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(DriverActions.driverUpdateSuccess({ id: 1 })))
})

test('update failure path', () => {
  const response = { ok: false }
  const step = stepper(updateDriver(FixtureAPI, { driver: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(DriverActions.driverUpdateFailure()))
})

test('search success path', () => {
  const response = FixtureAPI.searchDrivers()
  const step = stepper(searchDrivers(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(DriverActions.driverSearchSuccess([{ id: 1 }, { id: 2 }])))
})

test('search failure path', () => {
  const response = { ok: false }
  const step = stepper(searchDrivers(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(DriverActions.driverSearchFailure()))
})
test('delete success path', () => {
  const response = FixtureAPI.deleteDriver({ id: 1 })
  const step = stepper(deleteDriver(FixtureAPI, { driverId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(DriverActions.driverDeleteSuccess({ id: 1 })))
})

test('delete failure path', () => {
  const response = { ok: false }
  const step = stepper(deleteDriver(FixtureAPI, { driverId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(DriverActions.driverDeleteFailure()))
})
