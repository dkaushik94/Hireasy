import React, { Component } from "react";
import {
  AsyncStorage,
  View,
  Text,
  Image,
  StyleSheet,
  ToastAndroid
} from "react-native";
import { Button, Form, Content, Label, H1, Input, Item } from "native-base";
import { Actions } from "react-native-router-flux";
import { Grid, Row, Col } from "react-native-easy-grid";
import Icon from "react-native-vector-icons/Entypo";
import {getData, GlobalFunction} from '../globalAssets.js';

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        username: "",
        password: ""
      }
    };
  }

  postLogin(cbParams) {
     console.log(cbParams);
     let AuthToken = JSON.stringify({"@token": cbParams.token})
     try{
       AsyncStorage.setItem(
         "AuthToken", 
         cbParams.token
        )
        .then((data)=>{
          ToastAndroid.showWithGravity(
            "You have successfully logged in.",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          )
          GlobalFunction({sceneName: "OpenJobs"})
        })
     } catch (error) {
      console.log(error)
     }
  }


  Login() {
    let params = {
      method: "POST",
      routeSuffix: "LoginRoute",
      queryParameters: this.state.formData
    };
    var componentRef = this;
    getData(
        componentRef, 
        params,
        callbackFunction = this.postLogin,
        cbParams = {
            key1: null,
        }
    );
    console.log(this.state.formData);
  }

  render() {
    var pic = require("../../img/loginImage.png");
    return (
      <View style={{ flex: 1, backgroundColor: "#1E90FF" }}>
        <Grid>
          <Row size={4}>
            <Grid>
              <Row size={4} style={{ alignItems: "center" }}>
                <Col size={1} />
                <Col size={4} style={{ alignItems: "center" }}>
                  <Image
                    style={{ height: 150, width: 150, resizeMode: "contain" }}
                    source={pic}
                  />
                </Col>
                <Col size={1} />
              </Row>
              <Row size={1}>
                <Col size={1} />
                <Col size={4} style={{ alignItems: "center" }}>
                  <Text style={{ color: "white", fontStyle: "italic" }}>
                    HIRE PROFESSIONALS ON THE GO!
                  </Text>
                </Col>
                <Col size={1} />
              </Row>
            </Grid>
          </Row>
          <Row size={3}>
            <Content style={{ marginHorizontal: 10 }}>
              <Form style={{ marginRight: 15 }}>
                <Item style={{ paddingHorizontal: 5, marginVertical:4 }}>
                  <Icon
                    active
                    name="user"
                    size={15}
                    color="white"
                    style={{ marginRight: 5 }}
                  />
                  <Input 
                    placeholder="Username" 
                    onChangeText = {text => {
                        let tempState = this.state.formData;
                        tempState.username = text;
                        this.setState(tempState);
                    }}
                    placeholderTextColor="white"
                    style={{ color: "white" }} />
                </Item>
                <Item style={{ paddingHorizontal: 5, marginVertical:5 }}>
                  <Icon
                    active
                    name="key"
                    style={{ marginRight: 5 }}
                    size={15}
                    color="white"
                  />
                  <Input
                    onChangeText={text => {
                      let tempState = this.state.formData;
                      tempState.password = text;
                      this.setState(tempState);
                    }}
                    placeholderTextColor="white"
                    placeholder="Password"
                    secureTextEntry={true}
                    style={{ color: "white" }}
                  />
                </Item>
              </Form>
              <Button
                onPress={() => {
                  this.Login();
                }}
                block
                style={{
                  marginVertical: 40,
                  marginHorizontal: 15,
                  backgroundColor: "white"
                }}
              >
                <Text style={{ color: "#1E90FF", fontWeight:'bold' }}>LOGIN</Text>
              </Button>
            </Content>
          </Row>
        </Grid>
      </View>
    );
  }
}

module.exports = {
  LoginView
};
