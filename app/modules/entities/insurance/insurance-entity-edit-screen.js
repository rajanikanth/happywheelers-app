import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import InsuranceActions from './insurance.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { insuranceEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './insurance-entity-edit-screen-style'

let Form = t.form.Form
const InsuranceType = t.enums({
  AUTO: 'AUTO',
  HOME: 'HOME'
})

class InsuranceEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        type: InsuranceType,
        insuranceProvider: t.String,
        insuranceExpDate: t.Date
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          type: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('insuranceProvider').refs.input.focus(),
            testID: 'typeInput'
          },
          insuranceProvider: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('insuranceExpDate').refs.input.focus(),
            testID: 'insuranceProviderInput'
          },
          insuranceExpDate: {
            returnKeyType: 'done',
            onSubmitEditing: () => this.submitForm(),
            testID: 'insuranceExpDateInput'
          }
        }
      },
      success: false,
      insurance: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getInsurance(this.props.data.entityId)
    } else {
      this.setState({ formValue: { id: null } })
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.insurance && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.insurance)
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
        this.props.getAllInsurances({ page: 0, sort: 'id,asc', size: 20 })
        const entityId = newProps.insurance.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: insuranceEntityDetailScreen.bind(this, { entityId })
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
      insuranceProvider: value.insuranceProvider || null,
      insuranceExpDate: value.insuranceExpDate || null
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      type: value.type || null,
      insuranceProvider: value.insuranceProvider || null,
      insuranceExpDate: value.insuranceExpDate || null
    }
    return entity
  }

  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const insurance = this.refs.form.getValue()
    if (insurance) { // if validation fails, value will be null
      this.props.updateInsurance(this.formValueToEntity(insurance))
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
    insurance: state.insurances.insurance,
    fetching: state.insurances.fetchingOne,
    updating: state.insurances.updating,
    error: state.insurances.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getInsurance: (id) => dispatch(InsuranceActions.insuranceRequest(id)),
    getAllInsurances: (options) => dispatch(InsuranceActions.insuranceAllRequest(options)),
    updateInsurance: (insurance) => dispatch(InsuranceActions.insuranceUpdateRequest(insurance))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InsuranceEntityEditScreen)
