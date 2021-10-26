import React, { Component, useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import HomeScreen from "../main/Home";
import { fetchUser } from "../../redux/actions/index";

const Stack = createStackNavigator();

function Welcome({ fetchUser, currentUser }) {
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchUser();
    }

    return () => {
      isMounted = false;
    };
  }, []);
  return <Stack.Screen name="Home" component={HomeScreen} />;
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
