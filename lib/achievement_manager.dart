import 'dart:convert';

import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:web/web.dart' as web;

class Achievement {
  final String title;
  final String description;
  final bool unlocked;

  Achievement({
    required this.title,
    required this.description,
    this.unlocked = false,
  });

  Achievement copyWith({bool? unlocked}) {
    return Achievement(
      title: this.title,
      description: this.description,
      unlocked: unlocked ?? this.unlocked,
    );
  }

  Map<String, dynamic> toMap() => {
    'title': title,
    'description': description,
    'unlocked': unlocked,
  };

  factory Achievement.fromMap(Map<String, dynamic> map) {
    return Achievement(
      title: map['title'],
      description: map['description'],
      unlocked: map['unlocked'] ?? false,
    );
  }
}

class AchievementManager extends ChangeNotifier {
  static const _storageKey = 'achievements_data';

  final List<Achievement> _defaultAchievements = [
    Achievement(title: 'First Victory!', description: 'Win your first game.'),
    Achievement(
      title: 'Perfect Player',
      description: 'Get all answers correct in a game.',
    ),
  ];

  List<Achievement> _achievements = [];

  List<Achievement> get achievements => List.unmodifiable(_achievements);

  AchievementManager() {
    _loadAchievements();
  }

  Future<void> _loadAchievements() async {
    String? data;
    if (kIsWeb) {
      data = web.window.localStorage[_storageKey];
    } else {
      final prefs = await SharedPreferences.getInstance();
      data = prefs.getString(_storageKey);
    }

    if (data != null) {
      final List<dynamic> decoded = json.decode(data);
      _achievements = decoded.map((e) => Achievement.fromMap(e)).toList();
    } else {
      _achievements = _defaultAchievements;
    }
    notifyListeners();
  }

  Future<void> _saveAchievements() async {
    final data = json.encode(_achievements.map((a) => a.toMap()).toList());
    if (kIsWeb) {
      web.window.localStorage[_storageKey] = data;
    } else {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString(_storageKey, data);
    }
  }

  void unlock(String title) {
    final index = _achievements.indexWhere((a) => a.title == title);
    if (index != -1 && !_achievements[index].unlocked) {
      _achievements[index] = _achievements[index].copyWith(unlocked: true);
      _saveAchievements();
      notifyListeners();
    }
  }

  void resetAll() {
    _achievements =
        _achievements.map((a) => a.copyWith(unlocked: false)).toList();
    _saveAchievements();
    notifyListeners();
  }
}

class AchievementsPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final achievements = context.watch<AchievementManager>().achievements;

    return Scaffold(
      appBar: AppBar(title: Text('Achievements')),
      body: ListView.builder(
        itemCount: achievements.length,
        itemBuilder: (context, index) {
          final a = achievements[index];
          return ListTile(
            leading: Icon(
              a.unlocked ? Icons.emoji_events : Icons.lock,
              color: a.unlocked ? Colors.amber : Colors.grey,
            ),
            title: Text(a.title),
            subtitle: Text(a.description),
          );
        },
      ),
    );
  }
}
