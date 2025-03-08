import { Button, StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent } from 'expo';
import { Collapsible } from '@/components/Collapsible';

const videoSource = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
const assetId = require('../../assets/video/nature.mp4');

export default function TabTwoScreen() {
  const onlinePlayer = useVideoPlayer(videoSource, player => {
    player.loop = true;
  });

  const localPlayer = useVideoPlayer(assetId, player => {
    player.loop = true;
  });

  const vOnlineStatus = useEvent(onlinePlayer, 'playingChange', { isPlaying: onlinePlayer.playing });
  const vLocalStatus = useEvent(localPlayer, 'playingChange', { isPlaying: localPlayer.playing });

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
        <ThemedText type="title">Gestion des vidéos</ThemedText>
      </ThemedView>
      <ThemedText>C'est ici qu'on teste les différentes façon de charger une vidéo.</ThemedText>

      <Collapsible title="Vidéo à distance">
        <View style={styles.videoContainer}>
          <VideoView
            style={styles.video}
            player={onlinePlayer}
            contentFit='contain'
            allowsFullscreen allowsPictureInPicture />
        </View>
        <View style={styles.controlsContainer}>
          <Button
            title={vOnlineStatus.isPlaying ? 'Pause' : 'Lecture'}
            onPress={() => {
              if (vOnlineStatus.isPlaying) {
                onlinePlayer.pause();
              } else {
                onlinePlayer.play();
              }
            }}
          />
        </View>
      </Collapsible>

      <Collapsible title="Vidéo en local de l'appplication">
        <View style={styles.videoContainer}>
          <VideoView
            style={styles.video}
            player={localPlayer}
            contentFit='contain'
            allowsFullscreen allowsPictureInPicture />
        </View>
        <View style={styles.controlsContainer}>
          <Button
            title={vLocalStatus.isPlaying ? 'Pause' : 'Lecture'}
            onPress={() => {
              if (vLocalStatus.isPlaying) {
                localPlayer.pause();
              } else {
                localPlayer.play();
              }
            }}
          />
        </View>
      </Collapsible>

      <Collapsible title="Vidéo en local sur le périphérique">
        <ThemedText>Pas possible sans Development build</ThemedText>
      </Collapsible>
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
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: undefined,
    aspectRatio: 16 / 9,
  },
  controlsContainer: {
    paddingBlock: 10,
  },
});
