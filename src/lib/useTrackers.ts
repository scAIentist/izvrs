"use client";

import { useState, useEffect, useCallback } from "react";
import type { TrackersAPIResponse, LiveTracker } from "./wfs-types";

const POLL_INTERVAL_MS = 2 * 60 * 1000; // Re-fetch every 2 min

interface UseTrackersResult {
  trackers: LiveTracker[];
  loading: boolean;
  error: string | null;
  fetchedAt: string | null;
  source: "live" | "cache" | "fallback" | null;
  refetch: () => void;
}

export function useTrackers(): UseTrackersResult {
  const [trackers, setTrackers] = useState<LiveTracker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchedAt, setFetchedAt] = useState<string | null>(null);
  const [source, setSource] = useState<
    "live" | "cache" | "fallback" | null
  >(null);

  const fetchTrackers = useCallback(async () => {
    try {
      const res = await fetch("/api/trackers");
      const data: TrackersAPIResponse = await res.json();

      if (data.trackers && data.trackers.length > 0) {
        setTrackers(data.trackers);
        setError(null);
      } else if (data.trackers && data.trackers.length === 0) {
        setError("Ni podatkov o sledilnikih");
      }

      setFetchedAt(data.fetchedAt);
      setSource(data.source);
    } catch (err) {
      console.warn("[useTrackers] Fetch failed:", err);
      setError("Napaka pri nalaganju podatkov");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrackers();
    const interval = setInterval(fetchTrackers, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [fetchTrackers]);

  return { trackers, loading, error, fetchedAt, source, refetch: fetchTrackers };
}
