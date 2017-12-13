import { ImagePicker } from 'expo'
import React from 'react'
import { Image, Button } from 'react-native'
import { StyleSheet, View } from 'react-native'

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      uri: 'http://lorempixel.com/output/cats-h-c-320-640-1.jpg'
    }
    this._setImage = this._setImage.bind(this)
    this._selectPicture = this._selectPicture.bind(this)
    this._takePicture = this._takePicture.bind(this)
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.picture} source={{uri: this.state.uri}}/>
        <Button title="Select Image" onPress={this._selectPicture}/>
        <Button title="Take Picture" onPress={this._takePicture}/>
      </View>
    )
  }

  /**
   * Select picture from image library
   */
  async _selectPicture() {
    const result = await ImagePicker.launchImageLibraryAsync()
    if (!result.cancelled) {
      await this._setImage(result.uri)
    }
  }

  /**
   * Get picture from camera
   */
  async _takePicture() {
    const result = await ImagePicker.launchCameraAsync()
    if (!result.cancelled) {
      await this._setImage(result.uri)
    }
  }

  /**
   * Dispay picture
   * @param {string} uri 
   */
  _setImage(uri) {
    this.setState({uri})
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  picture: {
    ...StyleSheet.absoluteFillObject
  }

})
