import React from "react";
import { StyleSheet, View } from "react-native";
import {
  VictoryChart,
  VictoryLine,
  VictoryArea,
  VictoryStack,
  VictoryTheme,
  VictoryAxis,
  VictoryGroup,
  VictoryLegend,
  VictoryLabel,
} from "victory-native";

import data from "./data.json";
import { Svg } from "react-native-svg";
export default function LineChart() {
  const { growth_standard } = data;
  const { height_for_age } = growth_standard;
  const { girls } = height_for_age;

  const median = getY("median", girls);
  const min1sd = getY("-1sd", girls);
  const min2sd = getY("-2sd", girls);
  const min3sd = getY("-3sd", girls);

  const plus1sd = getY("1sd", girls);
  const plus2sd = getY("2sd", girls);
  const plus3sd = getY("3sd", girls);

  return (
    <View style={styles.container}>
      {/* median */}
      <VictoryChart
        style={{
          background: "#fff",
          height: 700,
        }}
      >
        <VictoryLabel x={40} y={30} text="cm" textAnchor="end" />
        {/* <VictoryStack > */}
        <VictoryGroup data={min3sd}>
          <VictoryLine style={{ data: { stroke: "#f8da08" } }} />
        </VictoryGroup>
        <VictoryGroup data={min2sd}>
          <VictoryLine style={{ data: { stroke: "#84b923" } }} />
        </VictoryGroup>
        <VictoryGroup data={min1sd}>
          <VictoryLine style={{ data: { stroke: "#22a437" } }} />
        </VictoryGroup>
        <VictoryGroup data={median}>
          <VictoryLine style={{ data: { stroke: "#22a437" } }} />
        </VictoryGroup>
        <VictoryGroup data={plus1sd}>
          <VictoryLine style={{ data: { stroke: "#22a437" } }} />
        </VictoryGroup>
        <VictoryGroup data={plus2sd}>
          <VictoryLine style={{ data: { stroke: "#84b923" } }} />
        </VictoryGroup>
        <VictoryGroup data={plus3sd}>
          <VictoryLine style={{ data: { stroke: "#f8da08" } }} />
        </VictoryGroup>
      </VictoryChart>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff",
  },
});

function getY(key, array) {
  return array.map((object) => {
    return {
      x: object.weeks,
      y: object[key],
    };
  });
}

function random() {
  return {
    x: Math.random() * 10,
    y: Math.random() * 20,
  };
}
