import { Component, OnInit, ViewChild } from "@angular/core";
import {} from "googlemaps";
@Component({
    selector: "app-map",
    templateUrl: "./map.component.html",
    styleUrls: [],
})
export class MapComponent implements OnInit {
    @ViewChild("mapContainer", { static: true }) mapElement: any;
    map: google.maps.Map;
    constructor() {}

    ngOnInit(): void {
        const mapProperties = {
            center: new google.maps.LatLng(35.2271, -80.8431),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
        };
        this.map = new google.maps.Map(
            this.mapElement.nativeElement,
            mapProperties
        );
    }
}
