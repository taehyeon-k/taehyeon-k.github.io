---
title: "MADE Implementation"
date: 2025-10-02
collection: projects
header:
  teaser: files/MADE_implementation.png
---
Built a MADE autoregressive model from scratch in PyTorch and trained it on the binarized MNIST dataset. Investigated how the masking scheme preserves the autoregressive ordering while allowing fully parallel forward passes. Evaluated log-likelihood and sampling/training throughput to quantify the gains over unmasked MLP baselines.