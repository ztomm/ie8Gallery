 /**
 * ie8Gallery 1.0
 * A very simple gallery supported by Internet Explorer 8
 * 
 * http://www.kmgt.de/ie8Gallery/
 * 
 * Copyright 2018, Murat Karaca
 * kmgt - karaca, motz, getaltung, technik
 * http://www.kmgt.de/
 * 
 * Licensed under MIT
 * 
 * Released on: November 5, 2018
 */

function Ie8Gallery() {

    // make this accessible in methods
    var m = this;

    // app vars
    this.v = {
        // default settings
        settings: {
            thumbs: '#thumbs',                  // ID for thumbnail container
            thumb: '.thumb',                    // classname for thumbnails
            imageContainer: '#imageContainer',  // ID for the gallery image Container
            galleryImage: '#galleryImage',      // ID for the gallery image
            underlay: '#underlay',              // ID for underlay
            overlay: '#overlay',                // ID for overlay
            btnPrev: '#prev',                   // ID for previous button
            btnNext: '#next',                   // ID for next button
        },
        // some system vars
        base: {},
        images: [],
        currentImageIndex: 0
    };

    // make v accessible via v
    var v = m.v;

    // initialize the plugin
    this.init = function(options) {

        // overwrite settings
        var obj = {}, prop;
        for(prop in v.settings) if(Object.prototype.hasOwnProperty.call(v.settings, prop)) obj[prop] = v.settings[prop];
        for(prop in options) if (Object.prototype.hasOwnProperty.call(options, prop)) obj[prop] = options[prop];
        v.settings = obj;

        // setup and bind events to the gallery
        m.setup();
        m.events();

    };

    // setup the gallery
    this.setup = function() {

        // build an array with image sources
        var thumbContainer = document.getElementById(v.settings.thumbs.substr(1));
        for (var x = 0; x < thumbContainer.childNodes.length; x++) {
            if(thumbContainer.childNodes[x].nodeName != '#text') {
                v.images.push(thumbContainer.childNodes[x].getAttribute("data-img-src"));
            }
        }

        // append some unvisible markup for overlay and gallery popup
        // if you want your js clean of markup, take this block out and put it as pur HTML anywhere you need it
        var markup = '';
        markup += ' <div id="' + v.settings.underlay.substr(1) + '"></div>';
        markup += ' <div id="' + v.settings.overlay.substr(1) + '">';
        markup += '     <div id="' + v.settings.imageContainer.substr(1) + '">';
        markup += '         <img id="' + v.settings.galleryImage.substr(1) + '" />';
        markup += '     </div>';
        if (v.images.length > 1) {
          markup += '     <div id="' + v.settings.btnPrev.substr(1) + '"></div>';
          markup += '     <div id="' + v.settings.btnNext.substr(1) + '"></div>';
        }
        markup += " </div>";
        document.body.innerHTML += markup;

    };

    // bind click events (open, prev, next)
    this.events = function() {

        var thumbContainer = document.getElementById(v.settings.thumbs.substr(1));
        var galleryImage = document.getElementById(v.settings.galleryImage.substr(1));
        var prevBtn = document.getElementById(v.settings.btnPrev.substr(1));
        var nextBtn = document.getElementById(v.settings.btnNext.substr(1));

        if (!document.body.addEventListener) {
            // ie8 case
            // click on a thumbnail
            thumbContainer.attachEvent("onclick", function (e) { return m.eventOpenImage(e) });
            // click on close image
            galleryImage.attachEvent("onclick", function (e) { return m.eventCloseImage(e) });
            // click on prev button
            prevBtn.attachEvent("onclick", function (e) { return m.eventPreviousImage(e); });
            // click on next button
            nextBtn.attachEvent("onclick", function (e) { return m.eventnextImage(e); });
        } else {
            // other browsers
            // click on a thumbnail
            thumbContainer.addEventListener("click", function(e) { return m.eventOpenImage(e) }, false);
            // click on close image
            galleryImage.addEventListener("click", function (e) { return m.eventCloseImage(e); }, false);
            // click on prev button
            prevBtn.addEventListener("click", function (e) { return m.eventPreviousImage(e); }, false);
            // click on next button
            nextBtn.addEventListener("click", function (e) { return m.eventnextImage(e); }, false);
        }

    };

    // open gallery image
    this.eventOpenImage = function(e) {
        
        var target = e.target || e.srcElement;
        var currentImageSource = target.getAttribute("data-img-src");
        for(var x = 0; x < v.images.length; x++) {
            if (currentImageSource == v.images[x]) v.currentImageIndex = x;
        }
        document.getElementById(v.settings.underlay.substr(1)).className = 'visible';
        document.getElementById(v.settings.overlay.substr(1)).className = "visible";
        document.getElementById(v.settings.galleryImage.substr(1)).setAttribute('src', v.images[v.currentImageIndex]);
        document.documentElement.scrollTop = 0;
        // ie8 position:fixed fix
        document.getElementById(v.settings.overlay.substr(1)).style.zIndex = 1050;

    };

    // close gallery image
    this.eventCloseImage = function(e) {

        document.getElementById(v.settings.underlay.substr(1)).className = "";
        document.getElementById(v.settings.overlay.substr(1)).className = "";

    };

    // previous gallery image
    this.eventPreviousImage = function(e) {

        v.currentImageIndex = --v.currentImageIndex < 0 ? v.images.length - 1 : v.currentImageIndex;
        if (v.currentImageIndex < 0) v.currentImageIndex = v.images.length - 1;
        document.getElementById(v.settings.galleryImage.substr(1)).setAttribute('src', v.images[v.currentImageIndex]);
        
    };

    // next gallery image
    this.eventnextImage = function(e) {

        v.currentImageIndex = ++v.currentImageIndex > v.images.length - 1 ? 0 : v.currentImageIndex;
        document.getElementById(v.settings.galleryImage.substr(1)).setAttribute('src', v.images[v.currentImageIndex]);

    };

}