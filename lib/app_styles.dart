import 'package:flutter/material.dart';

/// Centralized app color palette
class AppColors {
  static const Color primary = Colors.deepPurple;
  static const Color secondary = Colors.indigo;
  static const Color accent = Colors.teal;
  static const Color gridLetter = Colors.blue;
  static const Color winText = Colors.white;
  static const Color chipText = Colors.black87;
  static const Color correctAnswer = Colors.green;
  static const Color wrongAnswer = Colors.red;
  static const Color buttonBackground = Colors.white;

  static const Color backgroundSoft = Color(0xFFFFF3E0); // Colors.orange[50]
  static const Color appBarBackground = Color(
    0xFFFF8A65,
  ); // Colors.deepOrange[300]
  static const Color timerText = Colors.white; // Colors.red[800]
  static const Color wordListTitle = Color(0xFFFFE0B2); // Colors.brown[800]

  static const Color hintBackground = Color(0xFFFFE0B2); // Colors.orange[100]
  static const Color foundHintBackground = Color(
    0xFFFFF176,
  ); // Colors.yellow[300]
  static const Color unfoundHintBorder = Color(0xFFFF5252); // Colors.redAccent
  static const Color foundHintBorder = Color(0xFF4CAF50); // Colors.green
  static const Color foundHintText = Color(0xFF1B5E20); // Colors.green[900]
  static const Color unfoundHintText = Color(
    0xFFD84315,
  ); // Colors.deepOrange[800]

  static const Color hintIcon = Colors.deepPurple;
  static const Color crosswordLetter = Color(0xFFB71C1C); // Colors.red[900]

  static const Color lineStart = Colors.orange;
  static const Color lineMiddle = Colors.red;
  static const Color lineEnd = Colors.deepOrange;
  static const Color lineText = Colors.white;

  static const Color background = Color(0xFFFFF3E0); // Colors.orange[50]
  static const Color appBar = Color(0xFFFF7043); // Colors.deepOrange[300]
  static const Color appBarText = Colors.white;
  static const Color sliderActive = Color(0xFFFF7043); // Matches app bar
  static const Color button = Color(0xFFFF7043);

  static const LinearGradient backgroundGradient = LinearGradient(
    colors: [background, appBarBackground],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );
}

/// Commonly used text styles
class AppTextStyles {
  // Welcome screen
  static const TextStyle welcomeTitle = TextStyle(
    fontSize: 36,
    fontWeight: FontWeight.bold,
    color: Colors.white,
    shadows: [
      Shadow(
        blurRadius: 8,
        color: Colors.deepPurpleAccent,
        offset: Offset(0, 2),
      ),
    ],
  );

  static const TextStyle tipText = TextStyle(
    color: Colors.white70,
    fontSize: 14,
  );

  // Game and timer
  static const TextStyle winText = TextStyle(
    fontSize: 40,
    fontWeight: FontWeight.bold,
    color: AppColors.winText,
  );

  static const TextStyle timerText = TextStyle(
    fontSize: 20,
    fontWeight: FontWeight.bold,
    color: AppColors.timerText,
  );

  static const TextStyle wordListTitle = TextStyle(
    fontSize: 20,
    fontWeight: FontWeight.bold,
    color: AppColors.wordListTitle,
  );

  static const TextStyle chipText = TextStyle(
    fontSize: 16,
    fontWeight: FontWeight.bold,
    color: AppColors.chipText,
  );

  static const TextStyle gridLetter = TextStyle(
    fontSize: 18,
    fontWeight: FontWeight.bold,
    color: AppColors.gridLetter,
  );

  static const TextStyle crosswordLetter = TextStyle(
    fontSize: 20,
    // fontWeight: FontWeight.bold,
  );

  static const TextStyle crosswordLineText = TextStyle(
    fontWeight: FontWeight.bold,
  );

  static const TextStyle appBarTitle = TextStyle(
    fontSize: 20,
    fontWeight: FontWeight.bold,
    color: Colors.white,
  );

  // Hints
  static const TextStyle hintText = TextStyle(
    fontSize: 16,
    fontWeight: FontWeight.normal,
  );

  static const TextStyle hintTextFound = TextStyle(
    fontSize: 16,
    fontWeight: FontWeight.bold,
  );

