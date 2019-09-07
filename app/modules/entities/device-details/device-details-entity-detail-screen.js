import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { deviceDetailEntityEditScreen } from '../../../navigation/layouts'

import DeviceDetailActions from './device-details.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './device-details-entity-detail-screen-style'

class DeviceDetailEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      deviceDetail: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getDeviceDetail(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.deviceDetail) {
      this.setState({ deviceDetail: newProps.deviceDetail })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllDeviceDetails()
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
      'Delete DeviceDetail?',
      'Are you sure you want to delete the DeviceDetail?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteDeviceDetail(this.props.data.entityId)
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
        <Text>ID: {this.state.deviceDetail.id}</Text>
        <Text testID='deviceId'>DeviceId: {this.state.deviceDetail.deviceId}</Text>
        <RoundedButton text='Edit' onPress={deviceDetailEntityEditScreen.bind(this, { entityId: this.state.deviceDetail.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    deviceDetail: state.deviceDetails.deviceDetail,
    deleting: state.deviceDetails.deleting,
    errorDeleting: state.deviceDetails.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDeviceDetail: (id) => dispatch(DeviceDetailActions.deviceDetailRequest(id)),
    getAllDeviceDetails: (options) => dispatch(DeviceDetailActions.deviceDetailAllRequest(options)),
    deleteDeviceDetail: (id) => dispatch(DeviceDetailActions.deviceDetailDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceDetailEntityDetailScreen)
