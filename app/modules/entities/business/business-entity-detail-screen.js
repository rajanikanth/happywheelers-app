import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { businessEntityEditScreen } from '../../../navigation/layouts'

import BusinessActions from './business.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './business-entity-detail-screen-style'

class BusinessEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      business: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getBusiness(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.business) {
      this.setState({ business: newProps.business })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllBusinesses()
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
      'Delete Business?',
      'Are you sure you want to delete the Business?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteBusiness(this.props.data.entityId)
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
        <Text>ID: {this.state.business.id}</Text>
        <Text testID='name'>Name: {this.state.business.name}</Text>
        <Text testID='type'>Type: {this.state.business.type}</Text>
        <Text testID='address'>Address: {this.state.business.address}</Text>
        <Text testID='phoneNumber'>PhoneNumber: {this.state.business.phoneNumber}</Text>
        <RoundedButton text='Edit' onPress={businessEntityEditScreen.bind(this, { entityId: this.state.business.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    business: state.businesses.business,
    deleting: state.businesses.deleting,
    errorDeleting: state.businesses.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBusiness: (id) => dispatch(BusinessActions.businessRequest(id)),
    getAllBusinesses: (options) => dispatch(BusinessActions.businessAllRequest(options)),
    deleteBusiness: (id) => dispatch(BusinessActions.businessDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessEntityDetailScreen)
