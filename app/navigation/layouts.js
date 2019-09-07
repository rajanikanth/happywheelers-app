import { AppState, Linking } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import { Images } from '../shared/themes'

import createStore from '../shared/reducers'
import Colors from '../shared/themes/colors'
import '../config/reactotron-config'
import AccountActions from '../shared/reducers/account.reducer'

import LoginScreen from '../modules/login/login-screen'
import LaunchScreen from '../modules/home/launch-screen'
import DrawerContent from './drawer/drawer-content'
import SettingsScreen from '../modules/account/settings/settings-screen'
import RegisterScreen from '../modules/account/register/register-screen'
import ForgotPasswordScreen from '../modules/account/password-reset/forgot-password-screen'
import ChangePasswordScreen from '../modules/account/password/change-password-screen'
import EntitiesScreen from '../modules/entities/entities-screen'
import StorybookScreen from '../../storybook'
import ChatScreen from '../modules/chat/chat-screen'
import DriverEntityScreen from '../modules/entities/driver/driver-entity-screen'
import DriverEntityDetailScreen from '../modules/entities/driver/driver-entity-detail-screen'
import DriverEntityEditScreen from '../modules/entities/driver/driver-entity-edit-screen'
import DeviceDetailEntityScreen from '../modules/entities/device-details/device-details-entity-screen'
import DeviceDetailEntityDetailScreen from '../modules/entities/device-details/device-details-entity-detail-screen'
import DeviceDetailEntityEditScreen from '../modules/entities/device-details/device-details-entity-edit-screen'
import LocationEntityScreen from '../modules/entities/location/location-entity-screen'
import LocationEntityDetailScreen from '../modules/entities/location/location-entity-detail-screen'
import LocationEntityEditScreen from '../modules/entities/location/location-entity-edit-screen'
import VehicleEntityScreen from '../modules/entities/vehicle/vehicle-entity-screen'
import VehicleEntityDetailScreen from '../modules/entities/vehicle/vehicle-entity-detail-screen'
import VehicleEntityEditScreen from '../modules/entities/vehicle/vehicle-entity-edit-screen'
import InsuranceEntityScreen from '../modules/entities/insurance/insurance-entity-screen'
import InsuranceEntityDetailScreen from '../modules/entities/insurance/insurance-entity-detail-screen'
import InsuranceEntityEditScreen from '../modules/entities/insurance/insurance-entity-edit-screen'
import ServiceEntityScreen from '../modules/entities/services/services-entity-screen'
import ServiceEntityDetailScreen from '../modules/entities/services/services-entity-detail-screen'
import ServiceEntityEditScreen from '../modules/entities/services/services-entity-edit-screen'
import BusinessEntityScreen from '../modules/entities/business/business-entity-screen'
import BusinessEntityDetailScreen from '../modules/entities/business/business-entity-detail-screen'
import BusinessEntityEditScreen from '../modules/entities/business/business-entity-edit-screen'
// ignite-jhipster-navigation-import-needle

