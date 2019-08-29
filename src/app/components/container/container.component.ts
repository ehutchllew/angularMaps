import { Component, OnInit } from "@angular/core";
import { Geolocation } from "src/app/models/geolocation.model";
import { GooglePlacesService } from "src/app/services/google-places.service";
import { Map, MapOptions } from "src/app/models/googlePlaces.model";
import { Park } from "src/app/models/parks.model";
import { MapService } from "src/app/services/map.service";

@Component({
    selector: "app-container",
    templateUrl: "./container.component.html",
    styleUrls: ["./container.component.scss"],
})
export class ContainerComponent implements OnInit {
    public map: Map;
    public mapProperties: MapOptions;
    public parkList: Park[] = [];
    private geolocation: Geolocation = {
        latitude: 36.847163,
        longitude: -76.2931849,
    };
    constructor(
        private googleService: GooglePlacesService,
        private mapService: MapService
    ) {}

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
        this.map = map;
        this.mapService.map = map;
        map.addListener("idle", () => this.getParksFromMap(map));
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
                this.parkList = this.mapService.generateParks(
                    results,
                    status,
                    pagination,
                    this.parkList
                );
            }
        );
    }
}
