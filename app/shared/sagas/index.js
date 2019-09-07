import { takeLatest, all } from 'redux-saga/effects'
import API from '../services/api'
import FixtureAPI from '../services/fixture-api'
import DebugConfig from '../../config/debug-config'

/* ------------- Types ------------- */

import { StartupTypes } from '../reducers/startup.reducer'
import { LoginTypes } from '../../modules/login/login.reducer'
import { AccountTypes } from '../../shared/reducers/account.reducer'
import { RegisterTypes } from '../../modules/account/register/register.reducer'
import { ForgotPasswordTypes } from '../../modules/account/password-reset/forgot-password.reducer'
import { ChangePasswordTypes } from '../../modules/account/password/change-password.reducer'
import { UserTypes } from '../../shared/reducers/user.reducer'
import { DriverTypes } from '../../modules/entities/driver/driver.reducer'
import { DeviceDetailTypes } from '../../modules/entities/device-details/device-details.reducer'
import { LocationTypes } from '../../modules/entities/location/location.reducer'
import { VehicleTypes } from '../../modules/entities/vehicle/vehicle.reducer'
import { InsuranceTypes } from '../../modules/entities/insurance/insurance.reducer'
import { ServiceTypes } from '../../modules/entities/services/services.reducer'
import { BusinessTypes } from '../../modules/entities/business/business.reducer'
// ignite-jhipster-saga-redux-import-needle

/* ------------- Sagas ------------- */

