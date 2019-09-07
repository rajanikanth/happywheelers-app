import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import BusinessActions from './business.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { businessEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './business-entity-edit-screen-style'

let Form = t.form.Form

class BusinessEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        name: t.String,
        type: t.String,
        address: t.String,
        phoneNumber: t.maybe(t.String)
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          name: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('type').refs.input.focus(),
            testID: 'nameInput'
          },
          type: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('address').refs.input.focus(),
            testID: 'typeInput'
          },
          address: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('phoneNumber').refs.input.focus(),
            testID: 'addressInput'
          },
          phoneNumber: {
            returnKeyType: 'done',
            onSubmitEditing: () => this.submitForm(),
            testID: 'phoneNumberInput'
          }
        }
      },
      success: false,
      business: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getBusiness(this.props.data.entityId)
    } else {
      this.setState({ formValue: { id: null } })
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.business && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.business)
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
        this.props.getAllBusinesses({ page: 0, sort: 'id,asc', size: 20 })
        const entityId = newProps.business.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: businessEntityDetailScreen.bind(this, { entityId })
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
      name: value.name || null,
      type: value.type || null,
      address: value.address || null,
      phoneNumber: value.phoneNumber || null
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      name: value.name || null,
      type: value.type || null,
      address: value.address || null,
      phoneNumber: value.phoneNumber || null
    }
    return entity
  }

  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const business = this.refs.form.getValue()
    if (business) { // if validation fails, value will be null
      this.props.updateBusiness(this.formValueToEntity(business))
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
    business: state.businesses.business,
    fetching: state.businesses.fetchingOne,
    updating: state.businesses.updating,
    error: state.businesses.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBusiness: (id) => dispatch(BusinessActions.businessRequest(id)),
    getAllBusinesses: (options) => dispatch(BusinessActions.businessAllRequest(options)),
    updateBusiness: (business) => dispatch(BusinessActions.businessUpdateRequest(business))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessEntityEditScreen)
