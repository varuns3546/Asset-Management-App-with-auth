import React, { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native'
// import { Ionicons } from '@expo/vector-icons'
import {register, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
const RegisterScreen = ({navigation}) => {
    const [formData, setFormData] = useState({
        firstName: '', 
        lastName: '', 
        email: '', 
        password: '',
        confirmPassword: '', 
        orgPassword: ''
      })
    
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const{firstName, lastName, email, 
        password, confirmPassword, orgPassword} = formData
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message} = useSelector(
        (state) => state.auth)

    useEffect(() => {
        if(isError){
           console.log('error', message) 
        }
        if(isSuccess || user){
            navigation.navigate('MainTabs')
        }
    }, [user, isError, isSuccess, message, dispatch])

    
    const updateField = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };
    const onSubmit = () => {
        if(formData.password!==formData.confirmPassword)
        {
            console.log('Passwords dont match')
        }else{
            const userData = {
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                orgPassword
            }

            dispatch(register(userData))
        }
    }
    if (isLoading){
        return <Spinner/>
    }
    return (
    <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
        <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.heading}>
            <View style={styles.titleContainer}>
            <Text style={styles.title}>Register</Text>
            </View>
            <Text style={styles.subtitle}>Create an account</Text>
        </View>

        <View style={styles.form} data-testid="registration-form">
            <View style={styles.formGroup}>
            <TextInput
                style={styles.input}
                placeholder="First name"
                value={formData.firstName}
                onChangeText={(value) => updateField('firstName', value)}
                autoCapitalize="words"
                textContentType="none"
                autoComplete="off"
                autoCorrect={false}
                spellCheck={false}
                importantForAutofill="no"
                name="reg_first_name"
            />
            </View>

            <View style={styles.formGroup}>
            <TextInput
                style={styles.input}
                placeholder="Last name"
                value={formData.lastName}
                onChangeText={(value) => updateField('lastName', value)}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="none"
                autoComplete="off"
                spellCheck={false}
                importantForAutofill="no"
                name="reg_last_name"
            />
            </View>

            <View style={styles.formGroup}>
                <TextInput
                style={styles.input}
                placeholder="Email"
                value={formData.email}
                onChangeText={(value) => updateField('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="none"
                autoComplete="off"
                spellCheck={false}
                importantForAutofill="no"
                name="reg_email"
                />
            </View>

            <View style={styles.formGroup}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Organization password"
                        value={formData.orgPassword}
                        onChangeText={(value) => updateField('orgPassword', value)}
                        autoCapitalize="none"
                        textContentType="none"
                        autoComplete="off"
                        autoCorrect={false}
                        spellCheck={false}
                        importantForAutofill="no"
                        name="reg_org_pass"
                        secureTextEntry={true}
                        autoCompleteType="off"
                        dataDetectorTypes="none"
                    />
                </View>
            </View>
            <View style={styles.formGroup}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Create new password"
                        value={formData.password}
                        onChangeText={(value) => updateField('password', value)}
                        secureTextEntry={!showPassword}
                        autoCapitalize="none"
                        textContentType="none"
                        autoComplete="off"
                        autoCorrect={false}
                        spellCheck={false}
                        importantForAutofill="no"
                        name="reg_new_pass"
                        autoCompleteType="off"
                        dataDetectorTypes="none"
                    />
                    <TouchableOpacity 
                        style={styles.eyeIcon}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Text 
                            style={styles.eyeIconText}
                        >
                            {showPassword ? "eye-off" : "eye"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.formGroup}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm new password"
                        value={formData.confirmPassword}
                        onChangeText={(value) => updateField('confirmPassword', value)}
                        secureTextEntry={!showConfirmPassword}
                        autoCapitalize="none"
                        textContentType="none"
                        autoComplete="off"
                        autoCorrect={false}
                        spellCheck={false}
                        importantForAutofill="no"
                        name="reg_confirm_pass"
                        autoCompleteType="off"
                        dataDetectorTypes="none"
                    />
                    <TouchableOpacity 
                        style={styles.eyeIcon}
                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        <Text 
                            style={styles.eyeIconText}
                        >
                            {showConfirmPassword ? "eye-off" : "eye"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={onSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
                <Text style={styles.footerText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.linkText}>Sign In</Text>
                </TouchableOpacity>
          </View>
        </View>
        </ScrollView>
    </KeyboardAvoidingView>
    )
}
    
const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#fff',
    },
    scrollContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    },
    loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    },
    heading: {
    alignItems: 'center',
    marginBottom: 40,
    },
    titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    },
    title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#333',
    },
    subtitle: {
    fontSize: 16,
    color: '#666',
    },
    form: {
    width: '100%',
    },
    formGroup: {
    marginBottom: 20,
    },
    input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    flex: 1,
    },
    inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    },
    eyeIcon: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    },
    eyeIconText: {
        fontSize: 20,
        color: '#666',
    },
    button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
    },
    buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
    },
    footerText: {
        fontSize: 16,
        color: '#666',
    },
    linkText: {
        fontSize: 16,
        color: '#007AFF',
        fontWeight: '600',
    },
})
    

export default RegisterScreen;