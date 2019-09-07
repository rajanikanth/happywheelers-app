const Utils = require('../utils')

describe('Driver Screen Tests', () => {
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
    await navigateToDriverScreen()
  })

  const navigateToDriverScreen = async () => {
    await expect(element(by.id('launchScreen'))).toBeVisible()
    await element(by.id('menuButton')).tap()
    await element(by.id('entitiesDrawerButton')).tap()
    await element(by.id('driverEntityScreenButton')).tap()
  }

  it('should allow you to create an entity', async () => {
    await expect(element(by.id('driverScreen'))).toBeVisible()
    await expect(element(by.text('Create'))).toBeVisible()
    // create
    await element(by.text('Create').and(by.type('UIButtonLabel'))).tap()
    await element(by.id('firstNameInput')).replaceText('sample-data')
    await element(by.id('lastNameInput')).replaceText('sample-data')
    await element(by.id('emailInput')).replaceText('sample-data')
    await element(by.id('passwordInput')).replaceText('sample-data')
    await element(by.id('phoneNumberInput')).replaceText('sample-data')
    await element(by.id('oneTimeCodeInput')).replaceText('sample-data')
    await element(by.id('driverLicenseInput')).replaceText('sample-data')
    await waitFor(element(by.id('submitButton'))).toBeVisible().whileElement(by.id('entityScrollView')).scroll(50, 'down')
    await element(by.id('submitButton')).tap()
    await element(by.text('View')).tap()
    await expect(element(by.id('firstName'))).toHaveText('FirstName: sample-data')
    await expect(element(by.id('lastName'))).toHaveText('LastName: sample-data')
    await expect(element(by.id('email'))).toHaveText('Email: sample-data')
    await expect(element(by.id('password'))).toHaveText('Password: sample-data')
    await expect(element(by.id('phoneNumber'))).toHaveText('PhoneNumber: sample-data')
    await expect(element(by.id('oneTimeCode'))).toHaveText('OneTimeCode: sample-data')
    await expect(element(by.id('driverLicense'))).toHaveText('DriverLicense: sample-data')
    // update
    await element(by.text('EDIT')).tap()
    await element(by.id('firstNameInput')).replaceText('sample-data-2')
    await element(by.id('lastNameInput')).replaceText('sample-data-2')
    await element(by.id('emailInput')).replaceText('sample-data-2')
    await element(by.id('passwordInput')).replaceText('sample-data-2')
    await element(by.id('phoneNumberInput')).replaceText('sample-data-2')
    await element(by.id('oneTimeCodeInput')).replaceText('sample-data-2')
    await element(by.id('driverLicenseInput')).replaceText('sample-data-2')
    await waitFor(element(by.id('submitButton'))).toBeVisible().whileElement(by.id('entityScrollView')).scroll(50, 'down')
    await element(by.id('submitButton')).tap()
    await element(by.text('OK')).tap()
    await expect(element(by.id('firstName'))).toHaveText('FirstName: sample-data-2')
    await expect(element(by.id('lastName'))).toHaveText('LastName: sample-data-2')
    await expect(element(by.id('email'))).toHaveText('Email: sample-data-2')
    await expect(element(by.id('password'))).toHaveText('Password: sample-data-2')
    await expect(element(by.id('phoneNumber'))).toHaveText('PhoneNumber: sample-data-2')
    await expect(element(by.id('oneTimeCode'))).toHaveText('OneTimeCode: sample-data-2')
    await expect(element(by.id('driverLicense'))).toHaveText('DriverLicense: sample-data-2')
    // delete
    await element(by.text('DELETE')).tap()
    await element(by.text('OK')).tap()
    await expect(element(by.id('driverScreen'))).toBeVisible()
  })
})
