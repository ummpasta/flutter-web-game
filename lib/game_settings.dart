import 'package:flutter/material.dart';
import 'package:flutter_translate/flutter_translate.dart';

import 'app_styles.dart';

@immutable
class GameSettings {
  final double fontSize;
  final String difficulty;
  final int rows;
  final int columns;
  final double musicVolume;
  final String language;

  const GameSettings({
    required this.fontSize,
    required this.difficulty,
    required this.rows,
    required this.columns,
    required this.musicVolume,
    required this.language,
  });

  static GameSettings createDefault() {
    return const GameSettings(
      fontSize: 21.0,
      difficulty: 'Normal',
      rows: 11,
      columns: 14,
      musicVolume: 1.0,
      language: 'en',
    );
  }

  GameSettings copyWith({
    double? fontSize,
    String? difficulty,
    int? rows,
    int? columns,
    double? musicVolume,
    String? language,
  }) {
    return GameSettings(
      fontSize: fontSize ?? this.fontSize,
      difficulty: difficulty ?? this.difficulty,
      rows: rows ?? this.rows,
      columns: columns ?? this.columns,
      musicVolume: musicVolume ?? this.musicVolume,
      language: language ?? this.language,
    );
  }
}

// ----------------------------
// Language Selector Dialog
// ----------------------------

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
                context,
                'English',
                'en',
                currentLanguage,
                onLanguageChanged,
              ),
              _languageTile(
                context,
                '中文 (Chinese)',
                'zh',
                currentLanguage,
                onLanguageChanged,
              ),
              _languageTile(
                context,
                'Bahasa Melayu',
                'ms',
                currentLanguage,
                onLanguageChanged,
              ),
              _languageTile(
                context,
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
  BuildContext context,
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

// ----------------------------
// Settings Dialog
// ----------------------------

void showSettingsDialog({
  required BuildContext context,
  required GameSettings currentSettings,
  required void Function(GameSettings newSettings) onSettingsApplied,
}) {
  double tempSize = currentSettings.fontSize;
  int tempRows = currentSettings.rows;
  int tempColumns = currentSettings.columns;
  double tempVolume = currentSettings.musicVolume;
  String tempDifficulty = currentSettings.difficulty;
  String tempLanguage = currentSettings.language;

  Navigator.of(context).push(
    PageRouteBuilder(
      opaque: false,
      pageBuilder:
          (_, __, ___) => Scaffold(
            backgroundColor: AppColors.background,
            appBar: AppBar(
              title: Text(
                translate('settings.title'),
                style: AppTextStyles.appBarTitle,
              ),
              backgroundColor: AppColors.appBar,
              foregroundColor: AppColors.appBarText,
            ),
            body: Padding(
              padding: const EdgeInsets.all(20),
              child: SafeArea(
                child: StatefulBuilder(
                  builder: (ctx, setStateDialog) {
                    return SingleChildScrollView(
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          _buildSliderSection(
                            label: translate('settings.font_size'),
                            value: tempSize,
                            min: 12,
                            max: 48,
                            divisions: 12,
                            display: '${tempSize.toInt()} pt',
                            onChanged:
                                (v) => setStateDialog(() => tempSize = v),
                          ),
                          const SizedBox(height: 16),
                          _buildSliderSection(
                            label: translate('settings.grid_rows'),
                            value: tempRows.toDouble(),
                            min: 5,
                            max: 20,
                            divisions: 15,
                            display: '$tempRows',
                            onChanged:
                                (v) =>
                                    setStateDialog(() => tempRows = v.toInt()),
                          ),
                          _buildSliderSection(
                            label: translate('settings.grid_columns'),
                            value: tempColumns.toDouble(),
                            min: 5,
                            max: 20,
                            divisions: 15,
                            display: '$tempColumns',
                            onChanged:
                                (v) => setStateDialog(
                                  () => tempColumns = v.toInt(),
                                ),
                          ),
                          _buildSliderSection(
                            label: translate('settings.music_volume'),
                            value: tempVolume,
                            min: 0,
                            max: 1,
                            divisions: 10,
                            display: '${(tempVolume * 100).round()}%',
                            onChanged:
                                (v) => setStateDialog(() => tempVolume = v),
                          ),
                          const SizedBox(height: 24),
                          Text(
                            translate('settings.difficulty'),
                            style: AppTextStyles.settingsLabel,
                          ),
                          DropdownButton<String>(
                            value: tempDifficulty,
                            onChanged:
                                (value) => setStateDialog(
                                  () => tempDifficulty = value!,
                                ),
                            items: [
                              DropdownMenuItem(
                                value: 'Normal',
                                child: Text(translate('settings.normal')),
                              ),
                              DropdownMenuItem(
                                value: 'Hard',
                                child: Text(translate('settings.hard')),
                              ),
                            ],
                          ),
                          const SizedBox(height: 24),
                          Center(
                            child: ElevatedButton(
                              style: ElevatedButton.styleFrom(
                                backgroundColor: AppColors.button,
                              ),
                              onPressed: () {
                                final updatedSettings = GameSettings(
                                  fontSize: tempSize,
                                  difficulty: tempDifficulty,
                                  rows: tempRows,
                                  columns: tempColumns,
                                  musicVolume: tempVolume,
                                  language: tempLanguage,
                                );
                                onSettingsApplied(updatedSettings);
                                Navigator.pop(context);
                              },
                              child: Text(
                                translate('settings.apply'),
                                style: AppTextStyles.buttonText,
                              ),
                            ),
                          ),
                        ],
                      ),
                    );
                  },
                ),
              ),
            ),
          ),
      transitionsBuilder:
          (_, animation, __, child) =>
              FadeTransition(opacity: animation, child: child),
    ),
  );
}

Widget _buildSliderSection({
  required String label,
  required double value,
  required double min,
  required double max,
  required int divisions,
  required String display,
  required Function(double) onChanged,
}) {
  return Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      Text(label, style: AppTextStyles.settingsLabel),
      Slider(
        value: value,
        min: min,
        max: max,
        divisions: divisions,
        label: display,
        onChanged: onChanged,
        activeColor: AppColors.sliderActive,
      ),
      Text(display, style: AppTextStyles.settingsValue),
    ],
  );
}
