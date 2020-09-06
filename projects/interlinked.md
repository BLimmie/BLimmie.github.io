---
layout: page
title: Interlinked
---

![](/img/intouch.jpg)

# Summary

For my capstone project, I worked with a team of 5 and Intouch Health (now Teladoc) to create a web application that can serve as a medium between mental health patients and mental health providers. We built a real-time system that draws machine learning results from Google's Sentiment and Emotion APIs, and Openface Action Unit recognition library in order to provide doctors with real-time visualizations on the state of a patient during a mental health checkup so that they can learn and adapt to avoid trigger patients. We also stored the data collected during an appointment to provide doctors with more in depth summaries about a patient's past appointments and how they are progressing through their disease.  

See the code at [this repository](https://github.com/BLimmie/Interlinked) and product design at [this link](https://capstone.cs.ucsb.edu/team_docs_20/prd2/intouch.pdf)

# Problems
* Mental illness affects 1 in 5 adults and has a very negative stigma in the current world
* Because of the negative stigma, many of those that need some form of treatment or diagonsis aren't getting what they need
* Doctors are not infallible and require augmentations/assistance in making accurate diagnoses, since mental disorders are complex to analyze; thus, technology could assist them in that area by providing additional information
* Additional ways to gather information about patients’ mental health is required
* Doctors have a limited amount of time to meet patients in person
* Specialized doctors might not be available in all areas of the country

# Solution
* Created a backend that processes information about an appointment in real time that draws from Google's Vision API for facial emotion, Google's NLAPI for text sentiment analysis, and OpenFace API for facial Action Units analysis
* Backend also stored collected appointment data in MongoDB to provide doctors with post-appointment analysis and summaries of a patient through all their past appointments
* Built this backend in Golang to support easy multithreading for reliable real-time use
* Deployed onto AWS to support networked connections

# Technologies Used
* Golang
* MongoDB
* Google Cloud API
* OpenFaceAPI
* React
* Typescript
* Bootstrap
* AWS
