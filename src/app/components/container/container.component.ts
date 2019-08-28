import { Component, OnInit } from "@angular/core";
import { Geolocation } from "src/app/models/geolocation.model";
import { GooglePlacesService } from "src/app/services/google-places.service";
import {
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
    public mapProperties: MapOptions;
    public parkList: Park[];
    private geolocation: Geolocation = {
        latitude: 36.847163,
        longitude: -76.2931849,
    };
    constructor(private googleService: GooglePlacesService) {}

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
        this.googleService.getParksFromMap(
            map,
            (results, status, pagination) => {
                // this.parkList = results;
                this.generateParks(results, status, pagination, map);
            }
        );
    }

    protected createSingleMarker(result: PlaceResult, map: Map) {
        const marker: Marker = new google.maps.Marker({
            map,
            position: result.geometry.location,
        });

        return marker;
    }

    protected generateParks(
        results: PlaceResult[],
        status: PlacesServiceStatus,
        pagination: PlacesSearchPagination,
        map: google.maps.Map
    ) {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
            return;
        }

        const parksList = results.map(result => ({
            marker: this.createSingleMarker(result, map),
            result,
        }));

        this.parkList = parksList;
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
}
