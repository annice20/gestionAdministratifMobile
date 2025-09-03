import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Checkbox } from "expo-checkbox";
import { useRouter } from 'expo-router';
import { useState } from "react";
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const image = require("../assets/images/1.png");

export default function Login() {
  
  const [isChecked, setChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const login = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post('http://192.168.88.40:8081/api/login', { email, password });
      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('user_id', data.user_id.toString());
      router.push("/accueil");
    } catch (err: any) {
      setMessage('Email/Mot de passe incorrect');
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
            {message ? (
              <Text style={message.startsWith('Erreur') ? styles.messageError : styles.message}>
                {message}
              </Text>
            ) : null}

            <View>
              <TextInput 
                style={styles.input}
                placeholder="Entrer votre e-mail"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <View>
              <TextInput 
                style={styles.input}
                placeholder="Entrer le mot de passe"
                value={password}
                secureTextEntry={true}
                onChangeText={setPassword}
              />
              <Text style={styles.oublie}>Mot de passe oublié ?</Text>
            </View>
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
  fullScreen: {
    flex: 1,
  },
  container: {
    marginTop: 100,
  },

  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  titre:{
    textAlign: "center",
    marginTop: 20,
    fontSize: 20,
  },

  oublie: {
    textAlign: "center",
    color: "#363434",
  },

  input: {
    marginTop: 30,
    width: 240,
    borderRadius: 10,
    margin: 'auto',
    backgroundColor: "#FEFAFA",
  },

  section: {
    flexDirection: "row",
    alignItems: "center",
  },

  checkboxmain: {
    marginLeft: 34,
    marginTop: 30,
  },

  paragraph: {
    marginTop: 27,
    marginLeft: 10,
  },

  btnconnect: {
    backgroundColor: "#2513EC",
    width: 150,
    height: 45,
    borderRadius: 10,
    margin: "auto",
    marginTop: 30,
  },

  textconnect: {
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 12,
  },

  message: {
    textAlign: 'center',
    marginTop: 10,
    color: 'green',
  },
  messageError: {
    textAlign: 'center',
    marginTop: 10,
    color: 'red',
  },


  cardcontent: {
    width: 300,
    margin: "auto",
    borderWidth: 0,
    borderRadius: 10,
    height: 400,
    backgroundColor: "#C5ABAB",
  },
});