---
app: Indigo Blast
lastUpdated: 2026-07-10
summary: >-
  How Indigo Blast handles your data: almost everything stays on your device, and
  the only online feature is an optional, pseudonymous leaderboard.
---

Indigo Blast is an arcade puzzle game published by timetoady. This policy explains what data the game handles, where it lives, and your choices. The short version: **almost everything stays on your device**, and the only thing that ever leaves it is an optional, pseudonymous leaderboard entry you choose to submit.

## Data stored on your device only

The game saves the following in your device's local app storage. It never leaves your device, and we cannot see it:

- Game options (audio, visual, control settings)
- Puzzle campaign progress, stars, and high scores
- Puzzle editor drafts (if you use the editor)
- Your unlock/purchase status (a local record that the one-time unlock was purchased)
- Your chosen leaderboard display name

Uninstalling the app, or clearing its data in Android settings, deletes all of it.

## Optional global leaderboard

The global leaderboard is the only online feature. When you **view global standings** (the Top 25, or the standings panel shown when you open a mode's screen) **or submit a score**, requests go to our leaderboard service (hosted on Supabase). A submission sends:

- Your **self-chosen display name** (up to 14 characters — please don't use your real name; names are filtered against a blocked-terms list and rate limits apply)
- Your **score, cycle count, run time, submission timestamp, and the leaderboard board it belongs to**
- A **random anonymous account ID**, created automatically the first time you view or submit to the global leaderboard. It is not linked to your identity — no email, no sign-up, no profile.

To enforce rate limits, the service also keeps a small per-submission record (your anonymous ID, the board, and when the submission happened).

Like any internet service, the server sees your IP address while handling a request; we never use it to identify you, though our hosting provider (Supabase) may retain it briefly in routine service logs.

Using the global leaderboard is always your choice. If you never view global standings or submit a score, nothing is ever sent — in particular, nothing is sent just by launching the game.

### Removing a leaderboard entry

Email us (contact below) with your display name and approximate score/date, and we will remove the entry, its rate-limit records, and the anonymous account record.

## Purchases

The one-time full unlock is processed entirely by **Google Play**. We never see or store your payment details, name, or address. Google's handling of your purchase is covered by the [Google Play Terms of Service](https://play.google.com/about/play-terms/) and Google's Privacy Policy. Your proof of purchase is checked against Google Play and remembered locally on your device.

## What we do NOT do

- No ads, no ad networks
- No analytics or tracking SDKs
- No selling or sharing of data with third parties
- No collection of contacts, location, photos, files, or any device content
- No user-created accounts — no email, password, or sign-up (the leaderboard's anonymous ID is created silently and holds no personal information)

## Children

The game does not knowingly collect personal information from anyone, including children. The only user-provided data is the optional leaderboard display name, which is filtered and pseudonymous.

## Data security

Leaderboard traffic uses HTTPS (encrypted in transit). On-device data is stored in the app's private storage.

## Changes

We will update this page when anything in this policy changes, and update the date at the top.

## Contact

Questions, or requests to remove a leaderboard entry, can be sent to `support@timetoady.com`.
