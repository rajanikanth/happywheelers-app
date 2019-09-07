import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getVehicle, getVehicles, updateVehicle, deleteVehicle, searchVehicles } from '../../../../../app/modules/entities/vehicle/vehicle.sagas'
import VehicleActions from '../../../../../app/modules/entities/vehicle/vehicle.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getVehicle(1)
  const step = stepper(getVehicle(FixtureAPI, { vehicleId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(VehicleActions.vehicleSuccess({ id: 1 })))
})

test('get failure path', () => {
  const response = { ok: false }
  const step = stepper(getVehicle(FixtureAPI, { vehicleId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(VehicleActions.vehicleFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getVehicles()
  const step = stepper(getVehicles(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(VehicleActions.vehicleAllSuccess([{ id: 1 }, { id: 2 }])))
})

test('getAll failure path', () => {
  const response = { ok: false }
  const step = stepper(getVehicles(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(VehicleActions.vehicleAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateVehicle({ id: 1 })
  const step = stepper(updateVehicle(FixtureAPI, { vehicle: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(VehicleActions.vehicleUpdateSuccess({ id: 1 })))
})

test('update failure path', () => {
  const response = { ok: false }
  const step = stepper(updateVehicle(FixtureAPI, { vehicle: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(VehicleActions.vehicleUpdateFailure()))
})

test('search success path', () => {
  const response = FixtureAPI.searchVehicles()
  const step = stepper(searchVehicles(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(VehicleActions.vehicleSearchSuccess([{ id: 1 }, { id: 2 }])))
})

test('search failure path', () => {
  const response = { ok: false }
  const step = stepper(searchVehicles(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(VehicleActions.vehicleSearchFailure()))
})
test('delete success path', () => {
  const response = FixtureAPI.deleteVehicle({ id: 1 })
  const step = stepper(deleteVehicle(FixtureAPI, { vehicleId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(VehicleActions.vehicleDeleteSuccess({ id: 1 })))
})

test('delete failure path', () => {
  const response = { ok: false }
  const step = stepper(deleteVehicle(FixtureAPI, { vehicleId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(VehicleActions.vehicleDeleteFailure()))
})
