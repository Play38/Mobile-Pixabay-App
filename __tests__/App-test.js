/**
 * @format
 */

import React from 'react'
import ImageBtn from '../src/ImageBtn'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'
import styles from '../src/ImageAppStyle'

describe('ImagBtn tests', function() {
  test('renders correctly', async () => {
    const item = {
      id: 1224267,
      style: { flex: 1, width: 137.14285714285714, height: 130 },
      source: [
        'https://cdn.pixabay.com/photo/2016/02/26/16/32/dog-1224267_150.jpg',
        'https://pixabay.com/get/e837b30b2af2063ed1584d05fb1d4794e176e7d01ab20c4090f5c77da1ecb4bedd_1280.jpg'
      ],
      onPress: ['https://cdn.pixabay.com/photo/2016/02/26/16/32/dog-1224267_150.jpg', 1224267]
    }

    const testRenderer = renderer.create(
      <ImageBtn
        id={item.id}
        source={item.source}
        style={[styles.imageStyleGrid]}
        onPress={[item.onPress]}
      />
    )
    expect(testRenderer.root.props).toHaveProperty('id')
    expect(testRenderer.root.props).toHaveProperty('source')
    expect(testRenderer.root.props).toHaveProperty('style')
    expect(testRenderer.root.props).toHaveProperty('onPress')
  })

  test('checks if undefiened ', async () => {
    const item = {
      id: 1224267,
      style: { flex: 1, width: 137.14285714285714, height: 130 },
      source: [
        'https://cdn.pixabay.com/photo/2016/02/26/16/32/dog-1224267_150.jpg',
        'https://pixabay.com/get/e837b30b2af2063ed1584d05fb1d4794e176e7d01ab20c4090f5c77da1ecb4bedd_1280.jpg'
      ],
      onPress: ['https://cdn.pixabay.com/photo/2016/02/26/16/32/dog-1224267_150.jpg', 1224267]
    }

    const testRenderer = renderer.create(
      <ImageBtn
        id={item.id}
        source={item.source}
        style={[styles.imageStyleGrid]}
        onPress={[item.onPress]}
      />
    )
    expect(testRenderer.root.props.item).toBeUndefined()
  })
})
