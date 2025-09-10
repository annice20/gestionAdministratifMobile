import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";

type RootStackParamList = {
  DecisionScreen: undefined;
  ReceptionScreen: undefined;
  DashboardScreen: undefined;
  ArchiveScreen: undefined;
  LogoutScreen: undefined;
};

const MyNavbarAdmin = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.navbar}>
      <ScrollView horizontal contentContainerStyle={styles.navContainer}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("DecisionScreen")}
        >
          <Text style={styles.navText}>Décision</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("ReceptionScreen")}
        >
          <Text style={styles.navText}>Récéption</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("DashboardScreen")}
        >
          <Text style={[styles.navText, styles.activeText]}>Tableau de bord</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("ArchiveScreen")}
        >
          <Text style={styles.navText}>Archivage</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("LogoutScreen")}
        >
          <Text style={styles.navText}>Déconnexion</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "#C5ABAB",
    paddingVertical: 10,
  },
  navContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  navItem: {
    marginHorizontal: 10,
  },
  navText: {
    fontSize: 16,
    color: "#000",
  },
  activeText: {
    fontWeight: "bold",
    color: "#333",
  },
});

export default MyNavbarAdmin;