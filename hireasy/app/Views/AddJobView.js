import React, { Component } from "react";
import {
  Alert,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  StyleSheet
} from "react-native";

import { getData } from "../globalAssets.js";
import { CustomHeader } from "../Components/common.js";
import { Actions } from "react-native-router-flux";
import {
  Button,
  Content,
  H1,
  Header,
  Title,
  Icon,
  Card,
  CardItem,
  InputGroup,
  Input,
  Left,
  Body,
  Picker,
  Toast
} from "native-base";
import {
  Grid,
  Col, 
  Row,
} from "react-native-easy-grid";

const Item = Picker.Item;

export default class AddJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobType: "sales",
      formData: {
        title: "",
        description: "",
        type: "sales"
      }
    };
  }

  onValueChange(data) {
    this.state.formData.type = data;
    this.setState({
      jobType: data
    });
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#dbdbd9" }}>
          <Grid>
            <Row size={2} style={{alignItems: 'center'}}>
              <H1 style={{color: '#062a2d', margin: 10}}>Add Position</H1>
            </Row>
            <Row style={{height: 300}}>
              <Card>
                <CardItem>
                  <InputGroup borderType="underline">
                    <Input
                      autoCapitalize="sentences"
                      onChangeText={text => {
                        this.state.formData.title = text;
                      }}
                      placeholder="Title"
                    />
                  </InputGroup>
                </CardItem>
                <CardItem>
                  <InputGroup borderType="underline">
                    <Input
                      placeholder="Job Description"
                      multiline={true}
                      autoCapitalize="sentences"
                      onChangeText={text => {
                        this.state.formData.description = text;
                      }}
                      numberOfLines={10}
                      style={{ height: 100 }}
                    />
                  </InputGroup>
                </CardItem>
                <CardItem>
                  <Content>
                    <Picker
                      selectedValue={this.state.jobType}
                      onValueChange={this.onValueChange.bind(this)}
                      mode="dropdown"
                    >
                      <Item label="Sales" value="Sales" />
                      <Item label="Technology" value="Technology" />
                      <Item label="Consulting" value="Consulting" />
                      <Item label="Investment Banking" value="investment_banking" />
                      <Item label="Other" value="Other" />
                    </Picker>
                  </Content>
                </CardItem>
              </Card>
            </Row>
            <Row size={2}></Row>
          </Grid>

        <Button
          block
          style={{ height: 60, backgroundColor: "#6FB98F" }}
          onPress={() => {
            Alert.alert(
              "Are you sure?",
              "Please make sure you have input credible details. If you are sure press okay, or cancel to correct the data.",
              [
                {
                  text: "I am sure!",
                  onPress: () => {
                    let params = {
                      method: "POST",
                      routeSuffix: "JobsRoute",
                      queryParameters: this.state.formData
                    };

                    getData(this, params);
                  }
                },
                {
                  text: "Go Back",
                  onPress: () => {
                    ToastAndroid.showWithGravity(
                      "We will go back.",
                      ToastAndroid.LONG,
                      ToastAndroid.CENTER
                    );
                  }
                }
              ],
              {
                cancelable: false
              }
            );
          }}
        >
          <Text>SUBMIT</Text>
        </Button>

      </View>
    );
  }
}

module.exports = {
  AddJob
};
