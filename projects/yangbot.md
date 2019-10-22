---
layout: page
title: YangBot
---

![](/img/discord.jpg)

# Summary

I created a Discord Bot for the UCSB Discord server with the following features.
* Removes extremely toxic messages
* Mediates name changes to avoid inappropriate nicknames
* Joins in repeated message streaks
* Kicks members on request especially around midterm/final season
* Saves verified members nicknames and roles
* Reinstates nicknames and roles when rejoining the server if verified
* Notifies new users of the verification policy
* Allows Admins to take control of the bot to send messages

See the code at [this repository](https://github.com/UCSBDiscord/YangBot)

# History

The initial version of YangBot was a spaghettified mess of hardcoded flow control. After realizing the technical debt the codebase had, I refactored the codebase not to remove any functionality, but so that it had some semblance of structure. This still was fairly hardcoded, but it had slightly better design than the initial version. Recently, I decided to refactor the entire codebase and scrap all at-the-time current functionality so that it could be easily changed and improved.

# Design Details

YangBot is now hosted on Heroku with a Postgres database. 

The main design that allows this refactor to work is the code in [yangbot.py](https://github.com/UCSBDiscord/YangBot/blob/master/src/yangbot.py). Instead of creating flow control, YangBot runs through every possible action that can trigger based on criteria defined in the event. We can instantiate this by using decorators to add methods to YangBot without introducing flow control. These decorators also control which roles are allowed to use specific commands, cooldown of each command, and any post-action asynchronous functionality.