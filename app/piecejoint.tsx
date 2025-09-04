import { useRouter } from 'expo-router';
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Switch,
  ViewStyle,
  Dimensions,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as DocumentPicker from "expo-document-picker";
import { Picker } from "@react-native-picker/picker";

import MyNavBar from "../components/MyNavBar";

const image = require("../assets/images/1.png");

const PieceJointeScreen = () => {
  const [typePiece, setTypePiece] = useState("");
  const [file, setFile] = useState<any>(null);
  const [nomFichier, setNomFichier] = useState("");
  const [hash, setHash] = useState("");
  const [url, setUrl] = useState("");
  const [taille, setTaille] = useState("");
  const [verifStatut, setVerifStatut] = useState(false);
  const [requestId, setRequestId] = useState("123"); // Remplace par la vraie valeur dynamique

  // Choisir un fichier
  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    if (!result.canceled) {
      setFile(result);
      setNomFichier(result.assets[0].name);
      setTaille(result.assets[0].size ? result.assets[0].size.toString() : "");
    }
  };

  // Soumettre le formulaire + upload fichier
  const handleSubmit = async () => {
    if (!file || !typePiece) {
      Alert.alert("Erreur", "Veuillez sélectionner un type et un fichier.");
      return;
    }

    const formData = new FormData();
    formData.append("typePiece", typePiece);
    formData.append("nomFichier", nomFichier);
    formData.append("hash", hash);
    formData.append("url", url);
    formData.append("taille", taille);
    formData.append("verifStatut", verifStatut.toString());

    const uri = file.assets[0].uri;
    const filename = file.assets[0].name;
    const filetype = file.assets[0].mimeType;

    formData.append("file", {
      uri,
      name: filename,
      type: filetype,
    } as any);

    try {
      const response = await fetch(
        `http://192.168.1.10:8000/api/piece-jointe/upload/ ${requestId}`,
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de l'upload");
      }

      const data = await response.json();
      Alert.alert("Succès", "Pièce jointe enregistrée ✅");
      console.log("Réponse du serveur :", data);
    } catch (error) {
      console.error("Erreur upload :", error);
      Alert.alert("Erreur", "Échec de l'upload du fichier.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MyNavBar />
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={styles.background}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Pièce jointe</Text>

          {/* Type de pièce */}
          <Text style={styles.label}>Type de pièce</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={typePiece}
              onValueChange={(itemValue) => setTypePiece(itemValue)}
              style={styles.picker}
            >
              <Picker.Item
                label="-- Sélectionner un type de pièce --"
                value=""
              />
              <Picker.Item label="Acte de naissance" value="NAISSANCE" />
              <Picker.Item label="Acte de décès" value="DECES" />
              <Picker.Item label="Acte de mariage" value="MARIAGE" />
            </Picker>
          </View>

          {/* Upload fichier */}
          <TouchableOpacity style={styles.uploadButton} onPress={pickFile}>
            <Text style={styles.uploadText}>
              {file ? `Fichier choisi : ${nomFichier}` : "Choisir un fichier"}
            </Text>
          </TouchableOpacity>

          {/* Nom du fichier */}
          <Text style={styles.label}>Nom du fichier</Text>
          <TextInput
            style={styles.input}
            value={nomFichier}
            onChangeText={setNomFichier}
            placeholder="Nom du fichier"
          />

          {/* Hash */}
          <Text style={styles.label}>Hash</Text>
          <TextInput
            style={styles.input}
            value={hash}
            onChangeText={setHash}
            placeholder="Hash"
          />

          {/* URL */}
          <Text style={styles.label}>URL</Text>
          <TextInput
            style={styles.input}
            value={url}
            onChangeText={setUrl}
            placeholder="Entrer une URL"
          />

          {/* Taille */}
          <Text style={styles.label}>Taille (octets)</Text>
          <TextInput
            style={styles.input}
            value={taille}
            onChangeText={setTaille}
            keyboardType="numeric"
            placeholder="Taille du fichier"
          />

          {/* Vérification statut */}
          <View style={styles.switchRow}>
            <Text style={styles.label}>Vérifier statut</Text>
            <Switch value={verifStatut} onValueChange={setVerifStatut} />
          </View>

          {/* Bouton enregistrer */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Enregistrer</Text>
          </TouchableOpacity>

          {/* Lien paiement */}
          <TouchableOpacity
            style={styles.paymentLink}
            onPress={() => alert("Redirection vers le paiement")}
          >
            <Text style={styles.paymentText}>Effectuer le paiement</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default PieceJointeScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: Dimensions.get("window").height,
    resizeMode: "cover",
  },
  container: {
    backgroundColor: "rgba(0, 0, 0.5, 0.6)",
    margin: 20,
    borderRadius: 10,
    padding: 20,
  } as ViewStyle,
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: "#2c3e50",
  },
  label: {
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 5,
    color: "#ecf0f1",
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  uploadButton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: "center",
  },
  uploadText: {
    color: "#fff",
    fontWeight: "600",
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    justifyContent: "space-between",
  },
  submitButton: {
    backgroundColor: "orange",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  paymentLink: {
    marginTop: 20,
    alignItems: "center",
  } as ViewStyle,
  paymentText: {
    color: "#007bff",
    fontWeight: "600",
  },
});