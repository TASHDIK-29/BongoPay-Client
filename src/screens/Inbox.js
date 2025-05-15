import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";
import { 
  SafeAreaView, 
  View, 
  Text, 
  Image, 
  FlatList, 
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  StyleSheet
} from "react-native";

import { IconLogo } from "../constants/IconLogo";
import { Colors } from "../constants/Colors";
import { AuthContext } from "../../provider/UserProvider";
import useFetchInbox from "../hooks/useFetchInbox";
import TransactionCard from "../components/TransctionCard.jsx";
import { MaterialIcons } from "@expo/vector-icons";

const InboxScreen = () => {
    const { user } = useContext(AuthContext);
    const { data, isLoading, error, refetch } = useFetchInbox({
        email: user.email
    });

    return (
        <SafeAreaView style={styles.container}>
    <StatusBar style="light" backgroundColor="#0F0F0F" />
    
    {/* Header */}
    <View style={styles.header}>
        <Text style={styles.headerText}>Transaction History</Text>
        <Image 
            source={IconLogo.logo} 
            style={styles.logo} 
            resizeMode="contain"
        />
    </View>

    {/* Transaction List */}
    <View style={styles.content}>
        {isLoading ? (
            <ActivityIndicator 
                size="large" 
                color="#7C4DFF" 
                style={{ marginTop: 40 }}
            />
        ) : error ? (
            <View style={styles.errorContainer}>
                <MaterialIcons
                    name="error-outline" 
                    size={40} 
                    color="#FF6E6E" 
                />
                <Text style={styles.errorText}>
                    Failed to load transactions
                </Text>
                <TouchableOpacity 
                    onPress={refetch} 
                    style={styles.retryButton}
                >
                    <Text style={styles.retryButtonText}>Try Again</Text>
                </TouchableOpacity>
            </View>
        ) : data && data.length > 0 ? (
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <TransactionCard 
                        transaction={item} 
                    />
                )}
                keyExtractor={(item) => item._id}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                contentContainerStyle={styles.listContent}
                refreshControl={
                    <RefreshControl
                        refreshing={isLoading}
                        onRefresh={refetch}
                        colors={['#7C4DFF']}
                        progressBackgroundColor="#1A1A1A"
                    />
                }
                showsVerticalScrollIndicator={false}
            />
        ) : (
            <View style={styles.emptyContainer}>
                <MaterialIcons 
                    name="inbox" 
                    size={48} 
                    color="#A0A0A0" 
                />
                <Text style={styles.emptyText}>No transactions yet</Text>
                <Text style={styles.emptySubText}>
                    Your transactions will appear here
                </Text>
            </View>
        )}
    </View>
</SafeAreaView>
    );
};

// Define styles locally instead of merging
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F0F0F', // Deep dark background
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 20,
        backgroundColor: '#1A1A1A', // Slightly lighter header
        borderBottomWidth: 0.5,
        borderBottomColor: '#2E2E2E',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 4,
    },
    headerText: {
        fontSize: 20,
        fontWeight: '800',
        color: '#F5F5F5',
        letterSpacing: 0.5,
    },
    logo: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: '#2A2A2A',
        padding: 4,
    },
    content: {
        flex: 1,
        paddingTop: 8,
    },
    listContent: {
        paddingHorizontal: 14,
        paddingBottom: 24,
    },
    separator: {
        height: 10,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        backgroundColor: '#141414',
        margin: 20,
        borderRadius: 12,
    },
    errorText: {
        color: '#FF6E6E',
        fontSize: 15,
        fontWeight: '600',
        marginTop: 20,
        marginBottom: 25,
        textAlign: 'center',
        lineHeight: 22,
    },
    retryButton: {
        backgroundColor: '#7C4DFF', // Vibrant purple accent
        borderRadius: 10,
        paddingHorizontal: 28,
        paddingVertical: 14,
        shadowColor: '#7C4DFF',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
    },
    retryButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        marginHorizontal: 20,
        backgroundColor: '#141414',
        borderRadius: 12,
    },
    emptyText: {
        color: '#E0E0E0',
        fontSize: 17,
        fontWeight: '700',
        marginTop: 18,
        letterSpacing: 0.3,
    },
    emptySubText: {
        color: '#A0A0A0',
        fontSize: 14,
        marginTop: 6,
        fontWeight: '500',
    },
});

export default InboxScreen;