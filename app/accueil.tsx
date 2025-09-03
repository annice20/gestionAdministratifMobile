import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const image = require("../assets/images/1.png");

export default function Index() {
  return (
    <SafeAreaView style={styles.fullScreen}>
      <ImageBackground source={image} style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.intro}>Bienvenue chez E -Taratasy !</Text>
          <Text style={styles.intro}>Fini les files d’attente et les démarches compliquées ! 
            Notre plateforme vous permet de déposer, suivre et finaliser vos demandes administratives en ligne, rapidement en toute sécurité, où que vous soyez.</Text>
          <TouchableOpacity style={styles.inscription}>
            <Text style={styles.textbtn}>S’inscrire</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.connexion}>
            <Text style={styles.textbtn}>Se connecter</Text>
          </TouchableOpacity>
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
    marginTop: 200,
  },

  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  intro: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 40,
  },
  
  inscription: {
    backgroundColor: "#B41818",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    margin: "auto",
    width: 160,
    marginBottom: 24
  },

  connexion: {
    backgroundColor: "#0F2F65",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    margin: "auto",
    width: 160,
  },

  textbtn: {
    color: "white",
  }
});