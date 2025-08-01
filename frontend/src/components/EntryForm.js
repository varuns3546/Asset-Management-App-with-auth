import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createEntry } from '../features/entries/entrySlice'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { loadUser } from '../features/auth/authSlice'
const EntryForm = ({navigation}) => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
    })
    const dispatch = useDispatch()
    useEffect(() => {
            dispatch(loadUser())
        }, [])
    const handleSubmit = () => {
        dispatch(createEntry(formData))
        setFormData({
            title: '',
            content: '',
        })
    }

    const handleChange = (field, value) => {
        setFormData(prev => ({...prev, [field]: value}))
    }
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Add New Entry</Text>
            <TextInput
                style={styles.titleInput}
                placeholder="Title"
                value={formData.title}
                onChangeText={(value) => handleChange('title', value)}
            />  
            <TextInput
                style={styles.contentInput}
                placeholder="Content"
                value={formData.content}
                onChangeText={(value) => handleChange('content', value)}
                multiline={true}
                textAlignVertical="top"
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Add Entry</Text>
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
    titleInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
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
    contentInput: {
        height: 120,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 10,
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
    content: {
        fontSize: 16,
        marginBottom: 16,
    },
})

export default EntryForm