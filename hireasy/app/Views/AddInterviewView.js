import React, { Component } from "react";
import {
  AppRegistry,
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  ToastAndroid,
} from "react-native";
import {
  Button,
  Content,
  Form,
  Input,
  Item,
  Label,
  H2,
  List
} from "native-base";
import { Question } from "../Components/interviewComponents.js";
import { getData, ActivityIcon } from "../globalAssets.js";
import { Grid, Row, Col } from "react-native-easy-grid";
import Icon from "react-native-vector-icons/FontAwesome";

class AddInterview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createQuestion: false,
      dataStream: {},
      selectedQuestions: {},
      question: {},
      candidate: [
        this.props.candidateId
          ? this.props.candidateId
          : "2d4f0415-a891-45dc-8eeb-b1b0de91ffdf"
      ],
      type: "",
      description: ""
    };
  }

  createQuestionState(cbParams) {
    let tempState = {};
    cbParams.componentRef.state.dataStream.map(ques => {
      tempState[ques.id] = false;
    });
    cbParams.componentRef.setState({
      selectedQuestions: tempState
    });
  }

  componentWillMount() {
    console.log(this.props.candidateId);
    let compRef = this;
    let params = {
      method: "GET",
      routeSuffix: "QuestionsRoute",
      queryParameters: {
        page_no: 1
      },
      authToken: "Token 54cdfd3ad4650328c3c381ebfac2eda7d09bd64c"
    };
    getData(
      compRef,
      params,
      (callbackFunction = this.createQuestionState),
      (cbParams = {
        componentRef: compRef
      })
    );
  }

  formHandler(key, value) {
    let tempState = this.state;
    tempState.question[key] = value;
    this.setState(tempState, () => console.log(this.state));
  }

  selectQuestion(ID) {
    let tempState = this.state.selectedQuestions;

    if (tempState[ID]) {
      tempState[ID] = false;
      this.setState({
        selectedQuestions: tempState
      });
    } else {
      tempState[ID] = true;
      this.setState({
        selectedQuestions: tempState
      });
    }
  }

  appendCreatedQuestion(cbParams) {
    let tempState = cbParams.componentRef.state;
    tempState.question = {};
    tempState.dataStream.push(cbParams.cbData);
    cbParams.componentRef.setState(tempState, () =>
      console.log(cbParams.componentRef.state));
  }

  postQuestion() {
    let compRef = this;
    let params = {
      method: "POST",
      routeSuffix: "QuestionsRoute",
      queryParameters: this.state.question,
      authToken: "Token 54cdfd3ad4650328c3c381ebfac2eda7d09bd64c"
    };
    getData(
      compRef,
      params,
      (callbackFunction = this.appendCreatedQuestion),
      (cbParams = {
        componentRef: compRef
      })
    );
  }

  createPostData() {
    let questionArray = [];
    let formData = {}
    Object.keys(this.state.selectedQuestions).map(item => {
      if (this.state.selectedQuestions[item]) {
        questionArray.push(item);
        return 0;
      }
    });
    if(
      this.state.type 
      &&
      this.state.description 
      &&
      questionArray.length>0
      &&
      this.state.candidate.length>0
    )
    {
      formData['type'] = this.state.type;
      formData['description'] = this.state.description;
      formData['questions'] = questionArray; 
      formData['candidate'] = this.state.candidate[0];
      formData['open_job'] = '9dd067ed-4d77-4822-96ce-65785e8de626'
      
      return formData;

    } else {
      
      ToastAndroid.showWithGravity(
        'Please make sure you have selected questions and filled all the fields.',
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
    }
  }

  createTest(){
    console.log("createTest called!");
    ToastAndroid.showWithGravity(
      'The interview has been created and the candidate has been notified.',
      ToastAndroid.LONG,
      ToastAndroid.CENTER
    )
    console.log(cbParams.cbData)
  }

  render() {
    return (
      <Content>
        <Grid>
          <Row size={70}>
            <Grid>
              <Row size={1} style={{ flexDirection: "column", padding: 10 }}>
                <H2>Question Bank</H2>
                <Text>Select or create questions:</Text>
              </Row>
              <Row size={4} style={{ borderWidth: 1, margin: 5 }}>
                <Content>
                  {Object.keys(this.state.dataStream).length > 0
                    ? this.state.dataStream.map((item, i) => {
                        return (
                          <Question
                            selected={this.state.selectedQuestions[item.id]}
                            questionText={item.text}
                            key={i}
                            responseTime={item.time}
                            changeState={() => this.selectQuestion(item.id)}
                          />
                        );
                      })
                    : <ActivityIcon />}
                </Content>
              </Row>
              <Row size={3} style={{ margin: 5 }}>
                {this.state.createQuestion
                  ? <Content>
                      <Form style={{ borderWidth: 1 }}>
                        <Text style={{ padding: 10 }}>Create a question</Text>
                        <Item floatingLabel>
                          <Label>Question</Label>
                          <Input
                            onChangeText={data => {
                              this.formHandler("text", data);
                            }}
                          />
                        </Item>
                        <Item floatingLabel>
                          <Label>Response Time</Label>
                          <Input
                            onChangeText={data => {
                              this.formHandler("time", data);
                            }}
                          />
                        </Item>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-around",
                            marginVertical: 10
                          }}
                        >
                          <Button
                            success
                            style={{ margin: 5 }}
                            onPress={() => {
                              let tempState = this.state;
                              tempState.createQuestion = false;
                              this.setState(tempState, () => {
                                this.postQuestion();
                              });
                            }}
                          >
                            <Text>Create Question</Text>
                          </Button>
                          <Button
                            success
                            style={{ margin: 5 }}
                            onPress={() => {
                              let tempState = this.state;
                              tempState.createQuestion = false;
                              this.setState(tempState);
                            }}
                          >
                            <Text>Cancel</Text>
                          </Button>
                        </View>
                      </Form>
                    </Content>
                  : <Grid>
                      <Col style={{ alignItems: "center" }}>
                        <Icon
                          name="plus"
                          color="#2C7873"
                          size={30}
                          onPress={() => {
                            let tempState = this.state;
                            tempState.createQuestion = true;
                            this.setState(tempState);
                          }}
                        />
                      </Col>
                    </Grid>}
              </Row>
            </Grid>
          </Row>
          <Row size={30} style={{ margin: 5 }}>
            <Content>
              <Form style={{ borderWidth: 1 }}>
                <Item floatingLabel>
                  <Label>Type</Label>
                  <Input
                    onChangeText={data => {
                      let tempState = this.state;
                      tempState.type = data;
                      this.setState(tempState, () => console.log(this.state));
                    }}
                  />
                </Item>
                <Item floatingLabel>
                  <Label>Description</Label>
                  <Input
                    onChangeText={data => {
                      let tempState = this.state;
                      tempState.description = data;
                      this.setState(tempState);
                    }}
                  />
                </Item>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginVertical: 10
                  }}
                >
                  <Button
                    success
                    style={{ margin: 5 }}
                    onPress={() => {
                      let formData = this.createPostData();
                      let params = {
                        method: 'POST',
                        routeSuffix: 'InterviewRoute',
                        queryParameters: formData,
                      };
                       
                      Alert.alert(
                        "Are you sure?",
                        "Please make sure you have input credible details. If you are sure press okay, or cancel to correct the data.",
                        [
                          {
                            text: 'I am sure!',
                            onPress: ()=>{
                              getData(
                                this,
                                params,
                                callbackFunction = this.createTest,
                                cbParamas = {
                                  param: null,
                                }
                              )
                            }
                          },
                          {
                            text:'Take me back.',
                            onPress: ()=>{
                              ToastAndroid.showWithGravity(
                                'Please correct the fields.',
                                ToastAndroid.LONG,
                                ToastAndroid.CENTER
                              )
                            }
                          },
                          {
                            cancelable: false,
                          },
                        ]
                      )

                    }}
                  >
                    <Text>Create Test</Text>
                  </Button>
                </View>
              </Form>
            </Content>
          </Row>
        </Grid>
      </Content>
    );
  }
}

module.exports = {
  AddInterview
};


let e = {
  type: "frog re",
  description: "Davidson",
  questions: [
    "8334f0c2-0637-480a-a286-e695bc9e908b",
    "17a1a044-c3aa-45b3-9d6f-7cdc5980e1e1",
    "499af588-fa25-410c-abbc-36389986ee93",
    "663222a1-baa2-4b20-a4d6-95b9035d0a38",
    "1e36774a-42f6-46ae-9472-ac188a294eac"
  ],
  candidate: "2d4f0415-a891-45dc-8eeb-b1b0de91ffdf"
};
