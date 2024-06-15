export interface CommutyApiRequest {
  user: User;
  ridePreferences: string[];
  commutingRoutes: CommutingRoute[];
}
interface CommutingRoute {
  addressFrom: PointOfInterest;
  addressTo: PointOfInterest;
  timePreferences: TimePreference[];
}
interface TimePreference {
  day: string;
  timeRange: TimeRange;
}
interface TimeRange {
  departureTime: string; // localtime, example: 08:00
  returnTime: string; // localtime
}
interface PointOfInterest {
  longitude?: string;
  latitude?: string;
  levelOfDetail: number;
}
interface User {
  name?: string;
  email?: string;
}
