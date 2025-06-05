import 'dart:async';
import 'dart:convert';
import 'dart:math';

import 'package:audioplayers/audioplayers.dart';
import 'package:crossword/crossword.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_translate/flutter_translate.dart';
import 'package:flutter_tts/flutter_tts.dart';
import 'package:provider/provider.dart';

import 'achievement_manager.dart';
import 'app_styles.dart';
import 'audio_manager.dart';
import 'game_settings.dart';
import 'win_screen.dart';

class GamePage extends StatefulWidget {
  final List<List<String>>? predefinedGrid;
  final List<String>? predefinedWords;
  final GameSettings settings;

  const GamePage({
    super.key,
    required this.settings,
    this.predefinedGrid,
    this.predefinedWords,
  });

  @override
  State<GamePage> createState() => _GamePageState();
}

class _GamePageState extends State<GamePage> {
  late double crosswordFontSize;
  List<List<String>> letters = [];
  List<String> validWords = [];
  List<String> selectedWords = [];
  bool isLoading = true;
  String errorMessage = '';
  late Timer _timer;
  int _secondsPassed = 0;
  bool _isTimerRunning = false;
  late AudioManager _audioManager;

  int numRows = 0;
  int numColumns = 0;
  final FlutterTts flutterTts = FlutterTts();
  final AudioPlayer _audioPlayer = AudioPlayer();
  Map<String, String> wordMessages = {};

  @override
  void initState() {
    super.initState();
    crosswordFontSize = widget.settings.fontSize;
    numRows = widget.settings.rows;
    numColumns = widget.settings.columns;

    if (widget.predefinedGrid != null && widget.predefinedWords != null) {
      setState(() {
        letters = widget.predefinedGrid!;
        validWords = widget.predefinedWords!;
        isLoading = false;
      });
      startTimer();
      _audioManager = AudioManager(widget.settings);
      _audioManager.playBackgroundMusic();
    } else {
      loadWords()
          .then((words) {
            List<String> selected = selectRandomWords(words);
            if (widget.settings.difficulty == 'Hard') {
              selected = selected.map((w) => w.toUpperCase()).toList();
            }
            final generatedGrid = generateCrosswordWithWords(selected);
            setState(() {
              letters = generatedGrid;
              isLoading = false;
            });
            startTimer();
            _audioManager = AudioManager(widget.settings);
            _audioManager.playBackgroundMusic();
          })
          .catchError((error) {
            setState(() {
              isLoading = false;
              errorMessage = 'Error loading words: $error';
            });
          });
    }
  }

  Future<List<String>> loadWords() async {
    final langCode = widget.settings.language;
    final wordFile = await rootBundle.loadString(
      'assets/word_lists/word_list_$langCode.txt',
    );
    final lines = wordFile.split('\n');
    wordMessages.clear();

    final words = <String>[];
    for (var line in lines) {
      if (line.trim().isEmpty) continue;
      final parts = line.split('|');
      if (parts.length == 2) {
        final word = parts[0].trim();
        final message = parts[1].trim();
        wordMessages[word.toUpperCase()] = message;
        words.add(word);
      } else {
        words.add(line.trim());
      }
    }
    return words.toSet().toList(); // remove duplicates
  }

  List<String> selectRandomWords(List<String> words) {
    words.shuffle(Random());
    return words.take(5).map((w) => w.trim()).toSet().toList(); // trim + unique
  }

