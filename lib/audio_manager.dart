import 'dart:math';

import 'package:audioplayers/audioplayers.dart';
import 'package:flutter/foundation.dart';

import 'game_settings.dart'; // adjust if needed

class AudioManager {
  final GameSettings settings;
  final AudioPlayer _audioPlayer = AudioPlayer();
  final AudioPlayer _bgmPlayer = AudioPlayer();

  AudioManager(this.settings);

  Future<void> playHighlightedSound() async {
    await _audioPlayer.setVolume(settings.musicVolume);
    await _audioPlayer.play(AssetSource('audio/collect.mp3'));
  }

  Future<void> playRandomWinPraiseSound() async {
    final praiseClips = [
      'audio/well_done.mp3',
      'audio/great_job.mp3',
      'audio/you_did_it.mp3',
    ];
    final clip = praiseClips[Random().nextInt(praiseClips.length)];
    final winPlayer = AudioPlayer();
    await winPlayer.setVolume(settings.musicVolume);
    await winPlayer.play(AssetSource(clip));
    winPlayer.onPlayerComplete.listen((_) => winPlayer.dispose());
  }

  Future<void> playBackgroundMusic() async {
    try {
      await _bgmPlayer.setReleaseMode(ReleaseMode.loop);
      await _bgmPlayer.setVolume(settings.musicVolume);
      await _bgmPlayer.play(
        AssetSource('audio/music-for-puzzle-game-146738.mp3'),
      );
    } catch (e) {
      debugPrint('Error playing background music: $e');
    }
  }

  Future<void> stopBackgroundMusic() async {
    await _bgmPlayer.stop();
  }

  void dispose() {
    _audioPlayer.dispose();
    _bgmPlayer.dispose();
  }
}