export const LOGIN_SCREEN = 'nav.LoginScreen'
export const REGISTER_SCREEN = 'nav.RegisterScreen'
export const FORGOT_PASSWORD_SCREEN = 'nav.ForgotPasswordScreen'
export const CHANGE_PASSWORD_SCREEN = 'nav.ChangePasswordScreen'
export const SETTINGS_SCREEN = 'nav.SettingsScreen'
export const LAUNCH_SCREEN = 'nav.LaunchScreen'
export const DRAWER_CONTENT = 'nav.DrawerContent'
export const ENTITIES_SCREEN = 'nav.EntitiesScreen'
export const STORYBOOK_SCREEN = 'nav.StorybookScreen'
export const CHAT_SCREEN = 'nav.ChatScreen'
export const DRIVER_ENTITY_SCREEN = 'nav.DriverEntityScreen'
export const DRIVER_ENTITY_DETAIL_SCREEN = 'nav.DriverEntityDetailScreen'
export const DRIVER_ENTITY_EDIT_SCREEN = 'nav.DriverEntityEditScreen'
export const DEVICE_DETAIL_ENTITY_SCREEN = 'nav.DeviceDetailEntityScreen'
export const DEVICE_DETAIL_ENTITY_DETAIL_SCREEN = 'nav.DeviceDetailEntityDetailScreen'
export const DEVICE_DETAIL_ENTITY_EDIT_SCREEN = 'nav.DeviceDetailEntityEditScreen'
export const LOCATION_ENTITY_SCREEN = 'nav.LocationEntityScreen'
export const LOCATION_ENTITY_DETAIL_SCREEN = 'nav.LocationEntityDetailScreen'
export const LOCATION_ENTITY_EDIT_SCREEN = 'nav.LocationEntityEditScreen'
export const VEHICLE_ENTITY_SCREEN = 'nav.VehicleEntityScreen'
export const VEHICLE_ENTITY_DETAIL_SCREEN = 'nav.VehicleEntityDetailScreen'
export const VEHICLE_ENTITY_EDIT_SCREEN = 'nav.VehicleEntityEditScreen'
export const INSURANCE_ENTITY_SCREEN = 'nav.InsuranceEntityScreen'
export const INSURANCE_ENTITY_DETAIL_SCREEN = 'nav.InsuranceEntityDetailScreen'
export const INSURANCE_ENTITY_EDIT_SCREEN = 'nav.InsuranceEntityEditScreen'
export const SERVICE_ENTITY_SCREEN = 'nav.ServiceEntityScreen'
export const SERVICE_ENTITY_DETAIL_SCREEN = 'nav.ServiceEntityDetailScreen'
export const SERVICE_ENTITY_EDIT_SCREEN = 'nav.ServiceEntityEditScreen'
export const BUSINESS_ENTITY_SCREEN = 'nav.BusinessEntityScreen'
export const BUSINESS_ENTITY_DETAIL_SCREEN = 'nav.BusinessEntityDetailScreen'
export const BUSINESS_ENTITY_EDIT_SCREEN = 'nav.BusinessEntityEditScreen'
// ignite-jhipster-navigation-declaration-needle

const store = createStore()

export const appStack = {
  root: {
    sideMenu: {
      left: {
        component: {
          name: DRAWER_CONTENT
        }
      },
      center: {
        stack: {
          id: 'center',
          children: [{
            component: {
              name: LAUNCH_SCREEN,
              options: {
                topBar: {
                  title: {
                    text: 'Welcome!',
                    color: Colors.snow
                  },
                  leftButtons: [
                    {
                      id: 'menuButton',
                      icon: Images.menuIcon,
                      testID: 'menuButton',
                      color: Colors.snow
                    }
                  ]
                }
              }
            }
          }]
        }
      }
    }
  }
}

let lastAppState = 'active'
function handleAppStateChange (nextAppState) {
  if (lastAppState.match(/inactive|background/) && nextAppState === 'active') {
    refreshAccount(store)
  }
  lastAppState = nextAppState
}

function refreshAccount () {
  store.dispatch(AccountActions.accountRequest())
}
// for deep linking
function handleOpenURL (event) {
  console.tron.log(event.url)
  let splitUrl = event.url.split('/') // ['https:', '', 'domain', 'route', 'params']
  let importantParameters = splitUrl.splice(3) // ['route', 'params']
  if (importantParameters.length === 0) {
    console.tron.log('Sending to home page')
    return null
  }
  if (importantParameters.length === 1) {
    switch (importantParameters[0]) {
      case 'register':
        console.tron.log(`Sending to Register Page`)
        registerScreen()
        break
      default:
        console.tron.warn(`Unhandled deep link: ${event.url}`)
      // default code block
    }
  }
}

