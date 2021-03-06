import React from "react";
import { Platform, Button } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator
} from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { fromRight } from "react-navigation-transitions";

import TabBarIcon from "../components/TabBarIcon";
import WelcomeScreen from "../screens/WelcomeScreen";
import HomeScreen from "../screens/HomeScreen";
import QuizzesScreen from "../screens/QuizzesScreen";
import QuizScreen from "../screens/QuizScreen";
import FlashcardsScreen from "../screens/FlashcardsScreen";
import ExploreLabScreen from "../screens/ExploreLabScreen";
import colors from "../assets/colors";
import ExploreLabVideosScreen from "../screens/ExploreLabVideosScreen";
import ExploreLabLearnScreen from "../screens/ExploreLabLearnScreen";
import FlashStack from "../screens/FlashStack";
import AboutUsScreen from "../screens/AboutUsScreen";
import ExploreLabLearnDropdownOptionScreen from "../screens/ExploreLabLearnDropdownOptionScreen";

const HomeStack = createStackNavigator(
  {
    AboutUs: AboutUsScreen,
    Home: HomeScreen,
  },
  { initialRouteName: "Home", transitionConfig: () => fromRight() }
);

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      style={{marginBottom: -3}}
      focused={focused}
      name={Platform.OS === "ios" ? "ios-home" : "md-home"}
    />
  )
};

HomeStack.path = "";

const ExploreLabStack = createStackNavigator(
  {
    AboutUs: AboutUsScreen,
    ExploreLab: ExploreLabScreen,
    ExploreLabVideos: ExploreLabVideosScreen,
    ExploreLabLearn: ExploreLabLearnScreen,
    ExploreLabLearnDropdownOption: ExploreLabLearnDropdownOptionScreen
  },
  { initialRouteName: "ExploreLab", transitionConfig: () => fromRight() }
);

ExploreLabStack.navigationOptions = {
  tabBarLabel: "Explore Lab",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      style={{marginBottom: -3}}
      focused={focused}
      name={Platform.OS === "ios" ? "ios-body" : "md-body"}
    />
  )
};

ExploreLabStack.path = "";

const QuizzesStack = createStackNavigator(
  {
    AboutUs: AboutUsScreen,
    Quizzes: QuizzesScreen,
    Quiz: { screen: QuizScreen}
  },
  { 
    initialRouteName: "Quizzes", 
    transitionConfig: () => fromRight() 
  }
);

QuizzesStack.navigationOptions = {
  tabBarLabel: "Quizzes",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      style={{marginBottom: -3}}
      focused={focused}
      name={Platform.OS === "ios" ? "ios-document" : "md-document"}
    />
  )
};

QuizzesStack.path = "";

const FlashcardsStack = createStackNavigator(
  {
    AboutUs: AboutUsScreen,
    Flashcards: FlashcardsScreen,
    FlashStack: FlashStack
  },
  { initialRouteName: "Flashcards", transitionConfig: () => fromRight() }
);

FlashcardsStack.navigationOptions = {
  tabBarLabel: "Flashcards",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      style={{marginBottom: -3}}
      focused={focused}
      name={Platform.OS === "ios" ? "ios-filing" : "md-filing"}
    />
  )
};

FlashcardsStack.path = "";

const TabNavigator = createMaterialBottomTabNavigator(
  {
    Home: HomeStack,
    Quiz: QuizzesStack,
    Flash: FlashcardsStack,
    Explore: ExploreLabStack,
  },
  {
    initialRouteName: "Home",
    activeColor: colors.tabActive,
    inactiveColor: colors.tabInactive,
    barStyle: { backgroundColor: colors.primary }
  }
);

TabNavigator.path = "";

const RootNavigator = createSwitchNavigator(
  {
    Welcome: {
      screen: WelcomeScreen
    },
    Root: TabNavigator
  },
  {
    initialRouteName: "Welcome"
  }
);

export default RootNavigator;
