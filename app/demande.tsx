import { Picker } from '@react-native-picker/picker'; // Import du composant Picker
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const ServicesList = () => {
  const [formData, setFormData] = useState({
    ref: '',
    demandeur: '',
    type: '',
    centre: '',
    statut: '',
    priorite: '',
    canal: '',
    montant: ''
  });
  
  // Données pour les sélecteurs
  const statutChoices = [
    { label: 'Sélectionnez un statut', value: '' },
    { label: 'Nouveau', value: 'nouveau' },
    { label: 'En cours', value: 'en_cours' },
    { label: 'Traité', value: 'traite' },
  ];
  
  
  const prioriteChoices = [
    { label: 'Sélectionnez une priorité', value: '' },
    { label: 'Normale', value: '0' },
    { label: 'Urgente', value: '1' },
  ];

  const canalChoices = [
    { label: 'Sélectionnez un canal', value: '' },
    { label: 'En ligne', value: 'en_ligne' },
    { label: 'Guichet', value: 'guichet' },
    { label: 'Téléphone', value: 'telephone' },
  ];

  const servicesData = [
    {
      id: 1,
      nom: 'Acte de naissance',
      pieces: ['Livre de famille', 'Résidence'],
      delais: '2 heures'
    },
    {
      id: 2,
      nom: 'Acte de mariage',
      pieces: ['Acte de naissance', 'Résidence', 'Acte de célibataire'],
      delais: 'Le jour du mariage'
    },
    {
      id: 3,
      nom: 'Acte de décès',
      pieces: [
        'Certificat de décès',
        'Pièce d\'identité du commandeur',
        'Montantes sur le déficient',
        'Livret de famille'
      ],
      delais: '24 heures'
    }
  ];

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

 const handleSubmit = async () => {
  try {
    const response = await fetch('http://TON_SERVEUR_SYMFONY/api/requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (response.ok) {
      Alert.alert('Succès', `Votre demande a été créée avec l'ID ${result.request_id}`);
      setFormData({
        ref: '',
        demandeur: '',
        type: '',
        centre: '',
        statut: '',
        priorite: '',
        canal: '',
        montant: ''
      });
    } else {
      Alert.alert('Erreur', result.message || 'Une erreur est survenue');
    }
  } catch (error) {
    console.error(error);
    Alert.alert('Erreur', 'Impossible de contacter le serveur');
  }
};


  const renderServiceRow = (service) => (
    
    <View key={service.id} style={styles.tableRow}>
      <View style={[styles.tableCell, { flex: 1 }]}>
        <Text style={styles.primaryText}>{service.nom}</Text>
      </View>
      <View style={[styles.tableCell, { flex: 2 }]}>
        {service.pieces.map((piece, index) => (
          <Text key={index} style={styles.pieceItem}>• {piece}</Text>
        ))}
      </View>
      <View style={[styles.tableCell, { flex: 1 }]}>
        <Text>{service.delais}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>LISTE DES SERVICES</Text>
      </View>
      
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <View style={[styles.tableHeaderCell, { flex: 1 }]}>
            <Text style={styles.tableHeaderText}>Lequel</Text>
          </View>
          <View style={[styles.tableHeaderCell, { flex: 2 }]}>
            <Text style={styles.tableHeaderText}>Pièces requises</Text>
          </View>
          <View style={[styles.tableHeaderCell, { flex: 1 }]}>
            <Text style={styles.tableHeaderText}>Délais</Text>
          </View>
        </View>
        
        {servicesData.map(service => renderServiceRow(service))}
      </View>

      <View style={styles.demandeHeader}>
        <Text style={styles.headerText}>DEMANDE</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.formRow}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Référence</Text>
            <TextInput
              style={styles.input}
              value={formData.ref}
              onChangeText={(text) => handleInputChange('ref', text)}
              placeholder="Référence"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Demandeur</Text>
            <TextInput
              style={styles.input}
              value={formData.demandeur}
              onChangeText={(text) => handleInputChange('demandeur', text)}
              placeholder="Demandeur"
            />
          </View>
        </View>

        <View style={styles.formRow}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Type de demande</Text>
            <TextInput
              style={styles.input}
              value={formData.type}
              onChangeText={(text) => handleInputChange('type', text)}
              placeholder="Type"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Centre</Text>
            <TextInput
              style={styles.input}
              value={formData.centre}
              onChangeText={(text) => handleInputChange('centre', text)}
              placeholder="Centre"
            />
          </View>
        </View>

        <View style={styles.formRow}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Statut</Text>
            <Picker
              selectedValue={formData.statut}
              onValueChange={(itemValue) => handleInputChange('statut', itemValue)}
              style={styles.picker}
            >
              {statutChoices.map((choice, index) => (
                <Picker.Item key={index} label={choice.label} value={choice.value} />
              ))}
            </Picker>
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Priorité</Text>
            <Picker
              selectedValue={formData.priorite}
              onValueChange={(itemValue) => handleInputChange('priorite', itemValue)}
              style={styles.picker}
            >
              {prioriteChoices.map((choice, index) => (
                <Picker.Item key={index} label={choice.label} value={choice.value} />
              ))}
            </Picker>
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Canal</Text>
            <Picker
              selectedValue={formData.canal}
              onValueChange={(itemValue) => handleInputChange('canal', itemValue)}
              style={styles.picker}
            >
              {canalChoices.map((choice, index) => (
                <Picker.Item key={index} label={choice.label} value={choice.value} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.formRow}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Montant</Text>
            <TextInput
              style={styles.input}
              value={formData.montant}
              onChangeText={(text) => handleInputChange('montant', text)}
              placeholder="Montant"
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Créer la demande</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.buttonText}>Annuler</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa'
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
    padding: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  table: {
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 4,
    marginBottom: 24,
    backgroundColor: '#fff'
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6'
  },
  tableHeaderCell: {
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tableHeaderText: {
    fontWeight: 'bold'
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6'
  },
  tableCell: {
    padding: 12,
    justifyContent: 'center'
  },
  primaryText: {
    color: '#007bff'
  },
  pieceItem: {
    marginBottom: 4
  },
  demandeHeader: {
    alignItems: 'center',
    marginBottom: 16
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  formRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  inputContainer: {
    width: Dimensions.get('window').width > 600 ? '48%' : '100%',
    marginBottom: 16
  },
  label: {
    marginBottom: 8,
    fontWeight: '500'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 4,
    padding: 12,
    fontSize: 16
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 4,
    backgroundColor: '#fff'
  },
  buttonContainer: {
    marginTop: 16
  },
  primaryButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 12
  },
  secondaryButton: {
    backgroundColor: '#6c757d',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});

export default ServicesList;