'use strict';

function initMap(x, y) {
    let map;
    map = new OpenLayers.Map('map');
    map.addLayer(new OpenLayers.Layer.OSM());

    var lonLat = new OpenLayers.LonLat( x, y )
        .transform(
            new OpenLayers.Projection('EPSG:4326'), // transform from WGS 1984
            map.getProjectionObject() // to Spherical Mercator Projection
        );

    var zoom=16;

    var markers = new OpenLayers.Layer.Markers( 'Markers' );
    map.addLayer(markers);

    markers.addMarker(new OpenLayers.Marker(lonLat));

    map.setCenter (lonLat, zoom);
}

$(document).ready(function(){
    // Hide/show scroll button to page beginning
    {
        let callbackScroll = function () {
            if ($(this).scrollTop() < 20) {
                $('.btn-scroll-top').hide();
            } else {
                $('.btn-scroll-top').show();
            }
        };
        $(window)[0].addEventListener("scroll", callbackScroll, {passive: true});
    }

    //Menu open/close
    $(".menu-btn-mobile").click(function (e) {
        let $topnav = $(".topnav");
        if ($topnav.hasClass('open'))
            return;
        $topnav.toggleClass('open', true);

        let $listener = $(window).click(function () {
            $topnav.toggleClass('open', false);
            $listener.unbind();
        });
        e.stopPropagation();
    });

    initMap(24.105245, 56.949754);
});
