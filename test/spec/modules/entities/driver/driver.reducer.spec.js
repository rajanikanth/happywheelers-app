import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/driver/driver.reducer'

test('attempt retrieving a single driver', () => {
  const state = reducer(INITIAL_STATE, Actions.driverRequest({ id: 1 }))

  expect(state.fetchingOne).toBe(true)
  expect(state.driver).toBe(null)
})

test('attempt retrieving a list of driver', () => {
  const state = reducer(INITIAL_STATE, Actions.driverAllRequest({ id: 1 }))

  expect(state.fetchingAll).toBe(true)
  expect(state.drivers).toEqual([])
})

test('attempt updating a driver', () => {
  const state = reducer(INITIAL_STATE, Actions.driverUpdateRequest({ id: 1 }))

  expect(state.updating).toBe(true)
})
test('attempt searching a driver', () => {
  const state = reducer(INITIAL_STATE, Actions.driverSearchRequest(1))

  expect(state.searching).toBe(true)
})
test('attempt to deleting a driver', () => {
  const state = reducer(INITIAL_STATE, Actions.driverDeleteRequest({ id: 1 }))

  expect(state.deleting).toBe(true)
})

test('success retrieving a driver', () => {
  const state = reducer(INITIAL_STATE, Actions.driverSuccess({ id: 1 }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.driver).toEqual({ id: 1 })
})

test('success retrieving a list of driver', () => {
  const state = reducer(INITIAL_STATE, Actions.driverAllSuccess([{ id: 1 }, { id: 2 }]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.drivers).toEqual([{ id: 1 }, { id: 2 }])
})

test('success updating a driver', () => {
  const state = reducer(INITIAL_STATE, Actions.driverUpdateSuccess({ id: 1 }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.driver).toEqual({ id: 1 })
})
test('success searching a driver', () => {
  const state = reducer(INITIAL_STATE, Actions.driverSearchSuccess({ id: 1 }))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toBe(null)
  expect(state.drivers).toEqual({ id: 1 })
})
test('success deleting a driver', () => {
  const state = reducer(INITIAL_STATE, Actions.driverDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.driver).toEqual(null)
})

test('failure retrieving a driver', () => {
  const state = reducer(INITIAL_STATE, Actions.driverFailure({ error: 'Not found' }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({ error: 'Not found' })
  expect(state.driver).toEqual(null)
})

test('failure retrieving a list of driver', () => {
  const state = reducer(INITIAL_STATE, Actions.driverAllFailure({ error: 'Not found' }))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({ error: 'Not found' })
  expect(state.drivers).toEqual([])
})

test('failure updating a driver', () => {
  const state = reducer(INITIAL_STATE, Actions.driverUpdateFailure({ error: 'Not found' }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({ error: 'Not found' })
  expect(state.driver).toEqual(INITIAL_STATE.driver)
})
test('failure searching a driver', () => {
  const state = reducer(INITIAL_STATE, Actions.driverSearchFailure({ error: 'Not found' }))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toEqual({ error: 'Not found' })
  expect(state.drivers).toEqual([])
})
test('failure deleting a driver', () => {
  const state = reducer(INITIAL_STATE, Actions.driverDeleteFailure({ error: 'Not found' }))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({ error: 'Not found' })
  expect(state.driver).toEqual(INITIAL_STATE.driver)
})
