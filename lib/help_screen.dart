import 'package:chewie/chewie.dart';
import 'package:flutter/material.dart';
import 'package:flutter_translate/flutter_translate.dart';
import 'package:just_audio/just_audio.dart';
import 'package:video_player/video_player.dart';

import 'app_styles.dart';

void showHelpDialog(BuildContext context, String langCode) {
  Navigator.of(context).push(
    PageRouteBuilder(
      opaque: false,
      pageBuilder:
          (_, __, ___) => LocalizationProvider(
            state: LocalizationProvider.of(context).state,
            child: Builder(builder: (ctx) => _HelpScreen(langCode: langCode)),
          ),
      transitionsBuilder:
          (_, animation, __, child) =>
              FadeTransition(opacity: animation, child: child),
    ),
  );
}

class _HelpScreen extends StatefulWidget {
  final String langCode;

  const _HelpScreen({Key? key, required this.langCode}) : super(key: key);

  @override
  State<_HelpScreen> createState() => _HelpScreenState();
}

class _HelpScreenState extends State<_HelpScreen> {
  final AudioPlayer _narrationPlayer = AudioPlayer();

  @override
  void dispose() {
    _narrationPlayer.stop();
    _narrationPlayer.dispose();
    super.dispose();
  }

  Future<void> _playNarration() async {
    final narrationPath = 'assets/audio/help_${widget.langCode}.mp3';
    try {
      await _narrationPlayer.stop();
      await _narrationPlayer.setAsset(narrationPath);
      await _narrationPlayer.play();
    } catch (e) {
      debugPrint('Error playing narration: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(translate('how_to_play'), style: AppTextStyles.appBarTitle),
        backgroundColor: AppColors.appBar,
        foregroundColor: AppColors.appBarText,
      ),
      backgroundColor: AppColors.backgroundSoft,
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(20),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Text(
                  translate('help_description'),
                  style: AppTextStyles.settingsLabel, // 💡 Match settings label
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 20),
                ElevatedButton.icon(
                  onPressed: _playNarration,
                  icon: const Icon(Icons.volume_up),
                  label: Text(
                    translate('tutorial'),
                    style: AppTextStyles.buttonText,
                  ),
                  style: AppButtonStyles.help,
                ),
                const SizedBox(height: 20),
                SizedBox(
                  height: 180,
                  child: HelpVideoPlayer(langCode: widget.langCode),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class HelpVideoPlayer extends StatefulWidget {
  final String langCode;

  const HelpVideoPlayer({super.key, required this.langCode});

  @override
  State<HelpVideoPlayer> createState() => _HelpVideoPlayerState();
}

class _HelpVideoPlayerState extends State<HelpVideoPlayer> {
  late VideoPlayerController _videoController;
  ChewieController? _chewieController;

  @override
  void initState() {
    super.initState();
    final videoPath = 'assets/video/${widget.langCode}_tut.mp4';
    _videoController = VideoPlayerController.asset(videoPath);
    _initializePlayer();
  }

  Future<void> _initializePlayer() async {
    await _videoController.initialize();
    _videoController.setLooping(true);

    _chewieController = ChewieController(
      videoPlayerController: _videoController,
      autoPlay: false,
      looping: true,
      showControls: true,
      allowFullScreen: true,
      allowPlaybackSpeedChanging: true,
    );

    setState(() {});
  }

  @override
  void dispose() {
    _videoController.dispose();
    _chewieController?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return _chewieController != null && _videoController.value.isInitialized
        ? AspectRatio(
          aspectRatio: _videoController.value.aspectRatio,
          child: Chewie(controller: _chewieController!),
        )
        : const Center(child: CircularProgressIndicator());
  }
}
