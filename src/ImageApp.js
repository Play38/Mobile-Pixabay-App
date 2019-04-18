import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    ScrollView,
    Dimensions,
    Image
} from "react-native";
import { SearchBar } from 'react-native-elements';
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from 'react-redux'
const win = Dimensions.get('window');
class ImageApp extends Component {
    state = {
        search: '',
        mode: 'gridview',
      };
      updateSearch = search => {
        this.setState({ search });
      };

      componentDidMount(){
        var API_KEY = '12215533-b9ee53829290d3d207532d1f9';
        var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent('red roses');
        return fetch(URL)
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson)
            this.setState({
              dataSource: responseJson.hits
            });
          })
          .catch((error) =>{
            console.error(error);
          });
    }
    Header(){
        var headerScreen=[]
        headerScreen.push(
            <View >
                <View style={[styles.header]}>
                <Text style={[styles.textHeader]}>
                    Image Browser
                </Text>
                <TouchableOpacity style = {[styles.heartIcon]}>
                <Icon
                    name={Platform.OS === "ios" ? "ios-heart-empty" : "md-heart-empty"}
                    color="#ccc"
                    size={40}
                    />
                </TouchableOpacity>
                </View>
                <View style = {[styles.searchStyle]}>
                <SearchBar
                    placeholder="Type Here..."
                    onChangeText={this.updateSearch}
                    value={this.state.search}
                    lightTheme= {true}
                />

                </View>
            </View>
        )
        headerScreen.push(this.Buttons())
        return(headerScreen)
      }

    Buttons(){
    if(this.state.mode == "gridview"){
    return(
        <View style = {[styles.touchableContainer]}>
            <TouchableOpacity style = {[styles.viewButtonOn]}
                onPress = {()=>{
                    this.setState({
                        mode : "gridview"
                    })
                }}
            >
                <Text style = {[styles.textViewButtonOn]}>Grid View</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {[styles.viewButtonOff]}
                            onPress = {()=>{
                                this.setState({
                                    mode : "listview"
                                })
                            }}
            >
                <Text style = {[styles.textViewButtonOff]}>List View</Text>
            </TouchableOpacity>
        </View>
        )
    }
    if(this.state.mode == "listview"){
        return(
            <View style = {[styles.touchableContainer]}>
            <TouchableOpacity style = {[styles.viewButtonOff]}
                onPress = {()=>{
                    this.setState({
                        mode : "gridview"
                    })
                }}
            >
                <Text style = {[styles.textViewButtonOff]}>Grid View</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {[styles.viewButtonOn]}
                    onPress = {()=>{
                        this.setState({
                             mode : "listview"
                       })
                    }}
            >
                <Text style = {[styles.textViewButtonOn]}>List View</Text>
            </TouchableOpacity>
        </View>
            )
    }
    }
    getImages(){
        var view= [];
        console.log(this.state.dataSource)
        for(e in this.state.dataSource){
            console.log(this.state.dataSource[e].previewURL)
            view.push(
                <View>
                    <Image
                        style = {[styles.imageStyle]}
                    source={{uri: this.state.dataSource[e].previewURL}}
                    />
                </View>
            )
        };
        return view;
    }

    render() {
        if(this.state.mode == "gridview"){
        return (
        <ScrollView
            stickyHeaderIndices={[0]}
            showsVerticalScrollIndicator={false}
        >
          {this.Header()}
          <View style = {[styles.imageContain]}>
          {this.getImages()}
          </View>

        </ScrollView>
        );
    }
        if(this.state.mode == "listview"){
            return (
                <ScrollView
                    stickyHeaderIndices={[0]}
                    showsVerticalScrollIndicator={false}
                >
                    {this.Header()}
                    <View style = {[styles.imageContain]}>
                    <Text>Hello</Text>
                    </View>

                </ScrollView>
            );
        }

      }
}

function mapStateToProps(state) {
    return {
        mode: state.mode
    }
}

function mapDispatchToProps(dispatch) {
    return {
        viewMode: () => dispatch({ type: 'VIEW_MODE' }),
        gridMode: () => dispatch({ type: 'GRID_MODE' }),
    }
}

export default ImageApp


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header :{
        backgroundColor: '#ff746d', 
        height: 75  
    },
    textHeader: {
        color: "black",
        fontSize: 25,
        textAlign: 'center',
        top:15
    },
    heartIcon:{
        left: "80%",
        top: "20%",
        position: 'absolute'
    },
    searchStyle:{
        width:'100%',

    },
    touchableContainer:{
        width:'100%',
        flexDirection: "row"
    },
    viewButtonOff:{
        width:'50%',
        height: 30,
        alignItems: "center",
        borderWidth: 1.5,
        borderColor: '#0066ff',
    },
    viewButtonOn:{
        width:'50%',
        height: 30,
        alignItems: "center",
        borderWidth: 1.5,
        borderColor: '#0066ff',
        backgroundColor:'#0000ff'
    },
    textViewButtonOn:{
        fontSize: 20,
        color:'#ffffff'
    },
    textViewButtonOff:{
        fontSize: 20,
        color:'#000000'
    },
    imageStyle:{
        flex:1,
        width: win.width/3,
        height: 130,
    },
    imageContain:{
        flex: 1,
        width:'100%',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
    }

});