import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import DriverActions from './driver.reducer'
import LocationActions from '../location/location.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { driverEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './driver-entity-edit-screen-style'

let Form = t.form.Form
const Status = t.enums({
  INVITED: 'INVITED',
  CONFIRMED: 'CONFIRMED',
  DENIED: 'DENIED'
})
const PhoneType = t.enums({
  IPHONE: 'IPHONE',
  ANDROID: 'ANDROID'
})

class DriverEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        firstName: t.maybe(t.String),
        lastName: t.maybe(t.String),
        email: t.maybe(t.String),
        password: t.maybe(t.String),
        phoneNumber: t.String,
        status: t.maybe(Status),
        oneTimeCode: t.maybe(t.String),
        oneTimeExpirationTime: t.maybe(t.Date),
        driverLicense: t.maybe(t.String),
        phoneType: t.maybe(PhoneType),
        duiConviction: t.maybe(t.Boolean),
        felonyConviction: t.maybe(t.Boolean),
        locationId: this.getLocations()
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          locationId: {
            testID: 'locationIdInput',
            label: 'Location'
          },
          firstName: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('lastName').refs.input.focus(),
            testID: 'firstNameInput'
          },
          lastName: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('email').refs.input.focus(),
            testID: 'lastNameInput'
          },
          email: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('password').refs.input.focus(),
            testID: 'emailInput'
          },
          password: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('phoneNumber').refs.input.focus(),
            testID: 'passwordInput'
          },
          phoneNumber: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('status').refs.input.focus(),
            testID: 'phoneNumberInput'
          },
          status: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('oneTimeCode').refs.input.focus(),
            testID: 'statusInput'
          },
          oneTimeCode: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('oneTimeExpirationTime').refs.input.focus(),
            testID: 'oneTimeCodeInput'
          },
          oneTimeExpirationTime: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('driverLicense').refs.input.focus(),
            testID: 'oneTimeExpirationTimeInput'
          },
          driverLicense: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('phoneType').refs.input.focus(),
            testID: 'driverLicenseInput'
          },
          phoneType: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('duiConviction').refs.input.focus(),
            testID: 'phoneTypeInput'
          },
          duiConviction: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('felonyConviction').refs.input.focus(),
            testID: 'duiConvictionInput'
          },
          felonyConviction: {
            testID: 'felonyConvictionInput'
          }
        }
      },
      success: false,
      driver: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getDriver(this.props.data.entityId)
    } else {
      this.setState({ formValue: { id: null } })
    }
    this.props.getAllLocations()
  }

  componentWillReceiveProps (newProps) {
    if (newProps.driver && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.driver)
      })
    }

    // Did the update attempt complete?
    if (!newProps.updating && this.state.requesting) {
      if (newProps.error) {
        Alert.alert('Error', 'Something went wrong updating the entity', [{ text: 'OK' }])
        this.setState({
          success: false,
          requesting: false
        })
      } else {
        this.props.getAllDrivers({ page: 0, sort: 'id,asc', size: 20 })
        const entityId = newProps.driver.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: driverEntityDetailScreen.bind(this, { entityId })
          })
        }
        this.setState({
          success: true,
          requesting: false,
          formValue: { id: null }
        })
        Navigation.pop(this.props.componentId)
        Alert.alert('Success', 'Entity saved successfully', alertOptions)
      }
    }
  }

  // convenience methods for customizing the mapping of the entity to/from the form value
  entityToFormValue = (value) => {
    if (!value) {
      return {}
    }
    return {
      id: value.id || null,
      firstName: value.firstName || null,
      lastName: value.lastName || null,
      email: value.email || null,
      password: value.password || null,
      phoneNumber: value.phoneNumber || null,
      status: value.status || null,
      oneTimeCode: value.oneTimeCode || null,
      oneTimeExpirationTime: value.oneTimeExpirationTime || null,
      driverLicense: value.driverLicense || null,
      phoneType: value.phoneType || null,
      duiConviction: value.duiConviction || null,
      felonyConviction: value.felonyConviction || null,
      locationId: (value.location && value.location.id) ? value.location.id : null
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      firstName: value.firstName || null,
      lastName: value.lastName || null,
      email: value.email || null,
      password: value.password || null,
      phoneNumber: value.phoneNumber || null,
      status: value.status || null,
      oneTimeCode: value.oneTimeCode || null,
      oneTimeExpirationTime: value.oneTimeExpirationTime || null,
      driverLicense: value.driverLicense || null,
      phoneType: value.phoneType || null,
      duiConviction: value.duiConviction || null,
      felonyConviction: value.felonyConviction || null
    }
    if (value.locationId) {
      entity.location = { id: value.locationId }
    }
    return entity
  }

  getLocations = () => {
    const locations = {}
    this.props.locations.forEach(location => {
      locations[location.id] = location.id ? location.id.toString() : location.id.toString()
    })
    return t.maybe(t.enums(locations))
  }
  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const driver = this.refs.form.getValue()
    if (driver) { // if validation fails, value will be null
      this.props.updateDriver(this.formValueToEntity(driver))
    }
  }

  formChange (newValue) {
    this.setState({
      formValue: newValue
    })
  }

  render () {
    return (
      <KeyboardAwareScrollView>
        <ScrollView style={styles.container} testID='entityScrollView'>
          <Form
            ref='form'
            type={this.state.formModel}
            options={this.state.formOptions}
            value={this.state.formValue}
            onChange={this.formChange}
          />
          <TouchableHighlight style={styles.button} onPress={this.submitForm} underlayColor='#99d9f4' testID='submitButton'>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>
        </ScrollView>
      </KeyboardAwareScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    locations: state.locations.locations || [],
    driver: state.drivers.driver,
    fetching: state.drivers.fetchingOne,
    updating: state.drivers.updating,
    error: state.drivers.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllLocations: (options) => dispatch(LocationActions.locationAllRequest(options)),
    getDriver: (id) => dispatch(DriverActions.driverRequest(id)),
    getAllDrivers: (options) => dispatch(DriverActions.driverAllRequest(options)),
    updateDriver: (driver) => dispatch(DriverActions.driverUpdateRequest(driver))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DriverEntityEditScreen)
