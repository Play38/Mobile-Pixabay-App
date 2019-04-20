import React, {Component} from 'react';
import TouchableOpacity from 'react';

export default class ImageBtn extends Component {
    constructor(props){
      super(props);
      this.state={
          id:this.props.id,
          style: this.props.style,
          source: this.props.source
        };
      
    }
   render(){
     return(
       <TouchableOpacity  onPress={()=>console.log(this.state.id)} >
        <Image
            style={this.state.style}
            source={{uri: this.state.source}}
        />
       </TouchableOpacity>
     );
   }
 }
