---
layout: single
title: "Projects"
permalink: /projects/
author_profile: true
---

{% assign items = site.projects | sort: 'date' | reverse %}

{% for item in items %}
  <section class="project-card">
    {% if item.header and item.header.teaser %}
      <div class="project-card__image">
        <img src="{{ item.header.teaser | relative_url }}" alt="{{ item.title }}">
      </div>
    {% endif %}

    <div class="project-card__body">
      <div class="project-card__header">
        <h2 class="project-card__title">{{ item.title }}</h2>

        {% if item.date or item.year %}
          <time class="project-card__date"
                {% if item.date %}datetime="{{ item.date | date_to_xmlschema }}"{% endif %}>
            {% if item.date %}{{ item.date | date: "%b. %Y" }}{% else %}{{ item.year }}{% endif %}
          </time>
        {% endif %}
      </div>

      <hr class="project-card__rule">
    
      {{ item.content | markdownify }}

      {% if item.paper or item.code or item.demo %}
        <p class="project-card__links">
          {% if item.paper %}<a href="{{ item.paper }}">paper</a>{% endif %}
          {% if item.code %}{% if item.paper %} · {% endif %}<a href="{{ item.code }}">code</a>{% endif %}
          {% if item.demo %}{% if item.paper or item.code %} · {% endif %}<a href="{{ item.demo }}">demo</a>{% endif %}
        </p>
      {% endif %}
    </div>
  </section>

  <hr>
{% endfor %}