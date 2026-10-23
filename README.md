# WashWise

**Laundry, without the waiting.**

WashWise is a proposed Android app for hostel students to check washing machine availability, see estimated wash times, and decide when to visit the laundry room. Its goal is to reduce wasted trips and make shared laundry facilities easier to use.

> **Project status:** This README describes the planned product and a proposed architecture. The workspace currently contains no application source files, so implementation status, Android framework, database, and runnable commands have not been verified. Update this README as those choices are made.

## The problem

Students often have no easy way to know whether a shared washing machine is available or how long an active wash has left. They may walk to the laundry room only to find every machine occupied, or be unsure when to return. WashWise is intended to make machine status and expected availability visible from a phone.

## Planned features

- Student sign up, login, and profile management.
- A dashboard showing machines and their current status: **Available**, **In use**, or **Out of order**.
- Estimated remaining wash time and expected availability for machines in use.
- A way to start or mark a laundry session, including the expected wash duration and an optional photo.
- A way to mark a completed session as available.
- Notifications when a machine a student is watching becomes available and reminders as a wash nears completion.
- Problem reports with a machine, issue type, description, and optional photo.
- Profile and settings, including theme selection, editing profile details, logout, and account deletion.

These features are planned and may change as development progresses.

## User flow

1. A student signs in or creates an account.
2. The home screen lists hostel machines and their latest reported status.
3. The student opens a machine to see its estimated time remaining, or chooses an available machine.
4. When starting a session, the student records an expected duration and may add a photo.
5. The student or another authorized user marks the machine available when the wash is complete. Students can optionally watch a busy machine for an availability alert.
6. If a machine has a problem, the student submits a report for it.

## Proposed architecture

The following is a starting design, not a confirmed implementation:

- **Android client:** Mobile UI for authentication, machine status, laundry sessions, reports, and settings. The Android framework and language are to be selected.
- **Backend API:** Node.js with Express, exposing a JSON REST API.
- **Database:** To be selected. The data models below are conceptual and can be adapted to the chosen database.
- **Photo storage:** To be selected. Store a photo reference or URL with the related session or report; avoid storing large image files directly in ordinary database records.

### Conceptual data models

| Model | Example fields | Purpose |
|---|---|---|
| `User` | `id`, `name`, `email`, `passwordHash`, `role`, `createdAt` | Student account and access role. |
| `Machine` | `id`, `name`, `location`, `status`, `createdAt`, `updatedAt` | A hostel washing machine and its current state. |
| `LaundrySession` | `id`, `machineId`, `userId`, `status`, `startedAt`, `expectedDurationMinutes`, `expectedEndAt`, `photoUrl` | An active or completed use of a machine. |
| `ProblemReport` | `id`, `machineId`, `userId`, `type`, `description`, `photoUrl`, `status`, `createdAt` | A reported machine issue and its resolution state. |
| `AvailabilityAlert` | `id`, `userId`, `machineId`, `active`, `createdAt` | A student's request to be notified when a machine is available. |

Use password hashing and authorization on the backend. In particular, only the session owner or an authorized administrator should be able to make changes that affect machine status.

## Proposed API overview

Example base URL: `http://localhost:3000/api/v1` (replace with the configured server URL). Endpoint names and request shapes are proposals.

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/auth/register` | Create an account. |
| `POST` | `/auth/login` | Sign in and receive an access token. |
| `GET` | `/machines` | List machines, optionally filtered by status or location. |
| `GET` | `/machines/:machineId` | Get machine details and active session. |
| `POST` | `/machines/:machineId/sessions` | Start a laundry session with an expected duration. |
| `PATCH` | `/sessions/:sessionId/complete` | Mark a session complete and the machine available. |
| `POST` | `/machines/:machineId/alerts` | Request an availability alert. |
| `POST` | `/machines/:machineId/reports` | Submit a problem report. |
| `GET` | `/me` | Get the signed-in user's profile. |
| `PATCH` | `/me` | Update profile details. |
| `DELETE` | `/me` | Request account deletion. |

### Example: list machines

```http
GET /api/v1/machines?status=in_use
Authorization: Bearer <access_token>
```

Example response (illustrative):

```json
{
  "data": [
    {
      "id": "machine_123",
      "name": "Machine 1",
      "location": "Hostel laundry room",
      "status": "in_use",
      "activeSession": {
        "expectedEndAt": "<ISO-8601 timestamp>"
      }
    }
  ]
}
```

### Example: start a laundry session

```http
POST /api/v1/machines/machine_123/sessions
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "expectedDurationMinutes": 45,
  "photoUrl": "<optional uploaded photo URL>"
}
```

Example response (illustrative):

```json
{
  "data": {
    "id": "session_456",
    "machineId": "machine_123",
    "status": "in_use",
    "expectedDurationMinutes": 45,
    "expectedEndAt": "<ISO-8601 timestamp>"
  }
}
```

For photo uploads, the API may use a dedicated upload endpoint or a signed storage URL. The upload approach is not selected yet.

## Project structure

The actual repository layout is not available yet. One possible organization is:

```text
washwise/
├── android/                 # Android application (framework TBD)
├── server/                  # Proposed Node.js/Express API
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       └── app.js
├── .env.example
└── README.md
```

This is a suggested layout, not a description of files currently in the repository.

## Getting started

Setup commands depend on the Android framework, backend package manager, database, and photo-storage provider chosen for the project. Replace the placeholders below with the real commands before treating this section as runnable.

### Prerequisites

- Android development tools required by the selected Android framework.
- Node.js version: **`<choose and document supported version>`**.
- Database: **`<database and version>`**.
- Optional photo-storage account or local storage service: **`<provider>`**.

### Setup outline

1. Clone the repository.
2. Configure and start the database and any photo-storage service.
3. Copy `.env.example` to `.env` and fill in local development values.
4. Install backend dependencies using the package manager and lockfile in `server/`.
5. Run database migrations or initialization steps, if the selected database requires them.
6. Start the backend using the script defined in `server/package.json`.
7. Open `android/` in the appropriate Android development environment, configure the API base URL, and run the app on an emulator or device.

> Exact commands will be added once the project files and technology choices are available.

### Environment variables

Create a local `.env` file for the backend. Do not commit real secrets. The names below are examples; adjust them to match the implementation.

```dotenv
PORT=3000
NODE_ENV=development
DATABASE_URL=<your-local-database-connection-string>
JWT_SECRET=<generate-a-long-random-secret>
PHOTO_STORAGE_PROVIDER=<provider-name-or-local>
PHOTO_STORAGE_BUCKET=<bucket-name-if-applicable>
PHOTO_STORAGE_CREDENTIALS=<configure-through-your-provider-or-secret-manager>
```

If a provider requires credentials, use its recommended secret-management approach. Never put production credentials in source control or in the Android app.

## Roadmap

- [ ] Confirm Android framework, language, and minimum supported Android version.
- [ ] Select the database, hosting, and photo-storage approach.
- [ ] Build account registration and login.
- [ ] Build the machine list and machine detail views.
- [ ] Add laundry session creation and completion.
- [ ] Add availability alerts and wash reminders.
- [ ] Add problem reports and profile settings.
- [ ] Document deployment, API security, and production configuration.

## Contributing

Contributions and suggestions are welcome. Before opening a pull request, please describe the change and how it was checked. Add contribution guidelines here when the repository workflow is established.

## License

No license has been selected yet. Add a `LICENSE` file and update this section before distributing or accepting contributions under an open-source license.

## Contact

Project maintainer: **`<name or contact>`**
