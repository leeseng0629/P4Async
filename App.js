/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  AsyncStorage,
} from 'react-native';
import {
  InputWithLabel,
  PickerWithLabel,
} from './UI';

let common = require('./CommonData.js')

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      emailAdd: '',
      gender: 'M',
      eduLevel: 'HS',
      promotions: 'N',
    };
  }

  componentDidMount() {
    this.readData();
  }

  async readData() {
    newStates = {};

    try {
      let keys = await AsyncStorage.multiGet([
        'name', 'emailAdd', 'gender', 'eduLevel', 'promotions'
      ], (err, stores) => {
        stores.map((result, i, store) => {
          let key = store[i][0];
          let value = store[i][1];

          newStates[key] = value;
        });
        this.setState(newStates)
      });
    } catch (error) {
      console.log(' ## Error Reading Items ##: ', error);
    }
  }

  async saveData(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log(' ## Error Saving Item ##: ', error);
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>

        <InputWithLabel
          style={styles.input}
          orientation={'horizontal'}
          label={'Name'}
          placeholder={'Enter your name'}
          value={this.state.name}
          onChangeText={(name) => {
            this.setState({name});
            this.saveData('name', name);
          }}
        />

        <InputWithLabel
          style={styles.input}
          orientation={'horizontal'}
          label={'Email'}
          placeholder={'Enter your email'}
          keyboardType={'email-address'}
          value={this.state.emailAdd}
          onChangeText={(emailAdd) => {
            this.setState({emailAdd});
            this.saveData('emailAdd', emailAdd);
          }}
        />

        <PickerWithLabel
          style={styles.picker}
          label={'Gender'}
          value={this.state.gender}
          items={common.genders}
          mode={'dialog'}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({gender: itemValue});
            this.saveData('gender', itemValue);
          }}
        />

        <PickerWithLabel
          style={styles.picker}
          label={'Education Level'}
          value={this.state.eduLevel}
          items={common.eduLevel}
          mode={'dialog'}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({eduLevel: itemValue});
            this.saveData('eduLevel', itemValue);
          }}
        />

        <PickerWithLabel
          style={styles.picker}
          label={'Receive Promotions'}
          value={this.state.promotions}
          items={common.promotions}
          mode={'dialog'}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({promotions: itemValue});
            this.saveData('promotions', itemValue);
          }}
        />

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    fontSize: 16,
    color: '#000099',
    marginTop: 10,
    marginBottom: 10,
  },
  picker: {
    color: '#000099',
    marginTop: 10,
    marginBottom: 10,
  },
});
