import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GeocodingService {
  async geocode(query: string, accessToken: string) {
    const matches = query.match(
      /^[ ]*(?:Lat: )?(-?\d+\.?\d*)[, ]+(?:Lng: )?(-?\d+\.?\d*)[ ]*$/i
    );
    let response;
    if (!matches) {
      response = await this.forward(query, accessToken);
    } else {
      const coordinates = [Number(matches[1]), Number(matches[2])];
      response = this.reverse(coordinates, accessToken);
    }
    return response;
  }
  async forward(searchText: string, accessToken: string) {
    try {
      let response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText}.json?geometries=geojson&access_token=${accessToken}`,
        { method: 'GET' }
      );
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  }
  async reverse(coordinates: number[], accessToken: string) {
    try {
      let response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates[0]},${coordinates[1]}.json?access_token=${accessToken}`,
        { method: 'GET' }
      );
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  }
  constructor() {}
}
