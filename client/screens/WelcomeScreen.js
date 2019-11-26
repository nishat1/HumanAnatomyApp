import React, { Component } from "react";
import { Button, Text, StyleSheet, SafeAreaView, View } from "react-native";
import colors from "../assets/colors";
import { InputStyled } from "../components/InputStyled";
import { ButtonStyled } from "../components/ButtonStyled";

export default class WelcomeScreen extends Component {
  static navigationOptions = {
    title: "Welcome",
    headerStyle: {
      backgroundColor: colors.primary
    },
    headerTintColor: colors.primaryText,
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.content}>
          <Text style={styles.heading}>WELCOME</Text>
          <InputStyled placeholder="     Insert the name of your university" />
          <InputStyled placeholder="     What is your degree?" />
          <InputStyled placeholder="     What is your degree level?" />
          <InputStyled placeholder="     Which year are you?" />
          <ButtonStyled
            text="Continue"
            onPress={() => this.props.navigation.navigate("Root")}
          />
          <Button
            title={"Not a Student?"}
            // onPress={() => this.props.navigation.navigate("Root")}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    color: "white",
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 16,
    fontFamily: "Helvetica"
  },
  wrapper: {
    flex: 1,
    backgroundColor: "#002145"
  },
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    padding: 32
  }
});
