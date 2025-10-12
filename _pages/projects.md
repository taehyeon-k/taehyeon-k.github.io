---
layout: single
title: "Projects"
permalink: /projects/
author_profile: true
---

{% assign items = site.projects | sort: 'date' | reverse %}
{% for item in items %}
  {% include project-card.html item=item %}
{% endfor %}
