import React, { useRef } from 'react';
import {
    Animated,
    FlatList,
    View,
    Image,
    Dimensions,
    StyleSheet,
} from 'react-native';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.8;
const ITEM_SPACING = (width - ITEM_WIDTH) / 2;

const CarouselSlider = ({ data }) => {
    const scrollX = useRef(new Animated.Value(0)).current;

    const images = data[0]?.images || [];

    return (
        <View>
            <Animated.FlatList
                data={images}
                keyExtractor={(_, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={ITEM_WIDTH}
                decelerationRate="fast"
                bounces={false}
                contentContainerStyle={{ paddingHorizontal: ITEM_SPACING }}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )}
                renderItem={({ item, index }) => {
                    const inputRange = [
                        (index - 1) * ITEM_WIDTH,
                        index * ITEM_WIDTH,
                        (index + 1) * ITEM_WIDTH,
                    ];

                    const scale = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.9, 1, 0.9],
                        extrapolate: 'clamp',
                    });

                    return (
                        <View style={{ width: ITEM_WIDTH }}>
                            <Animated.View
                                style={[styles.imageContainer, { transform: [{ scale }] }]}
                            >
                                <Image source={{ uri: item }} style={styles.image} />
                            </Animated.View>
                        </View>
                    );
                }}
            />

            {/* Indicator Dots */}
            <View style={styles.dotContainer}>
                {images.map((_, index) => {
                    const inputRange = [
                        (index - 1) * ITEM_WIDTH,
                        index * ITEM_WIDTH,
                        (index + 1) * ITEM_WIDTH,
                    ];

                    const dotScale = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.8, 1.2, 0.8],
                        extrapolate: 'clamp',
                    });

                    const dotOpacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.5, 1, 0.5],
                        extrapolate: 'clamp',
                    });

                    return (
                        <Animated.View
                            key={index}
                            style={[
                                styles.dot,
                                {
                                    transform: [{ scale: dotScale }],
                                    opacity: dotOpacity,
                                },
                            ]}
                        />
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        marginHorizontal: 10,
        borderRadius: 15,
        overflow: 'hidden',
        elevation: 5,
    },
    image: {
        width: '100%',
        height: 250,
        resizeMode: 'cover',
    },
    dotContainer: {
        position: 'absolute',
        bottom: 15,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: '#fff',
        marginHorizontal: 6,
    },
});

export default CarouselSlider;
