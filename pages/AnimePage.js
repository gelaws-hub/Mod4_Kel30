import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import axios from 'axios';

const AnimePage = () => {
  const [animeData, setAnimeData] = useState([]);

  useEffect(() => {
    // Mengambil data dari API Jikan saat komponen dimuat
    axios.get('https://api.jikan.moe/v4/top/anime')
      .then((response) => {
        setAnimeData(response.data.top);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Top Anime</Text>
      <FlatList
        data={animeData}
        keyExtractor={(item) => item.mal_id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10 }}>
            <Text>{item.title}</Text>
            <Image
              source={{ uri: item.image_url }}
              style={{ width: 100, height: 150 }}
            />
          </View>
        )}
      />
    </View>
  );
};

export default AnimePage;
