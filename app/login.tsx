import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Checkbox } from "expo-checkbox";
import { useRouter } from 'expo-router';
import { useContext, useState } from "react";
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserContext } from "../context/UserContext";

const image = require("../assets/images/1.png");

export default function Login() {
  const [isChecked, setChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { setUserData, setToken } = useContext(UserContext);
  const router = useRouter();

  const login = async () => {
    setLoading(true);
    setMessage('');
    try {
      // 1️⃣ Login pour récupérer le token
      const { data } = await axios.post('http://192.168.88.74:8000/api/login', { email, password });

      const token = data.token;
      setToken(token);
      await AsyncStorage.setItem('token', token);

      // 2️⃣ Récupérer le profil utilisateur
      const resUser = await axios.get("http://192.168.88.74:8000/api/me", {
        headers: { Authorization: "Bearer " + token }
      });

      setUserData(resUser.data);
      await AsyncStorage.setItem("userData", JSON.stringify(resUser.data));

      // 3️⃣ Redirection vers l'accueil
      router.push("/accueil");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // Erreur venant de Symfony ou d’Axios
        console.log(error.response?.data || error.message);
        setMessage(error.response?.data?.error || "Erreur lors de la connexion");
      } else {
        // Erreur inconnue (runtime, bug JS, etc.)
        console.log("Unexpected error", error);
        setMessage("Erreur inconnue");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.fullScreen}>
      <ImageBackground source={image} style={styles.background}>
        <View style={styles.container}>
          <View style={styles.cardcontent}>
            <Text style={styles.titre}>Connexion</Text>
            {message ? <Text style={styles.messageError}>{message}</Text> : null}

            <TextInput
              style={styles.input}
              placeholder="Entrer votre e-mail"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Entrer le mot de passe"
              value={password}
              secureTextEntry
              onChangeText={setPassword}
            />
            <Text style={styles.oublie}>Mot de passe oublié ?</Text>

            <View style={styles.section}>
              <Checkbox
                style={styles.checkboxmain}
                value={isChecked}
                onValueChange={setChecked}
              />
              <Text style={styles.paragraph}>Se souvenir de moi</Text>
            </View>

            <TouchableOpacity
              style={styles.btnconnect}
              onPress={login}
              disabled={loading}
            >
              <Text style={styles.textconnect}>
                {loading ? 'Connexion...' : 'Se connecter'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullScreen: { flex: 1 },
  container: { marginTop: 100 },
  background: { flex: 1, width: "100%", height: "100%", resizeMode: "cover" },
  titre: { textAlign: "center", marginTop: 20, fontSize: 20 },
  oublie: { textAlign: "center", color: "#363434" },
  input: { marginTop: 30, width: 240, height: 50, borderRadius: 10, margin: 'auto', backgroundColor: "#FEFAFA" },
  section: { flexDirection: "row", alignItems: "center" },
  checkboxmain: { marginLeft: 34, marginTop: 30 },
  paragraph: { marginTop: 27, marginLeft: 10 },
  btnconnect: { backgroundColor: "#2513EC", width: 150, height: 45, borderRadius: 10, margin: "auto", marginTop: 30 },
  textconnect: { color: "#FFFFFF", textAlign: "center", marginTop: 12 },
  messageError: { textAlign: 'center', marginTop: 10, color: 'red' },
  cardcontent: { width: 300, margin: "auto", borderWidth: 0, borderRadius: 10, height: 400, backgroundColor: "#C5ABAB" },
});
