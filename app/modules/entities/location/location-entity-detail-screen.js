import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { locationEntityEditScreen } from '../../../navigation/layouts'

import LocationActions from './location.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './location-entity-detail-screen-style'

class LocationEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      location: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getLocation(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.location) {
      this.setState({ location: newProps.location })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllLocations()
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
      'Delete Location?',
      'Are you sure you want to delete the Location?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteLocation(this.props.data.entityId)
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
        <Text>ID: {this.state.location.id}</Text>
        <Text testID='addressLine1'>AddressLine1: {this.state.location.addressLine1}</Text>
        <Text testID='addressLine2'>AddressLine2: {this.state.location.addressLine2}</Text>
        <Text testID='city'>City: {this.state.location.city}</Text>
        <Text testID='state'>State: {this.state.location.state}</Text>
        <Text testID='zip'>Zip: {this.state.location.zip}</Text>
        <Text testID='country'>Country: {this.state.location.country}</Text>
        <Text testID='latitude'>Latitude: {this.state.location.latitude}</Text>
        <Text testID='longitue'>Longitue: {this.state.location.longitue}</Text>
        <RoundedButton text='Edit' onPress={locationEntityEditScreen.bind(this, { entityId: this.state.location.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    location: state.locations.location,
    deleting: state.locations.deleting,
    errorDeleting: state.locations.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getLocation: (id) => dispatch(LocationActions.locationRequest(id)),
    getAllLocations: (options) => dispatch(LocationActions.locationAllRequest(options)),
    deleteLocation: (id) => dispatch(LocationActions.locationDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationEntityDetailScreen)
