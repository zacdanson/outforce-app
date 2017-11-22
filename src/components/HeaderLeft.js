import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
var FontAwesome = require('react-fontawesome');



class HeaderLeft extends Component{
    render(){

        const iconStyles = {
            color:'#000'
        };

        return(
          <div>
              <FontAwesome
                            name='menu'
                            size='2x'
              />
          </div>
        );
    }

}

export default HeaderLeft;