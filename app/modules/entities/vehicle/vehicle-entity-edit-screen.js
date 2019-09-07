import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import VehicleActions from './vehicle.reducer'
import DriverActions from '../driver/driver.reducer'
import InsuranceActions from '../insurance/insurance.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { vehicleEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './vehicle-entity-edit-screen-style'

let Form = t.form.Form
const VehicleType = t.enums({
  SEDAN: 'SEDAN',
  SUV: 'SUV',
  PICKUP: 'PICKUP',
  VAN: 'VAN'
})

class VehicleEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        type: VehicleType,
        make: t.String,
        model: t.String,
        year: t.String,
        plateNumber: t.String,
        supportHeavyTransport: t.maybe(t.Boolean),
        vinNumber: t.maybe(t.String),
        registrationExpDate: t.Date,
        driverId: this.getDrivers(),
        insuranceId: this.getInsurances()
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
          insuranceId: {
            testID: 'insuranceIdInput',
            label: 'AutoInsurance'
          },
          type: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('make').refs.input.focus(),
            testID: 'typeInput'
          },
          make: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('model').refs.input.focus(),
            testID: 'makeInput'
          },
          model: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('year').refs.input.focus(),
            testID: 'modelInput'
          },
          year: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('plateNumber').refs.input.focus(),
            testID: 'yearInput'
          },
          plateNumber: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('supportHeavyTransport').refs.input.focus(),
            testID: 'plateNumberInput'
          },
          supportHeavyTransport: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('vinNumber').refs.input.focus(),
            testID: 'supportHeavyTransportInput'
          },
          vinNumber: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('registrationExpDate').refs.input.focus(),
            testID: 'vinNumberInput'
          },
          registrationExpDate: {
            testID: 'registrationExpDateInput'
          }
        }
      },
      success: false,
      vehicle: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getVehicle(this.props.data.entityId)
    } else {
      this.setState({ formValue: { id: null } })
    }
    this.props.getAllDrivers()
    this.props.getAllInsurances()
  }

  componentWillReceiveProps (newProps) {
    if (newProps.vehicle && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.vehicle)
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
        this.props.getAllVehicles({ page: 0, sort: 'id,asc', size: 20 })
        const entityId = newProps.vehicle.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: vehicleEntityDetailScreen.bind(this, { entityId })
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
      make: value.make || null,
      model: value.model || null,
      year: value.year || null,
      plateNumber: value.plateNumber || null,
      supportHeavyTransport: value.supportHeavyTransport || null,
      vinNumber: value.vinNumber || null,
      registrationExpDate: value.registrationExpDate || null,
      driverId: (value.driver && value.driver.id) ? value.driver.id : null,
      insuranceId: (value.insurance && value.insurance.id) ? value.insurance.id : null
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      type: value.type || null,
      make: value.make || null,
      model: value.model || null,
      year: value.year || null,
      plateNumber: value.plateNumber || null,
      supportHeavyTransport: value.supportHeavyTransport || null,
      vinNumber: value.vinNumber || null,
      registrationExpDate: value.registrationExpDate || null
    }
    if (value.driverId) {
      entity.driver = { id: value.driverId }
    }
    if (value.insuranceId) {
      entity.insurance = { id: value.insuranceId }
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
  getInsurances = () => {
    const insurances = {}
    this.props.insurances.forEach(insurance => {
      insurances[insurance.id] = insurance.id ? insurance.id.toString() : insurance.id.toString()
    })
    return t.maybe(t.enums(insurances))
  }
  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const vehicle = this.refs.form.getValue()
    if (vehicle) { // if validation fails, value will be null
      this.props.updateVehicle(this.formValueToEntity(vehicle))
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
    insurances: state.insurances.insurances || [],
    vehicle: state.vehicles.vehicle,
    fetching: state.vehicles.fetchingOne,
    updating: state.vehicles.updating,
    error: state.vehicles.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDrivers: (options) => dispatch(DriverActions.driverAllRequest(options)),
    getAllInsurances: (options) => dispatch(InsuranceActions.insuranceAllRequest(options)),
    getVehicle: (id) => dispatch(VehicleActions.vehicleRequest(id)),
    getAllVehicles: (options) => dispatch(VehicleActions.vehicleAllRequest(options)),
    updateVehicle: (vehicle) => dispatch(VehicleActions.vehicleUpdateRequest(vehicle))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VehicleEntityEditScreen)
