# taehyeon-k.github.io

Personal research homepage of **Taehyeon Kim** — undergraduate researcher in
Generative AI and Computational Photography at Yonsei University.

Live at <https://taehyeon-k.github.io>. Built with Jekyll and served by GitHub
Pages straight from the default branch — pushing is deploying.

## Where things live

| What | Where |
| --- | --- |
| Homepage intro paragraph | `_pages/about.md` |
| Homepage sections (interests, news, education, awards, skills) | `_data/about.yml` |
| Publications | `_publications/*.md` |
| Blog posts | `blogs/*.md` |
| Header links | `_data/navigation.yml` |
| Name, email, avatar, social links | `author:` block in `_config.yml` |
| Styles (design tokens at the top) | `assets/css/site.css` |
| Theme toggle, mobile nav, scroll reveal | `assets/js/site.js` |
| CV PDF | `files/kimtaehyeon_CV.pdf` |

Most routine updates — a new award, a news line, a changed GPA — are edits to
`_data/about.yml` and need no HTML.

## Adding a publication

Create `_publications/<year>-<slug>.md`:

```yaml
---
title: "Paper title"
authors: ["Taehyeon Kim", "Coauthor Name"]
venue: "CVPRW"                 # short pill label
year: 2026
venue_full: "CVPR Workshops — Workshop Name, 2026"
date: 2026-06-01               # controls ordering
permalink: /publications/slug/
image: /images/publications/slug-teaser.png
image_caption: "One line describing the figure."
tldr: >-
  Two or three sentences shown on the card.
abstract: >-
  The paper abstract.
paper:   https://…           # optional
arxiv:   https://…           # optional
code:    https://…           # optional
math: true                     # loads MathJax for $…$ in the body
bibtex: |
  @inproceedings{…}
---

Free-form Markdown here becomes the body of the publication page.
```

Your own name is matched against `author.name` in `_config.yml` and bolded
automatically in the author list.

## Adding a blog post

Create `blogs/<slug>.md` with `title`, `date`, and optionally `authors`,
`venue`, `year`, `tags`, `summary` (shown on the card) and `image` (card
thumbnail plus page hero). Set `math: true` or `mermaid: true` in the front
matter to load those libraries on that page only.

## Running it locally

```bash
bundle install
bundle exec jekyll serve --livereload
# → http://localhost:4000
```

There is also a Docker setup: `docker compose up` (see `docker-compose.yaml`).

## Licence

Site content © Taehyeon Kim. The template code this site grew out of
([Academic Pages](https://github.com/academicpages/academicpages.github.io))
is MIT licensed — see `LICENSE`.
