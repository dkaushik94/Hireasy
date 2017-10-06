// React Imports
import React, { Component } from "react";
// React native Imports.
import {
  AsyncStorage,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  AppRegistry
} from "react-native";

import {
  Badge,
  Button,
  Body,
  Container,
  Content,
  Header,
  Title,
  List,
  ListItem,
  Right,
  Spinner
} from "native-base";
import Icon from "react-native-vector-icons/MaterialIcons";
import Job from "../Components/JobListComponent.js";
import { CustomHeader } from "../Components/common.js";
import { GlobalFunction, getData, ActivityIcon } from "../globalAssets.js";
import ActionButton from "react-native-action-button";
import { Actions } from "react-native-router-flux";

//View for listing of Jobs.
export default class JobListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataStream: {},
      page_no: 1
    };
  }

  componentDidMount() {
    let componentRef = this;
    let params = {
      method: "GET",
      routeSuffix: "JobsRoute",
      queryParameters: {
        page_no: this.state.page_no
      },
      authToken: "Token 54cdfd3ad4650328c3c381ebfac2eda7d09bd64c"
    };
    getData(componentRef, params);
  }

  render() {
    const renderJobDetails = j_Id => {
      let parameters = { sceneName: "JobDetails", jobId: j_Id };
      GlobalFunction(parameters);
    };
    return (
      <View style={{ flex: 1 }}>
        <CustomHeader
          navTitle="OPENJOBS"
          navButton={false}
          badge={true}
          badgeValue={
            Object.keys(this.state.dataStream).length > 0
              ? this.state.dataStream.jobs_count
              : undefined
          }
        />
        <ScrollView>
          {Object.keys(this.state.dataStream).length > 0
            ? <List>
                {this.state.dataStream.jobs.map(job => {
                  return (
                    <ListItem
                      key={job.id}
                      button
                      onPress={() => {
                        renderJobDetails(job.id);
                      }}
                    >
                      <View style={{ flexDirection: "column" }}>
                        <Text>{job.title}</Text>
                        <Text note style={{ fontSize: 12 }}>
                          {this.state.dataStream.company.display_name}
                        </Text>
                      </View>
                    </ListItem>
                  );
                })}
              </List>
            : <ActivityIcon />}
        </ScrollView>
        <ActionButton
          buttonColor="rgba(30,144,255,1)"
          backgroundTappable={true}
          degrees={135}
          onPress={() => {
            {
              /*GlobalFunction({ sceneName: "AddJob" });*/
            }
          }}
        >
          <ActionButton.Item
            buttonColor="#1E90FF"
            title="Add a job"
            onPress={() =>
              GlobalFunction({
                sceneName: "AddJob"
              })}
          >
            <Icon name="work" />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#1E90FF"
            title="Add a candidate"
            onPress={() =>
              GlobalFunction({
                sceneName: "AddCandidate"
              })}
          >
            <Icon name="wc" />
          </ActionButton.Item>
        </ActionButton>

      </View>
    );
  }
}

//View For job details.
export class JobDetail extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <CustomHeader navTitle="JOB DETAILS" />
        <Job id={this.props.jobId} />
      </View>
    );
  }
}

// AppRegistry.registerComponent('JobListing', () => JobListing)
module.exports = {
  JobDetail,
  JobListing
};
