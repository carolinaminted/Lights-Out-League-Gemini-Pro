# Lights Out League - Administrator Guide

This guide covers all administrative features for managing the Lights Out League F1 Fantasy application. As a League Commissioner (Admin), you have full control over users, results, scoring, schedules, and invitations.

---

## Table of Contents

1. [Admin Dashboard Overview](#admin-dashboard-overview)
2. [Managing Drivers & Teams](#managing-drivers--teams)
3. [Schedule Manager](#schedule-manager)
4. [Results & Locks Manager](#results--locks-manager)
5. [Managing Users](#managing-users)
6. [Scoring Settings](#scoring-settings)
7. [Invitation Codes](#invitation-codes)
8. [Leaderboard Sync](#leaderboard-sync)
9. [Admin Privileges & Overrides](#admin-privileges--overrides)
10. [Troubleshooting](#troubleshooting)

---

## Admin Dashboard Overview

Access the Admin Dashboard by clicking the **Admin** icon in the navigation menu (only visible to users with `isAdmin: true`).

### Dashboard Tiles

The Admin Dashboard provides quick access to all management areas:

| Tile | Description |
|------|-------------|
| **Manage Drivers & Teams** | Update the F1 grid, handle transfers, and change class assignments |
| **Schedule Manager** | Set race dates, session times, and manage the calendar |
| **Results & Locks Manager** | Enter race results and control when picks lock |
| **Manage Users** | Search users, manage dues status, and view profiles |
| **Scoring Settings** | Configure point values for each session type |
| **Invitation Codes** | Create and manage registration codes |

### Sync Leaderboard Button

The red **"Sync Leaderboard"** button in the header triggers a full recalculation of all users' scores. Use this after:
- Fixing scoring configuration issues
- Correcting results after initial entry
- Resolving data inconsistencies

**Note:** The leaderboard auto-syncs when you save new results, so manual sync is rarely needed.

---

## Managing Drivers & Teams

**Location:** Admin Dashboard > Manage Drivers & Teams

This page allows you to maintain the F1 roster throughout the season.

### Drivers Tab

Manage all drivers in the league:

| Field | Description |
|-------|-------------|
| **ID** | Unique identifier (e.g., `nor`, `ham`) - cannot be changed after creation |
| **Display Name** | Driver's full name shown to users |
| **Class** | A (top tier) or B (midfield) - affects usage limits |
| **Team** | Which constructor the driver races for |
| **Active** | Whether the driver appears in pick selections |

### Teams Tab

Manage constructors/teams:

| Field | Description |
|-------|-------------|
| **ID** | Unique identifier (e.g., `mclaren`, `ferrari`) |
| **Display Name** | Team name shown to users |
| **Class** | A or B classification |
| **Color** | Hex color code for UI display (e.g., `#FF8000` for McLaren) |
| **Active** | Whether the team appears in pick selections |

### Common Tasks

#### Mid-Season Driver Transfer
1. Click on the driver row to edit
2. Change the **Team** dropdown to the new constructor
3. Click **Save** (disk icon in header)
4. The change takes effect immediately for future picks

#### Retiring a Driver
1. Click on the driver row
2. Uncheck **"Active for Selection"**
3. Save changes
4. Driver won't appear in future pick forms but historical data remains

#### Adding a New Driver
1. Click **"+ Add New"** button
2. Enter unique ID (lowercase, underscores for spaces)
3. Fill in display name, class, and team
4. Check "Active for Selection"
5. Click **"Add to List"**
6. Click **Save** in header to commit

#### Updating Team Colors
1. Switch to **Teams** tab
2. Click on team row
3. Use color picker or enter hex code directly
4. Save changes

### Important Notes

- Always click the **Save** (disk) icon after making changes
- Changes to driver-team assignments affect future scoring
- Results snapshots preserve historical team assignments at time of race
- Inactive entities don't appear in forms but remain in database

---

## Schedule Manager

**Location:** Admin Dashboard > Schedule Manager

Control all race weekend dates and session times. All times should be entered in **Eastern Time (EST/EDT)**.

### Event Calendar Grid

Each event shows:
- Round number and name
- Location and country
- Sprint indicator (yellow badge)
- Green dot = schedule data exists
- Gray dot = needs scheduling

### Editing a Single Event

1. Click any event tile
2. Modal opens with form fields:

| Field | Description |
|-------|-------------|
| **Custom Name** | Override the default GP name if needed |
| **Sprint Weekend** | Toggle for sprint format weekends |
| **Practice 1** | FP1 session start time |
| **Practice 2/3** | Standard weekend practice sessions |
| **Sprint Qualifying** | Sprint format qualifying (Friday) |
| **Sprint Race** | Sprint race start time (Saturday) |
| **Qualifying** | Main qualifying session |
| **Grand Prix Race** | Sunday race start time |
| **Custom Lock Time** | Override when picks lock (optional) |

3. Click **"Save Schedule"**

### Bulk Import (Power Users)

For updating multiple events at once:

1. Click **"Bulk Import JSON"** button
2. Paste JSON in format:
```json
{
  "aus_26": {
    "fp1": "2026-03-05T20:30",
    "fp2": "2026-03-06T00:00",
    "fp3": "2026-03-06T20:30",
    "qualifying": "2026-03-07T00:00",
    "race": "2026-03-07T23:00"
  },
  "chn_26": {
    "fp1": "2026-03-12T22:30",
    "sprintQualifying": "2026-03-13T02:30",
    "sprint": "2026-03-13T22:00",
    "qualifying": "2026-03-14T02:00",
    "race": "2026-03-15T02:00",
    "hasSprint": true
  }
}
```
3. Click **"Push to Firebase"**

**Tip:** Use "Copy Example Template" to get the correct format.

### Session Time Fields

| Session | JSON Key | Notes |
|---------|----------|-------|
| Practice 1 | `fp1` | All weekends |
| Practice 2 | `fp2` | Standard weekends only |
| Practice 3 | `fp3` | Standard weekends only |
| Sprint Qualifying | `sprintQualifying` | Sprint weekends |
| Sprint Race | `sprint` | Sprint weekends |
| Qualifying | `qualifying` | All weekends |
| Grand Prix | `race` | All weekends |
| Custom Lock | `customLockAt` | Override pick deadline |

### Pick Lock Behavior

By default, picks lock when **Qualifying** starts. For sprint weekends, picks lock at **Sprint Qualifying** start.

To override:
1. Edit the event
2. Set **Custom Lock Time** field
3. Save

---

## Results & Locks Manager

**Location:** Admin Dashboard > Results & Locks Manager

Enter official race results and control pick form locks.

### Event Selection

1. Use filter buttons: **All Rounds** | **Done** | **Pending**
2. Select event from dropdown
3. Events show status indicators:
   - ✓ = Results entered
   - ○ = Pending results
   - (LOCKED) = Pick form locked

### Entering Results

For each session, select finishing order by clicking grid positions:

#### Grand Prix Finish (P1-P10)
Click each position slot and select the finishing driver.

#### Qualifying (P1-P3)
Select top 3 from qualifying for bonus points.

#### Fastest Lap
Select the driver who set the fastest lap in the race.

#### Sprint Sessions (Sprint Weekends Only)
- **Sprint Finish** (P1-P8)
- **Sprint Qualifying** (P1-P3)

### Lock Controls

**Toggle Lock Button:**
- 🔓 **Unlocked** - Users can submit/edit picks
- 🔒 **Locked** - Users cannot modify picks

**Best Practice:**
1. Lock picks when qualifying starts (automatic if schedule set)
2. Enter results after each session
3. Save to trigger leaderboard recalculation

### Saving Results

1. Fill in all applicable sessions
2. Click **"Save Results"**
3. Confirmation toast appears
4. Leaderboard automatically recalculates

### Scoring Snapshots

When you save results, the system captures:
- **Driver-Team Assignments** - Freezes who drives for which team
- **Scoring Rules** - Preserves point values used for this event

This ensures mid-season rule changes don't affect historical scoring.

---

## Managing Users

**Location:** Admin Dashboard > Manage Users

Search, filter, and manage all league members.

### User List Features

**Search:** Type to filter by display name or email

**Filters:**
- **All** - Show everyone
- **Unpaid** - Only users with outstanding dues
- **Admins** - Only admin users

**Pagination:** Click "Load More" to fetch additional users

### User Table Columns

| Column | Description |
|--------|-------------|
| **Name** | Display name (team principal name) |
| **Email** | User's email (partially masked for privacy) |
| **Status** | Dues payment status (Paid/Unpaid) |
| **Role** | User or Admin badge |

### Editing a User

Click any user row to open their profile:

#### Profile Information
- View first/last name, email, display name
- Same view users see on their profile

#### Dues Management
Change payment status:
1. Click user row to view profile
2. Toggle dues status between Paid/Unpaid
3. Changes save automatically

#### Picks & Points History
View all picks the user has submitted:
- Expand events to see team/driver selections
- View points breakdown per session
- See any penalties applied

#### Admin Penalty Tribunal

Apply penalties to a user's picks for specific events:

1. Expand a race weekend in their picks history
2. Scroll to "Admin Penalty Tribunal" section
3. Set penalty percentage (0-100%)
4. Enter reason (e.g., "Late Submission")
5. Click "Apply Penalty Judgment"

**Penalty Calculation:**
- 50% penalty on 100 points = 50 points deducted
- Final score: 100 - 50 = 50 points for that event

---

## Scoring Settings

**Location:** Admin Dashboard > Scoring Settings

Configure point values for all session types. Supports multiple scoring profiles.

### Scoring Profiles

Create different scoring configurations:
- **Default 2026** - Standard points system
- **Custom Profiles** - Alternative rule sets

**Active Profile:** The green "Active" badge shows which profile is used for scoring.

### Profile Management

#### Create New Profile
1. Click **"+ New"** button
2. Enter profile name
3. Adjust point values
4. Click Save

#### Switch Active Profile
1. Select profile from dropdown
2. Click **"Make Active"**
3. Future results use this profile

#### Delete Profile
1. Select non-active profile
2. Click trash icon
3. Confirm deletion

**Note:** Cannot delete the active profile.

### Point Configuration

#### Grand Prix Finish (Top 10)
| Position | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 |
|----------|-----|-----|-----|-----|-----|-----|-----|-----|-----|------|
| Default | 25 | 18 | 15 | 12 | 10 | 8 | 6 | 4 | 2 | 1 |

#### Sprint Finish (Top 8)
| Position | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 |
|----------|-----|-----|-----|-----|-----|-----|-----|-----|
| Default | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1 |

#### Qualifying (Top 3)
| Position | P1 | P2 | P3 |
|----------|-----|-----|-----|
| Default | 3 | 2 | 1 |

#### Fastest Lap Bonus
- **Default:** 3 points

### Mid-Season Changes

When you change scoring rules mid-season:
- Historical results keep their original scoring (via snapshots)
- Only NEW results use the updated rules
- Use "Sync Leaderboard" to recalculate if needed

---

## Invitation Codes

**Location:** Admin Dashboard > Invitation Codes

Control who can register for the league.

### Code List

View all codes with status:
- **Active** (Green) - Available for use
- **Used** (Gray) - Already redeemed
- **Reserved** - Reserved for specific person (if applicable)

### Filters

- **All** - Show all codes
- **Active** - Only unused codes
- **Used** - Only redeemed codes

### Creating Codes

**Single Code:**
1. Set dropdown to "1 Code"
2. Click **"Generate"**

**Bulk Creation:**
1. Set dropdown to "5 Codes" or "10 Codes"
2. Click **"Generate"**

### Distributing Codes

Each code is a unique 8-character string. Share with new members:
- Copy code from the list
- Send via email, text, or Discord
- User enters code during registration

### Code Information

| Field | Description |
|-------|-------------|
| **Code** | 8-character unique string |
| **Status** | active/used/reserved |
| **Created** | Date code was generated |
| **Used By** | Email of user who redeemed (if used) |
| **Used At** | Date of redemption |

### Deleting Codes

1. Click on any code row
2. Confirmation modal appears
3. Click **"Confirm Permanent Deletion"**

**Note:** Deleting a used code doesn't affect the user who registered with it.

---

## Leaderboard Sync

The **"Sync Leaderboard"** button triggers a complete recalculation.

### When to Use

1. **After Scoring Rule Changes** - If you updated point values mid-season
2. **Data Correction** - If results were entered incorrectly and fixed
3. **Suspected Inconsistencies** - If leaderboard seems wrong
4. **After Database Maintenance** - Following any manual database edits

### What It Does

1. Fetches all users and their picks
2. Retrieves all entered race results
3. Recalculates points for every user for every event
4. Updates `public_users` leaderboard collection
5. Assigns global rankings

### Rate Limiting

- Limited to **5 calls per 300 seconds** (5 minutes)
- Prevents accidental spam
- Wait between consecutive syncs if needed

### Process Time

For 40-100 users: ~5-15 seconds

You'll see:
1. Button shows "Recalculating..."
2. Toast: "League Sync Complete! X users recalculated."

---

## Admin Privileges & Overrides

As an admin, you have special capabilities:

### Pick Form Overrides

- **Submit After Lock** - Admins can submit picks even after deadline
- **Edit Any User's Picks** - Through profile management
- **Apply Penalties** - Deduct points for rule violations

### Results Authority

- **Enter Results** - Only admins can input official finishes
- **Lock/Unlock Forms** - Control when picks are editable
- **Trigger Recalculations** - Manual leaderboard sync

### User Management

- **View All Profiles** - Access any user's complete data
- **Manage Dues** - Mark payments as received
- **View Private Data** - See emails, names, etc.

### System Configuration

- **Scoring Rules** - Full control over point values
- **Entity Management** - Add/edit/retire drivers and teams
- **Schedule Control** - Set all session times
- **Invitation System** - Create registration codes

---

## Troubleshooting

### Common Issues

#### "Users report picks didn't save"
1. Check if form was locked at submission time
2. Verify user completed all selections
3. Check browser console for errors

#### "Leaderboard shows wrong points"
1. Verify results were saved correctly
2. Check scoring profile is active
3. Run manual "Sync Leaderboard"
4. Check for applied penalties

#### "New user can't register"
1. Verify invitation code status is "active"
2. Check if code was already used
3. Generate a new code

#### "Results not reflecting on leaderboard"
1. Confirm results were saved (check toast)
2. Wait 10-15 seconds for cloud function
3. Refresh the page
4. Try manual leaderboard sync

#### "Schedule times appear wrong"
1. Remember: all times are EST/EDT
2. Verify timezone wasn't accidentally changed
3. Re-enter correct times
4. Check for daylight saving transitions

### Emergency Procedures

#### Reset All Picks for an Event
1. Enter blank/null results for the event
2. This clears points but keeps pick data
3. Users can submit new picks if form unlocked

#### Remove a User
1. Currently requires Firebase Console access
2. Delete from `users` and `public_users` collections
3. Clear their `userPicks` document

#### Database Backup
Firebase handles automatic backups. For manual backup:
1. Go to Firebase Console
2. Firestore > Export data
3. Store backup securely

---

## Quick Reference

### Admin Workflow - Race Weekend

**Friday (Standard) / Thursday (Sprint):**
1. Verify schedule times are correct
2. Ensure invitation codes distributed to new members
3. Check all drivers/teams are correctly assigned

**Saturday (Qualifying):**
1. Form auto-locks at qualifying start
2. Verify lock engaged properly
3. After qualifying: Enter Q1-Q3 results

**Saturday (Sprint Weekends):**
1. Enter Sprint Qualifying results
2. Enter Sprint Race results

**Sunday:**
1. After race: Enter GP finish order (P1-P10)
2. Enter Fastest Lap winner
3. Save results
4. Leaderboard auto-updates
5. Verify leaderboard reflects correctly

**Post-Race:**
1. Unlock form for next event (if needed)
2. Monitor for user issues
3. Process any dues payments

### Key Database Collections

| Collection | Purpose |
|------------|---------|
| `users` | Private user profiles |
| `public_users` | Leaderboard data (read-only for users) |
| `userPicks` | All user picks keyed by event |
| `app_state/race_results` | Official race results |
| `app_state/entities` | Drivers and teams roster |
| `app_state/scoring_config` | Scoring profiles |
| `app_state/event_schedules` | Session times |
| `invitation_codes` | Registration codes |
| `dues_payments` | Payment initiation logs |

---

*Lights Out League - Administrator Guide v1.0*
*Last Updated: December 2025*
