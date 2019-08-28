import { Injectable } from "@angular/core";
import {
    PlaceResult,
    PlacesServiceStatus,
    PlacesSearchPagination,
} from "../models/googlePlaces.model";

@Injectable({
    providedIn: "root",
})
export class GooglePlacesService {
    public getParksFromMap(map: google.maps.Map, callback) {
        this.searchParks(map, callback);
    }
    protected searchParks(
        map: google.maps.Map,
        callback: (
            results: PlaceResult[],
            status: PlacesServiceStatus,
            pagination: PlacesSearchPagination
        ) => any
    ) {
        const placesService = new google.maps.places.PlacesService(map);
        const placesServiceRequest = this.generatePlacesRequest(map);

        placesService.nearbySearch(placesServiceRequest, callback);
    }

    protected generatePlacesRequest(map: google.maps.Map) {
        return {
            bounds: map.getBounds(),
            fields: ["geometry", "name"],
            location: map.getCenter(),
            radius: 2500,
            type: "park",
        };
    }
}
