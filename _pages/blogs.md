---
layout: archive
title: "Blogs"
permalink: /blogs/
author_profile: true
---

{% include base_path %}

{% assign posts = site.blogs | sort: 'date' | reverse %}
{% for post in posts %}
  {% include archive-single.html %}
{% endfor %}
