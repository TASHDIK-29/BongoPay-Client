import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView, 
  Modal,
  Animated,
  Easing,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const SavingsScreen = () => {
  const [savingsData, setSavingsData] = useState({
    currentSavings: 1250.75,
    goalAmount: 5000,
    transactions: [
      { id: 1, amount: 200, date: '2023-05-15', type: 'deposit' },
      { id: 2, amount: 50, date: '2023-05-10', type: 'deposit' },
      { id: 3, amount: 1000, date: '2023-05-01', type: 'deposit' },
    ],
  });

  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');
  const [newGoal, setNewGoal] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showDepositInput, setShowDepositInput] = useState(false);
  const [showWithdrawInput, setShowWithdrawInput] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const modalAnim = useRef(new Animated.Value(0)).current;
  const depositAnim = useRef(new Animated.Value(0)).current;
  const withdrawAnim = useRef(new Animated.Value(0)).current;

  const progressPercentage = Math.min((savingsData.currentSavings / savingsData.goalAmount) * 100, 100);
  const goalAchieved = progressPercentage >= 100;

  // Keyboard listeners
  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleSave = () => {
    if (!amount || !email) {
      alert('Please enter both amount and email');
      return;
    }

    const newTransaction = {
      id: savingsData.transactions.length + 1,
      amount: parseFloat(amount),
      date: new Date().toISOString().split('T')[0],
      type: 'deposit',
    };

    setSavingsData({
      ...savingsData,
      currentSavings: savingsData.currentSavings + parseFloat(amount),
      transactions: [newTransaction, ...savingsData.transactions],
    });

    setAmount('');
    setEmail('');
    closeDepositInput();
    alert(`Successfully saved $${amount}`);
  };

  const handleWithdraw = () => {
    if (!withdrawAmount || isNaN(withdrawAmount)) {
      alert('Please enter a valid amount');
      return;
    }

    const withdrawValue = parseFloat(withdrawAmount);
    if (withdrawValue <= 0) {
      alert('Withdrawal amount must be positive');
      return;
    }
    if (withdrawValue > savingsData.currentSavings) {
      alert('You cannot withdraw more than your current savings');
      return;
    }

    const newTransaction = {
      id: savingsData.transactions.length + 1,
      amount: withdrawValue,
      date: new Date().toISOString().split('T')[0],
      type: 'withdrawal',
    };

    setSavingsData({
      ...savingsData,
      currentSavings: savingsData.currentSavings - withdrawValue,
      transactions: [newTransaction, ...savingsData.transactions],
    });

    setWithdrawAmount('');
    closeWithdrawInput();
    alert(`Successfully withdrew $${withdrawValue.toFixed(2)}`);
  };

  const openGoalModal = () => {
    setShowGoalModal(true);
    Animated.timing(modalAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  const closeGoalModal = () => {
    Keyboard.dismiss();
    Animated.timing(modalAnim, {
      toValue: 0,
      duration: 200,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(() => setShowGoalModal(false));
  };

  const openDepositInput = () => {
    setShowDepositInput(true);
    Animated.timing(depositAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  const closeDepositInput = () => {
    Keyboard.dismiss();
    Animated.timing(depositAnim, {
      toValue: 0,
      duration: 200,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(() => setShowDepositInput(false));
  };

  const openWithdrawInput = () => {
    setShowWithdrawInput(true);
    Animated.timing(withdrawAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  const closeWithdrawInput = () => {
    Keyboard.dismiss();
    Animated.timing(withdrawAnim, {
      toValue: 0,
      duration: 200,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(() => setShowWithdrawInput(false));
  };

  const handleSetGoal = () => {
    if (!newGoal || isNaN(newGoal)) {
      alert('Please enter a valid amount');
      return;
    }

    const goalValue = parseFloat(newGoal);
    if (goalValue <= 0) {
      alert('Goal amount must be positive');
      return;
    }

    setSavingsData({
      ...savingsData,
      goalAmount: goalValue,
    });

    setNewGoal('');
    closeGoalModal();
  };

  const modalTranslateY = modalAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  const depositTranslateY = depositAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  const withdrawTranslateY = withdrawAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  const modalOpacity = modalAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const depositOpacity = depositAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const withdrawOpacity = withdrawAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            {/* Savings Overview */}
            <View style={styles.savingsCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Your Savings</Text>
                <TouchableOpacity 
                  onPress={openGoalModal}
                  style={styles.editGoalButton}
                >
                  <MaterialIcons name="edit" size={20} color="#BB86FC" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.amountContainer}>
                <Text style={styles.currentAmount}>${savingsData.currentSavings.toFixed(2)}</Text>
                <Text style={styles.goalText}>of ${savingsData.goalAmount.toFixed(2)} goal</Text>
              </View>

              {/* Progress Bar */}
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${progressPercentage}%` }
                  ]}
                />
              </View>
              <Text style={styles.progressText}>{progressPercentage.toFixed(2)}% completed</Text>
            </View>

            {/* Recent Transactions */}
            <View style={styles.transactionsCard}>
              <Text style={styles.cardTitle}>Recent Transactions</Text>
              {savingsData.transactions.map((transaction) => (
                <View key={transaction.id} style={styles.transactionItem}>
                  <MaterialIcons 
                    name={transaction.type === 'deposit' ? "arrow-circle-up" : "arrow-circle-down"} 
                    size={24} 
                    color={transaction.type === 'deposit' ? "#4CAF50" : "#FF5252"} 
                    style={styles.transactionIcon}
                  />
                  <View style={styles.transactionDetails}>
                    <Text style={styles.transactionDate}>{transaction.date}</Text>
                    <Text style={styles.transactionType}>
                      {transaction.type === 'deposit' ? 'Deposit' : 'Withdrawal'}
                    </Text>
                  </View>
                  <Text style={[
                    styles.transactionAmount,
                    { color: transaction.type === 'deposit' ? '#4CAF50' : '#FF5252' }
                  ]}>
                    {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>

          {/* Action Buttons */}
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity 
              style={styles.depositButton}
              onPress={openDepositInput}
            >
              <Text style={styles.depositButtonText}>Add to Savings</Text>
            </TouchableOpacity>
            
            {goalAchieved && (
              <TouchableOpacity 
                style={styles.withdrawButton}
                onPress={openWithdrawInput}
              >
                <Text style={styles.withdrawButtonText}>Withdraw</Text>
              </TouchableOpacity>
            )}
          </View>
        </KeyboardAvoidingView>

        {/* Deposit Input Overlay */}
        {showDepositInput && (
          <Animated.View style={[styles.overlay, { opacity: depositOpacity }]}>
            <Animated.View style={[
              styles.inputContainer,
              { 
                transform: [{ translateY: depositTranslateY }],
                marginBottom: keyboardHeight > 0 ? keyboardHeight : 0
              }
            ]}>
              <Text style={styles.inputTitle}>Add to Savings</Text>
              
              <TextInput
                style={styles.input}
                placeholder="Enter amount"
                keyboardType="decimal-pad"
                value={amount}
                onChangeText={setAmount}
                placeholderTextColor="#999"
              />
              
              <TextInput
                style={styles.input}
                placeholder="Confirm your email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="#999"
              />
              
              <View style={styles.buttonRow}>
                <TouchableOpacity 
                  style={[styles.actionButton, styles.cancelButton]}
                  onPress={closeDepositInput}
                >
                  <Text style={styles.actionButtonText}>Cancel</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.actionButton, styles.saveButton]}
                  onPress={handleSave}
                >
                  <Text style={[styles.actionButtonText, styles.saveButtonText]}>Save</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </Animated.View>
        )}

        {/* Withdraw Input Overlay */}
        {showWithdrawInput && (
          <Animated.View style={[styles.overlay, { opacity: withdrawOpacity }]}>
            <Animated.View style={[
              styles.inputContainer,
              { 
                transform: [{ translateY: withdrawTranslateY }],
                marginBottom: keyboardHeight > 0 ? keyboardHeight : 0
              }
            ]}>
              <Text style={styles.inputTitle}>Withdraw from Savings</Text>
              
              <TextInput
                style={styles.input}
                placeholder="Enter amount"
                keyboardType="decimal-pad"
                value={withdrawAmount}
                onChangeText={setWithdrawAmount}
                placeholderTextColor="#999"
              />
              
              <Text style={styles.availableText}>
                Available: ${savingsData.currentSavings.toFixed(2)}
              </Text>
              
              <View style={styles.buttonRow}>
                <TouchableOpacity 
                  style={[styles.actionButton, styles.cancelButton]}
                  onPress={closeWithdrawInput}
                >
                  <Text style={styles.actionButtonText}>Cancel</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.actionButton, styles.withdrawConfirmButton]}
                  onPress={handleWithdraw}
                >
                  <Text style={[styles.actionButtonText, styles.withdrawButtonText]}>Withdraw</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </Animated.View>
        )}

        {/* Goal Setting Modal */}
        <Modal
          visible={showGoalModal}
          transparent={true}
          animationType="none"
          onRequestClose={closeGoalModal}
        >
          <Animated.View style={[styles.overlay, { opacity: modalOpacity }]}>
            <Animated.View style={[
              styles.modalContent,
              { 
                transform: [{ translateY: modalTranslateY }],
                marginBottom: keyboardHeight > 0 ? keyboardHeight : 0
              }
            ]}>
              <Text style={styles.modalTitle}>Set Savings Goal</Text>
              
              <TextInput
                style={styles.modalInput}
                placeholder="Enter goal amount"
                keyboardType="decimal-pad"
                value={newGoal}
                onChangeText={setNewGoal}
                placeholderTextColor="#999"
                autoFocus={true}
              />
              
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={closeGoalModal}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.modalButton, styles.confirmButton]}
                  onPress={handleSetGoal}
                >
                  <Text style={[styles.modalButtonText, styles.confirmButtonText]}>Set Goal</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </Animated.View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 120,
  },
  savingsCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  transactionsCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  editGoalButton: {
    padding: 5,
  },
  amountContainer: {
    marginBottom: 20,
  },
  currentAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#BB86FC',
  },
  goalText: {
    fontSize: 16,
    color: '#A0A0A0',
    marginTop: 4,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#2A2A2A',
    borderRadius: 5,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#BB86FC',
    borderRadius: 5,
  },
  progressText: {
    fontSize: 14,
    color: '#A0A0A0',
    textAlign: 'right',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  transactionIcon: {
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionDate: {
    fontSize: 14,
    color: '#A0A0A0',
  },
  transactionType: {
    fontSize: 16,
    color: '#E0E0E0',
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionButtonsContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  depositButton: {
    backgroundColor: '#BB86FC',
    borderRadius: 8,
    padding: 16,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  withdrawButton: {
    backgroundColor: '#FF5252',
    borderRadius: 8,
    padding: 16,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  depositButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  withdrawButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputContainer: {
    backgroundColor: '#1E1E1E',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 25,
    paddingBottom: 40,
  },
  inputTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
    color: '#fff',
    fontSize: 16,
  },
  availableText: {
    color: '#A0A0A0',
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    borderRadius: 8,
    padding: 16,
    width: '48%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#2A2A2A',
    borderWidth: 1,
    borderColor: '#BB86FC',
  },
  saveButton: {
    backgroundColor: '#BB86FC',
  },
  withdrawConfirmButton: {
    backgroundColor: '#FF5252',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  saveButtonText: {
    color: '#000',
  },
  modalContent: {
    backgroundColor: '#1E1E1E',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 25,
    paddingBottom: 40,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalInput: {
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    padding: 16,
    marginBottom: 25,
    color: '#fff',
    fontSize: 16,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    borderRadius: 8,
    padding: 16,
    width: '48%',
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#BB86FC',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  confirmButtonText: {
    color: '#000',
  },
});

export default SavingsScreen;