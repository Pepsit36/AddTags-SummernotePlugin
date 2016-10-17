/**
 * https://github.com/Pepsit36/AddTags-SummernotePlugin
 */
(function (factory) {
    /* global define */
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        factory(window.jQuery);
    }
}(function ($) {

    // Extends plugins for adding AddTags.
    //  - plugin is external module for customizing.
    $.extend($.summernote.plugins, {
        /**
         * @param {Object} context - context object has status of editor.
         */
        'addtags': function (context) {
            var self = this;

            if (typeof context.options.addtags === 'undefined') {
                console.log("Please define your summernote.options.addtags array");
            }

            // ui has renders to build ui elements.
            //  - you can create a button with `ui.button`
            var ui = $.summernote.ui;

            // add addTags button
            context.memo('button.addtags', function () {
                return ui.buttonGroup([
                    ui.button({
                        className: 'dropdown-toggle',
                        contents: context.options.addtags.button + ' ' + ui.icon(context.options.icons.caret, 'span'),
                        tooltip: 'toggle Tags', //lang.style.style,
                        data: {
                            toggle: 'dropdown'
                        }
                    }),
                    ui.dropdown({
                        className: 'dropdown-style',
                        items: addToString(),
                        template: function (item) {
                            return createTag(item.value, 0, item.title);
                        },
                        click: function (event, namespace, value) {
                            event.preventDefault();

                            tags = value || $(event.target).closest('[data-value]').data('value');

                            var text = context.invoke('editor.getSelectedText');

                            // build node
                            var node = $(tags.replace('|', text))[0];

                            if (node) {
                                // insert the node
                                context.invoke('editor.insertNode', node);
                            }
                        }
                    })
                ]).render();
                return $optionList;
            });

            /**
             * Add toString Options to the arrays of values; this for be use in the data-value
             *
             * @returns {$.summernote.plugins.addtags|$.summernote.plugins.'addtags'}
             */
            function addToString() {
                for (var i = 0; i < context.options.addtags.length; i++) {
                    context.options.addtags[i].value.toString = function () {
                        return escapeHtml(createTag(this, 0, '|'));
                    }
                }

                return context.options.addtags;
            }

            /**
             * Recursive function for create one string with the array of tags and the text
             *
             * @param tags array of tags
             * @param i current position
             * @param text text to put
             * @returns {string}
             */
            function createTag(tags, i, text) {
                var cssClass = (tags[i].class) ? ' class="' + tags[i].class + '" ' : '';
                var string = '<' + tags[i].tag + cssClass + '>';

                if (i < tags.length - 1) {
                    string += createTag(tags, i + 1, text);
                } else {
                    string += text;
                }

                return string + '</' + tags[i].tag + '>';
            }

            // This events will be attached when editor is initialized.
            this.events = {
                // This will be called after modules are initialized.
                'summernote.init': function (we, e) {
                    //console.log('summernote initialized', we, e);
                },
                // This will be called when user releases a key on editable.
                'summernote.keyup': function (we, e) {
                    //  console.log('summernote keyup', we, e);
                }
            };

            // This method will be called when editor is initialized by $('..').summernote();
            // You can create elements for plugin
            this.initialize = function () {

            };

            // This methods will be called when editor is destroyed by $('..').summernote('destroy');
            // You should remove elements on `initialize`.
            this.destroy = function () {
                /*  this.$panel.remove();
                 this.$panel = null; */
            };
        }
    });
}));

/**
 * http://stackoverflow.com/a/4835406
 *
 * @param text
 * @returns {string|Node|XML|void}
 */
function escapeHtml(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };

    return text.replace(/[&<>"']/g, function (m) {
        return map[m];
    });
}