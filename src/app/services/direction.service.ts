import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DirectionService {
  async getDirections(
    originPoint: number[],
    destinyPoint: number[],
    accessToken: string
  ) {
    try {
      let response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${originPoint[0]},${originPoint[1]};${destinyPoint[0]},${destinyPoint[1]}?geometries=geojson&access_token=${accessToken}`,
        { method: 'GET' }
      );
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  }
  constructor() {}
}