export function registerScreensAndStartApp () {
  Navigation.registerComponentWithRedux(LOGIN_SCREEN, () => LoginScreen, Provider, store)
  Navigation.registerComponentWithRedux(REGISTER_SCREEN, () => RegisterScreen, Provider, store)
  Navigation.registerComponentWithRedux(FORGOT_PASSWORD_SCREEN, () => ForgotPasswordScreen, Provider, store)
  Navigation.registerComponentWithRedux(CHANGE_PASSWORD_SCREEN, () => ChangePasswordScreen, Provider, store)
  Navigation.registerComponentWithRedux(SETTINGS_SCREEN, () => SettingsScreen, Provider, store)
  Navigation.registerComponentWithRedux(DRAWER_CONTENT, () => DrawerContent, Provider, store)
  Navigation.registerComponentWithRedux(LAUNCH_SCREEN, () => LaunchScreen, Provider, store)
  Navigation.registerComponentWithRedux(ENTITIES_SCREEN, () => EntitiesScreen, Provider, store)
  Navigation.registerComponent(STORYBOOK_SCREEN, () => StorybookScreen)
  Navigation.registerComponentWithRedux(CHAT_SCREEN, () => ChatScreen, Provider, store)
  Navigation.registerComponentWithRedux(DRIVER_ENTITY_SCREEN, () => DriverEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(DRIVER_ENTITY_DETAIL_SCREEN, () => DriverEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(DRIVER_ENTITY_EDIT_SCREEN, () => DriverEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(DEVICE_DETAIL_ENTITY_SCREEN, () => DeviceDetailEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(DEVICE_DETAIL_ENTITY_DETAIL_SCREEN, () => DeviceDetailEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(DEVICE_DETAIL_ENTITY_EDIT_SCREEN, () => DeviceDetailEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(LOCATION_ENTITY_SCREEN, () => LocationEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(LOCATION_ENTITY_DETAIL_SCREEN, () => LocationEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(LOCATION_ENTITY_EDIT_SCREEN, () => LocationEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(VEHICLE_ENTITY_SCREEN, () => VehicleEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(VEHICLE_ENTITY_DETAIL_SCREEN, () => VehicleEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(VEHICLE_ENTITY_EDIT_SCREEN, () => VehicleEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(INSURANCE_ENTITY_SCREEN, () => InsuranceEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(INSURANCE_ENTITY_DETAIL_SCREEN, () => InsuranceEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(INSURANCE_ENTITY_EDIT_SCREEN, () => InsuranceEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(SERVICE_ENTITY_SCREEN, () => ServiceEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(SERVICE_ENTITY_DETAIL_SCREEN, () => ServiceEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(SERVICE_ENTITY_EDIT_SCREEN, () => ServiceEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(BUSINESS_ENTITY_SCREEN, () => BusinessEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(BUSINESS_ENTITY_DETAIL_SCREEN, () => BusinessEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(BUSINESS_ENTITY_EDIT_SCREEN, () => BusinessEntityEditScreen, Provider, store)
  // ignite-jhipster-navigation-registration-needle

  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setDefaultOptions({
      topBar: {
        topBar: {
          title: {
            color: Colors.snow
          }
        },
        backButton: {
          showTitle: false,
          testID: 'backButton',
          icon: Images.chevronLeftIcon,
          color: Colors.snow,
          iconColor: Colors.snow
        },
        background: {
          color: Colors.background
        }
      },
      sideMenu: {
        left: {
          enabled: false
        }
      }
    })

    Navigation.setRoot(appStack)

    // handle app state and deep links
    AppState.addEventListener('change', handleAppStateChange)
    Linking.addEventListener('url', handleOpenURL)
  })
}

export const loginScreen = () => Navigation.showModal({
  stack: {
    children: [{
      component: {
        name: LOGIN_SCREEN,
        options: {
          topBar: {
            visible: false,
            drawBehind: true
          }
        }
      }
    }]
  }
})

export const registerScreen = () => Navigation.push('center', {
  component: {
    name: REGISTER_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Sign Up',
          color: Colors.snow
        }
      }
    }
  }
})

export const forgotPasswordScreen = () => Navigation.push('center', {
  component: {
    name: FORGOT_PASSWORD_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Forgot Password',
          color: Colors.snow
        }
      }
    }
  }
})
export const changePasswordScreen = () => Navigation.push('center', {
  component: {
    name: CHANGE_PASSWORD_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Change Password',
          color: Colors.snow
        }
      }
    }
  }
})
export const settingsScreen = () => Navigation.push('center', {
  component: {
    name: SETTINGS_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Settings',
          color: Colors.snow
        }
      }
    }
  }
})

export const entitiesScreen = () => Navigation.push('center', {
  component: {
    name: ENTITIES_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Entities',
          color: Colors.snow
        }
      }
    }
  }
})
export const storybookScreen = () => {
  Navigation.push('center', {
    component: {
      name: STORYBOOK_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'Storybook',
            color: Colors.snow
          }
        }
      }
    }
  })
}
export const chatScreen = () => Navigation.push('center', {
  component: {
    name: CHAT_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Chat',
          color: Colors.snow
        }
      }
    }
  }
})

