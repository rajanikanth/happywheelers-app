import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import LocationActions from './location.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { locationEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './location-entity-edit-screen-style'

let Form = t.form.Form

class LocationEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        addressLine1: t.String,
        addressLine2: t.maybe(t.String),
        city: t.String,
        state: t.String,
        zip: t.String,
        country: t.String,
        latitude: t.maybe(t.String),
        longitue: t.maybe(t.String)
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          addressLine1: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('addressLine2').refs.input.focus(),
            testID: 'addressLine1Input'
          },
          addressLine2: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('city').refs.input.focus(),
            testID: 'addressLine2Input'
          },
          city: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('state').refs.input.focus(),
            testID: 'cityInput'
          },
          state: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('zip').refs.input.focus(),
            testID: 'stateInput'
          },
          zip: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('country').refs.input.focus(),
            testID: 'zipInput'
          },
          country: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('latitude').refs.input.focus(),
            testID: 'countryInput'
          },
          latitude: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('longitue').refs.input.focus(),
            testID: 'latitudeInput'
          },
          longitue: {
            returnKeyType: 'done',
            onSubmitEditing: () => this.submitForm(),
            testID: 'longitueInput'
          }
        }
      },
      success: false,
      location: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getLocation(this.props.data.entityId)
    } else {
      this.setState({ formValue: { id: null } })
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.location && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.location)
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
        this.props.getAllLocations({ page: 0, sort: 'id,asc', size: 20 })
        const entityId = newProps.location.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: locationEntityDetailScreen.bind(this, { entityId })
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
      addressLine1: value.addressLine1 || null,
      addressLine2: value.addressLine2 || null,
      city: value.city || null,
      state: value.state || null,
      zip: value.zip || null,
      country: value.country || null,
      latitude: value.latitude || null,
      longitue: value.longitue || null
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      addressLine1: value.addressLine1 || null,
      addressLine2: value.addressLine2 || null,
      city: value.city || null,
      state: value.state || null,
      zip: value.zip || null,
      country: value.country || null,
      latitude: value.latitude || null,
      longitue: value.longitue || null
    }
    return entity
  }

  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const location = this.refs.form.getValue()
    if (location) { // if validation fails, value will be null
      this.props.updateLocation(this.formValueToEntity(location))
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
    location: state.locations.location,
    fetching: state.locations.fetchingOne,
    updating: state.locations.updating,
    error: state.locations.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getLocation: (id) => dispatch(LocationActions.locationRequest(id)),
    getAllLocations: (options) => dispatch(LocationActions.locationAllRequest(options)),
    updateLocation: (location) => dispatch(LocationActions.locationUpdateRequest(location))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationEntityEditScreen)