  String getAlphabetForLanguage(String languageCode) {
    switch (languageCode.toLowerCase()) {
      case 'taa':
        return 'அஆஇஈஉஊஎஏஐஒஓஔகஙசஞடணதநபமயரலவழளறன';
      case 'zha':
        return '的一是在不了有和人这中大为上个国我以要他时来用们生到作地于出就分对成会可主发年动同工也能下过子说产种面而方后多定行学法所民得经十三之进着等部度家电力里如水化高自二理起小物现实加量都两体制机当使点从业本去把性好应开它合还因由其些然前外天政四日那社义事平形相全表间样与关各重新线内数正心反你明看原又么利比或但质气第向道命此变条只没结解问意建月公无系军很情者最立代想已通并提直题党程展五果料象员革位入常文总次品式活设及管特件长求老头基资边流路级少图山统接知较将组见计别她手角期根论运农指几九区强放决西被干做必战先回则任取据处队南给色光门即保治北造百规热领七海口东导器压志世金增争济阶油思术极交受联什认六共权收证改清已';
      case 'msa':
        return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      default:
        return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
  }

  List<List<String>> generateCrosswordWithWords(List<String> inputWords) {
    final random = Random();
    final languageCode = widget.settings.language;
    final alphabet = getAlphabetForLanguage(languageCode);
    var grid = List.generate(numRows, (_) => List.filled(numColumns, ''));
    List<String> successfullyPlacedWords = [];

    for (var word in inputWords) {
      bool placed = false;
      int attempts = 0;

      while (!placed && attempts < 1000) {
        bool horiz = random.nextBool();
        bool diag = widget.settings.difficulty == 'Hard' && random.nextBool();
        int r = random.nextInt(numRows);
        int c = random.nextInt(numColumns);

        if (diag) {
          if (r + word.length <= numRows &&
              c + word.length <= numColumns &&
              !checkOverlapDiag(grid, word, r, c)) {
            for (int i = 0; i < word.length; i++) {
              grid[r + i][c + i] = word[i];
            }
            placed = true;
          }
        } else if (horiz) {
          if (c + word.length <= numColumns &&
              !checkOverlap(grid, word, r, c, true)) {
            for (int i = 0; i < word.length; i++) {
              grid[r][c + i] = word[i];
            }
            placed = true;
          }
        } else {
          if (r + word.length <= numRows &&
              !checkOverlap(grid, word, r, c, false)) {
            for (int i = 0; i < word.length; i++) {
              grid[r + i][c] = word[i];
            }
            placed = true;
          }
        }
        attempts++;
      }

      if (placed) {
        successfullyPlacedWords.add(word);
      }
    }

    for (int r = 0; r < numRows; r++) {
      for (int c = 0; c < numColumns; c++) {
        if (grid[r][c] == '') {
          grid[r][c] = alphabet[random.nextInt(alphabet.length)];
        }
      }
    }

    setState(() {
      validWords = successfullyPlacedWords;
    });

    return grid;
  }

  bool checkOverlap(
    List<List<String>> grid,
    String word,
    int row,
    int col,
    bool horiz,
  ) {
    for (int i = 0; i < word.length; i++) {
      if (horiz) {
        if (grid[row][col + i] != '') return true;
      } else {
        if (grid[row + i][col] != '') return true;
      }
    }
    return false;
  }

  bool checkOverlapDiag(
    List<List<String>> grid,
    String word,
    int row,
    int col,
  ) {
    for (int i = 0; i < word.length; i++) {
      if (grid[row + i][col + i] != '') return true;
    }
    return false;
  }

  void startTimer() {
    _isTimerRunning = true;
    _timer = Timer.periodic(const Duration(seconds: 1), (_) {
      if (_isTimerRunning) {
        setState(() => _secondsPassed++);
      }
    });
  }

  void checkIfWon() {
    if (selectedWords.length == validWords.length) {
      Provider.of<AchievementManager>(
        context,
        listen: false,
      ).unlock('First Victory!');
      if (selectedWords.length == validWords.length) {
        Provider.of<AchievementManager>(
          context,
          listen: false,
        ).unlock('Perfect Player');
      }
      WinScreenHelper.handleWin(
        context: context,
        timeTaken: _secondsPassed,
        settings: widget.settings,
        audioManager: _audioManager,
        stopTimer: () {
          _isTimerRunning = false;
          _timer.cancel();
        },
      );
    }
  }

  @override
  void dispose() {
    if (_isTimerRunning) _timer.cancel();
    _audioManager.dispose();
    flutterTts.stop();
    _audioPlayer.dispose();
    super.dispose();
  }

  String _prepareHintForTTS(String hint, String languageCode) {
    String replacement;
    switch (languageCode) {
      case 'zh':
        replacement = '某个词';
        break;
      case 'ta':
        replacement = 'ஒரு சொல்';
        break;
      case 'ms':
        replacement = 'sesuatu';
        break;
      default:
        replacement = 'blank';
    }
    return hint.replaceAll('___', replacement);
  }

  Future<void> _speakHint(String hintText) async {
    final languageCode = widget.settings.language.toLowerCase();
    final cleanedHint = _prepareHintForTTS(hintText, languageCode);

    String? assetPath;

    if (languageCode == 'ta') {
      // Tamil: use MD5-hash based mapping file
      final mappingJson = await rootBundle.loadString(
        'assets/tts_ta/tts_mapping.json',
      );
      final Map<String, dynamic> mapping = json.decode(mappingJson);
      final mappedFile = mapping[hintText.replaceAll('___', 'வெற்றிடம்')];
      if (mappedFile != null) {
        assetPath = 'assets/tts_ta/$mappedFile';
      }
    } else {
      // Other languages: fallback to normalized filenames
      String? normalized;
      String? assetDir;

      switch (languageCode) {
        case 'en':
          normalized = hintText
              .replaceAll('___', 'Blank')
              .toUpperCase()
              .replaceAll(RegExp(r'[^A-Z0-9]'), '_')
              .replaceAll(RegExp(r'_+'), '_')
              .replaceAll(RegExp(r'^_|_$'), '');
          assetDir = 'tts_en';
          break;

        case 'zh':
          normalized = hintText
              .replaceAll('___', '某个词')
              .replaceAll(RegExp(r'[^\u4e00-\u9fa5A-Z0-9_]'), '')
              .replaceAll(RegExp(r'_+'), '_')
              .replaceAll(RegExp(r'^_|_$'), '');
          assetDir = 'tts_zh';
          break;

        case 'ms':
          normalized = hintText
              .replaceAll('___', 'Kosong')
              .toUpperCase()
              .replaceAll(RegExp(r'[^A-Z0-9]'), '_')
              .replaceAll(RegExp(r'_+'), '_')
              .replaceAll(RegExp(r'^_|_$'), '');
          assetDir = 'tts_ms';
          break;
      }

      if (normalized != null && assetDir != null) {
        assetPath = 'assets/$assetDir/$normalized.mp3';
      }
    }

    // Try to play asset
    if (assetPath != null) {
      try {
        await rootBundle.load(assetPath); // Confirm asset exists
        await _audioPlayer.stop();
        await _audioPlayer.play(
          AssetSource(assetPath.replaceFirst('assets/', '')),
        );
        return;
      } catch (e) {
        debugPrint(
          "Manual MP3 not found for [$languageCode] hint '$hintText'. Falling back to TTS.",
        );
      }
    }

    // Fallback to built-in TTS
    final ttsLangMap = {
      'en': 'en-US',
      'zh': 'zh-CN',
      'ta': 'ta-IN',
      'ms': 'ms-MY',
    };

    await flutterTts.setLanguage(ttsLangMap[languageCode] ?? 'en-US');
    await flutterTts.setPitch(1.0);
    await flutterTts.setSpeechRate(0.5);
    await flutterTts.speak(cleanedHint);
  }

  @override
  Widget build(BuildContext context) {
    if (isLoading) {
      return const Scaffold(body: Center(child: CircularProgressIndicator()));
    }

    return Scaffold(
      backgroundColor: AppColors.backgroundSoft,
      appBar: AppBar(
        backgroundColor: AppColors.appBarBackground,
        automaticallyImplyLeading: false,
        title: Text(translate('game.title'), style: AppTextStyles.appBarTitle),
        actions: [
          Center(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 12.0),
              child: Text(
                '${translate('timer.label')}: ${(_secondsPassed ~/ 60).toString().padLeft(2, '0')}:${(_secondsPassed % 60).toString().padLeft(2, '0')}',
                style: AppTextStyles.timerText.copyWith(
                  color: AppColors.timerText,
                ),
              ),
            ),
          ),
          IconButton(
            icon: const Icon(Icons.home),
            onPressed: () => Navigator.of(context).popUntil((r) => r.isFirst),
          ),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            const SizedBox(height: 10),
            Center(
              child: Text(
                translate('hints.label'),
                style: AppTextStyles.wordListTitle.copyWith(
                  color: AppColors.wordListTitle,
                  fontSize: 22,
                ),
              ),
            ),
            Center(
              child: Container(
                padding: const EdgeInsets.all(4),
                margin: const EdgeInsets.symmetric(horizontal: 4, vertical: 4),
                decoration: BoxDecoration(
                  color: AppColors.hintBackground,
                  borderRadius: BorderRadius.circular(4),
                ),
                child: Wrap(
                  spacing: 10,
                  runSpacing: 4,
                  alignment: WrapAlignment.center,
                  children:
                      validWords.map((w) {
                        final isFound = selectedWords.contains(w);
                        final rawMessage =
                            wordMessages[w.toUpperCase()] ?? 'Hint';
                        final displayedMessage =
                            isFound
                                ? rawMessage.replaceAll('___', w)
                                : rawMessage;

                        return Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 8,
                            vertical: 4,
                          ),
                          decoration: BoxDecoration(
                            color:
                                isFound
                                    ? AppColors.foundHintBackground
                                    : Colors.white,
                            borderRadius: BorderRadius.circular(14),
                            border: Border.all(
                              color:
                                  isFound
                                      ? AppColors.foundHintBorder
                                      : AppColors.unfoundHintBorder,
                              width: 1.5,
                            ),
                          ),
                          child: Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              AnimatedSwitcher(
                                duration: const Duration(milliseconds: 500),
                                transitionBuilder:
                                    (child, animation) => FadeTransition(
                                      opacity: animation,
                                      child: child,
                                    ),
                                child: GestureDetector(
                                  onTap: () => _speakHint(displayedMessage),
                                  child: Text(
                                    displayedMessage,
                                    key: ValueKey<bool>(isFound),
                                    style:
                                        isFound
                                            ? AppTextStyles.hintTextFound
                                                .copyWith(
                                                  fontSize:
                                                      crosswordFontSize * 0.8,
                                                  color:
                                                      AppColors.foundHintText,
                                                )
                                            : AppTextStyles.hintText.copyWith(
                                              fontSize: crosswordFontSize * 0.8,
                                              color: AppColors.unfoundHintText,
                                            ),
                                    textAlign: TextAlign.center,
                                  ),
                                ),
                              ),
                            ],
                          ),
                        );
                      }).toList(),
                ),
              ),
            ),
            Expanded(
              child: SingleChildScrollView(
                scrollDirection: Axis.vertical,
                child: SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  child: SizedBox(
                    width: crosswordFontSize * numColumns * 1.25,
                    height: crosswordFontSize * numRows * 1.25,
                    child: Crossword(
                      allowOverlap: false,
                      letters: letters,
                      hints: validWords,
                      textStyle: AppTextStyles.crosswordLetter.copyWith(
                        fontSize: crosswordFontSize,
                        color: AppColors.crosswordLetter,
                      ),
                      spacing: Offset(
                        crosswordFontSize * 1.25,
                        crosswordFontSize * 1.25,
                      ),
                      onLineUpdate: (word, _, isDrawn) {
                        if (widget.settings.difficulty == 'Hard') {
                          word = word.toUpperCase();
                        }
                        if (isDrawn &&
                            validWords.contains(word) &&
                            !selectedWords.contains(word)) {
                          setState(() {
                            selectedWords.add(word);
                            _audioManager.playHighlightedSound();
                            checkIfWon();
                          });
                        }
                      },
                      addIncorrectWord: false,
                      lineDecoration: LineDecoration(
                        lineGradientColors: [
                          [
                            AppColors.lineStart,
                            AppColors.lineMiddle,
                            AppColors.lineEnd,
                          ],
                        ],
                        strokeWidth: crosswordFontSize,
                        lineTextStyle: AppTextStyles.crosswordLineText.copyWith(
                          fontSize: crosswordFontSize,
                          color: AppColors.lineText,
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
