import React, { useState, useEffect } from 'react';
import {View, ScrollView, Text, TextInput, TouchableOpacity, Alert, StyleSheet} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { entriesAPI } from '../services/api';

const Screen = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [entries, setEntries] = useState([])
    const [entryIDToUpdate, setEntryIDToUpdate] = useState(null)
    useEffect(()=>{
        loadEntries()
    }, [])

    const loadEntries = async () => {
        console.log('loading entries Screen.js')
        try {
            const response = await entriesAPI.getEntries()
            console.log(response)
            setEntries(response.entries);
        } catch (error) {
            console.log('Error loading entries:', error);
        }
    };

    const handleSubmit = async () => {
        if (!title.trim() || !content.trim()) {
            Alert.alert('Validation', 'Please enter both title and content');
            return;
        }
        try {
            if(!entryIDToUpdate)
            {
                await entriesAPI.createEntry({ title, content });   
            }else{
                await entriesAPI.updateEntry(entryIDToUpdate, { title, content });   
                setEntryIDToUpdate(null)
            }
            setTitle('');
            setContent('');
            loadEntries(); // Refresh list after submit
            
        } catch (error) {
            console.log('Error submitting entry:', error);
            Alert.alert('Error', 'Failed to submit entry');
        }
    };
    const handleEntryPressed = async (entry) => {
        setEntryIDToUpdate(entry.id)
        setTitle(entry.title)
        setContent(entry.content)
    }

    const handleDelete = async (id) => {
        try {
            await entriesAPI.deleteEntry(id);
            Alert.alert('Success', 'Entry deleted successfully');
            loadEntries(); // Refresh list after delete
        } catch (error) {
            console.log('Error deleting entry:', error);
            Alert.alert('Error', 'Failed to delete entry');
        }
    }

     return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Content"
        value={content}
        onChangeText={setContent}
        multiline
        style={[styles.input, styles.multiline]}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>
            {entryIDToUpdate ? 'Update Entry' : 'Create Entry'}
        </Text>      
      </TouchableOpacity>
      <Text style={styles.sectionTitle}>Entries:</Text>
      {entries.map((entry) => (
        <View key={entry.id} style={styles.entryBox}>
          <Text style={styles.entryTitle}>{entry.title}</Text>
          <Text style={styles.entryContent}>{entry.content}</Text>
            <TouchableOpacity onPress={() => handleEntryPressed(entry)} style={styles.button}>
                <Text>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete(entry.id)} style={styles.button}>
                <Text>Delete</Text>
            </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff'
  },
  multiline: {
    minHeight: 80,
    textAlignVertical: 'top'
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#0056b3'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8
  },
  entryBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#f9f9f9'
  },
  entryTitle: {
    fontWeight: 'bold',
    marginBottom: 4
  },
  entryContent: {
    color: '#333'
  }
});
export default Screen