import React, { Component } from "react";
import { AsyncStorage, View, ToastAndroid } from "react-native";

//Package Imports
import { Actions, Scene } from "react-native-router-flux";
import { Spinner } from "native-base";

import { JobListing, JobDetail } from "./Views/OpenJobs.js";
import { BASEURL, APIROUTES } from "./Network/apiRoutes.js";

function GlobalFunction(params) {
  if (params.sceneName == "JobDetails") {
    Actions.JobDetails({ jobId: params.jobId });
  } else if (params.sceneName == "CandidateDetails") {
    Actions.CandidateDetails({ candidateId: params.candidateId });
  } else if (params.sceneName == "AddJob") {
    Actions.AddJob();
  } else if (params.sceneName == "AddCandidate") {
    Actions.AddCandidate();
  } else if (params.sceneName == "CreateInterview") {
    Actions.AddInterview({ candidateId: params.candidateId });
  } else if (params.sceneName == "OpenJobs") {
    Actions.OpenJobs();
  }
}

//API data fetch section.

//Function to convert query dictionary into GET params.

// var authtoken = AsyncStorage.getItem('Token').then(result => result.data).then(data=>console.log(data))

function convertParameters(params) {
  let arr = [], st;
  Object.entries(params).map(([k, v]) => {
    st = k + "=" + v;
    arr.push(st);
  });
  return arr.join("&");
}

//Data fetching function.
// params: method, queryParameters, componentRef : reference pointer of the component whose state is to be set.
const getData = (
  componentRef = null,
  params,
  callbackFunction = null,
  cbParams = null,
  append = null,
  appendKey = null
) => {
  let Token = AsyncStorage.getItem("AuthToken").then(data => {
    //GET
    if (params.method == "GET") {
      //Create GET Querystring
      let queryStr = convertParameters(params.queryParameters);

      //construct GET url.
      let url = BASEURL + APIROUTES[params.routeSuffix] + "?" + queryStr;
      //Fetch Call.
      // (
      //   Process: Fetch > check response or toast > take context state and update it.
      // )
      fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Token " + data
        }
      })
        .then(res => {
          if (res.ok) {
            return res;
          } else {
            console.log("Error", res.json());
            ToastAndroid.showWithGravity(
              "Oops! We couldn't get a reponse from the server. Please try again later.",
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM
            );
          }
        })
        .then(res => {
          return res.json();
        })
        .then(res => {
          if (componentRef != null) {
            if (append == true && appendKey != null) {
              //<<<<<CODE TO BE WRITTEN FOR LAZY SCROLLER>>>>>>.
            } else {
              componentRef.setState(
                {
                  dataStream: res.data
                },
                () => {
                  if (callbackFunction != null) {
                    if (cbParams) {
                      cbParams["id"] = res.data.id;
                      callbackFunction(cbParams);
                    } else {
                      callbackFunction();
                    }
                  } else {
                    console.log(res.data);
                  }
                }
              );
            }
          } else if (componentRef != null && callbackFunction != null) {
            console.log("Exernal Callback scope.");
            callbackFunction();
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else if (params.method == "POST") {
      //POST
      //construct request URL
      let url = BASEURL + APIROUTES[params.routeSuffix];
      console.log(
        "This is the stringified dict: \n",
        JSON.stringify(params.queryParameters)
      );
      let headers = {}
      if(data){
        headers = {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Token " + data,
        }
      } else {
        headers = {
          "Accept": "application/json",
          "Content-Type": "application/json",
        }
      }


      //Request block for POST request.
      fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(params.queryParameters)
      })
        .then(res => {
          if (res.ok) {
            return res;
          } else {
            console.log(res);
            ToastAndroid.showWithGravity(
              "Oops! We couldn't get a reponse from the server. Please try again later.",
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM
            );
          }
        })
        .then(res => {
          return res.json();
        })
        .then(res => {
          if (componentRef != null && callbackFunction == null) {
            if (append == true && appendKey != null) {
              //<<<<<CODE TO BE WRITTEN FOR LAZY SCROLLER>>>>>>.
            } else {
              componentRef.setState({
                dataStream: res.data
              });
            }
          } else if (componentRef != null && callbackFunction != null) {
            cbParams["cbData"] = res.data;
            if (res.token) {
              cbParams["token"] = res.token;
            }
            callbackFunction(cbParams ? cbParams : undefined);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  });
};

//Common Components

//Spinner class.
class ActivityIcon extends Component {
  render() {
    return (
      <View style={{ alignItems: "center" }}>
        <Spinner size={this.props.size} color="#6FB98F" />
      </View>
    );
  }
}

module.exports = {
  GlobalFunction,
  getData,
  ActivityIcon
};
