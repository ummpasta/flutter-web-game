import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:flutter_translate/flutter_translate.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'Scammable.dart';
import 'Spot_The_Scam.dart';
import 'achievement_manager.dart';
import 'app_styles.dart';
import 'game_settings.dart';
import 'help_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setEnabledSystemUIMode(SystemUiMode.immersiveSticky);

  final delegate = await LocalizationDelegate.create(
    fallbackLocale: 'en',
    supportedLocales: ['en', 'zh', 'ms', 'ta'],
    basePath: 'assets/i18n',
  );

  runApp(
    LocalizedApp(
      delegate,
      ChangeNotifierProvider(
        create: (_) => AchievementManager(),
        child: const MyApp(),
      ),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    final delegate = LocalizedApp.of(context).delegate;

    return LocalizationProvider(
      state: LocalizationProvider.of(context).state,
      child: MaterialApp(
        title: 'Crossword',
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
          useMaterial3: true,
        ),
        locale: delegate.currentLocale,
        supportedLocales: delegate.supportedLocales,
        localizationsDelegates: [
          delegate,
          GlobalMaterialLocalizations.delegate,
          GlobalWidgetsLocalizations.delegate,
          GlobalCupertinoLocalizations.delegate,
        ],
        home: const GameSelectPage(),
      ),
    );
  }
}

class GameSelectPage extends StatefulWidget {
  const GameSelectPage({super.key});
  @override
  State<GameSelectPage> createState() => _GameSelectPageState();
}

class _GameSelectPageState extends State<GameSelectPage> {
  GameSettings settings = GameSettings(
    fontSize: 21.0,
    difficulty: 'Normal',
    rows: 11,
    columns: 14,
    musicVolume: 0.1,
    language: 'en',
  );

  @override
  void initState() {
    super.initState();
    // _checkFirstLaunch(); // Optional tutorial
  }

  Future<void> _checkFirstLaunch() async {
    final prefs = await SharedPreferences.getInstance();
    final hasSeenGuide = prefs.getBool('hasSeenGuide') ?? false;

    if (!hasSeenGuide) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        showHelpDialog(context, settings.language);
      });
      await prefs.setBool('hasSeenGuide', true);
    }
  }

  PageRouteBuilder _createFadeRouteToGame() {
    return PageRouteBuilder(
      pageBuilder: (_, __, ___) => GamePage(settings: settings),
      transitionsBuilder: (_, animation, __, child) {
        return FadeTransition(opacity: animation, child: child);
      },
      transitionDuration: const Duration(milliseconds: 700),
    );
  }

  PageRouteBuilder _createFadeRouteToScamGame() {
    return PageRouteBuilder(
      pageBuilder: (_, __, ___) => SpotTheScamPage(settings: settings),
      transitionsBuilder: (_, animation, __, child) {
        return FadeTransition(opacity: animation, child: child);
      },
      transitionDuration: const Duration(milliseconds: 700),
    );
  }

  void showFontSizeDialog() {
    showSettingsDialog(
      context: context,
      currentSettings: settings,
      onSettingsApplied: (newSettings) {
        setState(() {
          settings = newSettings;
        });
      },
    );
  }

  void _showLanguageDialog() {
    showLanguageDialog(
      context: context,
      currentLanguage: settings.language,
      onLanguageChanged: (newLangCode) async {
        var delegate = LocalizedApp.of(context).delegate;
        await delegate.changeLocale(Locale(newLangCode));

        setState(() {
          settings = settings.copyWith(language: newLangCode);
        });
      },
    );
  }

  void showLanguageDialog({
    required BuildContext context,
    required String currentLanguage,
    required void Function(String newLangCode) onLanguageChanged,
  }) {
    showDialog(
      context: context,
      builder:
          (_) => AlertDialog(
            title: Text(translate('change_language')),
            content: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                _languageTile(
                  'English',
                  'en',
                  currentLanguage,
                  onLanguageChanged,
                ),
                _languageTile(
                  '中文 (Chinese)',
                  'zh',
                  currentLanguage,
                  onLanguageChanged,
                ),
                _languageTile(
                  'Bahasa Melayu',
                  'ms',
                  currentLanguage,
                  onLanguageChanged,
                ),
                _languageTile(
                  'தமிழ் (Tamil)',
                  'ta',
                  currentLanguage,
                  onLanguageChanged,
                ),
              ],
            ),
          ),
    );
  }

  Widget _languageTile(
    String title,
    String code,
    String currentLanguage,
    void Function(String newLangCode) onLanguageChanged,
  ) {
    return ListTile(
      title: Text(title),
      trailing: code == currentLanguage ? const Icon(Icons.check) : null,
      onTap: () {
        Navigator.pop(context);
        onLanguageChanged(code);
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    const double buttonWidth = 200;
    return Scaffold(
      body: Container(
        decoration: BoxDecoration(gradient: AppColors.backgroundGradient),
        child: SafeArea(
          child: Center(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20.0),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Icon(Icons.shield, color: Colors.white, size: 70),
                  const SizedBox(height: 20),
                  Text(
                    translate('welcome_title'),
                    style: AppTextStyles.welcomeTitle,
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 40),

                  // --- Game Buttons ---
                  SizedBox(
                    width: buttonWidth,
                    child: ElevatedButton.icon(
                      icon: const Icon(Icons.grid_on),
                      label: Text(translate('start_game')),
                      onPressed: () {
                        Navigator.of(context).push(_createFadeRouteToGame());
                      },
                      style: AppButtonStyles.warmOrange,
                    ),
                  ),

                  // const SizedBox(height: 10),
                  // SizedBox(
                  //   width: buttonWidth,
                  //   child: ElevatedButton.icon(
                  //     icon: const Icon(Icons.search),
                  //     label: const Text("Spot the Scam"),
                  //     onPressed: () {
                  //       Navigator.of(
                  //         context,
                  //       ).push(_createFadeRouteToScamGame());
                  //     },
                  //     style: AppButtonStyles.warmOrange,
                  //   ),
                  // ),
                  const SizedBox(height: 10),

                  // --- Other Controls ---
                  Column(
                    children: [
                      SizedBox(
                        width: buttonWidth,
                        child: ElevatedButton.icon(
                          icon: const Icon(Icons.settings),
                          label: Text(translate('settings')),
                          style: AppButtonStyles.warmOrange,
                          onPressed: showFontSizeDialog,
                        ),
                      ),
                      const SizedBox(height: 10),
                      SizedBox(
                        width: buttonWidth,
                        child: ElevatedButton.icon(
                          icon: const Icon(Icons.help_outline),
                          label: Text(translate('help')),
                          style: AppButtonStyles.warmOrange,
                          onPressed:
                              () => showHelpDialog(context, settings.language),
                        ),
                      ),
                      const SizedBox(height: 10),
                      SizedBox(
                        width: buttonWidth,
                        child: ElevatedButton.icon(
                          icon: const Icon(Icons.language),
                          label: Text(translate('change_language')),
                          style: AppButtonStyles.warmOrange,
                          onPressed: _showLanguageDialog,
                        ),
                      ),
                      const SizedBox(height: 10),
                      SizedBox(
                        width: buttonWidth,
                        child: ElevatedButton.icon(
                          icon: const Icon(Icons.emoji_events),
                          label: const Text("Achievements"),
                          style: AppButtonStyles.warmOrange,
                          onPressed: () {
                            Navigator.of(context).push(
                              MaterialPageRoute(
                                builder: (context) => AchievementsPage(),
                              ),
                            );
                          },
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 30),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
