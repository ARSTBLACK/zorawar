// *
// * Copyright 2003-2006, 2009, 2017, 2020 United States Government, as represented
// * by the Administrator of the National Aeronautics and Space Administration.
// * All rights reserved.
// *
// * The NASAWorldWind/WebWorldWind platform is licensed under the Apache License,
// * Version 2.0 (the "License"); you may not use this file except in compliance
// * with the License. You may obtain a copy of the License
// * at http://www.apache.org/licenses/LICENSE-2.0
//     *
// * Unless required by applicable law or agreed to in writing, software distributed
// * under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
// * CONDITIONS OF ANY KIND, either express or implied. See the License for the
//                                                                          * specific language governing permissions and limitations under the License.
// *
// * NASAWorldWind/WebWorldWind also contains the following 3rd party Open Source
// * software:
// *
// *    ES6-Promise – under MIT License
// *    libtess.js – SGI Free Software License B
// *    Proj4 – under MIT License
// *    JSZip – under MIT License
// *
// * A complete listing of 3rd Party software notices and licenses included in
// * WebWorldWind can be found in the WebWorldWind 3rd-party notices and licenses
// * PDF found in code  directory.
// */
/**
 * Illustrates how to display and pick Placemarks.
 */
requirejs(['./WorldWindShim',
        './LayerManager'],
    function (WorldWind,
              LayerManager) {
        "use strict";

        // Tell WorldWind to log only warnings and errors.
        WorldWind.Logger.setLoggingLevel(WorldWind.Logger.LEVEL_WARNING);

        // Create the WorldWindow.
        var wwd = new WorldWind.WorldWindow("canvasOne");

        // Create and add layers to the WorldWindow.
        var layers = [
            // Imagery layers.
            {layer: new WorldWind.BMNGLayer(), enabled: true},
            {layer: new WorldWind.BMNGLandsatLayer(), enabled: false},
            {layer: new WorldWind.BingAerialWithLabelsLayer(null), enabled: true},
            // Add atmosphere layer on top of all base layers.
            {layer: new WorldWind.AtmosphereLayer(), enabled: true},
            // WorldWindow UI layers.
            {layer: new WorldWind.CompassLayer(), enabled: true},
            {layer: new WorldWind.CoordinatesDisplayLayer(wwd), enabled: true},
            {layer: new WorldWind.ViewControlsLayer(wwd), enabled: true}
        ];

        for (var l = 0; l < layers.length; l++) {
            layers[l].layer.enabled = layers[l].enabled;
            wwd.addLayer(layers[l].layer);
        }

        // Define the images we'll use for the placemarks.
        var images = [
            "plain-black.png",
            "plain-white.png"
        ];

        var pinLibrary = WorldWind.configuration.baseUrl + "images/pushpins/", // location of the image files
            placemark,
            placemarkAttributes = new WorldWind.PlacemarkAttributes(null),
            highlightAttributes,
            placemarkLayer = new WorldWind.RenderableLayer("Placemarks"),
            latitude = 38.9072,
            longitude = -77.0369;

        var pinLibrary1 = WorldWind.configuration.baseUrl + "images/pushpins/", // location of the image files
            placemark1,
            placemarkAttributes1 = new WorldWind.PlacemarkAttributes(null),
            highlightAttributes1,
            placemarkLayer1 = new WorldWind.RenderableLayer("Placemarks"),
            latitude1 = 55.7558,
            longitude1 = 37.6173;


        // Set up the common placemark attributes.
        placemarkAttributes.imageScale = 1;
        placemarkAttributes.imageOffset = new WorldWind.Offset(
            WorldWind.OFFSET_FRACTION, 0.3,
            WorldWind.OFFSET_FRACTION, 0.0);
        placemarkAttributes.imageColor = WorldWind.Color.WHITE;
        placemarkAttributes.labelAttributes.offset = new WorldWind.Offset(
            WorldWind.OFFSET_FRACTION, 0.5,
            WorldWind.OFFSET_FRACTION, 1.0);
        placemarkAttributes.labelAttributes.color = WorldWind.Color.YELLOW;
        placemarkAttributes.drawLeaderLine = true;
        placemarkAttributes.leaderLineAttributes.outlineColor = WorldWind.Color.RED;

        // Set up the common placemark attributes.
        placemarkAttributes1.imageScale = 1;
        placemarkAttributes1.imageOffset = new WorldWind.Offset(
            WorldWind.OFFSET_FRACTION, 0.3,
            WorldWind.OFFSET_FRACTION, 0.0);
        placemarkAttributes1.imageColor = WorldWind.Color.WHITE;
        placemarkAttributes1.labelAttributes.offset = new WorldWind.Offset(
            WorldWind.OFFSET_FRACTION, 0.5,
            WorldWind.OFFSET_FRACTION, 1.0);
        placemarkAttributes1.labelAttributes.color = WorldWind.Color.YELLOW;
        placemarkAttributes1.drawLeaderLine = true;
        placemarkAttributes1.leaderLineAttributes.outlineColor = WorldWind.Color.RED;

        // For each placemark image, create a placemark with a label.
        for (var i = 0, len = images.length; i < len; i++) {
            // Create the placemark and its label.
            placemark = new WorldWind.Placemark(new WorldWind.Position(latitude, longitude), true, null);
            placemark1 = new WorldWind.Placemark(new WorldWind.Position(latitude1, longitude1), true, null);

            placemark.label = "Placemark " + "\n"
                + "Lat " + placemark.position.latitude.toPrecision(4).toString() + "\n"
                + "Lon " + placemark.position.longitude.toPrecision(5).toString();
            placemark.altitudeMode = WorldWind.RELATIVE_TO_GROUND;

            // Create the placemark attributes for this placemark. Note that the attributes differ only by their
            // image URL.
            placemarkAttributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
            placemarkAttributes.imageSource = pinLibrary + images[0];
            placemark.attributes = placemarkAttributes;

            // Create the highlight attributes for this placemark. Note that the normal attributes are specified as
            // the default highlight attributes so that all properties are identical except the image scale. You could
            // instead vary the color, image, or other property to control the highlight representation.
            highlightAttributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
            highlightAttributes.imageScale = 1.2;
            placemark.highlightAttributes = highlightAttributes;

            // Add the placemark to the layer.
            placemarkLayer.addRenderable(placemark);



            placemark1.label = "Placemark " + "\n"
                + "Lat " + placemark1.position.latitude.toPrecision(4).toString() + "\n"
                + "Lon " + placemark1.position.longitude.toPrecision(5).toString();
            placemark1.altitudeMode = WorldWind.RELATIVE_TO_GROUND;

            // Create the placemark attributes for this placemark. Note that the attributes differ only by their
            // image URL.
            placemarkAttributes1 = new WorldWind.PlacemarkAttributes(placemarkAttributes);
            placemarkAttributes1.imageSource = pinLibrary1 + images[1];
            placemark1.attributes = placemarkAttributes1;

            // Create the highlight attributes for this placemark. Note that the normal attributes are specified as
            // the default highlight attributes so that all properties are identical except the image scale. You could
            // instead vary the color, image, or other property to control the highlight representation.
            highlightAttributes1 = new WorldWind.PlacemarkAttributes(placemarkAttributes1);
            highlightAttributes1.imageScale = 1.2;
            placemark1.highlightAttributes = highlightAttributes1;

            // Add the placemark to the layer.
            placemarkLayer1.addRenderable(placemark1);
        }

        // Add the placemarks layer to the WorldWindow's layer list.
        wwd.addLayer(placemarkLayer);
        wwd.addLayer(placemarkLayer1);

        // Get the modal
        var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
        var img = document.getElementById("myImg");
        var modalImg = document.getElementById("img01");
        var captionText = document.getElementById("caption");


// Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }


        // Now set up to handle picking.

        var highlightedItems = [];

        // The common pick-handling function.
        var handlePick = function (o) {
            // The input argument is either an Event or a TapRecognizer. Both have the same properties for determining
            // the mouse or tap location.
            var x = o.clientX,
                y = o.clientY;

            var redrawRequired = highlightedItems.length > 0; // must redraw if we de-highlight previously picked items

            // De-highlight any previously highlighted placemarks.
            for (var h = 0; h < highlightedItems.length; h++) {
                highlightedItems[h].highlighted = false;
            }
            highlightedItems = [];

            // Perform the pick. Must first convert from window coordinates to canvas coordinates, which are
            // relative to the upper left corner of the canvas rather than the upper left corner of the page.
            var pickList = wwd.pick(wwd.canvasCoordinates(x, y));




            if (pickList.objects.length > 0) {
                redrawRequired = true;
            }
            // Highlight the items picked by simply setting their highlight flag to true.
            if (pickList.objects.length > 2) {
                modal.style.display = "block";
                captionText.innerHTML = this.alt;
                for (var p = 0; p < pickList.objects.length; p++) {

                    pickList.objects[p].userObject.highlighted = true;

                    // Keep track of highlighted items in order to de-highlight them later.
                    highlightedItems.push(pickList.objects[p].userObject);

                }
            }

            // Update the window if we changed anything.
            if (redrawRequired) {
                wwd.redraw(); // redraw to make the highlighting changes take effect on the screen
            }
        };



        var highlightedItems1 = [];

        var handlePick1 = function (o) {
            // The input argument is either an Event or a TapRecognizer. Both have the same properties for determining
            // the mouse or tap location.
            var x = o.clientX,
                y = o.clientY;

            var redrawRequired1 = highlightedItems1.length > 0; // must redraw if we de-highlight previously picked items

            // De-highlight any previously highlighted placemarks.
            for (var h = 0; h < highlightedItems1.length; h++) {
                highlightedItems1[h].highlighted = false;
            }
            highlightedItems1 = [];

            // Perform the pick. Must first convert from window coordinates to canvas coordinates, which are
            // relative to the upper left corner of the canvas rather than the upper left corner of the page.
            var pickList1 = wwd.pick(wwd.canvasCoordinates(x, y));




            if (pickList1.objects.length > 0) {
                redrawRequired1 = true;
            }
            // Highlight the items picked by simply setting their highlight flag to true.
            if (pickList1.objects.length > 1) {
                modal.style.display = "block";
                captionText.innerHTML = this.alt;
                for (var p = 0; p < pickList1.objects.length; p++) {

                    pickList1.objects[p].userObject.highlighted = true;

                    // Keep track of highlighted items in order to de-highlight them later.
                    highlightedItems.push(pickList1.objects[p].userObject);

                }
            }

            // Update the window if we changed anything.
            if (redrawRequired) {
                wwd.redraw(); // redraw to make the highlighting changes take effect on the screen
            }
        };

        // Listen for mouse moves and highlight the placemarks that the cursor rolls over.
        wwd.addEventListener("click", handlePick);
        wwd.addEventListener("mouseover", handlePick1);

        // Listen for taps on mobile devices and highlight the placemarks that the user taps.
        var tapRecognizer = new WorldWind.TapRecognizer(wwd, handlePick);
        var tapRecognizer1 = new WorldWind.TapRecognizer(wwd, handlePick1);

        // Create a layer manager for controlling layer visibility.
        var layerManager = new LayerManager(wwd);
    });