  // Settings screen
  static const TextStyle settingsLabel = TextStyle(
    fontSize: 16,
    fontWeight: FontWeight.w600,
    color: Colors.brown,
  );

  static const TextStyle settingsValue = TextStyle(
    fontSize: 14,
    color: Colors.deepOrange,
  );

  // Buttons
  static const TextStyle buttonText = TextStyle(
    fontSize: 16,
    fontWeight: FontWeight.bold,
  );
}

/// Predefined elevated button styles
class AppButtonStyles {
  static final ButtonStyle smallGreen = ElevatedButton.styleFrom(
    backgroundColor: AppColors.buttonBackground,
    foregroundColor: AppColors.correctAnswer,
    padding: const EdgeInsets.symmetric(horizontal: 30, vertical: 15),
    textStyle: AppTextStyles.buttonText,
  );

  static final ButtonStyle primary = ElevatedButton.styleFrom(
    backgroundColor: AppColors.primary,
    foregroundColor: Colors.white,
    padding: const EdgeInsets.symmetric(vertical: 20),
    textStyle: AppTextStyles.buttonText,
  );

  static final ButtonStyle settings = ElevatedButton.styleFrom(
    backgroundColor: Colors.grey[700],
    foregroundColor: Colors.white,
    padding: const EdgeInsets.symmetric(vertical: 20),
    textStyle: AppTextStyles.buttonText,
  );

  static final ButtonStyle help = ElevatedButton.styleFrom(
    backgroundColor: AppColors.accent,
    foregroundColor: Colors.white,
    padding: const EdgeInsets.symmetric(vertical: 20),
    textStyle: AppTextStyles.buttonText,
  );

  static final ButtonStyle language = ElevatedButton.styleFrom(
    backgroundColor: AppColors.secondary,
    foregroundColor: Colors.white,
    padding: const EdgeInsets.symmetric(vertical: 20),
    textStyle: AppTextStyles.buttonText,
  );

  static final ButtonStyle mainPurple = ElevatedButton.styleFrom(
    backgroundColor: Colors.deepPurple,
    foregroundColor: Colors.white,
    padding: const EdgeInsets.symmetric(vertical: 18, horizontal: 16),
    textStyle: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
    elevation: 6,
    shadowColor: Colors.deepPurple.withOpacity(0.4),
  );

  static final ButtonStyle mainTeal = ElevatedButton.styleFrom(
    backgroundColor: Colors.teal,
    foregroundColor: Colors.white,
    padding: const EdgeInsets.symmetric(vertical: 18, horizontal: 16),
    textStyle: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
    elevation: 6,
    shadowColor: Colors.teal.withOpacity(0.4),
  );
  static final warmAmber = ElevatedButton.styleFrom(
    backgroundColor: AppColors.accent,
    foregroundColor: Colors.white,
    padding: const EdgeInsets.symmetric(vertical: 14),
    textStyle: const TextStyle(fontWeight: FontWeight.bold),
    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
    elevation: 2,
  );

  static Widget iconAction({
    required IconData icon,
    required String label,
    required Color color,
    required VoidCallback onPressed,
  }) {
    return ElevatedButton.icon(
      onPressed: onPressed,
      icon: Icon(icon, size: 20),
      label: Text(label),
      style: ElevatedButton.styleFrom(
        backgroundColor: color,
        foregroundColor: Colors.white,
        padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 16),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
      ),
    );
  }

  static final ButtonStyle warmOrange = ElevatedButton.styleFrom(
    backgroundColor: AppColors.appBar,
    foregroundColor: Colors.white,
    padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 20),
    textStyle: AppTextStyles.buttonText.copyWith(fontSize: 18),
    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
    elevation: 6,
    shadowColor: AppColors.appBar.withOpacity(0.3),
  );

  static final ButtonStyle warmTeal = ElevatedButton.styleFrom(
    backgroundColor: AppColors.accent,
    foregroundColor: Colors.white,
    padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 20),
    textStyle: AppTextStyles.buttonText.copyWith(fontSize: 18),
    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
    elevation: 6,
    shadowColor: AppColors.accent.withOpacity(0.3),
  );
}
