import React, { Component } from "react";
import ImageBtn from './ImageBtn'
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
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux'
const win = Dimensions.get('window');
let favarray = []
let screenStack = []
class ImageApp extends Component {
    constructor(props) {
        super(props);

        this.viewImage = this.viewImage.bind(this);
        this.getSingleImage = this.getSingleImage.bind(this);
      }
    state = {
        search: 'dog',
        mode: 'gridview',
      };
      updateSearch = search => {
        this.setState({ search: search });
        var API_KEY = '12215533-b9ee53829290d3d207532d1f9';
        var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent(search);
        return fetch(URL)
          .then((response) => {
              if(response.status == 200){
                  response.json().then((responseJson) => {
                    if(typeof responseJson != "undefined"){
                        this.setState({
                        dataSource: responseJson.hits,
                            hitnum: responseJson.total
                        });

                    }
                  })
                }
            })

          .catch((error) =>{
            console.error(error);
          });
    }

      componentDidMount(){
        this.getAllKeys()
        var API_KEY = '12215533-b9ee53829290d3d207532d1f9';
        var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent(this.state.search);
        return fetch(URL)
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              dataSource: responseJson.hits
            });
          })
          .catch((error) =>{
            console.error(error);
          });
    }
    getAllKeys = async () => {
        try {
          favarray = await AsyncStorage.getAllKeys()
        } catch(e) {
          // read key error
        }
        this.setState({
            fav: favarray
        })
        console.log(favarray)
        // example console.log result:
        // ['@MyApp_user', '@MyApp_key']

      }
    Header(){
        var headerScreen=[]
        const { search } = this.state;
        if(this.state.mode == 'singleview' || this.state.mode == 'likeview' )
        {
            headerScreen.push(
                <View >
                    <View style={[styles.header]}>
                        <Text style={[styles.textHeader]}>
                            Image Browser
                        </Text>
                        <TouchableOpacity style = {[styles.returnIcon]}>
                            <Icon
                                name={Platform.OS === "ios" ? "ios-return-left" : "md-return-left"}
                                color="#ccc"
                                size={40}
                                onPress = {()=>{
                                     returnBut = screenStack.pop()
                                    this.setState({
                                        mode : returnBut
                                    })
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
        if(this.state.mode == 'listview' || this.state.mode == 'gridview' ){
            headerScreen.push(
                <View >
                    <View style={[styles.header]}>
                        <Text style={[styles.textHeader]}>
                            Image Browser
                        </Text>
                        <TouchableOpacity style = {[styles.heartIcon]}
                        onPress = {()=>{
                            screenStack.push(this.state.mode)
                            this.setState({
                                mode : "likeview",
                          })
                        }
                        }
                        >
                            <Icon
                                name={Platform.OS === "ios" ? "ios-heart-empty" : "md-heart-empty"}
                                color="#ccc"
                                size={40}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            )
            headerScreen.push(
                <View>
                <View style = {[styles.searchStyle]}>
                <SearchBar
                    placeholder="Type Here..."
                    onChangeText={this.updateSearch}
                    value={search}
                    lightTheme= {true}
                />
                </View>
                    {this.Buttons()}
                </View>
            )
        }
        return(
            <View>{headerScreen}</View>)
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
    viewImage (image){
          console.log(image)
        this.state.img = image
        screenStack.push(this.state.mode)
        this.setState({
            mode : "singleview",
      })
      }
    getImages(){
        var view= [];

        if(this.state.mode == 'likeview'){
            let data =this.state.fav
            for (e in data) {

                    view.push(
                        <View>
                            <ImageBtn
                                identifier = {data[e]}
                            id = {data[e]}
                            source = {data[e][0]}
                            style={[styles.imageStyleGrid]}
                            onPress= {this.viewImage}
                            />
                        </View>
                    )
            }
        }
            for (e in this.state.dataSource) {
                if (this.state.mode == "gridview") {
                    view.push(
                        <View>
                            <ImageBtn
                                identifier = {this.state.dataSource[e].id}
                            id = {this.state.dataSource[e].largeImageURL}
                            source = {this.state.dataSource[e].previewURL}
                            style={[styles.imageStyleGrid]}
                            onPress= {this.viewImage}
                            />
                        </View>
                    )
                }
        }

        if(this.state.hitnum === 0)
        {
            view.push(
                <View style = {[styles.noResultView]}>
                    <Text style = {[styles.noResultText]}>No Results{'\n'} Were Found :(</Text>
                </View>
            )
        }
        else {
            for (e in this.state.dataSource) {
                if (this.state.mode == "gridview") {
                    view.push(
                        <View>
                            <ImageBtn
                                identifier = {this.state.dataSource[e].id}
                            id = {this.state.dataSource[e].largeImageURL}
                            source = {this.state.dataSource[e].previewURL}
                            style={[styles.imageStyleGrid]}
                            onPress= {this.viewImage}
                            />
                        </View>
                    )
                }
                if (this.state.mode == "listview") {
                    view.push(
                        <View>
                            <ImageBtn
                                identifier = {this.state.dataSource[e].id}
                            id = {this.state.dataSource[e].largeImageURL}
                            source = {this.state.dataSource[e].previewURL}
                            style={[styles.imageStyleList]}
                            onPress= {this.viewImage}
                            />
                            <Text style={[styles.textHeadlineList]}>{this.state.dataSource[e].tags}</Text>
                            <Text
                                style={[styles.textMinorList]}>Likes: {this.state.dataSource[e].likes} Views: {this.state.dataSource[e].views}</Text>
                        </View>
                    )
                }
            };
        }
        return view;
    }

    getSingleImage(image){
         console.log(image)
        let stack = [];
        stack.push(
            <View>
                    <Image
                        style={[styles.bigImage]}
                        source={{uri: image[0]}}
                    />
            </View>
        )
        if ((favarray.find(element => element[1] === image[1])) === undefined) {
            stack.push(
                <TouchableOpacity style={[styles.heartIconBottom]}>
                <Icon
                    name={Platform.OS === "ios" ? "ios-heart-empty" : "md-heart-empty"}
                    color="#ccc"
                    size={40}
                    onPress={() => {
                        favarray.push(image)
                        this.setState({
                            fav: favarray
                        })
                        this.setValue();
                    }
                    }

                />
            </TouchableOpacity>
            )
        }
        return (<View style={[styles.bigImageView]}>{stack}</View>)
    }
    setValue = async () => {
        try {
            console.log(bomb)
          await AsyncStorage.setItem(this.state.img, this.state.img)
        } catch(e) {
            console.log(e)
        }
      
        console.log('Done.')
      }
    render() {
    const allImages = this.getImages()
        if(this.state.mode == "gridview"){
             return (
        <ScrollView
            stickyHeaderIndices={[0]}
            showsVerticalScrollIndicator={false}
        >
          {this.Header()}
          <View style = {[styles.imageContainGrid]}>
              {allImages}
          </View>

        </ScrollView>
        );
    }
        else if(this.state.mode == "listview"){
            return (
                <ScrollView
                    stickyHeaderIndices={[0]}
                    showsVerticalScrollIndicator={false}
                >
                    {this.Header()}
                    <View style = {[styles.imageContainList]}>
                        {allImages}
                    </View>

                </ScrollView>
            );
        }
        else if(this.state.mode == "singleview") {
                return (
                    <ScrollView
                        stickyHeaderIndices={[0]}
                        showsVerticalScrollIndicator={false}
                    >
                        {this.Header()}
                        {this.getSingleImage(this.state.img)}
                    </ScrollView>
                )
        }
        else if(this.state.mode == 'likeview'){
                return(
                    <ScrollView
                    stickyHeaderIndices={[0]}
                    showsVerticalScrollIndicator={false}
                >
                    {this.Header()}
                    <View style = {[styles.imageContainGrid]}>
                    {allImages}
                    </View>
                    </ScrollView>
                )

        }
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
    heartIconBottom:{
        bottom: 0,
        position: 'absolute'
    },
    returnIcon:{
        left: "10%",
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
        backgroundColor:'#ffffff'
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
    imageStyleGrid:{
        flex:1,
        width: win.width/3,
        height: 130,
    },
    imageStyleList:{
        position: 'relative',
        left: 10,
        width: 50,
        height: 50,
        resizeMode: 'contain',
        marginBottom: '7%'
    },
    imageContainGrid:{
        flex: 1,
        width:'100%',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    imageContainList:{
        flex: 1,
        width:'100%',
        flexDirection: 'column',

    },
    textHeadlineList: {
        position: 'absolute',
        left: '20%',
        fontSize: 20,
        color: 'black'
    },
    textMinorList:{
        position:'absolute',
        left:'20%',
        top:'30%',
        color:'gray'
    },
    noResultView:{
        height:300
    },
    noResultText:{
        color:'black',
        position:'relative',
        fontSize: 25,
        textAlign: 'center',
        top:'50%'

    },
    bigImage:{
       position:'relative',
        resizeMode:'contain',
        width:win.width- 50 ,
        height:win.height- 50,
        //
    },
    bigImageView:{
        position:'relative',
        justifyContent:'center',
        alignItems: 'center',
        height:500,
        width:'100%'
    }


});