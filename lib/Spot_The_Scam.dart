import 'dart:math';

import 'package:audioplayers/audioplayers.dart';
import 'package:flutter/material.dart';

import 'game_settings.dart'; // Ensure you import your settings file
import 'win_screen.dart';

// const SizedBox(height: 10),
// SizedBox(
//   width: buttonWidth,
//   child: ElevatedButton(
//     onPressed: () {
//       Navigator.of(context).push(_createFadeRouteToScamGame());
//     },
//     style: ElevatedButton.styleFrom(
//       backgroundColor: Colors.red[800],
//       foregroundColor: Colors.white,
//       padding: const EdgeInsets.symmetric(vertical: 20),
//       textStyle: buttonTextStyle,
//     ),
//     child: const Text('Spot the Scam'),
//   ),
// ),
class SpotTheScamPage extends StatefulWidget {
  final GameSettings settings;

  const SpotTheScamPage({super.key, required this.settings});

  @override
  State<SpotTheScamPage> createState() => _SpotTheScamPageState();
}

class _SpotTheScamPageState extends State<SpotTheScamPage> {
  final Random _random = Random();
  int _round = 1;
  final int _totalRounds = 10;
  int _correctAnswers = 0;
  int _wrongAnswers = 0;
  bool? _lastAnswerCorrect;
  late _Scenario _currentScenario;
  final AudioPlayer _player = AudioPlayer();

  final List<String> _scamImages = List.generate(
    10,
    (i) => 'assets/scams/${i + 1}.png',
  );
  final List<String> _legitImages = List.generate(
    10,
    (i) => 'assets/legits/${i + 1}.png',
  );

  late List<int> _shuffledIndexes;

  @override
  void initState() {
    super.initState();
    _shuffledIndexes = List.generate(_scamImages.length, (i) => i)..shuffle();
    _generateNextScenario();
  }

  void _generateNextScenario() {
    final index = _shuffledIndexes[_round - 1];
    final isLeftScam = _random.nextBool();

    final scamImage = _scamImages[index];
    final legitImage = _legitImages[index];

    _currentScenario = _Scenario(
      leftImage: isLeftScam ? scamImage : legitImage,
      rightImage: isLeftScam ? legitImage : scamImage,
      scamOnLeft: isLeftScam,
    );
  }

  void _handleChoice(bool choseLeft) async {
    final isCorrect = choseLeft == _currentScenario.scamOnLeft;

    setState(() {
      _lastAnswerCorrect = isCorrect;
      if (isCorrect) {
        _correctAnswers++;
      } else {
        _wrongAnswers++;
      }
    });

    // Play audio feedback
    final soundAsset = isCorrect ? 'audio/correct.mp3' : 'audio/wrong.mp3';
    await _player.play(
      AssetSource(soundAsset),
      volume: widget.settings.musicVolume,
    );

    Future.delayed(const Duration(seconds: 1), () {
      if (_round >= _totalRounds) {
        _showFinalResult();
      } else {
        setState(() {
          _round++;
          _lastAnswerCorrect = null;
          _generateNextScenario();
        });
      }
    });
  }

  void _showFinalResult() {
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(
        builder:
            (_) => WinScreen(
              timeTaken: 0, // Not used for Spot the Scam
              correctAnswers: _correctAnswers,
              settings: widget.settings,
            ),
      ),
    );
  }

  String _performanceMessage() {
    if (_correctAnswers == _totalRounds) return "🌟 Perfect score!";
    if (_correctAnswers >= 8) return "👏 Great job!";
    if (_correctAnswers >= 5) return "👍 Not bad!";
    return "💡 Keep practicing!";
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Spot the Scam',
          style: TextStyle(fontSize: widget.settings.fontSize + 2),
        ),
        backgroundColor: Colors.red[800],
      ),
      backgroundColor: Colors.white,
      body: OrientationBuilder(
        builder: (context, orientation) {
          final isLandscape = orientation == Orientation.landscape;

          return Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              children: [
                Text(
                  'Round $_round / $_totalRounds',
                  style: TextStyle(
                    fontSize: widget.settings.fontSize + 2,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 20),
                Text(
                  'Tap the image you think is a scam',
                  style: TextStyle(fontSize: widget.settings.fontSize),
                ),
                const SizedBox(height: 20),
                Expanded(
                  child:
                      isLandscape
                          ? Row(children: _buildImageChoices())
                          : Column(children: _buildImageChoices()),
                ),
                const SizedBox(height: 20),
                if (_lastAnswerCorrect != null)
                  Text(
                    _lastAnswerCorrect! ? 'Correct!' : 'Wrong!',
                    style: TextStyle(
                      fontSize: widget.settings.fontSize + 4,
                      fontWeight: FontWeight.bold,
                      color: _lastAnswerCorrect! ? Colors.green : Colors.red,
                    ),
                  ),
              ],
            ),
          );
        },
      ),
    );
  }

  List<Widget> _buildImageChoices() {
    return [
      Expanded(
        child: GestureDetector(
          onTap: _lastAnswerCorrect == null ? () => _handleChoice(true) : null,
          child: Image.asset(_currentScenario.leftImage),
        ),
      ),
      const SizedBox(width: 10, height: 10),
      Expanded(
        child: GestureDetector(
          onTap: _lastAnswerCorrect == null ? () => _handleChoice(false) : null,
          child: Image.asset(_currentScenario.rightImage),
        ),
      ),
    ];
  }
}

class _Scenario {
  final String leftImage;
  final String rightImage;
  final bool scamOnLeft;

  _Scenario({
    required this.leftImage,
    required this.rightImage,
    required this.scamOnLeft,
  });
}
