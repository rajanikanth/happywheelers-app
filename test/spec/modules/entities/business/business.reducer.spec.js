import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/business/business.reducer'

test('attempt retrieving a single business', () => {
  const state = reducer(INITIAL_STATE, Actions.businessRequest({ id: 1 }))

  expect(state.fetchingOne).toBe(true)
  expect(state.business).toBe(null)
})

test('attempt retrieving a list of business', () => {
  const state = reducer(INITIAL_STATE, Actions.businessAllRequest({ id: 1 }))

  expect(state.fetchingAll).toBe(true)
  expect(state.businesses).toEqual([])
})

test('attempt updating a business', () => {
  const state = reducer(INITIAL_STATE, Actions.businessUpdateRequest({ id: 1 }))

  expect(state.updating).toBe(true)
})
test('attempt searching a business', () => {
  const state = reducer(INITIAL_STATE, Actions.businessSearchRequest(1))

  expect(state.searching).toBe(true)
})
test('attempt to deleting a business', () => {
  const state = reducer(INITIAL_STATE, Actions.businessDeleteRequest({ id: 1 }))

  expect(state.deleting).toBe(true)
})

test('success retrieving a business', () => {
  const state = reducer(INITIAL_STATE, Actions.businessSuccess({ id: 1 }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.business).toEqual({ id: 1 })
})

test('success retrieving a list of business', () => {
  const state = reducer(INITIAL_STATE, Actions.businessAllSuccess([{ id: 1 }, { id: 2 }]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.businesses).toEqual([{ id: 1 }, { id: 2 }])
})

test('success updating a business', () => {
  const state = reducer(INITIAL_STATE, Actions.businessUpdateSuccess({ id: 1 }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.business).toEqual({ id: 1 })
})
test('success searching a business', () => {
  const state = reducer(INITIAL_STATE, Actions.businessSearchSuccess({ id: 1 }))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toBe(null)
  expect(state.businesses).toEqual({ id: 1 })
})
test('success deleting a business', () => {
  const state = reducer(INITIAL_STATE, Actions.businessDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.business).toEqual(null)
})

test('failure retrieving a business', () => {
  const state = reducer(INITIAL_STATE, Actions.businessFailure({ error: 'Not found' }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({ error: 'Not found' })
  expect(state.business).toEqual(null)
})

test('failure retrieving a list of business', () => {
  const state = reducer(INITIAL_STATE, Actions.businessAllFailure({ error: 'Not found' }))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({ error: 'Not found' })
  expect(state.businesses).toEqual([])
})

test('failure updating a business', () => {
  const state = reducer(INITIAL_STATE, Actions.businessUpdateFailure({ error: 'Not found' }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({ error: 'Not found' })
  expect(state.business).toEqual(INITIAL_STATE.business)
})
test('failure searching a business', () => {
  const state = reducer(INITIAL_STATE, Actions.businessSearchFailure({ error: 'Not found' }))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toEqual({ error: 'Not found' })
  expect(state.businesses).toEqual([])
})
test('failure deleting a business', () => {
  const state = reducer(INITIAL_STATE, Actions.businessDeleteFailure({ error: 'Not found' }))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({ error: 'Not found' })
  expect(state.business).toEqual(INITIAL_STATE.business)
})
