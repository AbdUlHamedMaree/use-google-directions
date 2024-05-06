import type { DirectionsPolyline, TextValueObject } from './api';
import type { LatLng } from './types/lat-lng';

export const decodeStepsToPolylinePoints = (
  steps: { polyline: DirectionsPolyline }[]
): LatLng[] => {
  const points: LatLng[] = [];

  for (const step of steps) {
    const encoded = step.polyline.points;
    let index = 0;
    const len = encoded.length;
    let lat = 0,
      lng = 0;

    while (index < len) {
      let b,
        shift = 0,
        result = 0;

      do {
        b = encoded.charAt(index++).charCodeAt(0) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);

      const dlat = (result & 1) != 0 ? ~(result >> 1) : result >> 1;

      lat += dlat;
      shift = 0;
      result = 0;
      do {
        b = encoded.charAt(index++).charCodeAt(0) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = (result & 1) != 0 ? ~(result >> 1) : result >> 1;

      lng += dlng;

      points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }
  }

  return points;
};

export const calculateDirectionDurationInMs = (
  legs: { duration?: TextValueObject }[]
): number => legs.reduce((acc, { duration }) => acc + (duration?.value ?? 0), 0);

export const calculateDirectionDistanceInM = (
  legs: { distance?: TextValueObject }[]
): number => legs.reduce((acc, { distance }) => acc + (distance?.value ?? 0), 0);
