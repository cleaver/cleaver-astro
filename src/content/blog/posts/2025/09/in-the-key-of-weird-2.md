---
title: 'In the Key of Weird: Hacking My Keyboard - Part 2'
description: >-
  Automatically mapping an external keyboard with Kmonad
pubDate: '2025-09-24'
author: Cleaver Barnes
tags:
  - Linux
  - Hardware
  - Keyboards
  - Kmonad
  - QMK
  - udev
  - systemd
featured: false
draft: true
heroImage: /images/2025/09/hero-images/glass-block-wall.jpg
heroCaption: A glass block wall.
---

_Photo by <a href="https://unsplash.com/@tsuyoshikozu">Tsuyoshi Kozu</a> on <a href="https://unsplash.com/photos/a-close-up-of-a-glass-block-wall-7uhQHVpkV4E">Unsplash</a>_

Until a few years ago, I never messed with my keyboard. Aside from maybe three minutes trying Dvorak, I never remapped a single key. In 2020, a friend bought an [Ergodox](https://ergodox-ez.com/) and I started to read up on mechanical keyboards. I learned about layers and how people fit a lot of features into a small 40% keyboard. Not willing to give up my number row, I ended up buying a [Preonic](https://drop.com/buy/preonic-mechanical-keyboard) keyboard which is still my main day-to-day keyboard.

The Preonic comes preconfigured with layers so that you can still get everything a full 108-key keyboard offers in 60 keys. There's no app to change the mappings like the Ergodox offers, so I had to customize the firmware which was based on [QMK](https://qmk.fm).

That's how I entered the rabbit hole.

<!-- more -->
