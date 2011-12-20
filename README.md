#jQuery Plugin to inline css

##About
Simple plugin to inline css. This plugin will try to copy all relevant styles
as inline properties and inserts them into the style attribute.

##Synopsis

Suppose you have something like this:

    <div id="sidebar-right" class="column">...</div>

run

    $('#sidebar-right').inlineCSS();

Creates something like this:

    <div id="sidebar-right" class="column" style="font-size:13px;font-family:arial, helvetica, verdana, sans-serif;font-weight:normal;color:rgb(221, 221, 221);font-size:13px;font-family:arial, helvetica, verdana, sans-serif;font-weight:normal;color:rgb(221, 221, 221);">...</div>

#License

    Copyright (c) Matthijs van Henten (http://ischen.nl), 2011-2012.
    
    GNU GENERAL PUBLIC LICENSE
       Version 3, 29 June 2007

##Bugs

Submit a bug report here:

<https://github.com/mvhenten/jQuery-inline-css/issues>
