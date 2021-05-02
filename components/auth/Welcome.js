import React, { Component } from "react";
import firebase from "firebase";
import { View, Text, Button } from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { fetchUser } from "../../redux/actions/index";
class Welcome extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    const { currentUser } = this.props;

    if (!currentUser) {
      return <View />;
    }
    return (
      <View>
        <Text>User Authenticated</Text>
        <Text>{JSON.stringify(currentUser)}</Text>
      </View>
    );
  }
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
