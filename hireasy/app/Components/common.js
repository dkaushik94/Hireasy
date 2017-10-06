import React, { Component } from "react";
import { Text } from "react-native";
import {
  Badge,
  Body,
  Button,
  Header,
  Icon,
  Left,
  Right,
  Title
} from "native-base";
import { Actions } from "react-native-router-flux";

///Header Component.
class CustomHeader extends Component {
  render() {
    return (
      <Header style={{ backgroundColor: "#1E90FF" }}>
        {this.props.navButton
          ? <Left size={10}>
              <Button
                transparent
                onPress={() => {
                  Actions.pop();
                }}
              >
                <Icon name="ios-arrow-back" style={{ color: "white" }} />
              </Button>
            </Left>
          : undefined}
        <Body>
          <Title>{this.props.navTitle}</Title>
        </Body>
        {this.props.badge
          ? <Right>
              <Badge style={{ backgroundColor: "#FFFFFF", paddingTop:3}}>
                <Text style={{ color: "#5b00ff" }}>
                  {this.props.badgeValue}
                </Text>
              </Badge>
            </Right>
          : undefined}
      </Header>
    );
  }
}

CustomHeader.defaultProps = {
  badge: false,
  badgeValue: 0,
  navButton: true,
  navTitle: "Title"
};

module.exports = {
  CustomHeader
};
