import React, { Component } from "react";
import {
  Alert,
  Linking,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  StyleSheet
} from "react-native";
import {
  Button,
  Body,
  Container,
  Content,
  Card,
  CardItem,
  Header,
  Title
} from "native-base";
import { 
  Col, 
  Row, 
  Grid 
} from "react-native-easy-grid";
import EvilIcon from "react-native-vector-icons/EvilIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { 
  getData, 
  ActivityIcon 
} from "../globalAssets.js";
import {CustomHeader} from "../Components/common.js";
import {CandidateResponse} from "../Components/candidateComponent.js";
import {Actions} from "react-native-router-flux";

class CandidateDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataStream: {}
    };
  }

  componentDidMount() {
    let componentRef = this;
    let params = {
      method: "GET",
      routeSuffix: "CandidatesRoute",
      queryParameters: {
        id: this.props.candidateId,
      }
    };
    getData(this, params);
  }

  render() {
    return (
      <Content>
        <CustomHeader navTitle="CANDIDATE DETAILS" />
        {Object.keys(this.state.dataStream).length > 0
          ? <View>
              <Card>
                <CardItem header>
                  <Text>DETAILS</Text>
                </CardItem>
                <CardItem>
                  <Body>
                    <Grid>
                      <Col size={10}>
                        <FontAwesome name="user-circle" size={20} color="#004445" />
                      </Col>
                      <Col size={90}>
                        <Text>
                          {
                            this.state.dataStream.first_name +" " +this.state.dataStream.last_name
                          }
                        </Text>
                      </Col>
                    </Grid>
                  </Body>
                </CardItem>
                <CardItem>
                  <Body>
                    <Grid>
                      <Col size={10}>
                        <FontAwesome name="envelope-o" size={20} color="#004445" />
                      </Col>
                      <Col size={90}>
                        <Text>
                          {this.state.dataStream.email}
                        </Text>
                      </Col>
                    </Grid>
                  </Body>
                </CardItem>
                <CardItem>
                  <Grid>
                    <Col size={10}>
                      <FontAwesome name="linkedin" size={20} color={
                        this.state.dataStream.linkedin_url
                        ?
                        ("#004445")
                        :
                        ("grey")         
                      } />
                    </Col>
                    <Col size={90}>
                      {
                        this.state.dataStream.linkedin_url
                        ?
                        (
                          <TouchableOpacity onPress={
                            ()=>{
                              Linking.canOpenURL(this.state.dataStream.linkedin_url)
                              .then(supported=>{
                                if (supported){
                                  Linking.openURL(this.state.dataStream.linkedin_url)
                                }
                                else{
                                  Alert.alert("Sorry!","We are having trouble opening this link! :(")
                                }
                              })
                            }
                          }>
                            <Text>{this.state.dataStream.linkedin_url}</Text>
                          </TouchableOpacity>
                        )
                        :
                        (
                          <Text>Profile Unavailable</Text>
                        )
                      }
                    </Col>
                  </Grid>
                </CardItem>
                <CardItem>
                  <Grid>
                    <Col size={10}>
                      <FontAwesome name="angellist" size={20} color={
                        this.state.dataStream.angelco_url
                        ?
                        ("#004445")
                        :
                        ("grey")         
                      } />
                    </Col>
                    <Col size={90}>
                      {
                        this.state.dataStream.angelco_url
                        ?
                        (
                          <TouchableOpacity onPress={
                            ()=>{
                              Linking.canOpenURL(this.state.dataStream.angelco_url)
                              .then(supported=>{
                                if (supported){
                                  Linking.openURL(this.state.dataStream.angelco_url)
                                }
                                else{
                                  Alert.alert("Sorry!","We are having trouble opening this link! :(")
                                }
                              })
                            }
                          }>
                            <Text>{this.state.dataStream.angelco_url}</Text>
                          </TouchableOpacity>
                        )
                        :
                        (
                          <Text>Profile Unavailable</Text>
                        )
                      }
                    </Col>
                  </Grid>
                </CardItem>
              </Card>
            </View>
          : <ActivityIcon />}
      </Content>
    );
  }
}

styles = StyleSheet.create({
  mainContainer: {
    marginTop: 80,
    marginBottom: 20
  },
  videoContainer: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20
  },
  card: {
    margin: 15
  },
  title: {
    fontSize: 25,
    color: "#000000",
    textAlign: "center"
  },
  socialButton: {
    backgroundColor: "#000000",
    height: 30,
    width: 30
  },
  iconContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10
  },
  textStyle: {
    textAlign: "center"
  },
  disabledSocialButton: {
    backgroundColor: "#E3E3E3",
    height: 30,
    width: 30
  }
});

module.exports = {
  CandidateDetail
};
