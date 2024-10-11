import { StyleSheet } from 'react-native';

const tagStyles = StyleSheet.create({
  tagsContainer: {
    height: 150,
    paddingVertical: 0,
  },
  tagList: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 0,
  },
  tag: {
    alignItems: 'center',
    backgroundColor: '#303649',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    minWidth: 100,
  },
  tagSelected: {
    backgroundColor: '#31BCFC',
  },
});

export default tagStyles;
