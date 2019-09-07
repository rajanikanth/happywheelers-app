import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { vehicleEntityEditScreen } from '../../../navigation/layouts'

import VehicleActions from './vehicle.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './vehicle-entity-detail-screen-style'

class VehicleEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      vehicle: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getVehicle(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.vehicle) {
      this.setState({ vehicle: newProps.vehicle })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllVehicles()
        Navigation.pop(this.props.componentId)
      } else {
        Alert.alert('Error', 'Something went wrong deleting the entity', [{ text: 'OK' }])
        this.setState({
          success: false,
          requesting: false
        })
      }
    }
  }

  confirmDelete = () => {
    Alert.alert(
      'Delete Vehicle?',
      'Are you sure you want to delete the Vehicle?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteVehicle(this.props.data.entityId)
            })
          }
        }
      ],
      { cancelable: false }
    )
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Text>ID: {this.state.vehicle.id}</Text>
        <Text testID='type'>Type: {this.state.vehicle.type}</Text>
        <Text testID='make'>Make: {this.state.vehicle.make}</Text>
        <Text testID='model'>Model: {this.state.vehicle.model}</Text>
        <Text testID='year'>Year: {this.state.vehicle.year}</Text>
        <Text testID='plateNumber'>PlateNumber: {this.state.vehicle.plateNumber}</Text>
        <Text testID='supportHeavyTransport'>SupportHeavyTransport: {this.state.vehicle.supportHeavyTransport}</Text>
        <Text testID='vinNumber'>VinNumber: {this.state.vehicle.vinNumber}</Text>
        <Text testID='registrationExpDate'>RegistrationExpDate: {String(this.state.vehicle.registrationExpDate)}</Text>
        <RoundedButton text='Edit' onPress={vehicleEntityEditScreen.bind(this, { entityId: this.state.vehicle.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    vehicle: state.vehicles.vehicle,
    deleting: state.vehicles.deleting,
    errorDeleting: state.vehicles.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getVehicle: (id) => dispatch(VehicleActions.vehicleRequest(id)),
    getAllVehicles: (options) => dispatch(VehicleActions.vehicleAllRequest(options)),
    deleteVehicle: (id) => dispatch(VehicleActions.vehicleDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VehicleEntityDetailScreen)
