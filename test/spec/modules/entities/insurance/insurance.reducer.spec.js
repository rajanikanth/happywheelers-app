import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/insurance/insurance.reducer'

test('attempt retrieving a single insurance', () => {
  const state = reducer(INITIAL_STATE, Actions.insuranceRequest({ id: 1 }))

  expect(state.fetchingOne).toBe(true)
  expect(state.insurance).toBe(null)
})

test('attempt retrieving a list of insurance', () => {
  const state = reducer(INITIAL_STATE, Actions.insuranceAllRequest({ id: 1 }))

  expect(state.fetchingAll).toBe(true)
  expect(state.insurances).toEqual([])
})

test('attempt updating a insurance', () => {
  const state = reducer(INITIAL_STATE, Actions.insuranceUpdateRequest({ id: 1 }))

  expect(state.updating).toBe(true)
})
test('attempt searching a insurance', () => {
  const state = reducer(INITIAL_STATE, Actions.insuranceSearchRequest(1))

  expect(state.searching).toBe(true)
})
test('attempt to deleting a insurance', () => {
  const state = reducer(INITIAL_STATE, Actions.insuranceDeleteRequest({ id: 1 }))

  expect(state.deleting).toBe(true)
})

test('success retrieving a insurance', () => {
  const state = reducer(INITIAL_STATE, Actions.insuranceSuccess({ id: 1 }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.insurance).toEqual({ id: 1 })
})

test('success retrieving a list of insurance', () => {
  const state = reducer(INITIAL_STATE, Actions.insuranceAllSuccess([{ id: 1 }, { id: 2 }]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.insurances).toEqual([{ id: 1 }, { id: 2 }])
})

test('success updating a insurance', () => {
  const state = reducer(INITIAL_STATE, Actions.insuranceUpdateSuccess({ id: 1 }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.insurance).toEqual({ id: 1 })
})
test('success searching a insurance', () => {
  const state = reducer(INITIAL_STATE, Actions.insuranceSearchSuccess({ id: 1 }))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toBe(null)
  expect(state.insurances).toEqual({ id: 1 })
})
test('success deleting a insurance', () => {
  const state = reducer(INITIAL_STATE, Actions.insuranceDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.insurance).toEqual(null)
})

test('failure retrieving a insurance', () => {
  const state = reducer(INITIAL_STATE, Actions.insuranceFailure({ error: 'Not found' }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({ error: 'Not found' })
  expect(state.insurance).toEqual(null)
})

test('failure retrieving a list of insurance', () => {
  const state = reducer(INITIAL_STATE, Actions.insuranceAllFailure({ error: 'Not found' }))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({ error: 'Not found' })
  expect(state.insurances).toEqual([])
})

test('failure updating a insurance', () => {
  const state = reducer(INITIAL_STATE, Actions.insuranceUpdateFailure({ error: 'Not found' }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({ error: 'Not found' })
  expect(state.insurance).toEqual(INITIAL_STATE.insurance)
})
test('failure searching a insurance', () => {
  const state = reducer(INITIAL_STATE, Actions.insuranceSearchFailure({ error: 'Not found' }))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toEqual({ error: 'Not found' })
  expect(state.insurances).toEqual([])
})
test('failure deleting a insurance', () => {
  const state = reducer(INITIAL_STATE, Actions.insuranceDeleteFailure({ error: 'Not found' }))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({ error: 'Not found' })
  expect(state.insurance).toEqual(INITIAL_STATE.insurance)
})
