---
layout: page
title: BERT for Question Answering
---

![](/img/squad.png)

# Abstract

SQuAD 2.0 added the additional challenge to their Question Answering benchmark of including questions that are unable to be answered with the knowledge within the given context. This can be formulated as a classification problem. Google released a new model involving bidirectional transformers that performed extremely well on all benchmarks in all aspects of NLP. The main problem with BERT is it can only transform 512 tokens at a time. We propose a sliding window approach for long sequences with an optional added secondary sequence to provide additional information to combat BERT’s restriction for long sequences, and specifically for SQuAD 2.0.

This was a project done for a class CS291A: Natural Language Processing. Check out my forked repository of the original PyTorch BERT repository [here](https://github.com/BLimmie/pytorch-pretrained-BERT).