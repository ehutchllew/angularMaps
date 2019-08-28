import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class GooglePlacesService {
    public getParksFromMap(map: google.maps.Map) {
        this.searchParks(map);
    }
    protected searchParks(map: google.maps.Map) {
        const placesService = new google.maps.places.PlacesService(map);
        const placesServiceRequest = this.generatePlacesRequest(map);

        placesService.nearbySearch(placesServiceRequest, (...args) =>
            console.log(args)
        );
    }

    protected generatePlacesRequest(map: google.maps.Map) {
        return {
            location: map.getCenter(),
            type: "park",
            radius: 1500,
            bounds: map.getBounds(),
            fields: ["geometry", "name"],
        };
    }
}
