/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
  TouchableHighlight,
  ToolbarAndroid,
  BackAndroid
} from "react-native";


import SplashScreen from "react-native-splash-screen";
import Sidemenu from "react-native-elements";
import {
  Actions,
  Scene,
  Router,
  ActionConst,
  Modal
} from "react-native-router-flux";
import { JobListing, JobDetail } from "./app/Views/OpenJobs.js";
import { CandidateDetail } from "./app/Views/CandidateView.js";
import { AddJob } from "./app/Views/AddJobView.js";
import { AddCandidate } from "./app/Views/AddCandidateView.js";
import { LoginView } from "./app/Views/LoginView.js";
import { AddInterview } from "./app/Views/AddInterviewView.js"
// const backGesture = () => {
//   console.log("Here.")
//   Actions.pop(refresh:{})
//   Actions.refresh()
// }

const scenes = Actions.create(
  <Scene key="root" hideNavBar={true} style = {{backgroundColor: "white"}}>
    <Scene 
      key="Login"
      initial={true}
      component={LoginView}
    />
    <Scene
      key="OpenJobs"
      component={JobListing}
      title="OPEN JOBS"
    />
    <Scene
      key="CandidateDetails"
      component={CandidateDetail}
      title="CANDIDATE DETAILS"
    />
    <Scene key="JobDetails" component={JobDetail} title="JOB DETAILS" />
    <Scene
      key="AddJob"
      animation="fade"
      component={AddJob}
      title="ADD A JOB"
      direction="vertical"
      duration={200}
      schema="modal"
    />
    <Scene
      key="AddCandidate"
      component={AddCandidate}
      title="ADD CANDIDATE"
      direction="vertical"
      duration={200} />
    <Scene 
      key="AddInterview"
      component={AddInterview}
      title="Add Interview"
    />
    </Scene>
);

// Main Entry point for the application.
export class Hireasy extends Component {
  componentDidMount() {
    setTimeout(
      () => {
        SplashScreen.hide();
      },
      2000
    );
    // SplashScreen.hide();;
  }

  render() {
    return <Router scenes={scenes} />;
  }
}

AppRegistry.registerComponent("Hireasy", () => Hireasy);
