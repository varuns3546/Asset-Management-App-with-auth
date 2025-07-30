import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createEntry, reset } from '../features/entries/entrySlice'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { loadUser } from '../features/auth/authSlice'
const EntryForm = ({navigation}) => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
    })
    const dispatch = useDispatch()
    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.entries)
    
    useEffect(() => {
        dispatch(loadUser())
    }, [])
    
    useEffect(() => {
        if (isError) {
            Alert.alert('Error', message || 'Failed to create entry')
        }
        
        if (isSuccess) {
            setFormData({
                title: '',
                content: '',
            })
        }
        
        // Reset state after handling
        if (isError || isSuccess) {
            dispatch(reset())
        }
    }, [isError, isSuccess, message, dispatch])
    const handleSubmit = () => {
        // Validate form data
        if (!formData.title.trim() || !formData.content.trim()) {
            Alert.alert('Validation Error', 'Title and content are required')
            return
        }
        
        dispatch(createEntry(formData))
    }

    const handleChange = (field, value) => {
        setFormData(prev => ({...prev, [field]: value}))
    }
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Add New Entry</Text>
            <TextInput
                style={styles.input}
                placeholder="Title"
                value={formData.title}
                onChangeText={(value) => handleChange('title', value)}
            />  
            <TextInput
                style={styles.input}
                placeholder="Content"
                value={formData.content}
                onChangeText={(value) => handleChange('content', value)}
            />
            <TouchableOpacity 
                style={[styles.button, isLoading && styles.buttonDisabled]} 
                onPress={handleSubmit}
                disabled={isLoading}
            >
                <Text style={styles.buttonText}>
                    {isLoading ? 'Adding...' : 'Add Entry'}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonDisabled: {
        backgroundColor: '#ccc',
    },
    content: {
        fontSize: 16,
        marginBottom: 16,
    },
})

export default EntryForm