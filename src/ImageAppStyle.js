import { StyleSheet, Dimensions } from 'react-native'
const win = Dimensions.get('window')
export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    backgroundColor: '#ff746d',
    height: 75
  },
  textHeader: {
    color: 'black',
    fontSize: 25,
    textAlign: 'center',
    top: 15
  },
  heartIcon: {
    left: '80%',
    top: '20%',
    position: 'absolute'
  },
  heartIconBottom: {
    bottom: 0,
    position: 'absolute'
  },
  returnIcon: {
    left: '10%',
    top: '20%',
    position: 'absolute'
  },
  searchStyle: {
    width: '100%'
  },
  touchableContainer: {
    width: '100%',
    flexDirection: 'row'
  },
  viewButtonOff: {
    width: '50%',
    height: 30,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#0066ff',
    backgroundColor: '#ffffff'
  },
  viewButtonOn: {
    width: '50%',
    height: 30,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#0066ff',
    backgroundColor: '#0000ff'
  },
  textViewButtonOn: {
    fontSize: 20,
    color: '#ffffff'
  },
  textViewButtonOff: {
    fontSize: 20,
    color: '#000000'
  },
  imageStyleGrid: {
    flex: 1,
    width: win.width / 3,
    height: 130
  },
  imageStyleList: {
    position: 'relative',
    left: 10,
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginBottom: '7%'
  },
  imageContainGrid: {
    flex: 1,
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  imageContainList: {
    flex: 1,
    width: '100%',
    flexDirection: 'column'
  },
  textHeadlineList: {
    position: 'absolute',
    left: '20%',
    fontSize: 20,
    color: 'black'
  },
  textMinorList: {
    position: 'absolute',
    left: '20%',
    top: '30%',
    color: 'gray'
  },
  noResultView: {
    height: 300
  },
  noResultText: {
    color: 'black',
    position: 'relative',
    fontSize: 25,
    textAlign: 'center',
    top: '50%'
  },
  bigImage: {
    position: 'relative',
    resizeMode: 'contain',
    width: win.width - 50,
    height: win.height - 50
    //
  },
  bigImageView: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    height: 500,
    width: '100%'
  }
})
