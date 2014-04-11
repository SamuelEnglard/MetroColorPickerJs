(function ()
{
    "use strict";

    function getColorFromNumber(number)
    {

        var r = 255;
        var g = 0;
        var b = 0;

        b = number;
        if (b > 255)
        {
            r = r - (b - 255);
            b = 255;
        }
        if (r < 0)
        {
            g = g - r;
            r = 0;
        }
        if (g > 255)
        {
            b = b - (g - 255);
            g = 255;
        }
        if (b < 0)
        {
            r = r - b;
            b = 0;
        }
        if (r > 255)
        {
            g = g - (r - 255);
            r = 255;
        }

        r = Math.floor(r);
        g = Math.floor(g);
        b = Math.floor(b);

        return { r: r, g: g, b: b };
    }

    function splitColors(rgb)
    {
        var color = rgb;
        color = color.replace("rgb(", "");
        color = color.replace(")", "");
        return color.split(', ');
    }

    function ColorPicker(button)
    {
        // <param name="button" domElement="true" />

        var width = 7;
        var height = 6;
        var px = 40;
        var color = "rgb(255, 255, 255)";

        function setColor(value)
        {
            color = value;
            button.dataset.color = color;
            var e = document.createEvent("CustomEvent");
            e.initCustomEvent("colorChanged", true, false, color);
            button.dispatchEvent(e);
        }

        var colorPickerContainer = document.createElement("div");
        document.body.appendChild(colorPickerContainer);
        var flyout = new WinJS.UI.Flyout(colorPickerContainer, { anchor: button, hidden: true });

        button.addEventListener("click", function ()
        {
            flyout.show(button);
            greenRange.style.width = (width * px) - greenLabel.getBoundingClientRect().width - 5 + "px";
            redRange.style.width = (width * px) - redLabel.getBoundingClientRect().width - 5 + "px";
            blueRange.style.width = (width * px) - blueLabel.getBoundingClientRect().width - 5 + "px";
            setFlyout(button.dataset.color);
        });

        var mainColorContrainer = document.createElement("div");
        mainColorContrainer.style.display = "-ms-grid";
        mainColorContrainer.style.msGridColumns = "(1fr)[" + width + "]";
        mainColorContrainer.style.msGridRows = "1fr";
        mainColorContrainer.style.height = (px + 6) + "px";
        mainColorContrainer.style.width = width * (px + 6) + "px";

        colorPickerContainer.appendChild(mainColorContrainer);

        var subColorContainer = document.createElement("div");
        subColorContainer.style.display = "-ms-grid";
        subColorContainer.style.msGridColumns = "(1fr)[" + width + "]";
        subColorContainer.style.msGridRows = "(1fr)[" + height + "]";
        subColorContainer.style.width = width * (px + 6) + "px";
        subColorContainer.style.height = height * (px + 6) + "px";

        colorPickerContainer.appendChild(subColorContainer);

        var redLabel = document.createElement("label");
        redLabel.htmlFor = "redRange";
        redLabel.innerText = "Red: ";
        redLabel.className = "cplabel";
        colorPickerContainer.appendChild(redLabel);

        var redRange = document.createElement("input");
        redRange.id = "redRange";
        redRange.type = "range";
        redRange.min = 0;
        redRange.max = 255;
        redRange.step = 1;
        colorPickerContainer.appendChild(redRange);
        redRange.addEventListener("change", function ()
        {
            var tempRGB = splitColors(color);
            setColor("rgb(" + redRange.value + ", " + tempRGB[1] + ", " + tempRGB[2] + ")");
        });

        colorPickerContainer.appendChild(document.createElement("br"));

        var greenLabel = document.createElement("label");
        greenLabel.htmlFor = "greenRange";
        greenLabel.innerText = "Green: ";
        greenLabel.className = "cplabel";
        colorPickerContainer.appendChild(greenLabel);

        var greenRange = document.createElement("input");
        greenRange.id = "greenRange";
        greenRange.type = "range";
        greenRange.min = 0;
        greenRange.max = 255;
        greenRange.step = 1;
        colorPickerContainer.appendChild(greenRange);
        greenRange.addEventListener("change", function ()
        {
            var tempRGB = splitColors(color);
            setColor("rgb(" + tempRGB[0] + ", " + greenRange.value + ", " + tempRGB[2] + ")");
        });

        colorPickerContainer.appendChild(document.createElement("br"));

        var blueLabel = document.createElement("label");
        blueLabel.htmlFor = "blueRange";
        blueLabel.innerText = "Blue: ";
        blueLabel.className = "cplabel";
        colorPickerContainer.appendChild(blueLabel);

        var blueRange = document.createElement("input");
        blueRange.id = "blueRange";
        blueRange.type = "range";
        blueRange.min = 0;
        blueRange.max = 255;
        blueRange.step = 1;
        colorPickerContainer.appendChild(blueRange);
        blueRange.addEventListener("change", function ()
        {
            var tempRGB = splitColors(color);
            setColor("rgb(" + tempRGB[0] + ", " + tempRGB[1] + ", " + blueRange.value + ")");
        });

        function setFlyout(rgb)
        {
            var tmpRGB = splitColors(rgb);
            redRange.value = tmpRGB[0];
            greenRange.value = tmpRGB[1];
            blueRange.value = tmpRGB[2];
            setColor(rgb);
        }

        var elementMap = [""];

        function mainColorClick(eventObject)
        {

            setColor(eventObject.srcElement.style.backgroundColor);
            var tmpRGB = splitColors(color);

            var r = tmpRGB[0];
            var g = tmpRGB[1];
            var b = tmpRGB[2];

            redRange.value = r;
            greenRange.value = g;
            blueRange.value = b;

            var new_r;
            var new_g;
            var new_b;
            for (var j = 1; j < (width + 1) ; j++)
            {
                for (var k = 1; k < (height + 1) ; k++)
                {
                    if (r == 255)
                    {
                        new_r = Math.round(Math.abs(r - ((255 / (width)) * (j - 1))));
                    }
                    else
                    {
                        var help_r_1 = Math.round(Math.abs(255 - ((255 / (width)) * (j - 1))));
                        new_r = Math.round(Math.abs(r - ((r / (width)) * (j - 1))));
                        var help_r_2 = help_r_1 - new_r;
                        new_r += ((help_r_2 / height) * (k - 1));
                        new_r = Math.round(new_r);
                    }

                    if (g == 255)
                    {
                        new_g = Math.round(Math.abs(g - ((255 / (width)) * (j - 1))));
                    }
                    else
                    {
                        var help_g_1 = Math.round(Math.abs(255 - ((255 / (width)) * (j - 1))));
                        new_g = Math.round(Math.abs(g - ((g / (width)) * (j - 1))));
                        var help_g_2 = help_g_1 - new_g;
                        new_g += ((help_g_2 / height) * (k - 1));
                        new_g = Math.round(new_g);
                    }

                    if (b == 255)
                    {
                        new_b = Math.round(Math.abs(b - ((255 / (width)) * (j - 1))));
                    }
                    else
                    {
                        var help_b_1 = Math.round(Math.abs(255 - ((255 / (width)) * (j - 1))));
                        new_b = Math.round(Math.abs(b - ((b / (width)) * (j - 1))));
                        var help_b_2 = help_b_1 - new_b;
                        new_b += ((help_b_2 / height) * (k - 1));
                        new_b = Math.round(new_b);
                    }

                    elementMap[j][k].style.backgroundColor = "rgb(" + new_r + ", " + new_g + ", " + new_b + ")";
                }
            }
        }

        function subColorClick(ev)
        {
            setFlyout(ev.target.style.backgroundColor);
        }

        for (var i = 0; i < width; i++)
        {
            var mainColorElement = document.createElement("div");
            mainColorElement.className = "maincolor color";

            mainColorElement.style.msGridColumn = (i + 1);
            mainColorElement.style.msGridRow = 1;

            //create color
            var rgb;
            if (i < width - 1)
            {
                rgb = getColorFromNumber((1530 / (width - 1)) * (i + 1), mainColorElement);
            }
            else
            {
                rgb = {
                    r: 0,
                    g: 0,
                    b: 0
                };
            }

            mainColorElement.style.backgroundColor = "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")";

            mainColorElement.addEventListener('click', mainColorClick);

            mainColorContrainer.appendChild(mainColorElement);

            var subElements = [""];
            for (var j = 0; j < height; j++)
            {
                var subColorElement = document.createElement("div");
                subColorElement.className = "color";

                subColorElement.style.msGridColumn = (i + 1);
                subColorElement.style.msGridRow = (j + 1);

                subColorElement.addEventListener("click", subColorClick);

                subColorContainer.appendChild(subColorElement);
                subElements.push(subColorElement);
            }
            elementMap.push(subElements);

            if (i === 0)
            {
                var main = mainColorElement;
            }
            else if (i === width - 1)
            {
                main.click();
            }
        }
    }

    var winJsCtrl = WinJS.Class.define(ColorPicker);

    WinJS.Namespace.define("Shmuelie", {
        ColorPicker: winJsCtrl
    });
})();