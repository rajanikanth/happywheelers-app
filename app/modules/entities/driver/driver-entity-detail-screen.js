import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { driverEntityEditScreen } from '../../../navigation/layouts'

import DriverActions from './driver.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './driver-entity-detail-screen-style'

class DriverEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      driver: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getDriver(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.driver) {
      this.setState({ driver: newProps.driver })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllDrivers()
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
      'Delete Driver?',
      'Are you sure you want to delete the Driver?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteDriver(this.props.data.entityId)
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
        <Text>ID: {this.state.driver.id}</Text>
        <Text testID='firstName'>FirstName: {this.state.driver.firstName}</Text>
        <Text testID='lastName'>LastName: {this.state.driver.lastName}</Text>
        <Text testID='email'>Email: {this.state.driver.email}</Text>
        <Text testID='password'>Password: {this.state.driver.password}</Text>
        <Text testID='phoneNumber'>PhoneNumber: {this.state.driver.phoneNumber}</Text>
        <Text testID='status'>Status: {this.state.driver.status}</Text>
        <Text testID='oneTimeCode'>OneTimeCode: {this.state.driver.oneTimeCode}</Text>
        <Text testID='oneTimeExpirationTime'>OneTimeExpirationTime: {String(this.state.driver.oneTimeExpirationTime)}</Text>
        <Text testID='driverLicense'>DriverLicense: {this.state.driver.driverLicense}</Text>
        <Text testID='phoneType'>PhoneType: {this.state.driver.phoneType}</Text>
        <Text testID='duiConviction'>DuiConviction: {this.state.driver.duiConviction}</Text>
        <Text testID='felonyConviction'>FelonyConviction: {this.state.driver.felonyConviction}</Text>
        <RoundedButton text='Edit' onPress={driverEntityEditScreen.bind(this, { entityId: this.state.driver.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    driver: state.drivers.driver,
    deleting: state.drivers.deleting,
    errorDeleting: state.drivers.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDriver: (id) => dispatch(DriverActions.driverRequest(id)),
    getAllDrivers: (options) => dispatch(DriverActions.driverAllRequest(options)),
    deleteDriver: (id) => dispatch(DriverActions.driverDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DriverEntityDetailScreen)
