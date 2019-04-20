import React, {Component} from 'react';
import{TouchableOpacity,Image,Text} from 'react-native';

export default class ImageBtn extends Component {
    constructor(props){
      super(props);
      this.state={
          id:this.props.id,
          style: this.props.style,
          source: this.props.source
        };
        console.log(this.props.style)
      
    }
   render(){
     return(
       <TouchableOpacity  onPress={()=>console.log(this.props.id)} >
        <Image
            style={this.props.style}
            source={{uri: this.props.source}}
        />
       </TouchableOpacity>
     );
   }
 }
