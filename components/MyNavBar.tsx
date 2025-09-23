import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyNavBar() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbar}>
                <Text style={styles.link} onPress={() => router.replace('/accueil')}>Accueil</Text>
                <Text style={styles.link} onPress={() => router.replace('/demande')}>Services</Text>
                <Text style={styles.link} onPress={() => router.replace('/profil')}>Profil</Text>
                <Text style={styles.link}>Déconnexion</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {},

    navbar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        backgroundColor: "#C5ABAB",
    },
    
    link: {
        marginHorizontal: 12,
        fontSize: 16,
        fontWeight: "500",
    },
});
