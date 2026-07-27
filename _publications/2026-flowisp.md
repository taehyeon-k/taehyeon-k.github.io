---
title: "FlowISP: Latent Space ISP Transfer via Conditional Flow Matching"
authors:
  - "Taehyeon Kim"
  - "Jinwoo Kim"
  - "Seon Joo Kim"
venue: "CVPRW"
year: 2026
venue_full: "CVPR Workshops (CVPRW) — Low-Level Vision Frontiers, 2026"
date: 2026-06-01
permalink: /publications/flowisp/

# Main figure. To swap in the final PNG, drop the file at
# images/publications/flowisp-teaser.png and change this line to that path.
image: /images/publications/flowisp-teaser.svg
image_alt: >-
  Qualitative ISP transfer results. A single source image is rendered in the
  style of five different smartphone ISPs, compared against the real capture
  from each target camera.
image_caption: >-
  A single source capture (top) is transferred to five different smartphone
  ISPs. Middle: the real photograph taken by each target camera. Bottom:
  FlowISP's output, conditioned on that camera's learned style embedding.

tldr: >-
  FlowISP re-renders a photograph in the colour signature of a *different*
  camera's Image Signal Processor, working entirely inside the latent space of a
  frozen Stable Diffusion VAE. We cast the problem as **conditional flow
  matching** — a straight-line probability path from source-ISP latents to
  target-ISP latents — and model the velocity field with a **disentangled DiT**
  that conditions on time and on device identity through separate pathways.

abstract: >-
  Modern camera Image Signal Processors (ISP) exhibit a series of complex,
  non-linear transformations that are highly device-dependent. Therefore, even
  the same scene appears differently across cameras, creating a barrier to
  consistent cross-device visual aesthetics. While deep learning methods have
  shown promise in modeling ISP transfer, existing models suffer from high
  computational cost due to transfer in pixel space, and are rigidly confined to
  a specific pair of device and domain. In this paper, we propose FlowISP, a
  framework for ISP style transfer that operates entirely in the latent space of
  a pretrained latent diffusion model. We furthermore formulate the style
  transfer task using Conditional Flow Matching, and introduce a specialized
  Diffusion Transformer (DiT) architecture that explicitly conditions temporal
  dynamics and device-specific ISP style separately. This design allows precise
  style manipulation while preserving the structure of the original scene.
  Experiments on multi-device ISP datasets demonstrate that FlowISP successfully
  reproduces target ISP aesthetics while strictly preserving scene geometry.

# paper:   # link to the camera-ready PDF once it is online
# arxiv:   # https://arxiv.org/abs/XXXX.XXXXX
# code:    # https://github.com/taehyeon-k/flowisp
math: true

bibtex: |
  @inproceedings{kim2026flowisp,
    title     = {FlowISP: Latent Space ISP Transfer via Conditional Flow Matching},
    author    = {Kim, Taehyeon and Kim, Jinwoo and Kim, Seon Joo},
    booktitle = {Proceedings of the IEEE/CVF Conference on Computer Vision and
                 Pattern Recognition (CVPR) Workshops},
    year      = {2026}
  }
---

## Why ISP transfer?

The Image Signal Processor is what turns a RAW sensor readout into the sRGB
image you actually look at — demosaicing, white balance, tone mapping, colour
correction. Every vendor tunes that chain differently, so **two phones pointed
at the same scene produce visibly different photographs**.

That device dependence causes two problems. Editing models trained on one
camera's output degrade badly on another, because each ISP is effectively its
own domain. And users are locked into whatever aesthetic their hardware ships
with — wanting a different colour rendition today means buying different
hardware.

ISP style transfer is the natural fix: given an sRGB image from a source ISP,
produce the image that a *target* ISP would have made of the same scene. Prior
work does this in pixel space with CNNs, GANs or diffusion models, which is
expensive, sensitive to low-level noise, and demands pixel-perfect aligned
pairs.

## Our approach

**Transfer in latent space.** We encode both source and target images with the
frozen Stable Diffusion VAE and learn the mapping between latents, decoding only
at the end. The VAE is never fine-tuned, so we inherit its perceptual
compression for free and pay a fraction of the pixel-space compute.

**Flow matching instead of denoising.** Standard diffusion maps noise to data.
Here both endpoints are structured image latents, so we use the optimal-transport
conditional flow — the straight line $z_t = (1-t)\,z_\mathrm{src} + t\,z_\mathrm{tgt}$
— whose ground-truth velocity field is simply $z_\mathrm{tgt} - z_\mathrm{src}$.
Training regresses that velocity; inference integrates it from $t{=}0$ to
$t{=}1$. The result is deterministic, with none of the stochasticity of
noise-based sampling. Because the two endpoint distributions are so unlike
noise-to-data, we train the transformer from scratch rather than adapting
pretrained diffusion weights.

**A disentangled DiT.** The velocity field is parameterized by a Diffusion
Transformer with two *separate* conditioning routes:

- **Time** enters through AdaLN — the timestep is a global property that
  describes how far along the interpolation we are. Following AdaLN-Zero, a
  zero-initialized gating scalar on each residual branch makes every block start
  as the identity, which stabilizes early training.
- **ISP identity** enters through cross-attention. Each device gets a learnable
  style embedding, looked up from a table by ISP id and injected as keys and
  values while the latent tokens act as queries.

Keeping the two paths apart lets the model modulate colour rendition without
disturbing the temporal dynamics of the flow — and adding a new camera means
adding one embedding, not retraining a device-pair-specific model.

## Contributions

1. **Latent-space ISP transfer.** We formulate ISP style transfer in the latent
   space of a frozen Stable Diffusion VAE, avoiding the cost of pixel-space
   training and lining up naturally with existing latent generative models.
2. **A flow-matching formulation for style transfer.** We adapt flow matching
   from its usual noise-to-data setting to a deterministic image-to-image task,
   learning the continuous path from source-ISP to target-ISP latents.
3. **A disentangled DiT architecture.** Temporal and stylistic information are
   injected through separate mechanisms, giving a modular conditioning scheme
   that extends to many ISPs.

Trained and evaluated on a multi-ISP dataset in which each scene is captured by
several camera models, FlowISP produces smooth transfer across diverse ISP pairs
while keeping scene structure and detail intact.
