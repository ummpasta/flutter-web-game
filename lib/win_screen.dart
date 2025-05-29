import 'package:flutter/material.dart';
import 'package:flutter_translate/flutter_translate.dart';

import 'Scammable.dart';
import 'Spot_The_Scam.dart';
import 'app_styles.dart';
import 'audio_manager.dart';
import 'game_settings.dart';
import 'leaderboard.dart';
import 'main.dart';

class WinScreen extends StatelessWidget {
  final int timeTaken;
  final int? correctAnswers; // Optional for Spot the Scam
  final GameSettings settings;

  const WinScreen({
    super.key,
    required this.timeTaken,
    required this.settings,
    this.correctAnswers,
  });

  String formatTime(int s) {
    final m = s ~/ 60, r = s % 60;
    return '${m.toString().padLeft(2, '0')}:${r.toString().padLeft(2, '0')}';
  }

  PageRouteBuilder fadeRoute(Widget p) => PageRouteBuilder(
    pageBuilder: (_, __, ___) => p,
    transitionsBuilder: (_, a, __, c) => FadeTransition(opacity: a, child: c),
    transitionDuration: const Duration(milliseconds: 500),
  );

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.correctAnswer,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(translate('you_win'), style: AppTextStyles.winText),
            const SizedBox(height: 20),
            const Icon(Icons.check_circle, size: 100, color: AppColors.winText),
            const SizedBox(height: 30),

            /// Show Time or Score
            Text(
              correctAnswers != null
                  ? '${translate('correct_answers')}: $correctAnswers'
                  : '${translate('time_taken')}: ${formatTime(timeTaken)}',
              style: AppTextStyles.timerText.copyWith(
                fontSize: 24,
                color: AppColors.winText,
              ),
            ),

            /// Difficulty
            Text(
              '${translate('difficulty')}: '
              '${settings.difficulty.toLowerCase() == 'hard'
                  ? translate('hard')
                  : settings.difficulty.toLowerCase() == 'tutorial'
                  ? translate('tutorial')
                  : translate('normal')}',
              style: AppTextStyles.timerText.copyWith(
                fontSize: 24,
                color: AppColors.winText,
              ),
            ),

            const SizedBox(height: 30),

            /// Play Again
            ElevatedButton(
              style: AppButtonStyles.smallGreen,
              onPressed: () {
                Navigator.pushReplacement(
                  context,
                  fadeRoute(
                    correctAnswers != null
                        ? SpotTheScamPage(settings: settings)
                        : GamePage(settings: settings),
                  ),
                );
              },
              child: Text(translate('play_again')),
            ),

            const SizedBox(height: 20),

            /// Home
            ElevatedButton(
              style: AppButtonStyles.smallGreen,
              onPressed: () {
                Navigator.of(context).pushAndRemoveUntil(
                  fadeRoute(const GameSelectPage()),
                  (route) => false,
                );
              },
              child: Text(translate('home')),
            ),

            const SizedBox(height: 30),

            /// Save to Leaderboard if not Spot the Scam
            if (correctAnswers == null)
              ElevatedButton(
                style: AppButtonStyles.smallGreen,
                onPressed: () async {
                  final name = await showDialog<String>(
                    context: context,
                    builder: (_) {
                      String tempName = '';
                      return AlertDialog(
                        title: Text(translate('enter_name')),
                        content: TextField(
                          onChanged: (val) => tempName = val,
                          decoration: InputDecoration(
                            hintText: translate('your_name'),
                          ),
                        ),
                        actions: [
                          TextButton(
                            onPressed: () => Navigator.pop(context, tempName),
                            child: const Text('OK'),
                          ),
                        ],
                      );
                    },
                  );

                  if (name != null && name.trim().isNotEmpty) {
                    await LeaderboardStorage.saveEntry(
                      LeaderboardEntry(
                        name: name.trim(),
                        timeTaken: timeTaken,
                        difficulty: settings.difficulty,
                      ),
                    );
                  }

                  Navigator.pushReplacement(
                    context,
                    MaterialPageRoute(
                      builder: (_) => const LeaderboardScreen(),
                    ),
                  );
                },
                child: Text(translate('save_leaderboard')),
              ),
          ],
        ),
      ),
    );
  }
}

class WinScreenHelper {
  static void handleWin({
    required BuildContext context,
    required int timeTaken,
    required GameSettings settings,
    required AudioManager audioManager,
    required VoidCallback stopTimer,
  }) {
    stopTimer();
    audioManager.playRandomWinPraiseSound();

    Future.delayed(const Duration(seconds: 2), () {
      Navigator.pushReplacement(
        context,
        PageRouteBuilder(
          pageBuilder:
              (_, __, ___) =>
                  WinScreen(timeTaken: timeTaken, settings: settings),
          transitionsBuilder:
              (_, anim, __, child) =>
                  FadeTransition(opacity: anim, child: child),
          transitionDuration: const Duration(milliseconds: 500),
        ),
      );
    });
  }
}
