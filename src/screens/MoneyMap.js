import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ProgressChart } from 'react-native-chart-kit';
import useMoneyMap from '../hooks/useMoneyMap';

const MoneyMap = () => {
    const { data, isLoading, error, refetch } = useMoneyMap();

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#BB86FC" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <MaterialIcons name="error-outline" size={48} color="#FF5252" />
                <Text style={styles.errorText}>Failed to load your financial insights</Text>
                <TouchableOpacity onPress={refetch} style={styles.retryButton}>
                    <Text style={styles.retryButtonText}>Try Again</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (!data) {
        return (
            <View style={styles.errorContainer}>
                <MaterialIcons name="info-outline" size={48} color="#BB86FC" />
                <Text style={styles.errorText}>No financial data available yet</Text>
                <Text style={styles.subText}>Complete a few transactions to see insights</Text>
            </View>
        );
    }

    // Prepare data for the progress chart
    const recommendedBudget = data.recommended_budget || {};
    const chartData = {
        labels: Object.keys(recommendedBudget),
        data: Object.values(recommendedBudget).map(val => val / data.predicted_expense),
        colors: Object.keys(recommendedBudget).map(cat => getColorForCategory(cat))
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Money Map</Text>
                <Text style={styles.subHeader}>Your personalized financial insights</Text>
            </View>

            {/* Current vs Predicted Spending */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Monthly Spending</Text>
                <View style={styles.spendingRow}>
                    <View style={styles.spendingItem}>
                        <Text style={styles.spendingLabel}>Current</Text>
                        <Text style={styles.spendingAmount}>${data.latest_total_expense}</Text>
                    </View>
                    <View style={styles.spacing} />
                    <View style={styles.spendingItem}>
                        <Text style={styles.spendingLabel}>Predicted</Text>
                        <Text style={[
                            styles.spendingAmount,
                            data.predicted_expense > data.latest_total_expense ? styles.increase : styles.decrease
                        ]}>
                            ${data.predicted_expense}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Savings Tip */}
            <View style={styles.card}>
                <View style={styles.tipHeader}>
                    <MaterialIcons name="lightbulb-outline" size={24} color="#FFD700" />
                    <Text style={styles.cardTitle}>Savings Tip</Text>
                </View>
                <Text style={styles.tipText}>{data.savings_tip}</Text>
            </View>

            {/* Budget Breakdown */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Recommended Budget</Text>
                
                {/* Progress Chart */}
                <View style={styles.chartContainer}>
                    <ProgressChart
                        data={chartData}
                        width={Dimensions.get('window').width - 60}
                        height={220}
                        strokeWidth={16}
                        radius={32}
                        chartConfig={{
                            backgroundColor: '#1E1E1E',
                            backgroundGradientFrom: '#1E1E1E',
                            backgroundGradientTo: '#1E1E1E',
                            decimalPlaces: 2,
                            color: (opacity = 1, index) => chartData.colors[index],
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        }}
                        hideLegend={false}
                    />
                </View>

                {/* Budget Details */}
                {Object.entries(recommendedBudget).map(([category, amount]) => (
                    <View key={category} style={styles.budgetItem}>
                        <View style={[styles.categoryDot, { backgroundColor: getColorForCategory(category) }]} />
                        <Text style={styles.categoryName}>{category}</Text>
                        <Text style={styles.categoryAmount}>${amount}</Text>
                        <Text style={styles.categoryPercentage}>
                            {Math.round((amount / data.predicted_expense) * 100)}%
                        </Text>
                    </View>
                ))}
            </View>

            {/* Action Button */}
            <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Adjust My Budget</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

// Helper function to assign colors to categories
const getColorForCategory = (category) => {
    const colors = {
        Dining: '#FF6384',
        Entertainment: '#36A2EB',
        Grocery: '#FFCE56',
        Rent: '#4BC0C0',
        Savings: '#9966FF',
        Transportation: '#FF9F40',
        Shopping: '#C9CBCF'
    };
    return colors[category] || '#8884d8';
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    contentContainer: {
        padding: 20,
        paddingBottom: 40,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
        padding: 20,
    },
    errorText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 16,
        marginBottom: 8,
        textAlign: 'center',
    },
    subText: {
        fontSize: 14,
        color: '#A0A0A0',
        textAlign: 'center',
        marginBottom: 24,
    },
    retryButton: {
        backgroundColor: '#BB86FC',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
        marginTop: 16,
    },
    retryButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    headerContainer: {
        marginBottom: 24,
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
    },
    subHeader: {
        fontSize: 16,
        color: '#A0A0A0',
        marginTop: 4,
    },
    card: {
        backgroundColor: '#1E1E1E',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 16,
    },
    spendingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    spendingItem: {
        flex: 1,
    },
    spacing: {
        width: 20,
    },
    spendingLabel: {
        fontSize: 14,
        color: '#A0A0A0',
        marginBottom: 4,
    },
    spendingAmount: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },
    increase: {
        color: '#FF5252',
    },
    decrease: {
        color: '#4CAF50',
    },
    tipHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    tipText: {
        color: '#E0E0E0',
        fontSize: 15,
        lineHeight: 22,
    },
    chartContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    budgetItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#2A2A2A',
    },
    categoryDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 12,
    },
    categoryName: {
        color: '#E0E0E0',
        fontSize: 16,
        flex: 1,
    },
    categoryAmount: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        width: 80,
        textAlign: 'right',
        marginRight: 12,
    },
    categoryPercentage: {
        color: '#A0A0A0',
        fontSize: 14,
        width: 40,
        textAlign: 'right',
    },
    actionButton: {
        backgroundColor: '#BB86FC',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        marginTop: 8,
    },
    actionButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default MoneyMap;