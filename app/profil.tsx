import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import {
  ImageBackground,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MyNavBar from "../components/MyNavBar";
import { UserContext } from "../context/UserContext";

const image = require("../assets/images/1.png");

export default function Profil() {
  const { userData, setUserData } = useContext(UserContext);
  const [profile, setProfile] = useState(userData);

  useEffect(() => {
    const loadProfile = async () => {
      // Si UserContext vide, on récupère depuis AsyncStorage
      if (!userData) {
        const json = await AsyncStorage.getItem("userData");
        if (json) {
          const parsed = JSON.parse(json);
          setProfile(parsed);
          setUserData(parsed); // mettre à jour UserContext
        }
      }
    };
    loadProfile();
  }, []);

  if (!profile) return <Text style={{ textAlign: "center", marginTop: 50 }}>Chargement...</Text>;

  const formattedDateOfBirth = profile.dateDeNaissance
    ? new Date(profile.dateDeNaissance).toLocaleDateString("fr-FR")
    : "";

  return (
    <SafeAreaView style={styles.fullScreen}>
      <ImageBackground source={image} style={styles.background}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
        <MyNavBar />
        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>ETAT CIVIL DE BASE</Text>
            <Text style={styles.label}>Nom : {profile.nom}</Text>
            <Text style={styles.label}>Prénom : {profile.prenoms}</Text>
            <Text style={styles.label}>Date de naissance : {formattedDateOfBirth}</Text>
            <Text style={styles.label}>
              Nationalité : {profile.langue === "MLG" ? "Malagasy" : profile.langue === "FR" ? "Français" : "Autre"}
            </Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>COORDONNEES</Text>
            <Text style={styles.label}>Adresse : {profile.adresse}</Text>
            <Text style={styles.label}>Numéro de téléphone : {profile.telephone}</Text>
            <Text style={styles.label}>Email : {profile.email}</Text>
            <Text style={styles.label}>Langue : {profile.langue}</Text>
          </View>
        </View>
        <View style={styles.contactChannel}>
          <Text style={styles.channelTitle}>CANAL DE CONTACT :</Text>
          <View style={styles.channelRow}>
            <Text>Contactez nous sur :</Text>
            <TouchableOpacity onPress={() => Linking.openURL("mailto:E-taratasy@gmail.com")}>
              <Text style={styles.email}>E-taratasy@gmail.com</Text>
            </TouchableOpacity>
            <Text> ou par: </Text>
            <Text style={styles.sms}>SMS vers 037 45 264 11</Text>
          </View>
        </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullScreen: { flex: 1 },
  scrollContent: { flexGrow: 1, justifyContent: "flex-start", alignItems: "center", paddingVertical: 20 },
  background: { flex: 1, width: "100%", height: "100%", resizeMode: "cover" },
  content: { flexDirection: "column", justifyContent: "flex-start", alignItems: "center", width: "100%", marginBottom: 24 },
  card: { backgroundColor: "#F1F1F2", width: "90%", borderRadius: 12, padding: 18, marginHorizontal: 8, marginTop: 20 },
  cardTitle: { textAlign: "center", fontWeight: "bold", fontSize: 18, marginBottom: 16 },
  label: { marginTop: 10, fontSize: 15, color: "#333", fontWeight: "bold" },
  val: { color: "#222", fontSize: 15, marginLeft: 8 },
  contactChannel: { alignItems: "center", justifyContent: "center", marginTop: 8 },
  channelTitle: { fontWeight: "bold", fontSize: 13, marginBottom: 6 },
  channelRow: { flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 8, alignItems: "center" },
  email: { color: "blue", textDecorationLine: "underline", marginHorizontal: 2 },
  sms: { color: "#222", marginLeft: 2 },
});
