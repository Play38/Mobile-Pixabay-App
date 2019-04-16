import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform
} from "react-native";
import { SearchBar } from 'react-native-elements';
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from 'react-redux'
class ImageApp extends Component {

    Header(){
        return(
            <View style={[styles.header]}>
            <View>
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
                onChangeText={()=>{}}
                value={""}
            />
            </View>
            </View>
        )
      }
    

    render() {
        return (
            this.Header()
        );
    }
}

function mapStateToProps(state) {
    return {
        counter: state.counter
    }
}

function mapDispatchToProps(dispatch) {
    return {
        increaseCounter: () => dispatch({ type: 'INCREASE_COUNTER' }),
        decreaseCounter: () => dispatch({ type: 'DECREASE_COUNTER' }),
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
        flex: 0.1
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
        position:'absolute',
        width:'100%',
        top:'100%'

    }
});