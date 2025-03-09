import { useEffect, useState, useRef, ReactNode } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Collapsible } from '@/components/Collapsible';

import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';

const audioSourceLocal = require('../../assets/audio/strange.mp3');
const audioSourceOnline = 'https://www.cite-sciences.fr/app/w/audio/nightcore.mp3'

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="music.house.fill"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Audio en local</ThemedText>
      </ThemedView>
      <ThemedText>C'est ici qu'on teste les fichiers audios en local.</ThemedText>

      <Collapsible title="Audio à distance">
        <AudioPlayer source={audioSourceOnline}>
          <ThemedText>Chemin suivi : 'https://www.cite-sciences.fr/app/w/audio/nightcore.mp3'</ThemedText>
        </AudioPlayer>
      </Collapsible>
      <Collapsible title="Audio en local">
        <AudioPlayer source={audioSourceLocal}>
          <ThemedText>Chemin suivi : '../../assets/audio/strange.mp3'</ThemedText>
        </AudioPlayer>
      </Collapsible>
    </ParallaxScrollView>
  );
}

function AudioPlayer({ source, children }: Props) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(1); // Évite division par 0
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Charger le fichier audio
  const loadAudio = async () => {
    if(typeof source === 'string') {
      const { sound } = await Audio.Sound.createAsync(
        { uri: source},
        { shouldPlay: false, isMuted: false }
      );
      setSound(sound);

      // Met à jour la durée totale
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setDuration(status.durationMillis || 1);
          setPosition(status.positionMillis || 0);
        }
      });
    } else {
      const { sound } = await Audio.Sound.createAsync(
        source,
        { shouldPlay: false, isMuted: false }
      );
      setSound(sound);

      // Met à jour la durée totale
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setDuration(status.durationMillis || 1);
          setPosition(status.positionMillis || 0);
        }
      });
    }
  };

  useEffect(() => {
    loadAudio();

    return () => {
      if (sound) {
        sound.unloadAsync(); // Nettoyage du son en quittant le composant
      }
    };
  }, []);

  // Play / Pause
  const togglePlayPause = async () => {
    if (sound) {
      const status = await sound.getStatusAsync();
      if (status.isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
    }
  };

  // Stop
  const stopAudio = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
      setPosition(0);
    }
  };

  // Mute / Unmute
  const toggleMute = async () => {
    if (sound) {
      await sound.setIsMutedAsync(!isMuted);
      setIsMuted(!isMuted);
    }
  };

  // Mettre à jour la barre de progression en continu
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(async () => {
        if (sound) {
          const status = await sound.getStatusAsync();
          if (status.isLoaded) {
            setPosition(status.positionMillis || 0);
          }
        }
      }, 500);
    } else if (!isPlaying && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying]);

  return (
    <View style={styles.audioContainer}>
      {/* Affichage des enfants */}
      {children}

      {/* Barre de progression */}
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        onSlidingComplete={async (value) => {
          if (sound) {
            await sound.setPositionAsync(value);
            setPosition(value);
          }
        }}
      />

      {/* Boutons de contrôle */}
      <View style={styles.controls}>
        <TouchableOpacity onPress={togglePlayPause} style={styles.button}>
          <ThemedText>{isPlaying ? '⏸️ Pause' : '▶️ Play'}</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity onPress={stopAudio} style={styles.button}>
          <ThemedText>⏹️ Stop</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleMute} style={styles.button}>
          <ThemedText>{isMuted ? '🔊 Unmute' : '🔇 Mute'}</ThemedText>
        </TouchableOpacity>
      </View>

      {/* Temps actuel / durée */}
      <ThemedText style={styles.timer}>
        {Math.floor(position / 1000)}s / {Math.floor(duration / 1000)}s
      </ThemedText>
    </View>
  )
}

interface Props {
  readonly source: number | string,
  readonly children: ReactNode
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
  audioContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
  },
  slider: {
    width: 300,
    height: 40,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 0,
  },
  button: {
    margin: 10,
    padding: 10,
    backgroundColor: '#444',
    borderRadius: 5,
  },
  timer: {
    marginTop: 10,
    color: 'white',
  },
});
