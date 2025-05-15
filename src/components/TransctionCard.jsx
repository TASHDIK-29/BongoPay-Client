import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons, FontAwesome5, Ionicons, Feather } from '@expo/vector-icons';

const TransactionCard = ({ transaction }) => {
  // Format date and time
  const formattedDate = new Date(transaction.time).toLocaleDateString();
  const formattedTime = new Date(transaction.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Get transaction type details
  const getTransactionTypeDetails = (type) => {
    switch (type) {
      case 'Deposit':
        return { icon: 'arrow-down', iconSet: 'Feather', color: '#4CAF50', label: 'Deposit' };
      case 'Withdrawal':
        return { icon: 'arrow-up', iconSet: 'Feather', color: '#FF5252', label: 'Withdrawal' };
      case 'Cash Out':
        return { icon: 'money-bill-alt', iconSet: 'FontAwesome5', color: '#FF9800', label: 'Cash Out' };
      case 'Send Money':
        return { icon: 'paper-plane', iconSet: 'FontAwesome5', color: '#2196F3', label: 'Send Money' };
      case 'Money Request':
        return { icon: 'hand-holding-usd', iconSet: 'FontAwesome5', color: '#9C27B0', label: 'Money Request' };
      case 'Account Creation':
        return { icon: 'user-plus', iconSet: 'Feather', color: '#00BCD4', label: 'Account Creation' };
      default:
        return { icon: 'swap-horiz', iconSet: 'MaterialIcons', color: '#9E9E9E', label: 'Transaction' };
    }
  };

  const typeDetails = getTransactionTypeDetails(transaction.type);

  const renderIcon = () => {
    switch (typeDetails.iconSet) {
      case 'MaterialIcons':
        return <MaterialIcons name={typeDetails.icon} size={22} color={typeDetails.color} />;
      case 'FontAwesome5':
        return <FontAwesome5 name={typeDetails.icon} size={20} color={typeDetails.color} />;
      case 'Ionicons':
        return <Ionicons name={typeDetails.icon} size={22} color={typeDetails.color} />;
      case 'Feather':
        return <Feather name={typeDetails.icon} size={22} color={typeDetails.color} />;
      default:
        return <MaterialIcons name="swap-horiz" size={22} color={typeDetails.color} />;
    }
  };

  // Determine amount prefix based on type
  const amountPrefix = transaction.type === 'Withdrawal' || 
                      transaction.type === 'Cash Out' || 
                      transaction.type === 'Send Money' ? '-' : '+';

  return (
    <TouchableOpacity style={[
      styles.card,
      { 
        borderLeftColor: typeDetails.color,
        backgroundColor: '#1E1E1E',
        marginHorizontal: 10,
        marginVertical: 6
      }
    ]}>
      {/* Header with Type and Amount */}
      <View style={styles.header}>
        <View style={styles.typeContainer}>
          {renderIcon()}
          <Text style={[styles.typeText, { color: typeDetails.color }]}>
            {typeDetails.label}
          </Text>
        </View>
        <Text style={[styles.amount, { color: typeDetails.color }]}>
          {amountPrefix}${transaction.amount}
        </Text>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Transaction Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>TrxID:</Text>
          <Text style={styles.detailValue} numberOfLines={1} ellipsizeMode="tail">
            {transaction._id}
          </Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Date:</Text>
          <Text style={styles.detailValue}>
            {formattedDate} • {formattedTime}
          </Text>
        </View>
        
        {(transaction.fromName || transaction.type === 'Send Money' || 
          transaction.type === 'Money Request') && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>
              {transaction.type === 'Money Request' ? 'From:' : 'To:'}
            </Text>
            <Text style={styles.detailValue} numberOfLines={1} ellipsizeMode="tail">
              {transaction.fromName || 'N/A'}
            </Text>
          </View>
        )}
        
        {(transaction.fromEmail || transaction.type === 'Send Money' || 
          transaction.type === 'Money Request') && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Email:</Text>
            <Text style={styles.detailValue} numberOfLines={1} ellipsizeMode="tail">
              {transaction.fromEmail || 'N/A'}
            </Text>
          </View>
        )}

        {transaction.type === 'Account Creation' && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Status:</Text>
            <Text style={[styles.detailValue, { color: '#4CAF50' }]}>
              Account Created
            </Text>
          </View>
        )}
      </View>

      
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 14,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  typeText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
    flexShrink: 1,
  },
  amount: {
    fontSize: 17,
    fontWeight: '700',
    marginLeft: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#2A2A2A',
    marginVertical: 6,
  },
  detailsContainer: {
    marginVertical: 6,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    color: '#A0A0A0',
    fontSize: 13,
    flex: 0.4,
  },
  detailValue: {
    color: '#E0E0E0',
    fontSize: 13,
    flex: 1,
    textAlign: 'right',
    marginLeft: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  statusText: {
    color: '#A0A0A0',
    fontSize: 12,
    fontStyle: 'italic',
  },
  receiptButton: {
    backgroundColor: '#2A2A2A',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  receiptButtonText: {
    color: '#BB86FC',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default TransactionCard;