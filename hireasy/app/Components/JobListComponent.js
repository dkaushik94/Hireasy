/*
	Component for listing Open job positions.
*/

import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ScrollView
} from "react-native";

import Icon from "react-native-vector-icons/EvilIcons";
import {
  Badge,
  Body,
  Button,
  Card,
  CardItem,
  Content,
  H3,
  List,
  ListItem,
  Left,
  Right,
} from "native-base";
import { GlobalFunction, getData, ActivityIcon } from "../globalAssets.js";
import { Candidate, CandidateList } from "./candidateComponent.js";
import { Actions } from "react-native-router-flux";

//Component for a Job.
export default class Job extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataStream: {},
      page_no: 1
    };
  }

  componentDidMount() {
    let params = {
      method: "GET",
      routeSuffix: "JobsRoute",
      queryParameters: {
        page_no: this.state.page_no,
        id: this.props.id
      }
    };
    var componentRef = this;
    getData(componentRef, params);
    this.state.page_no++;
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        {Object.keys(this.state.dataStream).length > 0
          ? <Content>
              <Card>
                <CardItem header>
                  <H3>{this.state.dataStream.job.title}</H3>
                </CardItem>
                <CardItem>
                  <Body>
                    <Text>DESCRIPTION:</Text>
                    <Text>
                      {this.state.dataStream.job.description}
                    </Text>
                  </Body>
                </CardItem>
              </Card>
              <View>
                <View style={{ alignItems: "center" }}>
                  <Text style={{ margin: 10 , fontSize: 17, color: '#062a2d' }}>
                    CANDIDATES
                  </Text>
                </View>
                {Object.keys(this.state.dataStream.candidates).length > 0
                  ? <CandidateList
                      candidates={this.state.dataStream.candidates}
                    />
                  : <Text style={{ margin: 10 }}>
                      No candidates added for this job.
                    </Text>}
              </View>
            </Content>
          : <ActivityIcon />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  job: {
    color: "#FFFFFF",
    margin: 20
  },
  button: {
    width: 20
  },
  List: {
    marginLeft: 15,
    marginRight: 15
  },
  card: {
    margin: 10
  },
  subheading: {
    marginTop: 5,
    marginBottom: 5
  },
  jobTitle: {
    fontSize: 25,
    marginBottom: 10,
    paddingLeft: 15
  },
  description: {
    marginBottom: 10,
    textAlign: "justify",
    lineHeight: 25
  }
});
