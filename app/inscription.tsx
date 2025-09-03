import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const image = require("../assets/images/1.png");

export default function Inscription() {
  return (
    <SafeAreaView style={styles.fullScreen}>
      <ImageBackground source={image} style={styles.background}>
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Inscription</Text>
            
            <View style={styles.inputGroup}>
            <TextInput
                style={styles.input}
                placeholder="Entrer votre e-mail"
            />
            <TextInput
                style={styles.input}
                placeholder="Entrer votre numéro de téléphone"
            />
            <TextInput
                style={styles.input}
                placeholder="Entrer le mot de passe"
                secureTextEntry={true}
            />
            <TextInput
                style={styles.input}
                placeholder="Choisir une langue"
            />
            <TextInput
                style={styles.input}
                placeholder="Administration"
            />
         </View>

        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="Nom"
          />
          <TextInput
            style={styles.input}
            placeholder="Prénom"
          />
          <TextInput
            style={styles.input}
            placeholder="jj / mm / aaaa"
          />
          <TextInput
            style={styles.input}
            placeholder="NIN"
          />
          <TextInput
            style={styles.input}
            placeholder="Adresse"
          />
          <TextInput
            style={styles.input}
            placeholder="Commune"
          />
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonBlue}>
            <Text style={styles.buttonText}>S'inscrire</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonGreen}>
            <Text style={styles.buttonText}>Suivant</Text>
          </TouchableOpacity>
        </View>
        </View></View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },

  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  container: {
    flex: 1,
    //backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  formContainer: {
    width: '90%',
    backgroundColor: '#D1B4AE',
    borderRadius: 10,
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    width: '100%',
    textAlign: 'center',
  },
  inputGroup: {
    width: '45%',
    minWidth: 200,
    marginBottom: 20,
  },
  input: {
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonBlue: {
    backgroundColor: '#4E74B0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonGreen: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});