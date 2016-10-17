# AddTags-SummernotePlugin
A Summernote's plugin for adding new Tags. This plugin gives you the possibility to put many tags concatenate.

Proudly develop by [Sébastien Duplessy](https://www.duplessy.eu).

[![Latest Stable Version](https://poser.pugx.org/pepsit36/summernotebundle/v/stable)](https://packagist.org/packages/pepsit36/summernotebundle)
[![Total Downloads](https://poser.pugx.org/pepsit36/summernotebundle/downloads)](https://packagist.org/packages/pepsit36/summernotebundle)
[![Latest Unstable Version](https://poser.pugx.org/pepsit36/summernotebundle/v/unstable)](https://packagist.org/packages/pepsit36/summernotebundle)
[![License](https://poser.pugx.org/pepsit36/summernotebundle/license)](https://packagist.org/packages/pepsit36/summernotebundle)

Requirements
------------
Minimum requirements for this bundle:
* [Summernote](http://summernote.org/)

Installation
------------
* Add the script to your page after than Summernote is loaded.

Minimal Configuration
---------------------
* Add to your toolbar `addtags` on Summernote configuration and add the configuration of `addtags`.

* See below for one example of the configuration of `addtags`.

Exemple
-------
* Example to have the tags for use [Prism](http://prismjs.com/).
```javascript
$(function () {
    $('.summernote').summernote(
        {
            toolbar: [
                ...
                [...,[..."addtags"...]],
                ...
            ],
            addtags: {
                "button": "<i class=\"fa fa-folder-open\" aria-hidden=\"true\"><\/i> Prism",
                "0": {
                    "title": "CSS",
                    "value": [
                        {"tag":"pre"},
                        {"tag":"code","class":"language-css"}
                    ]
                },
                "1": {
                    "title":"Javascript",
                    "value":[
                        {"tag":"pre"},
                        {"tag":"code","class":"language-javascript"}
                    ]
                }
            }
        }
    );
});        
```
