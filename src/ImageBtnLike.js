import React, {Component} from 'react';
import{TouchableOpacity,Image,Text} from 'react-native';

export default class ImageBtn extends Component {
    constructor(props){
      super(props);
      this.state={
          id: this.props.id,
          style: this.props.style,
          source: this.props.source,
        };      
    }
   render(){
     return(
       <TouchableOpacity  onPress={() => {this.props.onPress(this.props.source, this.props.id)
       }} >
        <Image
            style={this.props.style}
            source={{uri: this.props.source}}
        />
       </TouchableOpacity>
     );
   }
 }
