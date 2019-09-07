import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/vehicle/vehicle.reducer'

test('attempt retrieving a single vehicle', () => {
  const state = reducer(INITIAL_STATE, Actions.vehicleRequest({ id: 1 }))

  expect(state.fetchingOne).toBe(true)
  expect(state.vehicle).toBe(null)
})

test('attempt retrieving a list of vehicle', () => {
  const state = reducer(INITIAL_STATE, Actions.vehicleAllRequest({ id: 1 }))

  expect(state.fetchingAll).toBe(true)
  expect(state.vehicles).toEqual([])
})

test('attempt updating a vehicle', () => {
  const state = reducer(INITIAL_STATE, Actions.vehicleUpdateRequest({ id: 1 }))

  expect(state.updating).toBe(true)
})
test('attempt searching a vehicle', () => {
  const state = reducer(INITIAL_STATE, Actions.vehicleSearchRequest(1))

  expect(state.searching).toBe(true)
})
test('attempt to deleting a vehicle', () => {
  const state = reducer(INITIAL_STATE, Actions.vehicleDeleteRequest({ id: 1 }))

  expect(state.deleting).toBe(true)
})

test('success retrieving a vehicle', () => {
  const state = reducer(INITIAL_STATE, Actions.vehicleSuccess({ id: 1 }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.vehicle).toEqual({ id: 1 })
})

test('success retrieving a list of vehicle', () => {
  const state = reducer(INITIAL_STATE, Actions.vehicleAllSuccess([{ id: 1 }, { id: 2 }]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.vehicles).toEqual([{ id: 1 }, { id: 2 }])
})

test('success updating a vehicle', () => {
  const state = reducer(INITIAL_STATE, Actions.vehicleUpdateSuccess({ id: 1 }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.vehicle).toEqual({ id: 1 })
})
test('success searching a vehicle', () => {
  const state = reducer(INITIAL_STATE, Actions.vehicleSearchSuccess({ id: 1 }))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toBe(null)
  expect(state.vehicles).toEqual({ id: 1 })
})
test('success deleting a vehicle', () => {
  const state = reducer(INITIAL_STATE, Actions.vehicleDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.vehicle).toEqual(null)
})

test('failure retrieving a vehicle', () => {
  const state = reducer(INITIAL_STATE, Actions.vehicleFailure({ error: 'Not found' }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({ error: 'Not found' })
  expect(state.vehicle).toEqual(null)
})

test('failure retrieving a list of vehicle', () => {
  const state = reducer(INITIAL_STATE, Actions.vehicleAllFailure({ error: 'Not found' }))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({ error: 'Not found' })
  expect(state.vehicles).toEqual([])
})

test('failure updating a vehicle', () => {
  const state = reducer(INITIAL_STATE, Actions.vehicleUpdateFailure({ error: 'Not found' }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({ error: 'Not found' })
  expect(state.vehicle).toEqual(INITIAL_STATE.vehicle)
})
test('failure searching a vehicle', () => {
  const state = reducer(INITIAL_STATE, Actions.vehicleSearchFailure({ error: 'Not found' }))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toEqual({ error: 'Not found' })
  expect(state.vehicles).toEqual([])
})
test('failure deleting a vehicle', () => {
  const state = reducer(INITIAL_STATE, Actions.vehicleDeleteFailure({ error: 'Not found' }))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({ error: 'Not found' })
  expect(state.vehicle).toEqual(INITIAL_STATE.vehicle)
})
