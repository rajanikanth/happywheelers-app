export default {
  // Functions return fixtures

  // entity fixtures

  updateDriver: (driver) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-driver.json')
    }
  },
  getDrivers: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-drivers.json')
    }
  },
  getDriver: (driverId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-driver.json')
    }
  },
  deleteDriver: (driverId) => {
    return {
      ok: true
    }
  },
  searchDrivers: (query) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-drivers.json')
    }
  },

  updateDeviceDetail: (deviceDetail) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-devicedetail.json')
    }
  },
  getDeviceDetails: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-devicedetails.json')
    }
  },
  getDeviceDetail: (deviceDetailId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-devicedetail.json')
    }
  },
  deleteDeviceDetail: (deviceDetailId) => {
    return {
      ok: true
    }
  },
  searchDeviceDetails: (query) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-devicedetails.json')
    }
  },

  updateLocation: (location) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-location.json')
    }
  },
  getLocations: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-locations.json')
    }
  },
  getLocation: (locationId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-location.json')
    }
  },
  deleteLocation: (locationId) => {
    return {
      ok: true
    }
  },
  searchLocations: (query) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-locations.json')
    }
  },

  updateVehicle: (vehicle) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-vehicle.json')
    }
  },
  getVehicles: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-vehicles.json')
    }
  },
  getVehicle: (vehicleId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-vehicle.json')
    }
  },
  deleteVehicle: (vehicleId) => {
    return {
      ok: true
    }
  },
  searchVehicles: (query) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-vehicles.json')
    }
  },

  updateInsurance: (insurance) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-insurance.json')
    }
  },
  getInsurances: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-insurances.json')
    }
  },
  getInsurance: (insuranceId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-insurance.json')
    }
  },
  deleteInsurance: (insuranceId) => {
    return {
      ok: true
    }
  },
  searchInsurances: (query) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-insurances.json')
    }
  },

  updateService: (service) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-service.json')
    }
  },
  getServices: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-services.json')
    }
  },
  getService: (serviceId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-service.json')
    }
  },
  deleteService: (serviceId) => {
    return {
      ok: true
    }
  },
  searchServices: (query) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-services.json')
    }
  },

  updateBusiness: (business) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-business.json')
    }
  },
  getBusinesses: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-businesses.json')
    }
  },
  getBusiness: (businessId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-business.json')
    }
  },
  deleteBusiness: (businessId) => {
    return {
      ok: true
    }
  },
  searchBusinesses: (query) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-businesses.json')
    }
  },
  // ignite-jhipster-api-fixture-needle

  // user fixtures
  updateUser: (user) => {
    return {
      ok: true,
      data: require('../fixtures/update-user.json')
    }
  },
  getUsers: () => {
    return {
      ok: true,
      data: require('../fixtures/get-users.json')
    }
  },
  getUser: (userId) => {
    return {
      ok: true,
      data: require('../fixtures/get-user.json')
    }
  },
  deleteUser: (userId) => {
    return {
      ok: true
    }
  },
  // auth fixtures
  setAuthToken: () => {

  },
  removeAuthToken: () => {

  },
  login: (authObj) => {
    if (authObj.username === 'user' && authObj.password === 'user') {
      return {
        ok: true,
        data: require('../fixtures/login.json')
      }
    } else {
      return {
        ok: false,
        status: 400,
        data: 'Invalid credentials'
      }
    }
  },
  register: ({ user }) => {
    if (user === 'user') {
      return {
        ok: true
      }
    } else {
      return {
        ok: false,
        data: 'Invalid email'
      }
    }
  },
  forgotPassword: ({ email }) => {
    if (email === 'valid@gmail.com') {
      return {
        ok: true
      }
    } else {
      return {
        ok: false,
        data: 'Invalid email'
      }
    }
  },
  getAccount: () => {
    return {
      ok: true,
      status: 200,
      headers: {
        'content-type': 'application/json;charset=UTF-8'
      },
      data: require('../fixtures/get-account.json')
    }
  },
  updateAccount: () => {
    return {
      ok: true
    }
  },
  changePassword: ({ currentPassword }) => {
    if (currentPassword === 'valid-password') {
      return {
        ok: true
      }
    } else {
      return {
        ok: false,
        data: 'Password error'
      }
    }
  }
}
