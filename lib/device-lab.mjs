const smartCurtain = {
  "slug": "smart-curtain",
  "number": "01",
  "title": "How does a smart curtain know when to stop?",
  "summary": "Follow a command from an ESP32-C3 to a curtain cord, then see why a motor that stops on time can still miss the end of the track.",
  "deck": "At seven in the morning the curtain opens, even though nobody is holding a button. The interesting part is what happens at the other end of the trip. This controller has two very different ways to stop the motor.",
  "platform": "ESP32-C3 SuperMini",
  "tags": [
    "Home automation",
    "Motor control",
    "Wi-Fi"
  ],
  "youtubeId": null,
  "cover": "/device-lab-files/smart-curtain/cover.webp",
  "firmware": "/device-lab-files/smart-curtain/SmartCurtain.ino",
  "schematic": "/device-lab-files/smart-curtain/schematic.png",
  "kit": "/device-lab-files/smart-curtain/smart-curtain-kit.zip",
  "parts": [
    "ESP32-C3 SuperMini controller with a USB data cable",
    "TA6586 motor driver and a reversible DC motor matched to the drive and supply",
    "12 V DC supply and input switch, with a separate regulated logic supply as shown in the drawing",
    "Two momentary buttons for OPEN and CLOSE, a status LED and its current-limiting resistor",
    "Curtain track and cord, a shaft coupling, a mounting bracket and suitable fasteners",
    "The firmware notes recommend external 10 kΩ pull-down resistors on GPIO6 and GPIO7"
  ],
  "sections": [
    {
      "id": "mechanism",
      "title": "Follow the cord",
      "paragraphs": [
        "The motor sits beside the window. Its shaft drives the curtain cord, so the same motor opens or closes the curtain when the driver reverses direction. The ESP32-C3 makes the decision, the TA6586 drives the motor, and the cord moves the fabric.",
        "Try three actions in order. Hold OPEN and the motor starts. Let go halfway and it stops. Hold CLOSE and the motor runs in the opposite direction. The phone controls work the same way as the two physical buttons."
      ]
    },
    {
      "id": "board",
      "title": "Read the board before connecting it",
      "paragraphs": [
        "The schematic shows a 12 V input, a 7805 regulator for the 5 V rail, an ESP32-C3 SuperMini, a TA6586 driver, and switches wired to ground. The 12 V input belongs to the motor power path. Verify the regulated logic supply before connecting the controller.",
        "In the supplied sketch, GPIO6 and GPIO7 command the driver, GPIO8 and GPIO9 read the active-low buttons, and GPIO4 drives the status LED. The sketch calls the driver commands D0 and D1, while the supplied drawing labels its input nets differently. Check your PCB revision and driver pinout before applying power. The PNG is a circuit reference; it does not establish which driver terminals to wire on an unknown board.",
        "The motor model, rated current, bracket dimensions and PCB manufacturing files were not supplied. Select the motor, driver, supply and coupling for your own curtain load. Test direction with the cord detached first."
      ]
    },
    {
      "id": "upload",
      "title": "Load the firmware and open the dashboard",
      "paragraphs": [
        "The complete sketch includes the browser interface, Wi-Fi server, motor controls, daily timer and saved settings. The ESP32 Arduino board package provides the libraries it uses.",
        "The downloadable sketch compiled for an ESP32-C3 target with Arduino-ESP32 3.3.12. The dashboard uses arrow functions so its JavaScript passes Arduino sketch preprocessing. Browser checks covered hold, release and saving the travel time. The actual motor, wiring and endpoints still need a bench test on your board."
      ],
      "steps": [
        "Extract the project ZIP and open SmartCurtain/SmartCurtain.ino in Arduino IDE. Install the esp32 package by Espressif Systems in Boards Manager. Select a matching ESP32-C3 board profile and the USB port.",
        "In your local copy, set HOME_SSID and HOME_PASSWORD to your network credentials. For direct access only, use an empty HOME_SSID. Set your own AP_PASSWORD of at least eight characters before uploading; the controller starts its access point even when it joins your home network.",
        "Upload over USB. Open Serial Monitor at 115200 baud, then reset the board if you missed the boot messages. For native USB on the C3, enable USB CDC On Boot if the monitor stays blank.",
        "On the same home Wi-Fi, enter the printed home dashboard address in your phone browser. Alternatively, join the SmartCurtain access point using your chosen password and open the printed AP Dashboard address. The dashboard is local and has no application login. Keep it on a trusted network."
      ]
    },
    {
      "id": "calibration",
      "title": "Measure the trip before setting the timer",
      "paragraphs": [
        "Start at a known endpoint. With the mounted drive supervised, time a complete opening and release the button when the curtain reaches its intended position. The manual run also has a time cap. If it expires before the endpoint, stop and adjust the permitted duration before repeating the test.",
        "If a full opening takes 12 seconds, set Motor travel duration to 12 and choose Save settings with the motor stopped. Twelve seconds is an example. The default is 15 seconds, and the adjustable range is 5–60 seconds. The same setting applies to both directions, so check the closing trip too."
      ]
    },
    {
      "id": "schedule",
      "title": "Set a morning opening and evening closing",
      "paragraphs": [
        "Check that the dashboard clock shows the right local time. The sketch uses India Standard Time. It can obtain time over Wi-Fi or take the phone’s time when its own clock has not yet been set.",
        "Enable Morning open and Evening close, pick your times, and choose Save settings. The initial times are 07:00 and 22:00, with both schedules off until enabled. The schedule and runtime persist across a restart; the controller still needs a valid clock to run them.",
        "At the chosen minute the controller starts the motor and stops it when the configured time elapses. If a cord slips or the curtain started halfway along the track, the timer cannot tell where the fabric ended up."
      ]
    },
    {
      "id": "troubleshooting",
      "title": "What to check on the bench",
      "paragraphs": [
        "No address in Serial Monitor? Recheck the board, port and baud rate, then reset. If the home network did not connect, use the printed access-point address while your phone is joined to SmartCurtain.",
        "Phone control stops unexpectedly? Keep the button held and check the Wi-Fi link. The firmware stops a web-controlled run if its heartbeat disappears for about 1.8 seconds. Every run also has the configured maximum duration.",
        "Schedule did nothing? Check the device clock, make sure the relevant toggle is on, and save with the motor stopped. Use a future minute for the test. The dashboard illustration reflects the command and does not measure the curtain’s position."
      ]
    },
    {
      "id": "v2",
      "title": "What would change in V2?",
      "paragraphs": [
        "V1 answers “How long has the motor run?” A proposed V2 could answer “Has the curtain arrived?” by placing a limit switch at each end of the track and stopping motion in that direction when the curtain actuates it. The timer could remain as a backup. Limit switches are a future improvement; the downloadable V1 firmware uses elapsed time."
      ]
    }
  ],
  "referenceUrl": "https://www.youtube.com/watch?v=Yv7YbH5m188"
};

// Keep newest episodes first. Leave youtubeId null until the episode is public.
export const studies = [smartCurtain];
