<div align="center">


# EduTrack.AI

**AI-powered study focus monitor for Windows**

Track your study sessions, crush distractions, earn badges, and send weekly reports to parents — all from a sleek dark-themed desktop app.

[![Platform](https://img.shields.io/badge/platform-Windows-blue?style=flat-square&logo=windows)](https://github.com/codePR-26/edutrack-ai/releases)
[![Release](https://img.shields.io/github/v/release/codePR-26/edutrack-ai?style=flat-square&color=00ff88)](https://github.com/codePR-26/edutrack-ai/releases/tag/v1.0.0)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)
[![Portfolio](https://img.shields.io/badge/portfolio-live-brightgreen?style=flat-square)](https://edutrack-ai-xi.vercel.app)

[🌐 Portfolio Website](https://edutrack-ai-xi.vercel.app) · [⬇️ Download for Windows](https://github.com/codePR-26/edutrack-ai/releases/download/v1.0.0/EduTrackAI_Setup_v1.0.0.exe) · [🐛 Report a Bug](https://github.com/codePR-26/edutrack-ai/issues)

---


</div>

---

## What is EduTrack.AI?

EduTrack.AI sits silently in the background while you study, watching which app is in focus every second. It automatically classifies your activity as **Study**, **Distraction**, or **Neutral**, gives you a real-time focus score, pops up a warning when you open YouTube or Steam, and rewards good habits with achievement badges. At the end of the week, it generates a detailed PDF report and emails it straight to a parent — protected by a parent password and OTP verification so students can't tamper with it.

---

## Features

- **Real-time app monitoring** — polls the active window every second using the Windows API (`GetForegroundWindow`) with zero performance impact.
- **AI app classification** — automatically categorises every app as Study (VS Code, Word, Anki…), Distraction (YouTube, TikTok, Steam…), or Neutral (browsers, Explorer). Add your own custom apps in Settings.
- **Live focus score** — calculates focus percentage per session based on time spent in study vs distraction apps.
- **7-day focus chart** — an animated bar chart showing your daily average focus score for the past week.
- **8 achievement badges** — earned automatically when you hit milestones (Hours Champion, Focus Streak, Early Bird, Night Owl, Weekend Warrior, Distraction Free Zone, Focus Master, Grand Badge).
- **Pomodoro-style break reminders** — configurable interval reminders (default 25 min) sent as system toast notifications.
- **Study schedule editor** — build a weekly timetable and get reminded when a scheduled block starts.
- **Parental controls** — all settings are locked behind a parent password. Supports OTP-based password reset via email.
- **Weekly PDF reports** — generated with QuestPDF and emailed to parents via Gmail SMTP, including study hours, focus scores, daily breakdown, app usage stats, and earned badges.
- **Dark theme** — crystal-green-on-black UI throughout.

---

## Download

| Platform | Link | SHA256 |
|---|---|---|
| Windows (installer) | [EduTrackAI_Setup_v1.0.0.exe](https://github.com/codePR-26/edutrack-ai/releases/download/v1.0.0/EduTrackAI_Setup_v1.0.0.exe) | `6295ee9183fbd453341dc0f11db020777ccf343f772d1f891f54a48a8b0ed073` |

**Verify the download (PowerShell):**
```powershell
Get-FileHash EduTrackAI_Setup_v1.0.0.exe -Algorithm SHA256
```
The hash should match exactly. If it doesn't, do not run the file.

> **Windows SmartScreen warning:** The app is not yet code-signed. Click **More info → Run anyway** to proceed. This is normal for unsigned software. A code signing certificate is on the roadmap.

---

## Getting Started

1. Download and run the installer.
2. Launch **EduTrack.AI** from your desktop or Start Menu.
3. On first launch, click **Settings** to set a parent password and configure your email for reports.
4. Hit **▶ Start Session** to begin monitoring.
5. Study. Get distracted. Get warned. Earn badges. Repeat.

---

## Project Structure

```
EduTrackAI/
│
├── EduTrackAI.Core/              # Business logic (no UI, no database)
│   ├── AppServices/
│   │   ├── AppClassifier.cs      # Classifies apps as Study / Distraction / Neutral
│   │   └── AppMonitorService.cs  # Win32 foreground window polling (1 sec interval)
│   └── Models/
│       ├── Student.cs
│       ├── StudySession.cs
│       ├── AppActivity.cs
│       ├── AppSettings.cs
│       ├── Badge.cs
│       ├── ParentSettings.cs
│       ├── StudySchedule.cs
│       └── WeeklyReportData.cs
│
├── EduTrackAI.Data/              # Data access layer (EF Core + SQLite)
│   ├── Database/
│   │   └── EduTrackDbContext.cs  # SQLite context → AppData\Roaming\EduTrackAI\
│   ├── Services/
│   │   ├── BadgeManager.cs       # Badge milestone detection + awarding
│   │   ├── BadgeResetService.cs  # Monthly badge resets
│   │   ├── CredentialManager.cs  # Secure parent credential storage
│   │   ├── EmailService.cs       # MailKit SMTP email sender
│   │   ├── ReportGenerator.cs    # QuestPDF weekly report builder
│   │   └── ScheduleManager.cs    # Study schedule CRUD
│   └── Migrations/               # EF Core migration history
│
└── EduTrackAI.UI/                # WPF front-end
    ├── MainWindow.xaml(.cs)      # Dashboard: timer, chart, activity log
    ├── SettingsWindow.xaml(.cs)  # App config, badge thresholds, email setup
    ├── ScheduleWindow.xaml(.cs)  # Weekly schedule viewer
    ├── ScheduleEditorDialog.xaml # Add/edit schedule entries
    ├── Controls/
    │   └── BadgeDisplayControl   # Badge gallery with earned/locked states
    ├── Services/
    │   └── NotificationService   # Windows toast notifications
    ├── OtpVerificationDialog     # OTP entry for password reset
    ├── ParentPasswordDialog      # First-time parent password setup
    ├── PasswordVerificationDialog
    ├── PasswordChangeDialog
    ├── EmailTestDialog
    └── Images/
        ├── logo.png
        └── Badges/               # 8 badge PNG images
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Language | C# 13 / .NET 10 |
| UI framework | WPF (Windows Presentation Foundation) |
| Database | SQLite via Entity Framework Core 10 |
| Charting | LiveCharts.Wpf 0.9.7 |
| PDF generation | QuestPDF (Community) |
| Email | MailKit 4.9.0 |
| Serialisation | Newtonsoft.Json 13.0.3 |

---

## Database Schema

The SQLite database is stored at:
```
C:\Users\<you>\AppData\Roaming\EduTrackAI\edutrack.db
```

```
Students
  ├─── StudySessions (one-to-many)
  │      └─── AppActivities (one-to-many)
  ├─── Badges (one-to-many)
  ├─── AppSettings (one-to-one)
  ├─── ParentSettings (one-to-one)
  └─── StudySchedules (one-to-many)
```

---

## Building from Source

**Requirements:**
- Visual Studio 2022 or 2026 with the **.NET desktop development** workload
- .NET 10 SDK

```bash
git clone https://github.com/codePR-26/edutrack-ai.git
cd edutrack-ai
```

1. Open `EduTrackAI.sln` in Visual Studio.
2. Wait for NuGet packages to restore (watch the status bar).
3. Press `Ctrl + Shift + B` to build. Expected output: `3 succeeded, 0 failed`.
4. Press `F5` to run.

**If the build fails:**
```
Build → Clean Solution → Rebuild Solution
```
If NuGet packages fail to restore, open the Package Manager Console and run:
```powershell
Update-Package -reinstall
```

---

## Badges

| Badge | How to earn |
|---|---|
| 🏆 Hours Champion | Reach 10 / 50 / 100 / 500 total study hours |
| 🔥 Focus Streak | Study on 7 / 14 / 30 consecutive days |
| 🎯 Focus Master | Achieve high focus score in a session |
| ⛔ Distraction Free Zone | Stay distraction-free for 30+ continuous minutes |
| 🌅 Early Bird | Start a session before 8 AM |
| 🌙 Night Owl | Study after 10 PM |
| ⚔️ Weekend Warrior | Complete sessions on both Saturday and Sunday |
| 👑 Grand Badge | Earn all other badge types |

---

## Roadmap

- [ ] Custom domain (`edutrackapp.com`) via Vercel Settings
- [ ] Code signing certificate (remove Windows SmartScreen warning)
- [ ] macOS / Linux support via .NET MAUI
- [ ] Android companion app
- [ ] Cloud sync for multi-device support
- [ ] AI-powered personalised study recommendations

---

## Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you'd like to change.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a pull request

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">

Build by Prithwish Bhowmik

[⬆ Back to top](#edutrackAI)

</div>
