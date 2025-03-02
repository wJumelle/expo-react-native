import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

import { useVideoPlayer, VideoView } from 'expo-video';

import assetId from '../../assets/video/video.mp4';

export default function TabTwoScreen() {
    const player = useVideoPlayer(assetId, player => {
        player.loop = true;
        player.play();
    });

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="video.fill"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Vidéo en local</ThemedText>
      </ThemedView>
      <ThemedText>C'est ici qu'on teste les fichiers vidéos en local.</ThemedText>
      <VideoView player={player} allowsFullscreen allowsPictureInPicture />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
