import 'dart:async';
import 'dart:convert';

import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:flutter/material.dart';
import 'package:flutter_translate/flutter_translate.dart';
import 'package:shared_preferences/shared_preferences.dart';
// For web-only import
import 'package:web/web.dart' as web;

class LeaderboardEntry {
  final String name;
  final int timeTaken;
  final String difficulty;

  LeaderboardEntry({
    required this.name,
    required this.timeTaken,
    required this.difficulty,
  });

  Map<String, dynamic> toMap() => {
    'name': name,
    'time': timeTaken,
    'difficulty': difficulty,
  };

  factory LeaderboardEntry.fromMap(Map<String, dynamic> map) =>
      LeaderboardEntry(
        name: map['name'],
        timeTaken: map['time'],
        difficulty: map['difficulty'],
      );
}

class LeaderboardStorage {
  static const _key = 'leaderboard_entries';

  static Future<List<LeaderboardEntry>> loadEntries() async {
    final jsonString = await _getValue(_key);
    if (jsonString == null) return [];
    final List<dynamic> decoded = json.decode(jsonString);
    return decoded.map((e) => LeaderboardEntry.fromMap(e)).toList();
  }

  static Future<void> saveEntry(LeaderboardEntry entry) async {
    final current = await loadEntries();
    current.add(entry);
    final jsonString = json.encode(current.map((e) => e.toMap()).toList());
    await _setValue(_key, jsonString);
  }

  static Future<void> clearLeaderboard() async {
    await _removeValue(_key);
  }

  static Future<String?> _getValue(String key) async {
    if (kIsWeb) {
      return web.window.localStorage[key];
    } else {
      final prefs = await SharedPreferences.getInstance();
      return prefs.getString(key);
    }
  }

  static Future<void> _setValue(String key, String value) async {
    if (kIsWeb) {
      web.window.localStorage[key] = value;
    } else {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString(key, value);
    }
  }

  static Future<void> _removeValue(String key) async {
    if (kIsWeb) {
      web.window.localStorage.removeItem(key);
    } else {
      final prefs = await SharedPreferences.getInstance();
      await prefs.remove(key);
    }
  }
}

class LeaderboardScreen extends StatefulWidget {
  const LeaderboardScreen({super.key});

  @override
  State<LeaderboardScreen> createState() => _LeaderboardScreenState();
}

class _LeaderboardScreenState extends State<LeaderboardScreen> {
  String _selectedDifficulty = 'Normal';
  late Future<List<LeaderboardEntry>> _futureEntries;

  @override
  void initState() {
    super.initState();
    _futureEntries = LeaderboardStorage.loadEntries();
  }

  String formatTime(int s) {
    final m = s ~/ 60, r = s % 60;
    return '${m.toString().padLeft(2, '0')}:${r.toString().padLeft(2, '0')}';
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.orange[50],
      appBar: AppBar(
        title: Text(translate('leaderboard')),
        actions: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: DropdownButton<String>(
              value: _selectedDifficulty,
              underline: const SizedBox(),
              onChanged: (value) {
                if (value != null) {
                  setState(() {
                    _selectedDifficulty = value;
                  });
                }
              },
              items:
                  ['Normal', 'Hard'].map((difficulty) {
                    return DropdownMenuItem(
                      value: difficulty,
                      child: Text(translate(difficulty.toLowerCase())),
                    );
                  }).toList(),
            ),
          ),
        ],
      ),
      body: FutureBuilder<List<LeaderboardEntry>>(
        future: _futureEntries,
        builder: (context, snapshot) {
          if (!snapshot.hasData) {
            return const Center(child: CircularProgressIndicator());
          }

          final filteredEntries =
              snapshot.data!
                  .where((e) => e.difficulty == _selectedDifficulty)
                  .toList()
                ..sort((a, b) => a.timeTaken.compareTo(b.timeTaken));

          if (filteredEntries.isEmpty) {
            return Center(
              child: Text(
                '${translate('no_entries_yet')} ${translate(_selectedDifficulty.toLowerCase())}.',
              ),
            );
          }

          return ListView.separated(
            itemCount: filteredEntries.length,
            separatorBuilder: (_, __) => const Divider(),
            itemBuilder: (_, i) {
              final e = filteredEntries[i];
              return ListTile(
                leading: Text(
                  '#${i + 1}',
                  style: const TextStyle(fontSize: 20),
                ),
                title: Text(e.name),
                subtitle: Text(
                  '${translate('time')}: ${formatTime(e.timeTaken)}',
                ),
              );
            },
          );
        },
      ),
    );
  }
}
