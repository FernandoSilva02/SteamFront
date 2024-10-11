import { StyleSheet } from 'react-native';

const mainMenuStyles = StyleSheet.create({
  gameList: {
    flex: 1,
    marginTop: 10,
    paddingVertical: 0,
  },
  gameItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#243447',
    borderRadius: 10,
  },
  gameInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    width: 72,
    height: 50,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 16,
  },
  gameItemImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gameItemTextContainer: {
    flexDirection: 'column',
  },
});

export default mainMenuStyles;
