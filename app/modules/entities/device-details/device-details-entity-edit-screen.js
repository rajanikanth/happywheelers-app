import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import DeviceDetailActions from './device-details.reducer'
import DriverActions from '../driver/driver.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { deviceDetailEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './device-details-entity-edit-screen-style'

let Form = t.form.Form

class DeviceDetailEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        deviceId: t.String,
        driverId: this.getDrivers()
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          driverId: {
            testID: 'driverIdInput',
            label: 'Driver'
          },
          deviceId: {
            testID: 'deviceIdInput'
          }
        }
      },
      success: false,
      deviceDetail: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getDeviceDetail(this.props.data.entityId)
    } else {
      this.setState({ formValue: { id: null } })
    }
    this.props.getAllDrivers()
  }

  componentWillReceiveProps (newProps) {
    if (newProps.deviceDetail && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.deviceDetail)
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
        this.props.getAllDeviceDetails({ page: 0, sort: 'id,asc', size: 20 })
        const entityId = newProps.deviceDetail.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: deviceDetailEntityDetailScreen.bind(this, { entityId })
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
      deviceId: value.deviceId || null,
      driverId: (value.driver && value.driver.id) ? value.driver.id : null
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      deviceId: value.deviceId || null
    }
    if (value.driverId) {
      entity.driver = { id: value.driverId }
    }
    return entity
  }

  getDrivers = () => {
    const drivers = {}
    this.props.drivers.forEach(driver => {
      drivers[driver.id] = driver.id ? driver.id.toString() : driver.id.toString()
    })
    return t.maybe(t.enums(drivers))
  }
  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const deviceDetail = this.refs.form.getValue()
    if (deviceDetail) { // if validation fails, value will be null
      this.props.updateDeviceDetail(this.formValueToEntity(deviceDetail))
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
    drivers: state.drivers.drivers || [],
    deviceDetail: state.deviceDetails.deviceDetail,
    fetching: state.deviceDetails.fetchingOne,
    updating: state.deviceDetails.updating,
    error: state.deviceDetails.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDrivers: (options) => dispatch(DriverActions.driverAllRequest(options)),
    getDeviceDetail: (id) => dispatch(DeviceDetailActions.deviceDetailRequest(id)),
    getAllDeviceDetails: (options) => dispatch(DeviceDetailActions.deviceDetailAllRequest(options)),
    updateDeviceDetail: (deviceDetail) => dispatch(DeviceDetailActions.deviceDetailUpdateRequest(deviceDetail))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceDetailEntityEditScreen)
