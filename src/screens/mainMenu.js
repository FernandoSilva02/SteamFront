import * as React from "react";
import { View, StyleSheet, Image, Text, ScrollView } from "react-native";

const Tag = ({ children }) => (
  <View style={styles.tag}>
    <Text style={styles.tagText}>{children}</Text>
  </View>
);

const GameItem = ({ imageUri, name, platforms, price }) => (
  <View style={styles.gameItemContainer}>
    <View style={styles.gameInfo}>
      <Image source={{ uri: imageUri }} style={styles.gameItemImage} />
      <View style={styles.gameItemTextContainer}>
        <Text style={styles.gameItemName}>{name}</Text>
        <View style={styles.platformContainer}>
          {platforms.map((platform, index) => (
            <View key={index} style={styles.platformItem}>
              <Image
                source={{ uri: platform.iconUri }}
                style={styles.platformIcon}
              />
              <Text style={styles.platformText}>{platform.name}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
    <Text style={styles.priceText}>{price}</Text>
  </View>
);

function MainMenu() {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/97d4b2a2fccc7a2ba7ff9e2f273076e13ad902a0be7044ac0e627ee6a44691f5?placeholderIfAbsent=true&apiKey=79fcc6ae448041eb9992e7b04c216d13",
        }}
        style={styles.headerImage}
      />
      <View style={styles.tagsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.tagList}>
            <Tag>Aventura</Tag>
            <Tag>Plataformas</Tag>
            <Tag>Carreras</Tag>
            <Tag>Metroidvania</Tag>
          </View>
        </ScrollView>
        <View style={styles.gameList}>
          <GameItem
            imageUri="https://cdn.builder.io/api/v1/image/assets/TEMP/22837f66800e6ff303ce894556bac5f33beeaef8db1021929c3e031098540188?placeholderIfAbsent=true&apiKey=79fcc6ae448041eb9992e7b04c216d13"
            name="ANIMAL WELL"
            price="$59.000"
            platforms={[
              {
                name: "Windows",
                iconUri: "https://cdn.builder.io/api/v1/image/assets/TEMP/cea3f8de21ef73703b06cfe8ced2138ffde082512b31c9872d4a8861aa969a0c?placeholderIfAbsent=true&apiKey=79fcc6ae448041eb9992e7b04c216d13",
              },
            ]}
          />
          <GameItem
            imageUri="https://cdn.builder.io/api/v1/image/assets/TEMP/504d1dba8e8189ee5a53cff02b4879c592272790e8a7005c14dcbd3485db325c?placeholderIfAbsent=true&apiKey=79fcc6ae448041eb9992e7b04c216d13"
            name="Super Mario Bros. 3"
            price="$20.000"
            platforms={[
              {
                name: "Windows",
                iconUri: "https://cdn.builder.io/api/v1/image/assets/TEMP/cea3f8de21ef73703b06cfe8ced2138ffde082512b31c9872d4a8861aa969a0c?placeholderIfAbsent=true&apiKey=79fcc6ae448041eb9992e7b04c216d13",
              },
            ]}
          />
          <GameItem
              imageUri="https://cdn.builder.io/api/v1/image/assets/TEMP/158b0098e74e372ef6b048083f637f62b91bbd632bb77be476af3ab3609b936e?placeholderIfAbsent=true&apiKey=79fcc6ae448041eb9992e7b04c216d13"
              name="Bad Piggies"
              price="$5.000"
              platforms={[
                {
                  name: "Windows",
                  iconUri:
                    "https://cdn.builder.io/api/v1/image/assets/TEMP/b54ac0f3f37a7e80a619f98450a4920741e997b96e4b288447828b71b978a855?placeholderIfAbsent=true&apiKey=79fcc6ae448041eb9992e7b04c216d13",
                },
                {
                  name: "Mac",
                  iconUri:
                    "https://cdn.builder.io/api/v1/image/assets/TEMP/8ba989bdace9e0ff43a748b510ce7d4e0b6f96390c61d5b01fa0f05a7d9a960a?placeholderIfAbsent=true&apiKey=79fcc6ae448041eb9992e7b04c216d13",
                },
              ]}
            />
            <GameItem
              imageUri="https://cdn.builder.io/api/v1/image/assets/TEMP/ba2cf4c0b22e91deab5a908b834df2158b94a52863e2e41d3c32589fe2bef0aa?placeholderIfAbsent=true&apiKey=79fcc6ae448041eb9992e7b04c216d13"
              name="TLOZ: Ocarina of Time"
              price="$25.000"
              platforms={[
                {
                  name: "Windows",
                  iconUri:
                    "https://cdn.builder.io/api/v1/image/assets/TEMP/cea3f8de21ef73703b06cfe8ced2138ffde082512b31c9872d4a8861aa969a0c?placeholderIfAbsent=true&apiKey=79fcc6ae448041eb9992e7b04c216d13",
                },
              ]}
            />
            <GameItem
              imageUri="https://cdn.builder.io/api/v1/image/assets/TEMP/a54f9f092e078992eacf64d495d4867cf1dfbba0628c09039f52e6619d586898?placeholderIfAbsent=true&apiKey=79fcc6ae448041eb9992e7b04c216d13"
              name="Super Mario Kart"
              price="$5.000"
              platforms={[
                {
                  name: "Windows",
                  iconUri:
                    "https://cdn.builder.io/api/v1/image/assets/TEMP/cea3f8de21ef73703b06cfe8ced2138ffde082512b31c9872d4a8861aa969a0c?placeholderIfAbsent=true&apiKey=79fcc6ae448041eb9992e7b04c216d13",
                },
              ]}
            />
          </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A2A3D',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  headerImage: {
    width: 150,
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },
  tagsContainer: {
    marginBottom: 770, // Reducir el espacio entre el contenedor de tags y la lista de juegos
  },
  tagList: {
    flexDirection: 'row',
    alignItems: 'baseline', // Centrar verticalmente los tags
  },
  tag: { // Campo de las etiquetas
    alignItems: 'center',
    backgroundColor: '#303649',
    paddingVertical: 4, // Reducido para un tamaño más compacto
    paddingHorizontal: 10, // Reducido para un tamaño más compacto
    borderRadius: 8,
    marginRight: 8,
    minWidth: 100, // Definir un ancho mínimo
  },
  tagText: { // Texto de las etiquetas
    color: '#FFF',
    fontWeight: '600',
    fontSize: 14,
  },
  gameList: {
    flex: 1,
  },
  gameItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  gameInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gameItemImage: {
    width: 72,
    height: 50,
    resizeMode: 'contain',
    marginRight: 16,
  },
  gameItemTextContainer: {
    flexDirection: 'column',
  },
  gameItemName: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  platformContainer: {
    flexDirection: 'row',
    marginTop: 4,
  },
  platformItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  platformIcon: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
  },
  platformText: {
    color: '#7B8D9D',
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '300',
  },
  priceText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '300',
  },
});

export default MainMenu;
