import { Injectable } from "@angular/core";
import {
    Map,
    PlaceResult,
    PlacesSearchPagination,
    PlacesServiceStatus,
    Marker,
    InfoWindow,
} from "../models/googlePlaces.model";
import { Park } from "../models/parks.model";

@Injectable({
    providedIn: "root",
})
export class MapService {
    public infoWindow: InfoWindow;
    private _map: Map;
    constructor() {
        this.infoWindow = new google.maps.InfoWindow({ disableAutoPan: true });
    }

    public set map(map: Map) {
        this._map = map;
    }

    public get map() {
        return this._map;
    }

    public generateParks(
        results: PlaceResult[],
        status: PlacesServiceStatus,
        pagination: PlacesSearchPagination,
        parkList: Park[] = []
    ) {
        const currentParkMarkers = parkList.map(park => park.marker);
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
            return;
        }
        const newParksList = results.map(result => ({
            marker: this.createSingleMarker(result),
            result,
        }));

        this.mergeParkMarkers(
            currentParkMarkers,
            newParksList.map(park => park.marker)
        );

        return newParksList;
    }

    protected createSingleMarker(result: PlaceResult) {
        const infoWindow = this.infoWindow;
        const map = this.map;
        const marker: Marker = new google.maps.Marker({
            map: this.map,
            position: result.geometry.location,
        });
        google.maps.event.addDomListener(marker, "click", clickCallback);
        google.maps.event.addListener(marker, "mouseover", mouseoverCallback);
        return marker;

        function clickCallback() {
            mouseoverCallback.call(this);
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(() => marker.setAnimation(null), 2000);
        }

        function mouseoverCallback() {
            infoWindow.setContent(result.name);
            infoWindow.open(map, this);
        }
    }

    protected mergeParkMarkers(currentMarkers, newMarkers) {
        for (const marker of currentMarkers) {
            marker.setMap(null);
        }
        currentMarkers = [...newMarkers];
    }
}
