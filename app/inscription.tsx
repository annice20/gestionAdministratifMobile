import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from "axios";

const image = require("../assets/images/1.png");

export default function Inscription() {
  // === États pour chaque champ ===
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [langue, setLangue] = useState("");
  const [role, setRole] = useState("citoyen");
  const [nom, setNom] = useState("");
  const [prenoms, setPrenoms] = useState("");
  const [nin, setNin] = useState("");
  const [adresse, setAdresse] = useState("");
  const [commune, setCommune] = useState("");
  const [date, setDate] = useState<Date | null>(null);

  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [step, setStep] = useState(1);
  const [isRegistered, setIsRegistered] = useState(false);

  const showDatePicker = () => setDatePickerVisible(true);
  const hideDatePicker = () => setDatePickerVisible(false);

  const handleConfirm = (selectedDate: Date) => {
    setDate(selectedDate);
    hideDatePicker();
  };

  const formattedDate = date ? date.toISOString().split("T")[0] : ""; // format YYYY-MM-DD

  // === Fonction inscription API ===
  const handleRegister = async () => {
    if (!email || !password || !telephone || !langue || !nom) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs requis.");
      return;
    }

    try {
      const response = await axios.post("http://192.168.1.10:8000/api/register", {
        email,
        password,
        telephone,
        langue,
        role,
        nom,
        prenoms,
        dateDeNaissance: formattedDate,
        nin,
        adresse,
        commune,
      });

      Alert.alert("Succès", response.data.message);
      setIsRegistered(true);
    } catch (error: any) {
      console.log(error.response?.data || error.message);
      Alert.alert("Erreur", error.response?.data?.error || "Inscription échouée");
    }
  };

  return (
    <SafeAreaView style={styles.fullScreen}>
      <ImageBackground source={image} style={styles.background}>
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Inscription</Text>

            {step === 1 ? (
              <View style={styles.inputGroup}>
                <TextInput
                  style={styles.input}
                  placeholder="Entrer votre e-mail"
                  value={email}
                  onChangeText={setEmail}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Entrer votre numéro de téléphone"
                  keyboardType="phone-pad"
                  value={telephone}
                  onChangeText={setTelephone}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Entrer le mot de passe"
                  secureTextEntry={true}
                  value={password}
                  onChangeText={setPassword}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Choisir une langue"
                  value={langue}
                  onChangeText={setLangue}
                />

                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={role}
                    onValueChange={(itemValue) => setRole(itemValue)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Administration" value="administration" />
                    <Picker.Item label="Citoyen" value="citoyen" />
                  </Picker>
                </View>
              </View>
            ) : (
              <View style={styles.inputGroup}>
                <TextInput
                  style={styles.input}
                  placeholder="Nom"
                  value={nom}
                  onChangeText={setNom}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Prénom"
                  value={prenoms}
                  onChangeText={setPrenoms}
                />

                <View style={styles.inputWithIcon}>
                  <TextInput
                    style={styles.inputWithIconField}
                    placeholder="jj / mm / aaaa"
                    value={formattedDate}
                    editable={false}
                  />
                  <TouchableOpacity onPress={showDatePicker}>
                    <Ionicons
                      name="calendar-outline"
                      size={22}
                      color="#555"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                </View>

                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                  maximumDate={new Date()}
                />

                <TextInput
                  style={styles.input}
                  placeholder="NIN"
                  value={nin}
                  onChangeText={setNin}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Adresse"
                  value={adresse}
                  onChangeText={setAdresse}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Commune"
                  value={commune}
                  onChangeText={setCommune}
                />

                <TouchableOpacity style={styles.buttonGreen} onPress={handleRegister}>
                  <Text style={styles.buttonText}>S'inscrire</Text>
                </TouchableOpacity>

                {isRegistered && (
                  <TouchableOpacity
                    style={styles.buttonBlue}
                    onPress={() => Alert.alert("OK", "Aller à l'étape suivante")}
                  >
                    <Text style={styles.buttonText}>Suivant</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}

            <View style={styles.pagination}>
              <TouchableOpacity onPress={() => setStep(1)}>
                <Text style={[styles.dot, step === 1 && styles.activeDot]}>•</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setStep(2)}>
                <Text style={[styles.dot, step === 2 && styles.activeDot]}>•</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

// Styles identiques à ton code précédent
const styles = StyleSheet.create({
  fullScreen: { flex: 1 },
  background: { flex: 1, width: "100%", height: "100%", resizeMode: "cover" },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  formContainer: {
    width: "98%",
    backgroundColor: "#4A4A4A",
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  inputGroup: { width: "100%" },
  input: {
    height: 45,
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  inputWithIconField: { flex: 1, height: 45 },
  icon: { marginLeft: 8 },
  pickerContainer: {
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  picker: {
    width: "100%",
    paddingVertical: 10,
  },
  buttonBlue: {
    backgroundColor: "#4E74B0",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonGreen: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  dot: {
    fontSize: 30,
    color: "#999",
    marginHorizontal: 6,
  },
  activeDot: {
    color: "#fff",
    fontSize: 34,
  },
});