import { startup } from './startup.saga'
import { login, logout, loginLoad } from '../../modules/login/login.sagas'
import { register } from '../../modules/account/register/register.sagas'
import { forgotPassword } from '../../modules/account/password-reset/forgot-password.sagas'
import { changePassword } from '../../modules/account/password/change-password.sagas'
import { getAccount, updateAccount } from '../../shared/sagas/account.sagas'
import { getUser, getUsers, updateUser, deleteUser } from '../../shared/sagas/user.sagas'
import { getDriver, getDrivers, updateDriver, deleteDriver, searchDrivers } from '../../modules/entities/driver/driver.sagas'
import { getDeviceDetail, getDeviceDetails, updateDeviceDetail, deleteDeviceDetail, searchDeviceDetails } from '../../modules/entities/device-details/device-details.sagas'
import { getLocation, getLocations, updateLocation, deleteLocation, searchLocations } from '../../modules/entities/location/location.sagas'
import { getVehicle, getVehicles, updateVehicle, deleteVehicle, searchVehicles } from '../../modules/entities/vehicle/vehicle.sagas'
import { getInsurance, getInsurances, updateInsurance, deleteInsurance, searchInsurances } from '../../modules/entities/insurance/insurance.sagas'
import { getService, getServices, updateService, deleteService, searchServices } from '../../modules/entities/services/services.sagas'
import { getBusiness, getBusinesses, updateBusiness, deleteBusiness, searchBusinesses } from '../../modules/entities/business/business.sagas'
// ignite-jhipster-saga-method-import-needle

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // JHipster accounts
    takeLatest(LoginTypes.LOGIN_LOAD, loginLoad, api),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(LoginTypes.LOGOUT_REQUEST, logout, api),
    takeLatest(RegisterTypes.REGISTER_REQUEST, register, api),
    takeLatest(ForgotPasswordTypes.FORGOT_PASSWORD_REQUEST, forgotPassword, api),
    takeLatest(ChangePasswordTypes.CHANGE_PASSWORD_REQUEST, changePassword, api),

    takeLatest(DriverTypes.DRIVER_REQUEST, getDriver, api),
    takeLatest(DriverTypes.DRIVER_ALL_REQUEST, getDrivers, api),
    takeLatest(DriverTypes.DRIVER_UPDATE_REQUEST, updateDriver, api),
    takeLatest(DriverTypes.DRIVER_DELETE_REQUEST, deleteDriver, api),
    takeLatest(DriverTypes.DRIVER_SEARCH_REQUEST, searchDrivers, api),

    takeLatest(DeviceDetailTypes.DEVICE_DETAIL_REQUEST, getDeviceDetail, api),
    takeLatest(DeviceDetailTypes.DEVICE_DETAIL_ALL_REQUEST, getDeviceDetails, api),
    takeLatest(DeviceDetailTypes.DEVICE_DETAIL_UPDATE_REQUEST, updateDeviceDetail, api),
    takeLatest(DeviceDetailTypes.DEVICE_DETAIL_DELETE_REQUEST, deleteDeviceDetail, api),
    takeLatest(DeviceDetailTypes.DEVICE_DETAIL_SEARCH_REQUEST, searchDeviceDetails, api),

    takeLatest(LocationTypes.LOCATION_REQUEST, getLocation, api),
    takeLatest(LocationTypes.LOCATION_ALL_REQUEST, getLocations, api),
    takeLatest(LocationTypes.LOCATION_UPDATE_REQUEST, updateLocation, api),
    takeLatest(LocationTypes.LOCATION_DELETE_REQUEST, deleteLocation, api),
    takeLatest(LocationTypes.LOCATION_SEARCH_REQUEST, searchLocations, api),

    takeLatest(VehicleTypes.VEHICLE_REQUEST, getVehicle, api),
    takeLatest(VehicleTypes.VEHICLE_ALL_REQUEST, getVehicles, api),
    takeLatest(VehicleTypes.VEHICLE_UPDATE_REQUEST, updateVehicle, api),
    takeLatest(VehicleTypes.VEHICLE_DELETE_REQUEST, deleteVehicle, api),
    takeLatest(VehicleTypes.VEHICLE_SEARCH_REQUEST, searchVehicles, api),

    takeLatest(InsuranceTypes.INSURANCE_REQUEST, getInsurance, api),
    takeLatest(InsuranceTypes.INSURANCE_ALL_REQUEST, getInsurances, api),
    takeLatest(InsuranceTypes.INSURANCE_UPDATE_REQUEST, updateInsurance, api),
    takeLatest(InsuranceTypes.INSURANCE_DELETE_REQUEST, deleteInsurance, api),
    takeLatest(InsuranceTypes.INSURANCE_SEARCH_REQUEST, searchInsurances, api),

    takeLatest(ServiceTypes.SERVICE_REQUEST, getService, api),
    takeLatest(ServiceTypes.SERVICE_ALL_REQUEST, getServices, api),
    takeLatest(ServiceTypes.SERVICE_UPDATE_REQUEST, updateService, api),
    takeLatest(ServiceTypes.SERVICE_DELETE_REQUEST, deleteService, api),
    takeLatest(ServiceTypes.SERVICE_SEARCH_REQUEST, searchServices, api),

    takeLatest(BusinessTypes.BUSINESS_REQUEST, getBusiness, api),
    takeLatest(BusinessTypes.BUSINESS_ALL_REQUEST, getBusinesses, api),
    takeLatest(BusinessTypes.BUSINESS_UPDATE_REQUEST, updateBusiness, api),
    takeLatest(BusinessTypes.BUSINESS_DELETE_REQUEST, deleteBusiness, api),
    takeLatest(BusinessTypes.BUSINESS_SEARCH_REQUEST, searchBusinesses, api),
    // ignite-jhipster-saga-redux-connect-needle

    takeLatest(UserTypes.USER_REQUEST, getUser, api),
    takeLatest(UserTypes.USER_ALL_REQUEST, getUsers, api),
    takeLatest(UserTypes.USER_UPDATE_REQUEST, updateUser, api),
    takeLatest(UserTypes.USER_DELETE_REQUEST, deleteUser, api),

    takeLatest(AccountTypes.ACCOUNT_REQUEST, getAccount, api),
    takeLatest(AccountTypes.ACCOUNT_UPDATE_REQUEST, updateAccount, api)
  ])
}
