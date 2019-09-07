import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/services/services.reducer'

test('attempt retrieving a single service', () => {
  const state = reducer(INITIAL_STATE, Actions.serviceRequest({ id: 1 }))

  expect(state.fetchingOne).toBe(true)
  expect(state.service).toBe(null)
})

test('attempt retrieving a list of service', () => {
  const state = reducer(INITIAL_STATE, Actions.serviceAllRequest({ id: 1 }))

  expect(state.fetchingAll).toBe(true)
  expect(state.services).toEqual([])
})

test('attempt updating a service', () => {
  const state = reducer(INITIAL_STATE, Actions.serviceUpdateRequest({ id: 1 }))

  expect(state.updating).toBe(true)
})
test('attempt searching a service', () => {
  const state = reducer(INITIAL_STATE, Actions.serviceSearchRequest(1))

  expect(state.searching).toBe(true)
})
test('attempt to deleting a service', () => {
  const state = reducer(INITIAL_STATE, Actions.serviceDeleteRequest({ id: 1 }))

  expect(state.deleting).toBe(true)
})

test('success retrieving a service', () => {
  const state = reducer(INITIAL_STATE, Actions.serviceSuccess({ id: 1 }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.service).toEqual({ id: 1 })
})

test('success retrieving a list of service', () => {
  const state = reducer(INITIAL_STATE, Actions.serviceAllSuccess([{ id: 1 }, { id: 2 }]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.services).toEqual([{ id: 1 }, { id: 2 }])
})

test('success updating a service', () => {
  const state = reducer(INITIAL_STATE, Actions.serviceUpdateSuccess({ id: 1 }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.service).toEqual({ id: 1 })
})
test('success searching a service', () => {
  const state = reducer(INITIAL_STATE, Actions.serviceSearchSuccess({ id: 1 }))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toBe(null)
  expect(state.services).toEqual({ id: 1 })
})
test('success deleting a service', () => {
  const state = reducer(INITIAL_STATE, Actions.serviceDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.service).toEqual(null)
})

test('failure retrieving a service', () => {
  const state = reducer(INITIAL_STATE, Actions.serviceFailure({ error: 'Not found' }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({ error: 'Not found' })
  expect(state.service).toEqual(null)
})

test('failure retrieving a list of service', () => {
  const state = reducer(INITIAL_STATE, Actions.serviceAllFailure({ error: 'Not found' }))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({ error: 'Not found' })
  expect(state.services).toEqual([])
})

test('failure updating a service', () => {
  const state = reducer(INITIAL_STATE, Actions.serviceUpdateFailure({ error: 'Not found' }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({ error: 'Not found' })
  expect(state.service).toEqual(INITIAL_STATE.service)
})
test('failure searching a service', () => {
  const state = reducer(INITIAL_STATE, Actions.serviceSearchFailure({ error: 'Not found' }))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toEqual({ error: 'Not found' })
  expect(state.services).toEqual([])
})
test('failure deleting a service', () => {
  const state = reducer(INITIAL_STATE, Actions.serviceDeleteFailure({ error: 'Not found' }))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({ error: 'Not found' })
  expect(state.service).toEqual(INITIAL_STATE.service)
})
