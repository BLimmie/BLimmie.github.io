---
layout: page
title: Eyewire Automation
---

![](/img/eyewire.jpg)

# Abstract
Eyewire is a citizen science game where players map individual neurons in a mouse's retina. Using a relatively new method of deep learning called Bayesian Deep Learning, I create an agent to approximate the individual tasks (a.k.a. cubes) that human players complete as part of Eyewire. 3D images pose a huge challenge in memory/size restrictions, so methods dealing with those had to be engineered. The architecture used in the model is a recurrent lightweight U-Net for 3D images, and showed extremely good results.

There is a very detailed write-up in the [Github repository](https://github.com/BLimmie/eyewire_validator). To learn more about Eyewire, the engineering challenges, or Bayesian Deep Learning, visit the README. 