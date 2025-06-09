// service_worker_cleanup.dart
import 'dart:html' as html;

Future<void> unregisterServiceWorkers() async {
  final registrations =
      await html.window.navigator.serviceWorker?.getRegistrations();
  for (final reg in registrations ?? []) {
    await reg.unregister();
  }
}