export const driverEntityScreen = () => Navigation.push('center', {
  component: {
    name: DRIVER_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Drivers',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Create',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const driverEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: DRIVER_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Drivers',
          color: Colors.snow
        }
      }
    }
  }
})

export const driverEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: DRIVER_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Drivers',
          color: Colors.snow
        }
      }
    }
  }
})

export const deviceDetailEntityScreen = () => Navigation.push('center', {
  component: {
    name: DEVICE_DETAIL_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'DeviceDetails',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Create',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const deviceDetailEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: DEVICE_DETAIL_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'DeviceDetails',
          color: Colors.snow
        }
      }
    }
  }
})

export const deviceDetailEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: DEVICE_DETAIL_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'DeviceDetails',
          color: Colors.snow
        }
      }
    }
  }
})

export const locationEntityScreen = () => Navigation.push('center', {
  component: {
    name: LOCATION_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Locations',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Create',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const locationEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: LOCATION_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Locations',
          color: Colors.snow
        }
      }
    }
  }
})

export const locationEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: LOCATION_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Locations',
          color: Colors.snow
        }
      }
    }
  }
})

export const vehicleEntityScreen = () => Navigation.push('center', {
  component: {
    name: VEHICLE_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Vehicles',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Create',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const vehicleEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: VEHICLE_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Vehicles',
          color: Colors.snow
        }
      }
    }
  }
})

export const vehicleEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: VEHICLE_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Vehicles',
          color: Colors.snow
        }
      }
    }
  }
})

export const insuranceEntityScreen = () => Navigation.push('center', {
  component: {
    name: INSURANCE_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Insurances',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Create',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const insuranceEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: INSURANCE_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Insurances',
          color: Colors.snow
        }
      }
    }
  }
})

export const insuranceEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: INSURANCE_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Insurances',
          color: Colors.snow
        }
      }
    }
  }
})

export const serviceEntityScreen = () => Navigation.push('center', {
  component: {
    name: SERVICE_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Services',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Create',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const serviceEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: SERVICE_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Services',
          color: Colors.snow
        }
      }
    }
  }
})

export const serviceEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: SERVICE_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Services',
          color: Colors.snow
        }
      }
    }
  }
})

export const businessEntityScreen = () => Navigation.push('center', {
  component: {
    name: BUSINESS_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Businesses',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Create',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const businessEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: BUSINESS_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Businesses',
          color: Colors.snow
        }
      }
    }
  }
})

export const businessEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: BUSINESS_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Businesses',
          color: Colors.snow
        }
      }
    }
  }
})
// ignite-jhipster-navigation-method-needle
