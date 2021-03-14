import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

import api from './services/api';

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function loadRepositories() {
      const { data } = await api.get('repositories');
      setRepositories(data);
    }

    loadRepositories();
  }, []);

  async function handleLikeRepository(id) {
    // Implement "Like Repository" functionality
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <Text style={styles.pageTitle}>
          GoRepo
        </Text>

        <View style={styles.formContainer}>
          <TextInput style={styles.input} placeholder="Título" />
          <TextInput style={styles.input} placeholder="Url" />
          <TextInput style={styles.input} placeholder="Tecnologias" />

          <TouchableOpacity style={styles.addButton} onPress={() => {}}>
            <Text style={styles.addButtonText}>ADICIONAR</Text>
          </TouchableOpacity>
        </View>

        <FlatList 
          style={styles.repositoriesList}
          data={repositories}
          keyExtractor={repositories => repositories.id}
          renderItem={({ item }) => (
              <View style={styles.repositoryContainer}>
                <Text style={styles.title}>{item.title}</Text>

                <View style={styles.techsContainer}>
                  {item.techs.map(tech => (
                    <Text key={tech} style={styles.tech}>{tech}</Text>
                  ))}
                </View>

                <View style={styles.likesContainer}>
                  <Text style={styles.likesText} >{item.likes} curtidas</Text>
                  <TouchableOpacity onPress={() => {}}>
                    <Icon style={styles.likesButton} name="thumbs-up" size={24} color="#7159C1" />
                  </TouchableOpacity>
                </View>
              </View>
          )}
        />
        
       
        {/* <View style={styles.repositoryContainer}>
          <Text style={styles.repository}>Repository 1</Text>

          <View style={styles.techsContainer}>
            <Text style={styles.tech}>
              ReactJS
            </Text>
            <Text style={styles.tech}>
              Node.js
            </Text>
          </View>

          <View style={styles.likesContainer}>
            <Text
              style={styles.likeText}
              // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
              testID={`repository-likes-1`}
            >
              3 curtidas
            </Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleLikeRepository(1)}
            // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
            testID={`like-button-1`}
          >
            <Text style={styles.buttonText}>Curtir</Text>
          </TouchableOpacity>
        </View> */}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  pageTitle: {
    padding: 20,
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  formContainer: {
    padding: 20,
  },
  input: {
    height: 50,
    padding: 10,
    marginBottom: 8,
    backgroundColor: '#FFF',
    borderRadius: 4,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#04d361',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  repositoriesList: {
    paddingHorizontal: 20,
  },
  repositoryContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 4,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: '#333',
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesText: {
    marginRight: 16,
    color: '#333',
    fontSize: 14,
  },
  likesButton: {

  }
});
