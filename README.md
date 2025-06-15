# The 8-bit Catalog


<details>
  <summary>Content</summary>

-   [Introduction](#introduction)
-   [Features](#features)
-   [Screenshots](#screenshots)
-   [Roadmap](#roadmap)

</details>

<br>

## Introduction

The 8-bit Catalog is a searchable library of games released for the Nintendo Entertainment System. This project is a work in progress.

<br>

## Features

-   **Dashboard Page**

    -   Update user credentials and account information.
    -   Admins may add new users manually.
    -   Update profile image.
    -   List all existing members.
    -   Admins may add, update, and remove search filters.

-   **Search Page**

    -   Games are searchable by title as well as by various search filters.
    -   The games are displayed paginated, in sortable order.
    -   Each game card links to a `Game Info Modal`.
    -   It is possible to view games in either a grid view or a list view.
    -   Games may be added to a Favorites list.

-   **Favorites Page**

    -   The page displays games marked as favorites by the user.
    -   More information about the game may be found by clicking on the game card.
    -   Upon removing a game card, the card gradually fades away, making the disappearance less abrupt.
    -   Favorites are stored in a Postgres database if the user has signed in. Otherwise, local storage is used if available.

-   **Game Modal**

    -   Most of the games have a link to an Emulator page where the game may be played in a browser.
 
-   **Register Page**

    -   Register a new user by supplying a unique email and a password.
    -   A mail is sent to the supplied email containing an activation link. Click on the link to activate the newly created account.

-   **Forgot Password Page**

    -   Send an email containing a new password to the supplied email address.

<br>

## Screenshots

![catalog2](https://github.com/user-attachments/assets/ff175d7d-eb79-4f7d-9a84-6f628114b71b)



![catalog3](https://github.com/user-attachments/assets/512b82d4-2a0d-4807-99ea-3bbde93ea6e4)

<br>
<a name="roadmap"></a>

## Roadmap
  -  Finish functionality related to accounts.
  -  Migrate from Supabase to a standalone Postgres server.
  -  Deploy the project as a Docker image on AWS.
