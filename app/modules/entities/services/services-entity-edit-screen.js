import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import ServiceActions from './services.reducer'
import DriverActions from '../driver/driver.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { serviceEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './services-entity-edit-screen-style'

let Form = t.form.Form
const ServiceType = t.enums({
  FoodDelivery: 'FoodDelivery',
  Errands: 'Errands',
  Airport: 'Airport',
  Hotel: 'Hotel',
  HeavyItems: 'HeavyItems'
})

class ServiceEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        type: t.maybe(ServiceType),
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
          type: {
            testID: 'typeInput'
          }
        }
      },
      success: false,
      service: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getService(this.props.data.entityId)
    } else {
      this.setState({ formValue: { id: null } })
    }
    this.props.getAllDrivers()
  }

  componentWillReceiveProps (newProps) {
    if (newProps.service && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.service)
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
        this.props.getAllServices({ page: 0, sort: 'id,asc', size: 20 })
        const entityId = newProps.service.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: serviceEntityDetailScreen.bind(this, { entityId })
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
      type: value.type || null,
      driverId: (value.driver && value.driver.id) ? value.driver.id : null
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      type: value.type || null
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
    const service = this.refs.form.getValue()
    if (service) { // if validation fails, value will be null
      this.props.updateService(this.formValueToEntity(service))
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
    service: state.services.service,
    fetching: state.services.fetchingOne,
    updating: state.services.updating,
    error: state.services.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDrivers: (options) => dispatch(DriverActions.driverAllRequest(options)),
    getService: (id) => dispatch(ServiceActions.serviceRequest(id)),
    getAllServices: (options) => dispatch(ServiceActions.serviceAllRequest(options)),
    updateService: (service) => dispatch(ServiceActions.serviceUpdateRequest(service))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceEntityEditScreen)
