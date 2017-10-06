import React, { Component } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    Col,
    Grid,
    Row
} from 'react-native-easy-grid';
import {
    Body,
    Content,
    H4,
    ListItem,
    Left,
    Right
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';


class Question extends Component{
    
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.selected !== nextProps.selected) {
            return true;
        }
        return false;
    }
    
    setNativeProps(nativeProps) {
        this.refs.container.setNativeProps(nativeProps);
    }
    
    render(){
        return(
            <ListItem icon onPress={()=>this.props.changeState()}>
                <Left>
                {this.props.selected
                    ? <Icon name="check" color="green" size={20} />
                    : <Icon name="check" color="#D3D3D3" size={20} />}
                </Left>
                <Body>
                    <Text>{this.props.questionText}</Text>
                </Body>
                <Right style={{marginLeft:4}}>
                    <Text note>
                        {this.props.responseTime} {this.props.responseTime == 1?("min"):("mins")}

                    </Text>
                </Right>
            </ListItem>
            )
        }
    }
    module.exports={
        Question,
    }