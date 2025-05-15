import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const MoneyMapping = ({
    obj
}) => {

    const { latestTotalExpense,
        predictedExpense,
        recommendedBudget,
        savingsTip } = obj;

        console.log("obj ->", obj);

    const difference = predictedExpense - latestTotalExpense;
    const isIncrease = difference >= 0;


    console.log("recommendedBudget ->", recommendedBudget);
    console.log("latestTotalExpense ->", latestTotalExpense);
    console.log("predictedExpense ->", predictedExpense);

    if (!recommendedBudget) {
        return <Text>No budget data available</Text>; // Or handle gracefully
    }


    // Calculate percentages for each category
    const totalBudget = Object.values(recommendedBudget).reduce((a, b) => a + b, 0);
    const budgetItems = Object.keys(recommendedBudget).map(category => ({
        category,
        amount: recommendedBudget[category],
        percentage: (recommendedBudget[category] / totalBudget * 100).toFixed(1),
        color: getColorForCategory(category)
    }));

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Money Mapping</Text>

            {/* Current vs Predicted Expense */}
            <View style={styles.expenseContainer}>
                <View style={styles.expenseCard}>
                    <Text style={styles.expenseLabel}>Last Month</Text>
                    <Text style={styles.expenseAmount}>${latestTotalExpense.toFixed(2)}</Text>
                </View>

                <MaterialIcons name="compare-arrows" size={24} color="#7e7e7e" />

                <View style={styles.expenseCard}>
                    <Text style={styles.expenseLabel}>Next Month</Text>
                    <Text style={[styles.expenseAmount, isIncrease ? styles.increase : styles.decrease]}>
                        ${predictedExpense.toFixed(2)}
                    </Text>
                    <Text style={[styles.differenceText, isIncrease ? styles.increase : styles.decrease]}>
                        {isIncrease ? '+' : ''}{difference.toFixed(2)}
                    </Text>
                </View>
            </View>

            {/* Savings Tip */}
            <View style={styles.tipContainer}>
                <MaterialIcons name="lightbulb" size={20} color="#FFD700" />
                <Text style={styles.tipText}>{savingsTip}</Text>
            </View>

            {/* Budget Recommendation */}
            <View style={styles.chartContainer}>
                <Text style={styles.sectionHeader}>Recommended Budget</Text>
                <View style={styles.barChart}>
                    {budgetItems.map((item, index) => (
                        <View key={index} style={styles.barItem}>
                            <View style={[styles.bar, {
                                backgroundColor: item.color,
                                width: `${item.percentage}%`
                            }]} />
                            <View style={styles.barLabel}>
                                <Text style={styles.barText}>{item.percentage}%</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </View>

            {/* Budget Breakdown */}
            <View style={styles.breakdownContainer}>
                <Text style={styles.sectionHeader}>Budget Breakdown</Text>
                {budgetItems.map((item, index) => (
                    <View key={index} style={styles.budgetItem}>
                        <View style={[styles.categoryDot, { backgroundColor: item.color }]} />
                        <Text style={styles.categoryName}>{item.category}</Text>
                        <Text style={styles.categoryAmount}>${item.amount.toFixed(2)}</Text>
                        <Text style={styles.categoryPercentage}>{item.percentage}%</Text>
                    </View>
                ))}
            </View>

            <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Adjust My Budget</Text>
            </TouchableOpacity>
        </View>
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
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
    },
    expenseContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#1E1E1E',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
    },
    expenseCard: {
        alignItems: 'center',
    },
    expenseLabel: {
        color: '#A0A0A0',
        fontSize: 14,
        marginBottom: 5,
    },
    expenseAmount: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
    },
    differenceText: {
        fontSize: 14,
        marginTop: 5,
    },
    increase: {
        color: '#FF5252',
    },
    decrease: {
        color: '#4CAF50',
    },
    tipContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2A2A2A',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    tipText: {
        color: '#E0E0E0',
        marginLeft: 10,
        flex: 1,
        fontSize: 14,
    },
    chartContainer: {
        backgroundColor: '#1E1E1E',
        borderRadius: 12,
        padding: 15,
        marginBottom: 20,
    },
    barChart: {
        marginTop: 10,
    },
    barItem: {
        marginBottom: 8,
    },
    bar: {
        height: 20,
        borderRadius: 4,
    },
    barLabel: {
        position: 'absolute',
        right: 5,
        top: 0,
        height: 20,
        justifyContent: 'center',
    },
    barText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    sectionHeader: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    breakdownContainer: {
        backgroundColor: '#1E1E1E',
        borderRadius: 12,
        padding: 15,
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
        marginRight: 10,
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
        width: 100,
        textAlign: 'right',
    },
    categoryPercentage: {
        color: '#A0A0A0',
        fontSize: 14,
        width: 50,
        textAlign: 'right',
    },
    actionButton: {
        backgroundColor: '#BB86FC',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
    },
    actionButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default MoneyMapping;