// a library to wrap and simplify api calls
import apisauce from 'apisauce'

import AppConfig from '../../config/app-config'

// our "constructor"
const create = (baseURL = AppConfig.apiUrl) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const setAuthToken = (userAuth) => api.setHeader('Authorization', 'Bearer ' + userAuth)
  const removeAuthToken = () => api.deleteHeader('Authorization')
  const login = (userAuth) => api.post('api/authenticate', userAuth)
  const register = (user) => api.post('api/register', user)
  const forgotPassword = (data) => api.post('api/account/reset-password/init', data, { headers: { 'Content-Type': 'text/plain', 'Accept': 'application/json, text/plain, */*' } })

  const getAccount = () => api.get('api/account')
  const updateAccount = (account) => api.post('api/account', account)
  const changePassword = (currentPassword, newPassword) => api.post('api/account/change-password', { currentPassword, newPassword }, { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json, text/plain, */*' } })

  const getUser = (userId) => api.get('api/users/' + userId)
  const getUsers = (options) => api.get('api/users', options)
  const createUser = (user) => api.post('api/users', user)
  const updateUser = (user) => api.put('api/users', user)
  const deleteUser = (userId) => api.delete('api/users/' + userId)

  const getDriver = (driverId) => api.get('api/drivers/' + driverId)
  const getDrivers = (options) => api.get('api/drivers', options)
  const createDriver = (driver) => api.post('api/drivers', driver)
  const updateDriver = (driver) => api.put('api/drivers', driver)
  const deleteDriver = (driverId) => api.delete('api/drivers/' + driverId)
  const searchDrivers = (query) => api.get('api/_search/drivers', { query: query })

  const getDeviceDetail = (deviceDetailId) => api.get('api/device-details/' + deviceDetailId)
  const getDeviceDetails = (options) => api.get('api/device-details', options)
  const createDeviceDetail = (deviceDetail) => api.post('api/device-details', deviceDetail)
  const updateDeviceDetail = (deviceDetail) => api.put('api/device-details', deviceDetail)
  const deleteDeviceDetail = (deviceDetailId) => api.delete('api/device-details/' + deviceDetailId)
  const searchDeviceDetails = (query) => api.get('api/_search/device-details', { query: query })

  const getLocation = (locationId) => api.get('api/locations/' + locationId)
  const getLocations = (options) => api.get('api/locations', options)
  const createLocation = (location) => api.post('api/locations', location)
  const updateLocation = (location) => api.put('api/locations', location)
  const deleteLocation = (locationId) => api.delete('api/locations/' + locationId)
  const searchLocations = (query) => api.get('api/_search/locations', { query: query })

  const getVehicle = (vehicleId) => api.get('api/vehicles/' + vehicleId)
  const getVehicles = (options) => api.get('api/vehicles', options)
  const createVehicle = (vehicle) => api.post('api/vehicles', vehicle)
  const updateVehicle = (vehicle) => api.put('api/vehicles', vehicle)
  const deleteVehicle = (vehicleId) => api.delete('api/vehicles/' + vehicleId)
  const searchVehicles = (query) => api.get('api/_search/vehicles', { query: query })

  const getInsurance = (insuranceId) => api.get('api/insurances/' + insuranceId)
  const getInsurances = (options) => api.get('api/insurances', options)
  const createInsurance = (insurance) => api.post('api/insurances', insurance)
  const updateInsurance = (insurance) => api.put('api/insurances', insurance)
  const deleteInsurance = (insuranceId) => api.delete('api/insurances/' + insuranceId)
  const searchInsurances = (query) => api.get('api/_search/insurances', { query: query })

  const getService = (serviceId) => api.get('api/services/' + serviceId)
  const getServices = (options) => api.get('api/services', options)
  const createService = (service) => api.post('api/services', service)
  const updateService = (service) => api.put('api/services', service)
  const deleteService = (serviceId) => api.delete('api/services/' + serviceId)
  const searchServices = (query) => api.get('api/_search/services', { query: query })

  const getBusiness = (businessId) => api.get('api/businesses/' + businessId)
  const getBusinesses = (options) => api.get('api/businesses', options)
  const createBusiness = (business) => api.post('api/businesses', business)
  const updateBusiness = (business) => api.put('api/businesses', business)
  const deleteBusiness = (businessId) => api.delete('api/businesses/' + businessId)
  const searchBusinesses = (query) => api.get('api/_search/businesses', { query: query })
  // ignite-jhipster-api-method-needle

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    createUser,
    updateUser,
    getUsers,
    getUser,
    deleteUser,

    createDriver,
    updateDriver,
    getDrivers,
    getDriver,
    deleteDriver,
    searchDrivers,

    createDeviceDetail,
    updateDeviceDetail,
    getDeviceDetails,
    getDeviceDetail,
    deleteDeviceDetail,
    searchDeviceDetails,

    createLocation,
    updateLocation,
    getLocations,
    getLocation,
    deleteLocation,
    searchLocations,

    createVehicle,
    updateVehicle,
    getVehicles,
    getVehicle,
    deleteVehicle,
    searchVehicles,

    createInsurance,
    updateInsurance,
    getInsurances,
    getInsurance,
    deleteInsurance,
    searchInsurances,

    createService,
    updateService,
    getServices,
    getService,
    deleteService,
    searchServices,

    createBusiness,
    updateBusiness,
    getBusinesses,
    getBusiness,
    deleteBusiness,
    searchBusinesses,
    // ignite-jhipster-api-export-needle
    setAuthToken,
    removeAuthToken,
    login,
    register,
    forgotPassword,
    getAccount,
    updateAccount,
    changePassword
  }
}

// let's return back our create method as the default.
export default {
  create
}
