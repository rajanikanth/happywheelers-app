const Utils = require('../utils')

describe('Vehicle Screen Tests', () => {
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
    await navigateToVehicleScreen()
  })

  const navigateToVehicleScreen = async () => {
    await expect(element(by.id('launchScreen'))).toBeVisible()
    await element(by.id('menuButton')).tap()
    await element(by.id('entitiesDrawerButton')).tap()
    await element(by.id('vehicleEntityScreenButton')).tap()
  }

  it('should allow you to create an entity', async () => {
    await expect(element(by.id('vehicleScreen'))).toBeVisible()
    await expect(element(by.text('Create'))).toBeVisible()
    // create
    await element(by.text('Create').and(by.type('UIButtonLabel'))).tap()
    await element(by.id('makeInput')).replaceText('sample-data')
    await element(by.id('modelInput')).replaceText('sample-data')
    await element(by.id('yearInput')).replaceText('sample-data')
    await element(by.id('plateNumberInput')).replaceText('sample-data')
    await element(by.id('vinNumberInput')).replaceText('sample-data')
    await waitFor(element(by.id('submitButton'))).toBeVisible().whileElement(by.id('entityScrollView')).scroll(50, 'down')
    await element(by.id('submitButton')).tap()
    await element(by.text('View')).tap()
    await expect(element(by.id('make'))).toHaveText('Make: sample-data')
    await expect(element(by.id('model'))).toHaveText('Model: sample-data')
    await expect(element(by.id('year'))).toHaveText('Year: sample-data')
    await expect(element(by.id('plateNumber'))).toHaveText('PlateNumber: sample-data')
    await expect(element(by.id('vinNumber'))).toHaveText('VinNumber: sample-data')
    // update
    await element(by.text('EDIT')).tap()
    await element(by.id('makeInput')).replaceText('sample-data-2')
    await element(by.id('modelInput')).replaceText('sample-data-2')
    await element(by.id('yearInput')).replaceText('sample-data-2')
    await element(by.id('plateNumberInput')).replaceText('sample-data-2')
    await element(by.id('vinNumberInput')).replaceText('sample-data-2')
    await waitFor(element(by.id('submitButton'))).toBeVisible().whileElement(by.id('entityScrollView')).scroll(50, 'down')
    await element(by.id('submitButton')).tap()
    await element(by.text('OK')).tap()
    await expect(element(by.id('make'))).toHaveText('Make: sample-data-2')
    await expect(element(by.id('model'))).toHaveText('Model: sample-data-2')
    await expect(element(by.id('year'))).toHaveText('Year: sample-data-2')
    await expect(element(by.id('plateNumber'))).toHaveText('PlateNumber: sample-data-2')
    await expect(element(by.id('vinNumber'))).toHaveText('VinNumber: sample-data-2')
    // delete
    await element(by.text('DELETE')).tap()
    await element(by.text('OK')).tap()
    await expect(element(by.id('vehicleScreen'))).toBeVisible()
  })
})
