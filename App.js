import React from 'react';
import { StyleSheet, KeyboardAvoidingView, TextInput, Button, Dimensions } from 'react-native';

const window = Dimensions.get('window');


export default class App extends React.Component {
  state = {
    name: '',
    birthday: '',
    phoneNumber: '',
    nameValid: false,
    birthdayValid: false,
    phoneNumberValid: false
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.birthday !== this.state.birthday){
      this.validateBirthday()
    }
  }

  submitForm = () => {

  }

  handleNameChange = name => this.setState({name}, this.validateName)
  handleBirthdayChange = birthday => this.setState({birthday})
  handlePhoneNumberChange = phoneNumber => this.setState({phoneNumber})

  validateName = () => {
    const {name} = this.state
    const wordsContainer = name.trim().split(' ')
    const wordsLength = wordsContainer.length
    this.setState({nameValid: wordsLength === 2})
  }

  validateBirthday = () => {
    const {birthday} = this.state
    const re = /(\d{2}\/){2}\d{2}/
    const found = birthday.match(re)
    console.log(found)
    this.setState({birthdayValid: !found ? false : true})
  }
  validatePhoneNumber = () => {
    const {phoneNumber} = this.state
    this.setState({phoneNumberValid: phoneNumber.length === 10 && phoneNumber === '9999999999'})
  }


  render() {
    const {nameValid, birthdayValid, phoneNumberValid} = this.state
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <TextInput
            style={[styles.input, (nameValid ? styles.validInput: {})]}
            value={this.state.name}
            onChangeText={this.handleNameChange}
            placeholder="Name"
        />
        <TextInput
            style={[styles.input, (birthdayValid ? styles.validInput: {})]}
            value={this.state.birthday}
            onChangeText={this.handleBirthdayChange}
            placeholder="Birthday"
        />
        <TextInput
            style={[styles.input, (phoneNumberValid ? styles.validInput: {})]}
            value={this.state.phoneNumber}
            onChangeText={this.handlePhoneNumberChange}
            onSubmitEditing={this.validatePhoneNumber}
            placeholder="Phone Number"
        />
        <Button
            disabled={nameValid && birthdayValid && phoneNumberValid}
            title='Submit'
            onPress={this.submitForm}
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    minWidth: 100,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 3,
    width: window.width - 30,
  },
  validInput: {
    backgroundColor: 'green',
    color: 'white'
  }
});
