import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/device-details/device-details.reducer'

test('attempt retrieving a single deviceDetail', () => {
  const state = reducer(INITIAL_STATE, Actions.deviceDetailRequest({ id: 1 }))

  expect(state.fetchingOne).toBe(true)
  expect(state.deviceDetail).toBe(null)
})

test('attempt retrieving a list of deviceDetail', () => {
  const state = reducer(INITIAL_STATE, Actions.deviceDetailAllRequest({ id: 1 }))

  expect(state.fetchingAll).toBe(true)
  expect(state.deviceDetails).toEqual([])
})

test('attempt updating a deviceDetail', () => {
  const state = reducer(INITIAL_STATE, Actions.deviceDetailUpdateRequest({ id: 1 }))

  expect(state.updating).toBe(true)
})
test('attempt searching a deviceDetail', () => {
  const state = reducer(INITIAL_STATE, Actions.deviceDetailSearchRequest(1))

  expect(state.searching).toBe(true)
})
test('attempt to deleting a deviceDetail', () => {
  const state = reducer(INITIAL_STATE, Actions.deviceDetailDeleteRequest({ id: 1 }))

  expect(state.deleting).toBe(true)
})

test('success retrieving a deviceDetail', () => {
  const state = reducer(INITIAL_STATE, Actions.deviceDetailSuccess({ id: 1 }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.deviceDetail).toEqual({ id: 1 })
})

test('success retrieving a list of deviceDetail', () => {
  const state = reducer(INITIAL_STATE, Actions.deviceDetailAllSuccess([{ id: 1 }, { id: 2 }]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.deviceDetails).toEqual([{ id: 1 }, { id: 2 }])
})

test('success updating a deviceDetail', () => {
  const state = reducer(INITIAL_STATE, Actions.deviceDetailUpdateSuccess({ id: 1 }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.deviceDetail).toEqual({ id: 1 })
})
test('success searching a deviceDetail', () => {
  const state = reducer(INITIAL_STATE, Actions.deviceDetailSearchSuccess({ id: 1 }))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toBe(null)
  expect(state.deviceDetails).toEqual({ id: 1 })
})
test('success deleting a deviceDetail', () => {
  const state = reducer(INITIAL_STATE, Actions.deviceDetailDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.deviceDetail).toEqual(null)
})

test('failure retrieving a deviceDetail', () => {
  const state = reducer(INITIAL_STATE, Actions.deviceDetailFailure({ error: 'Not found' }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({ error: 'Not found' })
  expect(state.deviceDetail).toEqual(null)
})

test('failure retrieving a list of deviceDetail', () => {
  const state = reducer(INITIAL_STATE, Actions.deviceDetailAllFailure({ error: 'Not found' }))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({ error: 'Not found' })
  expect(state.deviceDetails).toEqual([])
})

test('failure updating a deviceDetail', () => {
  const state = reducer(INITIAL_STATE, Actions.deviceDetailUpdateFailure({ error: 'Not found' }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({ error: 'Not found' })
  expect(state.deviceDetail).toEqual(INITIAL_STATE.deviceDetail)
})
test('failure searching a deviceDetail', () => {
  const state = reducer(INITIAL_STATE, Actions.deviceDetailSearchFailure({ error: 'Not found' }))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toEqual({ error: 'Not found' })
  expect(state.deviceDetails).toEqual([])
})
test('failure deleting a deviceDetail', () => {
  const state = reducer(INITIAL_STATE, Actions.deviceDetailDeleteFailure({ error: 'Not found' }))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({ error: 'Not found' })
  expect(state.deviceDetail).toEqual(INITIAL_STATE.deviceDetail)
})
