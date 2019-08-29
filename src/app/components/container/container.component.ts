import { Component, OnInit } from "@angular/core";
import { Geolocation } from "src/app/models/geolocation.model";
import { GooglePlacesService } from "src/app/services/google-places.service";
import {
    InfoWindow,
    Map,
    MapOptions,
    Marker,
    PlaceResult,
    PlacesServiceStatus,
    PlacesSearchPagination,
} from "src/app/models/googlePlaces.model";
import { Park } from "src/app/models/parks.model";

@Component({
    selector: "app-container",
    templateUrl: "./container.component.html",
    styleUrls: ["./container.component.scss"],
})
export class ContainerComponent implements OnInit {
    public infoWindow: InfoWindow;
    public map: Map;
    public mapProperties: MapOptions;
    public parkList: Park[] = [];
    private geolocation: Geolocation = {
        latitude: 36.847163,
        longitude: -76.2931849,
    };
    constructor(private googleService: GooglePlacesService) {
        this.infoWindow = new google.maps.InfoWindow();
    }

    ngOnInit() {
        this.getGeolocation()
            .then(resp => {
                this.geolocation = resp;
                this.mapProperties = {
                    center: new google.maps.LatLng(
                        this.geolocation.latitude,
                        this.geolocation.longitude
                    ),
                    zoom: 14,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                };
            })
            .catch(e => console.warn(`Failed to fetch coordinates: ${e}`));
    }

    public onChildMapChange(map: Map) {
        map.addListener("idle", () => this.getParksFromMap(map));
    }

    protected createSingleMarker(result: PlaceResult, map: Map) {
        const marker: Marker = new google.maps.Marker({
            map,
            position: result.geometry.location,
        });
        google.maps.event.addDomListener(marker, "click", clickCallback);
        google.maps.event.addListener(marker, "mouseover", mouseoverCallback);
        return marker;

        function clickCallback() {
            const markerPosition = marker.getPosition();
            map.panTo(markerPosition);
            mouseoverCallback.call(this);
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(() => marker.setAnimation(null), 2000);
        }

        function mouseoverCallback() {
            this.infoWindow.setContent(result.name);
            this.infoWindow.open(map, this);
        }
    }

    protected generateParks(
        results: PlaceResult[],
        status: PlacesServiceStatus,
        pagination: PlacesSearchPagination,
        map: google.maps.Map
    ) {
        const currentParkMarkers = this.parkList.map(park => park.marker);
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
            return;
        }
        const newParksList = results.map(result => ({
            marker: this.createSingleMarker(result, map),
            result,
        }));

        this.mergeParkMarkers(
            currentParkMarkers,
            newParksList.map(park => park.marker)
        );

        this.parkList = newParksList;
    }

    protected getGeolocation(): Promise<Geolocation> {
        return new Promise(resolve => {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    position => resolve(position.coords),
                    _ => resolve(this.geolocation),
                    { timeout: 1000 }
                );
            } else {
                resolve(this.geolocation);
            }
        });
    }

    protected getParksFromMap(map) {
        this.googleService.getParksFromMap(
            map,
            (results, status, pagination) => {
                this.generateParks(results, status, pagination, map);
            }
        );
    }

    protected mergeParkMarkers(currentMarkers, newMarkers) {
        setTimeout(() => {
            for (const marker of currentMarkers) {
                marker.setMap(null);
            }
            currentMarkers = [...newMarkers];
        }, 0);
    }
}
