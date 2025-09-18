import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useRef, useContext } from "react";
import { UserContext } from "./UserContext";

const image = require("../assets/images/1.png");

const API_BASE_URL = "http://10.0.2.2:5000/api"; // ⚠️ Ajuster selon l'environnement (10.0.2.2 pour Android Emulator)

export default function VerificationScreen() {
  const { userData } = useContext(UserContext);
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputs = useRef<Array<TextInput | null>>([]);

  const handleChange = (value: string, index: number) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    } else if (!value && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    alert("Code renvoyé !");
    // Ici, ajouter la logique pour renvoyer le code via API si nécessaire
  };

  const handleSubmit = async () => {
    const finalCode = code.join("");
    if (finalCode.length < 6) {
      alert("Veuillez entrer le code complet !");
      return;
    }

    try {
      // Envoi au backend
      const response = await fetch(`${API_BASE_URL}/verify-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userData.email, // Utilise l'email depuis le contexte
          code: finalCode,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("✅ Code correct !");
        // Ici tu peux rediriger l’utilisateur vers une autre page
      } else {
        alert("❌ " + data.message);
      }
    } catch (error) {
      console.error(error);
      alert("⚠️ Erreur de connexion au serveur !");
    }
  };

  return (
    <SafeAreaView style={styles.fullScreen}>
      <ImageBackground source={image} style={styles.background}>
        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.title}>Code de vérification</Text>
            <Text style={styles.subtitle}>
              Veuillez entrer le code de sécurité par mail
            </Text>

            <View style={styles.codeContainer}>
              {code.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => { inputs.current[index] = ref; }}
                  style={styles.input}
                  maxLength={1}
                  keyboardType="number-pad"
                  value={digit}
                  onChangeText={(value) => handleChange(value, index)}
                />
              ))}
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Envoyer</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleResend}>
              <Text style={styles.resendText}>
                Vous n’avez pas encore reçu le code ?{" "}
                <Text style={styles.resendLink}>Renvoyer</Text>
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  card: {
    backgroundColor: "grey",
    borderRadius: 15,
    padding: 25,
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    height: "70%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 25,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    width: 40,
    height: 45,
    textAlign: "center",
    fontSize: 18,
    marginHorizontal: 5,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#1a00d6",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  resendText: {
    fontSize: 13,
    color: "#333",
  },
  resendLink: {
    color: "#1a00d6",
    fontWeight: "bold",
  },
});
