import { Component, Input, OnInit, ViewChild } from "@angular/core";
import {} from "googlemaps";
@Component({
    selector: "app-map",
    templateUrl: "./map.component.html",
    styleUrls: [],
})
export class MapComponent implements OnInit {
    private _mapProperties: google.maps.MapOptions;
    @ViewChild("mapContainer", { static: true }) mapElement: any;
    map: google.maps.Map;
    constructor() {}

    @Input() set mapProperties(mapProperties: google.maps.MapOptions) {
        this._mapProperties = mapProperties;
    }

    get mapProperties(): google.maps.MapOptions {
        return this._mapProperties;
    }

    ngOnInit(): void {
        this.generateMap();
    }

    protected generateMap(): void {
        console.log(this.mapProperties);
        this.map = new google.maps.Map(
            this.mapElement.nativeElement,
            this.mapProperties
        );
    }
}
