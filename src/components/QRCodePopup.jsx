import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import QRCode from 'react-native-qrcode-styled';

import Logo from '../icons/logo/logo.png';

const { width } = Dimensions.get('window');
const QR_SIZE = width * 0.5; // QR will take 70% of screen width

const QRCodePopup = ({ isVisible, onClose, email }) => {
    return (
        <Modal isVisible={isVisible} onBackdropPress={onClose}>
            <View style={styles.modalContent}>
                <Text style={styles.title}>My Banking QR</Text>
                <View style={styles.qrContainer}>
                    <QRCode
                        data={email}
                        size={QR_SIZE}
                        color="#4dabf7"
                        backgroundColor="#1e1e1e"
                        logo={{
                            href: Logo,  // Use the imported image reference
                            size: 150,    // Fixed size often works better than dynamic
                            margin: 10,
                            borderRadius: 15,
                        }}
                    />
                </View>
                <Text style={styles.emailText}>{email}</Text>

                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={onClose}
                    activeOpacity={0.8}
                >
                    <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
            </View>
        </Modal >
    );
};

const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: '#121212',
        padding: 25,
        borderRadius: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#333',
        width: width * 0.9,
        alignSelf: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 25,
        color: '#4dabf7',
    },
    qrContainer: {
        backgroundColor: '#1e1e1e',
        borderRadius: 15,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#333',
        padding: 20,
        width: QR_SIZE + 40, // Container larger than QR
        alignItems: 'center',
        justifyContent: 'center',
    },
    emailText: {
        fontSize: 18,
        marginBottom: 25,
        color: '#e0e0e0',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    closeButton: {
        backgroundColor: '#1e3a8a',
        paddingHorizontal: 40,
        paddingVertical: 15,
        borderRadius: 30,
        width: '100%',
        alignItems: 'center',
        elevation: 3,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default QRCodePopup;