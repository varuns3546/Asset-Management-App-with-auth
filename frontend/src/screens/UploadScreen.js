import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import { loadUser } from '../features/auth/authSlice';

const UploadScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    
    useEffect(() => {
        dispatch(loadUser());
    }, []);
    
    useEffect(() => {
        if (!user) {
            navigation.navigate('Login');
            return;
        }
    }, [user, navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <Header user={user} navigation={navigation} />
            
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Upload Assets</Text>
                        <View style={styles.uploadContainer}>
                            <Text style={styles.uploadText}>
                                Upload functionality coming soon...
                            </Text>
                            <Text style={styles.uploadSubtext}>
                                This tab will allow you to upload files and assets to your account.
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    scrollView: {
        flex: 1,
    },
    content: {
        padding: 20,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#212529',
        marginBottom: 15,
    },
    uploadContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 40,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 3,
    },
    uploadText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#212529',
        marginBottom: 8,
        textAlign: 'center',
    },
    uploadSubtext: {
        fontSize: 14,
        color: '#6c757d',
        textAlign: 'center',
    },
});

export default UploadScreen;