/** Raw properties from a single WFS feature (adrion_locations layer) */
export interface WFSFeatureProperties {
  id: number;
  lat: number;
  lon: number;
  speed: number;
  angle: number;
  timestamp: string;
  tracker_id: number;
}

/** GeoJSON feature from WFS */
export interface WFSFeature {
  type: "Feature";
  properties: WFSFeatureProperties;
  geometry: {
    type: "Point";
    coordinates: [number, number]; // [lon, lat]
  };
}

/** GeoJSON FeatureCollection from WFS */
export interface WFSFeatureCollection {
  type: "FeatureCollection";
  features: WFSFeature[];
}

/** A single position fix in a tracker's history */
export interface TrackerPosition {
  lat: number;
  lon: number;
  speed: number;
  angle: number;
  timestamp: string;
}

/** Processed tracker with latest position and full path */
export interface LiveTracker {
  tracker_id: string;
  latest: TrackerPosition;
  path: TrackerPosition[]; // chronological, oldest first
  status: "active" | "inactive";
}

/** Shape returned by /api/trackers */
export interface TrackersAPIResponse {
  trackers: LiveTracker[];
  fetchedAt: string;
  source: "live" | "cache" | "fallback";
}
