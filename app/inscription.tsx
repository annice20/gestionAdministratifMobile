import React, { useState } from "react";
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const image = require("../assets/images/1.png");

export default function Inscription() {
  const [role, setRole] = useState("administration");
  const [date, setDate] = useState<Date | null>(null);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (selectedDate: Date) => {
    setDate(selectedDate);
    hideDatePicker();
  };

  const formattedDate = date ? date.toLocaleDateString("fr-FR") : "";

  return (
    <SafeAreaView style={styles.fullScreen}>
      <ImageBackground source={image} style={styles.background}>
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Inscription</Text>

            <View style={styles.inputGroup}>
              <TextInput style={styles.input} placeholder="Entrer votre e-mail" />
              <TextInput style={styles.input} placeholder="Entrer votre numéro de téléphone" />
              <TextInput style={styles.input} placeholder="Entrer le mot de passe" secureTextEntry={true} />
              <TextInput style={styles.input} placeholder="Choisir une langue" />

              <View style={styles.pickerContainer}>
                <Picker selectedValue={role} onValueChange={(itemValue) => setRole(itemValue)} style={styles.picker}>
                  <Picker.Item label="Administration" value="administration" />
                  <Picker.Item label="Citoyen" value="citoyen" />
                </Picker>
              </View>
            </View>

        
            <View style={styles.inputGroup}>
              <TextInput style={styles.input} placeholder="Nom" />
              <TextInput style={styles.input} placeholder="Prénom" />

              
              <View style={styles.inputWithIcon}>
                <TextInput
                  style={styles.inputWithIconField}
                  placeholder="jj / mm / aaaa"
                  value={formattedDate}
                  editable={false}
                  pointerEvents="none"
                />
                <TouchableOpacity onPress={showDatePicker}>
                  <Ionicons name="calendar-outline" size={22} color="#555" style={styles.icon} />
                </TouchableOpacity>
              </View>

              
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                maximumDate={new Date()} 
              />

              <TextInput style={styles.input} placeholder="NIN" />
              <TextInput style={styles.input} placeholder="Adresse" />
              <TextInput style={styles.input} placeholder="Commune" />
            </View>

            
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.buttonBlue}>
                <Text style={styles.buttonText}>S'inscrire</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonGreen}>
                <Text style={styles.buttonText}>Suivant</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullScreen: { flex: 1 },
  background: { flex: 1, width: "100%", height: "100%", resizeMode: "cover" },
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  formContainer: { width: "60%", backgroundColor: "#D1B4AE", borderRadius: 10, padding: 20, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around", alignItems: "flex-start" },
  title: { fontSize: 24, fontWeight: "bold", color: "#333", marginBottom: 20, width: "100%", textAlign: "center" },
  inputGroup: { width: "45%", minWidth: 200, marginBottom: 20 },
  input: { height: 40, backgroundColor: "#fff", borderRadius: 5, paddingHorizontal: 10, marginBottom: 15, borderWidth: 1, borderColor: "#ccc" },
  inputWithIcon: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderRadius: 5, borderWidth: 1, borderColor: "#ccc", marginBottom: 15, paddingHorizontal: 10 },
  inputWithIconField: { flex: 1, height: 40 },
  icon: { marginLeft: 8 },
  pickerContainer: { backgroundColor: "#fff", borderRadius: 5, borderWidth: 1, borderColor: "#ccc", marginBottom: 15 },
  picker: { height: 40, width: "100%" },
  buttonContainer: { width: "100%", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: 20 },
  buttonBlue: { backgroundColor: "#4E74B0", paddingVertical: 12, borderRadius: 8, marginVertical: 6, width: "30%", alignItems: "center" },
  buttonGreen: { backgroundColor: "#4CAF50", paddingVertical: 12, borderRadius: 8, marginVertical: 6, width: "30%", alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
