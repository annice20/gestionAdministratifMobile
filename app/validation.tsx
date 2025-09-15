import React, { useRef, useState } from "react";
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const image = require("../assets/images/1.png");

export default function VerificationScreen() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      if (inputs.current[index + 1]) {
        inputs.current[index + 1]?.focus();
      }
    }
  };

const handleSubmit = async () => {
  const finalCode = code.join("");
  if (finalCode.length < 6) {
    alert("Veuillez entrer le code complet !");
    return;
  }

  try {
    // Envoi au backend
    const response = await fetch("http://10.0.2.2:5000/api/verify-code", {
      // ⚠️ Sur Android Emulator, localhost = 10.0.2.2
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "test@example.com", // 👉 même email que dans ta base MySQL
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
                  ref={ref => { inputs.current[index] = ref; }}
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

            <Text style={styles.resendText}>
              Vous n’avez pas encore reçu le code ?{" "}
              <Text style={styles.resendLink}>Renvoyer</Text>
            </Text>
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
    backgroundColor: "#d6c3c3",
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
