import React, { useContext } from "react";
import {
  ImageBackground,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MyNavBar from "../components/MyNavBar";
import { UserContext } from "./UserContext"; // Importez le contexte

const image = require("../assets/images/1.png");

export default function Profil() {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("UserContext must be used within a UserProvider");
  }

  const { userData } = userContext;

  const formattedDateOfBirth = userData?.dateDeNaissance
    ? new Date(userData.dateDeNaissance).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "";

  return (
    <SafeAreaView style={styles.fullScreen}>
      <ImageBackground source={image} style={styles.background}>
        <MyNavBar />
        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>ETAT CIVIL DE BASE</Text>
            <Text style={styles.label}>Nom :</Text>
            <Text style={styles.val}>{userData.nom}</Text>
            <Text style={styles.label}>Prénom :</Text>
            <Text style={styles.val}>{userData.prenoms}</Text>
            <Text style={styles.label}>Date de naissance :</Text>
            <Text style={styles.val}>{formattedDateOfBirth}</Text>
            <Text style={styles.label}>Nationalité :</Text>
            <Text style={styles.val}>{userData.nationalite || "Non renseignée"}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>COORDONNEES</Text>
            <Text style={styles.label}>Adresse :</Text>
            <Text style={styles.val}>{userData.adresse}</Text>
            <Text style={styles.label}>Numéro de téléphone :</Text>
            <Text style={styles.val}>{userData.telephone}</Text>
            <Text style={styles.label}>Email :</Text>
            <Text style={styles.val}>{userData.email}</Text>
            <Text style={styles.label}>Langue :</Text>
            <Text style={styles.val}>{userData.langue}</Text>
          </View>
        </View>
        <View style={styles.contactChannel}>
          <Text style={styles.channelTitle}>CANAL DE CONTACT :</Text>
          <View style={styles.channelRow}>
            <Text>Contactez nous sur :</Text>
            <TouchableOpacity onPress={() => Linking.openURL("mailto:E-taratasy@gmail.com")}>
              <Text style={styles.email}>E-taratasy@gmail.com</Text>
            </TouchableOpacity>
            <Text>ou par:</Text>
            <Text style={styles.sms}>SMS vers 037 45 264 11</Text>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullScreen: { flex: 1 },
  background: { flex: 1, width: "100%", height: "100%", resizeMode: "cover" },
  menuItem: {
    color: "#222",
    fontWeight: "bold",
    fontSize: 14,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    width: "100%",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#F1F1F2",
    width: "40%",
    borderRadius: 12,
    padding: 18,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.11,
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: 8,
    marginTop: 20,
  },
  cardTitle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 16,
  },
  label: {
    marginTop: 10,
    fontSize: 15,
    color: "#333",
    fontWeight: "bold",
  },
  val: {
    color: "#222",
    fontSize: 15,
    marginLeft: 8,
  },
  contactChannel: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  channelTitle: {
    fontWeight: "bold",
    fontSize: 13,
    marginBottom: 6,
  },
  channelRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 8,
    alignItems: "center",
  },
  email: {
    color: "blue",
    textDecorationLine: "underline",
    marginHorizontal: 2,
  },
  sms: {
    color: "#222",
    marginLeft: 2,
  },
});