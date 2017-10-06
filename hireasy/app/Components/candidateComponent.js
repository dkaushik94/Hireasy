import React, { Component } from "react";

import { 
  Text, 
  View, 
  StyleSheet, 
  ScrollView 
} from "react-native";

import { 
  Badge, 
  Content, 
  Icon,
  List, 
  ListItem, 
  Right 
} from "native-base";

import { GlobalFunction } from "../globalAssets.js";

class Candidate extends Component {
  render() {
    // }
    // let url = {
    //   'uri':'http://aspireid.com/wp/wp-content/uploads/sample-customer-photo2.jpg',
    return (
      <View style={{ marginBottom: 20 }}>
        <Text>{this.props.name}</Text>
        <Text>{this.props.company}</Text>
      </View>
    );
  }
}

class CandidateList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page_no: 1
    };
  }
  componentWillMount() {
    console.log(this.props.id);
  }
  render() {
    return (
      <List>
        {this.props.candidates.map((candidate) => {
          return (
            <ListItem
              key={candidate.id}
              onPress={() => {
                GlobalFunction({
                  candidateId: candidate.id,
                  sceneName: "CandidateDetails"
                });
              }}
            >
              <Text>{candidate.first_name + " " + candidate.last_name}</Text>
              <Right>
                <Icon name='ios-arrow-forward' style={{color: '#004445'}} />
              </Right>
            </ListItem>
          );
        })}
      </List>
    );
  }
}

/*class CandidateResponse extends Component{
    componentDidMount(){
      console.log("Component did mount.")
    }
    render(){
      const style ={
        container:{
          alignItems: 'center',
          margin: 20,
        }
      }
      return(
        <View>
        </View>
        )
    }
}*/

styles = StyleSheet.create({
  subtitles: {
    marginTop: 10
  }
});

module.exports = {
  Candidate,
  CandidateList
};

// {
//   /*<View>
// 								<List style={{marginTop: 15, marginBottom:15}}>
// 									<View style={{flexDirection:'row', justifyContent: 'space-between' , paddingRight:15, marginTop:5, marginBottom:5}}>
// 										<H3 style={{marginLeft:15}}>CANDIDATES</H3>
// 										<TouchableOpacity>
// 											<Icon color="#000000" name="add-circle-outline" size={25} onPress={()=>{
// 												GlobalFunction({sceneName: 'AddCandidate'})
// 											}} />
// 										</TouchableOpacity>
// 									</View>
// 									{
// 										this.state.dataStream.candidates.length>0?
// 											(
// 												this.state.dataStream.candidates.map((candidate) => {
// 													return(
// 														<ListItem key={candidate.id} button onPress={() => {
// 															GlobalFunction({
// 																	"candidateId":candidate.id,
// 																	"sceneName":"CandidateDetails"
// 																})
// 															}
// 														}>
// 															<Text>{candidate.first_name+" "+candidate.last_name}</Text>
// 															<Badge style={{backgroundColor:'#008000'}}>Applied</Badge>
// 														</ListItem>
// 														)
// 													})
// 											)
// 											:
// 											(
// 												<ListItem>
// 													<Text style={{alignItems:'center'}}>No candidates added for this job.</Text>
// 												</ListItem>
// 											)
// 									}
// 								</List>
// 							</View>*/
// }
