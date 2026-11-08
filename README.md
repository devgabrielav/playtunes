# Project Playtunes

[Deploy](https://devgabrielav.github.io/playtunes/) 

# Context
This is a Frontend project.

On this project my goal is to create an application capable of playing music from a wide range of artists and bands, discovering curated music recommendations on the home screen, creating a list of favorite songs and managing the profile of the logged-in user. This application will be able to:

- Login with a new username or select an existing saved profile directly from the login screen.
- Switch between profiles or log out at any time, keeping each user's information and favorite songs saved separately.
- Explore the Home discovery section with suggested artists, quick-search tags, playable song previews, and recommended albums.
- Search for a band or artist.
- List the available albums of this band or artist.
- View songs and details from a selected album.
- Play a preview of the songs on the home screen, album page, or favorites list.
- Favorite and unfavorite songs in real time.
- View the list of favorite songs saved for the active user.
- View the profile of the logged in person.
- Edit the profile of the logged in person (name, email, description, and profile picture URL with live preview).
- Use the application seamlessly across desktop and mobile devices with a responsive layout.

## Used technologies

Front-end:
> Developed using: TypeScript, React 18, Vite (`@vitejs/plugin-react-swc`), CSS3 (Flexbox, Grid, Custom Properties & Responsive Media Queries), React Router DOM (v6), Validator, and React Spinners.
- Local Storage to persist multiple user profiles, active user sessions, and each user's list of favorite songs.

Fetched catalog:
> Apple Music / iTunes Search & Lookup API (`itunes.apple.com`), with automatic JSONP fallback to prevent CORS issues when fetching album tracks.

Deployment:
> GitHub Pages with automated CI/CD via GitHub Actions.

## Project routes

- `/`: Login screen (when logged out) or Home / Search & Discovery page (when logged in).
- `/album/:id`: Album details and tracklist with audio previews.
- `/favorites`: Saved favorite songs for the current user.
- `/profile`: Current user's profile view.
- `/profile/edit`: Form to edit user profile information.

## Installing Dependencies

> After cloning the project

```bash
cd playtunes
npm install
```

## Running the application

```bash
npm run dev
```

## Building for production

```bash
npm run build
npm run preview
```

