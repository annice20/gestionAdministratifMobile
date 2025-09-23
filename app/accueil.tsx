import MyNavBar from "@/components/MyNavBar";
import { deactivateKeepAwake } from "expo-keep-awake";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

deactivateKeepAwake(); // ⬅️ désactive le mode "anti-veille" qui cause ton bug

const image = require("../assets/images/1.png");

export default function Index() {
  return (
    <SafeAreaView style={styles.fullScreen}>
      <ImageBackground source={image} style={styles.background}>
        <MyNavBar />
        <View style={styles.container}>
          <Text style={styles.introtitle}>Bienvenue chez E -Taratasy !</Text>
          <Text style={styles.intro}>
            Fini les files d’attente et les démarches compliquées ! 
            Notre plateforme vous permet de déposer, suivre et finaliser vos demandes administratives en ligne, rapidement en toute sécurité, où que vous soyez.
          </Text>
          <Text style={styles.intro}>OBJECTIFS SPECIFIQUES</Text>
          <View style={styles.tousinfo}>
            <Text style={styles.lesinfos}>Simplifier vos démarches en regroupant tous vos dossiers en un seul espace en ligne.</Text>
            <Text style={styles.lesinfos}>Suivre l’avancement de vos demandes en temps réel.</Text>
            <Text style={styles.lesinfos}>Recevoir des alertes par e-mail ou sms à chaque étape importante</Text>
            <Text style={styles.lesinfos}>Garantir la sécurité et la confidentialité de vos données</Text>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  container: {
    marginTop: 20,
  },

  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  introtitle: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 40,
    color: "#A7690B",
  },

  intro: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 40,
  },

  tousinfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: 10, // espace horizontal ET vertical
    marginLeft: 20,
    marginRight: 20,
  },

  lesinfos: {
    width: 150,
    height: 100,
    backgroundColor: "#436787",
    color: "white",
    textAlign: "center",
  },
});
