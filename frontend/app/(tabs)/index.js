import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';

const API_URL = "http://localhost:3001/api"; // change to your IP if testing on device

export default function App() {
  const [games, setGames] = useState([]);
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [platform, setPlatform] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [updateId, setUpdateId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');


  const fetchGames = async () => {
    const res = await axios.get(API_URL);
    setGames(res.data);
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const addGame = async () => {
    await axios.post(API_URL, { title, genre, platform, releaseYear });
    await fetchGames();
    // Clear fields
    setTitle('');
    setGenre('');
    setPlatform('');
    setReleaseYear('');
  };

  const updateGame = async () => {
    if (!updateId) return;
    if (!updateId) return;

    // Check if the ID exists
    const gameToUpdate = games.find(game => game.id === parseInt(updateId));
    if (!gameToUpdate) {
      setErrorMsg('Invalid ID number');
      return;
    }
  
    // Clear error message if valid
    setErrorMsg('');

    await axios.put(`${API_URL}/${updateId}`, { title, genre, platform, releaseYear });
    await fetchGames();
    // Clear fields
    setTitle('');
    setGenre('');
    setPlatform('');
    setReleaseYear('');
    setUpdateId('');
  };

  const deleteGame = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    await fetchGames();
  };

  const deleteAllGames = async () => {
    await axios.delete(API_URL);
    await fetchGames();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>🎮 Game Collection</Text>
      {errorMsg ? <Text style={{ color: 'red', marginBottom: 10 }}>{errorMsg}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="ID to Update"
        value={updateId}
        onChangeText={(text) => {
          const numericText = text.replace(/[^0-9]/g, ''); // removes non-digit characters
          setUpdateId(numericText);
        }}
        keyboardType="numeric"
      />
      <View style={{ marginBottom: 10 }}>
        <Button title="Update Game" disabled={!updateId} onPress={updateGame} />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Genre"
        value={genre}
        onChangeText={setGenre}
      />
      <TextInput
        style={styles.input}
        placeholder="Platform"
        value={platform}
        onChangeText={setPlatform}
      />
      <TextInput
        style={styles.input}
        placeholder="Release Year"
        value={releaseYear}
        onChangeText={setReleaseYear}
        keyboardType="numeric"
      />

      <Button title="Add Game" onPress={addGame} />

      <View style={styles.separator} />
      <Button color="red" title="Delete All Games" onPress={deleteAllGames} />
      <Text style={styles.heading}>📋 Current Games</Text>
      {games.map((game) => (
        <View key={game.id} style={styles.card}>
          <Text>{game.id}</Text>
          <Text>🎮 {game.title}</Text>
          <Text>Genre: {game.genre}</Text>
          <Text>Platform: {game.platform}</Text>
          <Text>Year: {game.releaseYear}</Text>
          <Button title="Delete" color="darkred" onPress={() => deleteGame(game.id)} />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#f9f9f9"
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  card: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#e6f0ff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#cce",
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 20,
  },
});
