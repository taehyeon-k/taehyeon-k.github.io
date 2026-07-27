---
layout: page
title: "Curriculum Vitae"
permalink: /cv/
lede: "A one-page summary of my education, research, awards and skills."
wide: true
redirect_from:
  - /resume/
---

<ul class="pub__links">
  <li>
    <a class="chip chip--primary" href="{{ site.author.cv | relative_url }}"
       download="TaehyeonKim_CV.pdf" style="padding:.5rem 1rem">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
           stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M12 3v12M7.5 10.5L12 15l4.5-4.5M4.5 20h15"/>
      </svg>
      Download PDF
    </a>
  </li>
  <li>
    <a class="chip" href="{{ site.author.cv | relative_url }}" target="_blank" rel="noopener"
       style="padding:.5rem 1rem">Open in new tab</a>
  </li>
</ul>

<object class="cv-frame" data="{{ site.author.cv | relative_url }}" type="application/pdf">
  <p style="padding:2rem;text-align:center;color:var(--text-muted)">
    Your browser can't display the embedded PDF.
    <a href="{{ site.author.cv | relative_url }}">Download the CV instead.</a>
  </p>
</object>
