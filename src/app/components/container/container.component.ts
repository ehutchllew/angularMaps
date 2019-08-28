import { Component, OnInit } from "@angular/core";
import { Geolocation } from "src/app/models/geolocation.model";

@Component({
    selector: "app-container",
    templateUrl: "./container.component.html",
    styleUrls: ["./container.component.scss"],
})
export class ContainerComponent implements OnInit {
    public mapProperties: google.maps.MapOptions;
    private geolocation: Geolocation = {
        latitude: 36.847163,
        longitude: -76.2931849,
    };
    constructor() {}

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

                setTimeout(
                    () =>
                        (this.mapProperties = {
                            ...this.mapProperties,
                            zoom: 15,
                        }),
                    2000
                );
            })
            .catch(e => console.warn(`Failed to fetch coordinates: ${e}`));
    }

    getGeolocation(): Promise<Geolocation> {
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
