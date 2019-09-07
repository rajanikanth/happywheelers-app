const Utils = require('../utils')

describe('Business Screen Tests', () => {
  before(async () => {
    await device.reloadReactNative()
    await Utils.loginAsUser()
  })
  after(async () => {
    await element(by.type('_UIBackButtonContainerView')).tap()
    await element(by.type('_UIBackButtonContainerView')).tap()
    await Utils.logout()
  })

  beforeEach(async () => {
    await device.reloadReactNative()
    await navigateToBusinessScreen()
  })

  const navigateToBusinessScreen = async () => {
    await expect(element(by.id('launchScreen'))).toBeVisible()
    await element(by.id('menuButton')).tap()
    await element(by.id('entitiesDrawerButton')).tap()
    await element(by.id('businessEntityScreenButton')).tap()
  }

  it('should allow you to create an entity', async () => {
    await expect(element(by.id('businessScreen'))).toBeVisible()
    await expect(element(by.text('Create'))).toBeVisible()
    // create
    await element(by.text('Create').and(by.type('UIButtonLabel'))).tap()
    await element(by.id('nameInput')).replaceText('sample-data')
    await element(by.id('typeInput')).replaceText('sample-data')
    await element(by.id('addressInput')).replaceText('sample-data')
    await element(by.id('phoneNumberInput')).replaceText('sample-data')
    await waitFor(element(by.id('submitButton'))).toBeVisible().whileElement(by.id('entityScrollView')).scroll(50, 'down')
    await element(by.id('submitButton')).tap()
    await element(by.text('View')).tap()
    await expect(element(by.id('name'))).toHaveText('Name: sample-data')
    await expect(element(by.id('type'))).toHaveText('Type: sample-data')
    await expect(element(by.id('address'))).toHaveText('Address: sample-data')
    await expect(element(by.id('phoneNumber'))).toHaveText('PhoneNumber: sample-data')
    // update
    await element(by.text('EDIT')).tap()
    await element(by.id('nameInput')).replaceText('sample-data-2')
    await element(by.id('typeInput')).replaceText('sample-data-2')
    await element(by.id('addressInput')).replaceText('sample-data-2')
    await element(by.id('phoneNumberInput')).replaceText('sample-data-2')
    await waitFor(element(by.id('submitButton'))).toBeVisible().whileElement(by.id('entityScrollView')).scroll(50, 'down')
    await element(by.id('submitButton')).tap()
    await element(by.text('OK')).tap()
    await expect(element(by.id('name'))).toHaveText('Name: sample-data-2')
    await expect(element(by.id('type'))).toHaveText('Type: sample-data-2')
    await expect(element(by.id('address'))).toHaveText('Address: sample-data-2')
    await expect(element(by.id('phoneNumber'))).toHaveText('PhoneNumber: sample-data-2')
    // delete
    await element(by.text('DELETE')).tap()
    await element(by.text('OK')).tap()
    await expect(element(by.id('businessScreen'))).toBeVisible()
  })
})
