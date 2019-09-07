import React from 'react'
import { ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
// Styles
/*eslint-disable */
import RoundedButton from '../../shared/components/rounded-button/rounded-button'
import {
  driverEntityScreen,
  deviceDetailEntityScreen,
  locationEntityScreen,
  vehicleEntityScreen,
  insuranceEntityScreen,
  serviceEntityScreen,
  businessEntityScreen,
  // ignite-jhipster-entity-screen-import-needle
} from '../../navigation/layouts'
/* eslint-enable */

import styles from './entities-screen.styles'

class EntitiesScreen extends React.Component {
  render () {
    return (
      <ScrollView style={styles.container}>
        <Text style={{ textAlign: 'center' }}>JHipster Entities will appear below</Text>
        <RoundedButton text='Driver' onPress={driverEntityScreen} testID='driverEntityScreenButton' />
        <RoundedButton text='DeviceDetail' onPress={deviceDetailEntityScreen} testID='deviceDetailEntityScreenButton' />
        <RoundedButton text='Location' onPress={locationEntityScreen} testID='locationEntityScreenButton' />
        <RoundedButton text='Vehicle' onPress={vehicleEntityScreen} testID='vehicleEntityScreenButton' />
        <RoundedButton text='Insurance' onPress={insuranceEntityScreen} testID='insuranceEntityScreenButton' />
        <RoundedButton text='Service' onPress={serviceEntityScreen} testID='serviceEntityScreenButton' />
        <RoundedButton text='Business' onPress={businessEntityScreen} testID='businessEntityScreenButton' />
        {/* ignite-jhipster-entity-screen-needle */}
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // for developer convenience
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // for developer convenience
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntitiesScreen)
