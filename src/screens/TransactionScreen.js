import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Keyboard,
    Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AuthContext } from '../../provider/UserProvider';
import useAxiosPublic from '../hooks/useAxiosPublic';

const TransactionScreen = ({ route }) => {
    const { email } = route.params;
    const [password, setPassword] = useState('');
    const [amount, setAmount] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    const navigation = useNavigation();
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    const axiosPublic = useAxiosPublic();

    const { user } = useContext(AuthContext);
    const userEmail = user.email;
    console.log(userEmail);

    // Handle keyboard appearance
    React.useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
            (e) => {
                setKeyboardHeight(e.endCoordinates.height);
            }
        );

        const keyboardDidHideListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
            () => {
                setKeyboardHeight(0);
            }
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const transactionOptions = [
        { id: 1, title: 'Cash Out', icon: 'money-off' },
        { id: 2, title: 'Send Money', icon: 'send' },
        { id: 3, title: 'Money Request', icon: 'request-quote' },
        { id: 4, title: 'Pay Bill', icon: 'receipt' },
        { id: 5, title: 'Payment', icon: 'payment' },
    ];

    const handleProceed = async () => {
        console.log(`Proceeding with ${selectedOption} for ${email}, Amount: ${amount}`);

        if (selectedOption === "Send Money") {
            const res = await axiosPublic.patch('/sendMoney', { userEmail, receiverEmail: email, amount });
            console.log(res.data);

            if (res.data.receiver) {
                alert("Send Money Successful.");
                navigation.navigate("HomeTabs");
            }
            else if (res.data.message) {
                alert(res.data.message);
            }
        }
        else if (selectedOption === "Cash Out") {
            const res = await axiosPublic.patch('/CashOut', { userEmail, agentEmail: email, amount });
            console.log(res.data);

            if (res.data.message) {
                alert(res.data.message);
            }
            else if (res.data.agent) {
                alert("Cash Out Successful.");
                navigation.navigate("HomeTabs");
            }
            else if (!res.data.agent) {
                alert("Agent not found.");
            }
        }
        else if (selectedOption === "Money Request") {
            const res = await axiosPublic.post('/MoneyRequest', { userEmail, requestEmail: email, amount });
            console.log(res.data);

            if (res.data.message) {
                alert(res.data.message);
            }
            else if (res.data.request) {
                alert("Money Request Successful.");
                navigation.navigate("HomeTabs");
            }
            else if (!res.data.request) {
                alert("User not found.");
            }
        }
        else{
            alert(`${selectedOption} is under Development.`)
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                    activeOpacity={0.7}
                >
                    <Icon name="arrow-back" size={24} color="#4A7CFF" />
                </TouchableOpacity>

                <View style={styles.headerContent}>
                    <Text style={styles.headerText}>Transaction for</Text>
                    <View style={styles.emailContainer}>
                        <Icon name="email" size={18} color="#4A7CFF" style={styles.emailIcon} />
                        <Text style={styles.emailText} numberOfLines={1} ellipsizeMode="tail">
                            {email}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Scrollable Content */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={[
                    styles.contentContainer,
                    { paddingBottom: keyboardHeight > 0 ? keyboardHeight + 20 : 20 }
                ]}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={styles.sectionTitle}>Select Transaction Type</Text>
                <View style={styles.optionsContainer}>
                    {transactionOptions.map((option) => (
                        <TouchableOpacity
                            key={option.id}
                            style={[
                                styles.optionButton,
                                selectedOption === option.title && styles.selectedOption
                            ]}
                            onPress={() => setSelectedOption(option.title)}
                            activeOpacity={0.7}
                        >
                            <View style={styles.optionIconContainer}>
                                <Icon
                                    name={option.icon}
                                    size={28}
                                    color={selectedOption === option.title ? '#4A7CFF' : '#fff'}
                                />
                            </View>
                            <Text style={styles.optionText}>{option.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* New Amount Input Field */}
                <Text style={styles.sectionTitle}>Enter Amount</Text>
                <View style={styles.amountContainer}>
                    <Icon name="attach-money" size={20} color="#666" style={styles.amountIcon} />
                    <TextInput
                        style={styles.amountInput}
                        placeholder="0.00"
                        placeholderTextColor="#666"
                        keyboardType="decimal-pad"
                        value={amount}
                        onChangeText={setAmount}
                    />
                </View>

                <Text style={styles.sectionTitle}>Enter Password</Text>
                <View style={styles.passwordContainer}>
                    <Icon name="lock" size={20} color="#666" style={styles.passwordIcon} />
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Enter your password"
                        placeholderTextColor="#666"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        autoCapitalize="none"
                    />
                </View>

                <TouchableOpacity
                    style={[
                        styles.proceedButton,
                        (!selectedOption || !password || !amount) && styles.disabledButton
                    ]}
                    onPress={handleProceed}
                    disabled={!selectedOption || !password || !amount}
                    activeOpacity={0.8}
                >
                    <Text style={styles.proceedButtonText}>Proceed</Text>
                    <Icon name="arrow-forward" size={22} color="#fff" style={styles.proceedIcon} />
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        padding: 20,
        paddingTop: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        padding: 20,
        paddingBottom: 10,
        backgroundColor: '#121212',
    },
    backButton: {
        padding: 8,
        marginRight: 10,
        borderRadius: 20,
        backgroundColor: '#1E1E1E',
    },
    headerContent: {
        flex: 1,
    },
    headerText: {
        color: '#aaa',
        fontSize: 14,
        marginBottom: 2,
    },
    emailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    emailIcon: {
        marginRight: 8,
    },
    emailText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        flexShrink: 1,
    },
    sectionTitle: {
        color: '#aaa',
        fontSize: 16,
        marginBottom: 15,
        marginTop: 20,
        fontWeight: '500',
    },
    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    optionButton: {
        width: '48%',
        backgroundColor: '#1E1E1E',
        padding: 18,
        borderRadius: 12,
        marginBottom: 15,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#252525',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    selectedOption: {
        backgroundColor: '#252525',
        borderColor: '#4A7CFF',
        shadowColor: '#4A7CFF',
        shadowOpacity: 0.3,
    },
    optionIconContainer: {
        marginBottom: 10,
    },
    optionText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '500',
    },
    // New Amount Input Styles
    amountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1E1E1E',
        borderRadius: 12,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#252525',
        marginBottom: 20,
    },
    amountIcon: {
        marginRight: 10,
    },
    amountInput: {
        flex: 1,
        color: '#fff',
        paddingVertical: 15,
        fontSize: 16,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1E1E1E',
        borderRadius: 12,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#252525',
        marginBottom: 30,
    },
    passwordIcon: {
        marginRight: 10,
    },
    passwordInput: {
        flex: 1,
        color: '#fff',
        paddingVertical: 15,
        fontSize: 16,
    },
    proceedButton: {
        backgroundColor: '#4A7CFF',
        padding: 18,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#4A7CFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },
    disabledButton: {
        backgroundColor: '#252525',
        shadowColor: '#000',
    },
    proceedButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    proceedIcon: {
        marginLeft: 8,
    },
});

export default TransactionScreen;