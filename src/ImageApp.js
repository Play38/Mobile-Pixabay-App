import React, { Component } from 'react'
import ImageBtn from './ImageBtn'
import ImageBtnLike from './ImageBtnLike'
import styles from './ImageAppStyle'
import { View, Text, TouchableOpacity, Platform, ScrollView, Image } from 'react-native'
import { SearchBar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-community/async-storage'
const favarray = []
let temparr = []
const screenStack = []
class ImageApp extends Component {
  constructor(props) {
    super(props)

    this.viewImage = this.viewImage.bind(this)
    this.getSingleImage = this.getSingleImage.bind(this)
  }
  state = {
    search: 'dog',
    mode: 'gridview'
  }
  updateSearch = search => {
    this.setState({ search })
    const API_KEY = '12215533-b9ee53829290d3d207532d1f9'
    const URL = 'https://pixabay.com/api/?key=' + API_KEY + '&q=' + encodeURIComponent(search)
    return fetch(URL).then(response => {
      if (response.status === 200) {
        response.json().then(responseJson => {
          if (typeof responseJson !== 'undefined') {
            this.setState({
              dataSource: responseJson.hits,
              hitnum: responseJson.total
            })
          }
        })
      }
    })
  }

  componentDidMount() {
    //this.clearAll()
    this.getAllKeys()
    const API_KEY = '12215533-b9ee53829290d3d207532d1f9'
    const URL =
      'https://pixabay.com/api/?key=' + API_KEY + '&q=' + encodeURIComponent(this.state.search)
    return fetch(URL)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          dataSource: responseJson.hits
        })
      })
  }
  getAllKeys = async () => {
    temparr = []
    try {
      temparr = await AsyncStorage.getAllKeys()
    } catch (e) {
      // read key error
    }
    this.getAllValues()
  }

  getAllValues = async () => {
    let key
    for (key in temparr) {
      try {
        const value = await AsyncStorage.getItem(temparr[key])
        favarray.push({ id: temparr[key], value })
      } catch (e) {
        // read error
      }
    }
  }
  Header() {
    const headerScreen = []
    const { search } = this.state
    if (
      this.state.mode === 'singleview' ||
      this.state.mode === 'likeview' ||
      this.state.mode === 'singlelikeview'
    ) {
      headerScreen.push(
        <View>
          <View style={[styles.header]}>
            <Text style={[styles.textHeader]}>Image Browser</Text>
            <TouchableOpacity style={[styles.returnIcon]}>
              <Icon
                name={Platform.OS === 'ios' ? 'ios-return-left' : 'md-return-left'}
                color="#ccc"
                size={40}
                onPress={() => {
                  const a = screenStack.pop()
                  this.setState({
                    mode: a
                  })
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      )
    }
    if (this.state.mode === 'listview' || this.state.mode === 'gridview') {
      headerScreen.push(
        <View>
          <View style={[styles.header]}>
            <Text style={[styles.textHeader]}>Image Browser</Text>
            <TouchableOpacity
              style={[styles.heartIcon]}
              onPress={() => {
                screenStack.push(this.state.mode)
                this.setState({
                  mode: 'likeview'
                })
              }}
            >
              <Icon
                name={Platform.OS === 'ios' ? 'ios-heart-empty' : 'md-heart-empty'}
                color="#ccc"
                size={40}
              />
            </TouchableOpacity>
          </View>
        </View>
      )
      headerScreen.push(
        <View>
          <View style={[styles.searchStyle]}>
            <SearchBar
              placeholder="Type Here..."
              onChangeText={this.updateSearch}
              value={search}
              lightTheme
            />
          </View>
          {this.Buttons()}
        </View>
      )
    }
    return <View>{headerScreen}</View>
  }

  Buttons() {
    if (this.state.mode === 'gridview') {
      return (
        <View style={[styles.touchableContainer]}>
          <TouchableOpacity
            style={[styles.viewButtonOn]}
            onPress={() => {
              this.setState({
                mode: 'gridview'
              })
            }}
          >
            <Text style={[styles.textViewButtonOn]}>Grid View</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.viewButtonOff]}
            onPress={() => {
              this.setState({
                mode: 'listview'
              })
            }}
          >
            <Text style={[styles.textViewButtonOff]}>List View</Text>
          </TouchableOpacity>
        </View>
      )
    }
    if (this.state.mode === 'listview') {
      return (
        <View style={[styles.touchableContainer]}>
          <TouchableOpacity
            style={[styles.viewButtonOff]}
            onPress={() => {
              this.setState({
                mode: 'gridview'
              })
            }}
          >
            <Text style={[styles.textViewButtonOff]}>Grid View</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.viewButtonOn]}
            onPress={() => {
              this.setState({
                mode: 'listview'
              })
            }}
          >
            <Text style={[styles.textViewButtonOn]}>List View</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }
  viewImage(image, id) {
    this.setState({
      img: image,
      id
    })

    screenStack.push(this.state.mode)
    if (this.state.mode === 'likeview') {
      this.setState({
        mode: 'singlelikeview'
      })
    } else {
      this.setState({
        mode: 'singleview'
      })
    }
  }
  getImages() {
    let e
    const view = []
    if (this.state.mode === 'likeview') {
      const data = favarray
      for (e in data) {
        view.push(
          <View>
            <ImageBtnLike
              id={data[e].id}
              source={data[e].value}
              style={[styles.imageStyleGrid]}
              onPress={this.viewImage}
            />
          </View>
        )
      }
      return view
    }
    for (e in this.state.dataSource) {
      if (this.state.mode === 'gridview') {
        view.push(
          <View>
            <ImageBtn
              id={this.state.dataSource[e].id}
              source={[this.state.dataSource[e].previewURL, this.state.dataSource[e].largeImageURL]}
              style={[styles.imageStyleGrid]}
              onPress={this.viewImage}
            />
          </View>
        )
      }
    }
    if (this.state.hitnum === 0) {
      view.push(
        <View style={[styles.noResultView]}>
          <Text style={[styles.noResultText]}>No Results{'\n'} Were Found :(</Text>
        </View>
      )
    } else {
      for (e in this.state.dataSource) {
        if (this.state.mode === 'gridview') {
          view.push(
            <View>
              <ImageBtn
                id={this.state.dataSource[e].id}
                source={[
                  this.state.dataSource[e].previewURL,
                  this.state.dataSource[e].largeImageURL
                ]}
                style={[styles.imageStyleGrid]}
                onPress={this.viewImage}
              />
            </View>
          )
        }
        if (this.state.mode === 'listview') {
          view.push(
            <View>
              <ImageBtn
                id={this.state.dataSource[e].id}
                source={[
                  this.state.dataSource[e].previewURL,
                  this.state.dataSource[e].largeImageURL
                ]}
                style={[styles.imageStyleList]}
                onPress={this.viewImage}
              />
              <Text style={[styles.textHeadlineList]}>{this.state.dataSource[e].tags}</Text>
              <Text style={[styles.textMinorList]}>
                Likes: {this.state.dataSource[e].likes} Views: {this.state.dataSource[e].views}
              </Text>
            </View>
          )
        }
      }
    }
    return view
  }

  getSingleImage(image, id) {
    let i
    let flag = true
    const stack = []
    if (this.state.mode === 'singlelikeview') {
      stack.push(
        <View>
          <Image style={[styles.bigImage]} source={{ uri: image }} />
        </View>
      )
    } else {
      stack.push(
        <View>
          <Image style={[styles.bigImage]} source={{ uri: image[1] }} />
        </View>
      )
    }
    for (i in favarray) {
      if (favarray[i].id === String(id)) {
        flag = false
        break
      }
    }
    if (flag) {
      stack.push(
        <TouchableOpacity style={[styles.heartIconBottom]}>
          <Icon
            name={Platform.OS === 'ios' ? 'ios-heart-empty' : 'md-heart-empty'}
            color="#ccc"
            size={40}
            onPress={() => {
              this.setValue()
            }}
          />
        </TouchableOpacity>
      )
    }
    return <View style={[styles.bigImageView]}>{stack}</View>
  }
  clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch (e) {
      // clear error
    }
  }
  setValue = async () => {
    try {
      await AsyncStorage.setItem(String(this.state.id), this.state.img[1])
      favarray.push({ id: String(this.state.id), value: this.state.img[1] })
    } catch (e) {
      //read error
    }
    this.forceUpdate()
  }
  render() {
    if (this.state.mode === 'gridview') {
      return (
        <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
          {this.Header()}
          <View style={[styles.imageContainGrid]}>{this.getImages()}</View>
        </ScrollView>
      )
    } else if (this.state.mode === 'listview') {
      return (
        <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
          {this.Header()}
          <View style={[styles.imageContainList]}>{this.getImages()}</View>
        </ScrollView>
      )
    } else if (this.state.mode === 'singleview' || this.state.mode === 'singlelikeview') {
      return (
        <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
          {this.Header()}
          {this.getSingleImage(this.state.img, this.state.id)}
        </ScrollView>
      )
    } else if (this.state.mode === 'likeview') {
      return (
        <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
          {this.Header()}
          <View style={[styles.imageContainGrid]}>{this.getImages()}</View>
        </ScrollView>
      )
    }
  }
}

export default ImageApp
