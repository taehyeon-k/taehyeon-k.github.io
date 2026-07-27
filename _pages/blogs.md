---
layout: page
title: "Blog"
permalink: /blogs/
lede: "Paper reviews and notes on things I'm reading."
wide: true
---

{% assign posts = site.blogs | sort: 'date' | reverse %}

{% if posts.size > 0 %}
  <ul class="posts">
    {% for post in posts %}
      {% assign thumb = post.image | default: post.thumbnail %}
      <li class="post-card">
        {% if thumb %}
          <a class="post-card__thumb" href="{{ post.url | relative_url }}" tabindex="-1" aria-hidden="true">
            <img src="{{ thumb | relative_url }}" alt="" loading="lazy">
          </a>
        {% endif %}

        <div class="post-card__body">
          <p class="post-card__meta">
            {{ post.date | date: "%b %-d, %Y" }}
            {%- if post.venue or post.year %} · {{ post.venue }}{% if post.venue and post.year %} {% endif %}{{ post.year }}{% endif %}
          </p>

          <h2 class="post-card__title">
            <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
          </h2>

          {% if post.summary %}
            <p class="post-card__excerpt">{{ post.summary }}</p>
          {% endif %}

          {% if post.tags %}
            <ul class="tags" style="margin-top:auto;padding-top:.4rem">
              {% for t in post.tags %}<li class="tag">{{ t }}</li>{% endfor %}
            </ul>
          {% endif %}
        </div>
      </li>
    {% endfor %}
  </ul>
{% else %}
  <p class="empty">No posts yet.</p>
{% endif %}
