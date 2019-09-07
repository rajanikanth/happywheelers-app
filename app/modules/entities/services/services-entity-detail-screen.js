import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { serviceEntityEditScreen } from '../../../navigation/layouts'

import ServiceActions from './services.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './services-entity-detail-screen-style'

class ServiceEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      service: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getService(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.service) {
      this.setState({ service: newProps.service })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllServices()
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
      'Delete Service?',
      'Are you sure you want to delete the Service?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteService(this.props.data.entityId)
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
        <Text>ID: {this.state.service.id}</Text>
        <Text testID='type'>Type: {this.state.service.type}</Text>
        <RoundedButton text='Edit' onPress={serviceEntityEditScreen.bind(this, { entityId: this.state.service.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    service: state.services.service,
    deleting: state.services.deleting,
    errorDeleting: state.services.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getService: (id) => dispatch(ServiceActions.serviceRequest(id)),
    getAllServices: (options) => dispatch(ServiceActions.serviceAllRequest(options)),
    deleteService: (id) => dispatch(ServiceActions.serviceDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceEntityDetailScreen)
