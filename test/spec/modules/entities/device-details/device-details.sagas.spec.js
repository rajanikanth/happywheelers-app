import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getDeviceDetail, getDeviceDetails, updateDeviceDetail, deleteDeviceDetail, searchDeviceDetails } from '../../../../../app/modules/entities/device-details/device-details.sagas'
import DeviceDetailActions from '../../../../../app/modules/entities/device-details/device-details.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getDeviceDetail(1)
  const step = stepper(getDeviceDetail(FixtureAPI, { deviceDetailId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(DeviceDetailActions.deviceDetailSuccess({ id: 1 })))
})

test('get failure path', () => {
  const response = { ok: false }
  const step = stepper(getDeviceDetail(FixtureAPI, { deviceDetailId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(DeviceDetailActions.deviceDetailFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getDeviceDetails()
  const step = stepper(getDeviceDetails(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(DeviceDetailActions.deviceDetailAllSuccess([{ id: 1 }, { id: 2 }])))
})

test('getAll failure path', () => {
  const response = { ok: false }
  const step = stepper(getDeviceDetails(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(DeviceDetailActions.deviceDetailAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateDeviceDetail({ id: 1 })
  const step = stepper(updateDeviceDetail(FixtureAPI, { deviceDetail: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(DeviceDetailActions.deviceDetailUpdateSuccess({ id: 1 })))
})

test('update failure path', () => {
  const response = { ok: false }
  const step = stepper(updateDeviceDetail(FixtureAPI, { deviceDetail: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(DeviceDetailActions.deviceDetailUpdateFailure()))
})

test('search success path', () => {
  const response = FixtureAPI.searchDeviceDetails()
  const step = stepper(searchDeviceDetails(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(DeviceDetailActions.deviceDetailSearchSuccess([{ id: 1 }, { id: 2 }])))
})

test('search failure path', () => {
  const response = { ok: false }
  const step = stepper(searchDeviceDetails(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(DeviceDetailActions.deviceDetailSearchFailure()))
})
test('delete success path', () => {
  const response = FixtureAPI.deleteDeviceDetail({ id: 1 })
  const step = stepper(deleteDeviceDetail(FixtureAPI, { deviceDetailId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(DeviceDetailActions.deviceDetailDeleteSuccess({ id: 1 })))
})

test('delete failure path', () => {
  const response = { ok: false }
  const step = stepper(deleteDeviceDetail(FixtureAPI, { deviceDetailId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(DeviceDetailActions.deviceDetailDeleteFailure()))
})
