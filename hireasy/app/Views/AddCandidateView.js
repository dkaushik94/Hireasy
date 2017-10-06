import React, { Component } from "react";
import {
  Alert,
  ScrollView,
  Text,
  View,
  ToastAndroid,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import {
  Container,
  H1,
  Header,
  Content,
  Card,
  CardItem,
  InputGroup,
  Input,
  Button,
  Picker,
  Title,
  Icon
} from "native-base";

import { Actions } from "react-native-router-flux";
import { CustomHeader } from "../Components/common.js";
import { Grid, Row, Col } from "react-native-easy-grid";
import { getData, ActivityIcon, GlobalFunction } from "../globalAssets.js";

const Item = Picker.Item;

export class AddCandidate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: "1",
      dataStream: {},
      formData: {
        open_job: "None",
        first_name: "",
        last_name: "",
        linkedin_url: "",
        angelco_url: "",
        email: ""
      }
    };
  }

  stateHandler(data, key){
    let tempState = this.state.formData;
    tempState[key] = data;
    this.setState({
      formData: tempState,
    })
  }


  componentDidMount() {
    var componentRef = this;
    let params = {
      method: "GET",
      routeSuffix: "JobsRoute",
      queryParameters: {
        page_no: 1
      },
      authToken: "Token 54cdfd3ad4650328c3c381ebfac2eda7d09bd64c"
    };
    getData(componentRef, params);
  }

  onValueChange(data) {
    let tempState = this.state
    tempState.selectedValue = data
    tempState.formData.open_job = data
    this.setState(tempState);
  }

  render() {
    let pickerItems = [];
    pickerItems.push(<Item key={0} label="None" value="1" />);
    Object.keys(this.state.dataStream).length > 0
      ? this.state.dataStream.jobs.map((item, i) =>
          pickerItems.push(
            <Item label={item.title} key={item.id} value={item.id} />
          ))
      : undefined;
    return (
      <Container style={{ flex: 1, backgroundColor: "#dbdbd9" }}>
        <Grid>
          <ScrollView>
            <Row size={4} style={{ alignItems: "center" }}>
              <H1 style={{ color: "#062a2d", margin: 10 }}>
                Add a Candidate
              </H1>
            </Row>
            {Object.keys(this.state.dataStream).length > 0
              ? <Row style={{ alignItems: "center" }}>
                  <Card>
                    <CardItem>
                      <InputGroup borderType="underline">
                        <Input
                          placeholder="First Name"
                          autoCapitalize="sentences"
                          onChangeText={

                             (text) => this.stateHandler(text,'first_name')
                            }
                        />
                      </InputGroup>
                    </CardItem>
                    <CardItem>
                      <InputGroup borderType="underline">
                        <Input
                          placeholder="Last Name"
                          autoCapitalize="sentences"
                           onChangeText={
                              (text)=> this.stateHandler(text,'last_name')
                            }
                        />
                      </InputGroup>
                    </CardItem>
                    <CardItem>
                      <InputGroup borderType="underline">
                        <Input
                          placeholder="Email"
                          onChangeText={
                              (text)=> this.stateHandler(text,'email')
                            }
                        />
                      </InputGroup>
                    </CardItem>
                    <CardItem>
                      <InputGroup borderType="underline">
                        <Input
                          placeholder="Linkedin"
                          autoCapitalize="sentences"
                          onChangeText={
                              (text)=> this.stateHandler(text,'linkedin_url')
                            }
                        />
                      </InputGroup>
                    </CardItem>
                    <CardItem>
                      <InputGroup borderType="underline">
                        <Input
                          placeholder="AngelList"
                          autoCapitalize="sentences"
                          onChangeText={
                              (text)=> this.stateHandler(text,'angelco_url')
                            }
                        />
                      </InputGroup>
                    </CardItem>
                    <Picker
                      iosHeader="Select one"
                      mode="dropdown"
                      selectedValue={this.state.selectedValue}
                      onValueChange={this.onValueChange.bind(this)}
                    >
                      {pickerItems}
                    </Picker>
                  </Card>
                </Row>
              : <ActivityIcon />}
          </ScrollView>
        </Grid>
        <Button
          block
          style={{ height: 60, backgroundColor: "#6FB98F" }}
          onPress={() => {
            Alert.alert(
              "Are you sure?",
              "Please make sure you have input credible details. If you are sure press okay, or cancel to correct the data.",
              [{
                  text: "I am sure!",
                  onPress: () => {
                    let params = {
                      method: 'POST',
                      routeSuffix: 'CandidatesRoute',
                      queryParameters: this.state.formData
                    };
                    getData(
                      componentRef = this, 
                      params,
                      callbackFunction = (cbParams) =>{
                        GlobalFunction({
                          sceneName: 'CreateInterview',
                          candidateId: cbParams.cbData.id,
                        })
                      },
                      cbParams ={
                        jobId: 1,
                      }
                      );
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
                }]
            )
          }}
        >
          <Text>SUBMIT</Text>
        </Button>
      </Container>
    );
  }
}

module.exports = {
  AddCandidate
};
