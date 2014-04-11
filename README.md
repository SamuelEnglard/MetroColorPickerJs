MetroColorPickerJs
==================

A Metro/Modern flyout to allow a user to select/change a color.

##Usage
&lt;element data-win-control=&quot;Shmuelie.ColorPicker&quot; data-color-&quot;
[StartingColor]&quot; /&gt;

The color data attribute is read by the Color Picker every time it is opened to 
show as the selected color. A &quot;colorChanged&quot; is dispatched once on 
opening and then every time the user selects on off the predefined colors or 
moves one of the RGB sliders. The detail property of the event object passed 
to the handler is the color the user selected.

The Color Picker works with colors in the CSS RGB format: &quot;rgb([Red], 
[Green], [Blue])&quot;. And yes the sapces are significant. This is both true 
for the value color given in the colorChanged event and the color to set in
the color data attribute.

Based on code from [http://jsfiddle.net/6GHzP/3/](http://jsfiddle.net/6GHzP/3/)