---
title: Asset Library
weight: 3601
indent: 2
layout: manual
---
The *Asset Library* is a place where you can put entities or assets, and later import them into other scenes.

## Importing from the Asset Library

Start by opening the Asset Library dialog by clicking *Import Assets* in the top menu.

![](asset-library.png)

From here you can browse assets by Organization, project and type. It's also possible to import a file to add it directly to the library.

Choose an asset by clicking it once, and then click the *Add* button in the right bottom of the dialog window. The asset will be loaded and added to the Asset Bin when it's ready.

![](assetbin-imported.png)

## Adding an Asset to the Asset Library

{% for page in site.pages %}
	{% if page.id == 'packs' %}
		{% assign packs-url = page.url %}
	{% endif %}
{% endfor %}
You can not add an Asset directly to the Asset Library. You need to put it in a pack first. More information [here]({{ packs-url | prepend: site.baseurl }}).