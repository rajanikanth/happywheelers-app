import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { insuranceEntityEditScreen } from '../../../navigation/layouts'

import InsuranceActions from './insurance.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './insurance-entity-detail-screen-style'

class InsuranceEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      insurance: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getInsurance(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.insurance) {
      this.setState({ insurance: newProps.insurance })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllInsurances()
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
      'Delete Insurance?',
      'Are you sure you want to delete the Insurance?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteInsurance(this.props.data.entityId)
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
        <Text>ID: {this.state.insurance.id}</Text>
        <Text testID='type'>Type: {this.state.insurance.type}</Text>
        <Text testID='insuranceProvider'>InsuranceProvider: {this.state.insurance.insuranceProvider}</Text>
        <Text testID='insuranceExpDate'>InsuranceExpDate: {String(this.state.insurance.insuranceExpDate)}</Text>
        <RoundedButton text='Edit' onPress={insuranceEntityEditScreen.bind(this, { entityId: this.state.insurance.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    insurance: state.insurances.insurance,
    deleting: state.insurances.deleting,
    errorDeleting: state.insurances.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getInsurance: (id) => dispatch(InsuranceActions.insuranceRequest(id)),
    getAllInsurances: (options) => dispatch(InsuranceActions.insuranceAllRequest(options)),
    deleteInsurance: (id) => dispatch(InsuranceActions.insuranceDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InsuranceEntityDetailScreen)
