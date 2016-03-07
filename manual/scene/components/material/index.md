---
title: Material Component
menutitle: Material
layout: manual
weight: 2050
indent: 3
---
{% for page in site.pages %}
	{% if page.id == 'materials' %}
		{% assign materials-url = page.url %}
	{% endif %}
{% endfor %}

The *Material Component* adds a material asset to your entity. The Material Component controls how your Geometry Component is rendered. To learn more about Materials, have a look at the page for the [Material Asset]({{ materials-url }}).

![](material-component.png)