/*global window, document, jQuery */

/*
 * This plugin inlines css properties on selected objects
 *
 * SYNOPSIS:
 *    $('input#name').inlineCSS();
 *
 * Copyright (c) Matthijs van Henten (http://ischen.nl), 2011-2012.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.    See the
 * GNU General Public License for more details.
 */
(function($) {
    function getInlineTextCSS( el ){
        var spec = (
            'font-size font-family font-weight color '
            + 'letter-spacing word-spacing text-align'
        ).split(/\s/);

        return getInlineCSSProperties( el, spec );
    }

    function getInlineBoxCSS( el ){
        var corners     = '%s-top %s-right %s-bottom %s-left';
        var properties  = ['padding','margin'];
        var collect = [];

        for( var i = 0, len = properties.length; i < len; i++ ){
            var property = properties[i];
            var spec    = corners.replace(/%s/g, property ).split(/\s/);

            collect.push(getInlineCSSProperties( el, spec ));
        }

        var spec = ['width','height','top','right', 'bottom',
                    'left','float','display','position'];

        collect.push(getInlineCSSProperties( el, spec ));

        return filterNonEmpty(collect).join(';');
    }

    function getInlineBordersCSS( el ){
        var dirs    = 'top right bottom left'.split(/\s/);
        var collect = [];
        for( var i = 0, len = dirs.length; i < len; i++ ){
            collect.push(getInlineBorderCSS(el, dirs[i]));
        }

        return filterNonEmpty(collect).join(';');
    }

    function getInlineBorderCSS( el, dir ){
        var borders = 'border-%s-width border-%s-style border-%s-color';
        var spec     = borders.replace(/%s/g, dir ).split(/\s/);
        var collect  = [];

        for( var j = 0, len = spec.length; j < len; j++ ){
            var value = $(el).css(spec[j]);
            if( value == '0px' ){
                return '';// no border, no cry
            }
            collect.push(value);
        }

        return 'border-' + dir + ':' + collect.join(' ');
    }

    function getInlineCSSProperties( el, spec ){
        var collect = [];

        for( var i = 0, len = spec.length; i < len; i++ ){
            var prop_name = spec[i];
            var value = $(el).css(prop_name);

            if( value == '0px' ){
                return '';
            }

            collect.push( prop_name + ':' + value );
        }

        return filterNonEmpty(collect).join(';');
    }

    function filterNonEmpty(arr){
        return arr.filter(function(n){
            if(n == '' || n == undefined ){
                return false;
            }
            return true;
        });
    }

    function getInlineCSS( el ){
        var css = filterNonEmpty([
            getInlineTextCSS(el),
            getInlineBordersCSS(el),
            getInlineBoxCSS(el)
        ]).join(';');

        css = (css !== '') ? css + ';' : '';

        return css;
    }

	$.fn.inlineCSS = function() {
		this.each(function() {
            $(this).attr('style', getInlineCSS(this) );
		});
		return this;
	};
})(jQuery);
