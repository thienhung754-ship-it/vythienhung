import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import {
  SiteData,
  loadSiteData,
  resetSiteData as resetStorage,
  fetchSiteDataFromAPI,
  saveSiteDataToAPI,
} from "@/lib/siteData";

interface SiteDataContextType {
  siteData: SiteData;
  updateSection: <K extends keyof SiteData>(key: K, data: SiteData[K]) => void;
  updateAll: (data: SiteData) => void;
  resetToDefault: () => void;
  isLoading: boolean;
  hasUnsavedChanges: boolean;
  saveToServer: () => Promise<void>;
  discardChanges: () => Promise<void>;
}

const SiteDataContext = createContext<SiteDataContextType | null>(null);

export const SiteDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Start with localStorage cache for instant render
  const [siteData, setSiteData] = useState<SiteData>(() => loadSiteData());
  const [isLoading, setIsLoading] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const isInitialLoad = useRef(true);
  // Keep a snapshot of the last-saved server state for discard
  const serverSnapshot = useRef<SiteData | null>(null);

  // Fetch from API on mount
  useEffect(() => {
    fetchSiteDataFromAPI()
      .then((data) => {
        setSiteData(data);
        serverSnapshot.current = data;
      })
      .finally(() => {
        setIsLoading(false);
        isInitialLoad.current = false;
      });
  }, []);

  // Local-only update — does NOT persist to server
  const updateSection = useCallback(<K extends keyof SiteData>(key: K, data: SiteData[K]) => {
    setSiteData((prev) => {
      const updated = { ...prev, [key]: data, lastUpdated: new Date().toISOString() };
      return updated;
    });
    setHasUnsavedChanges(true);
  }, []);

  const updateAll = useCallback((data: SiteData) => {
    const updated = { ...data, lastUpdated: new Date().toISOString() };
    setSiteData(updated);
    setHasUnsavedChanges(true);
  }, []);

  // Explicit save to server
  const saveToServer = useCallback(async () => {
    try {
      await saveSiteDataToAPI(siteData);
      serverSnapshot.current = siteData;
      setHasUnsavedChanges(false);
    } catch (err) {
      // Re-throw so AdminPage can show error toast
      throw err;
    }
  }, [siteData]);

  // Discard local changes — reload from server
  const discardChanges = useCallback(async () => {
    if (serverSnapshot.current) {
      setSiteData(serverSnapshot.current);
    } else {
      const data = await fetchSiteDataFromAPI();
      setSiteData(data);
      serverSnapshot.current = data;
    }
    setHasUnsavedChanges(false);
  }, []);

  const resetToDefault = useCallback(() => {
    const fresh = resetStorage();
    setSiteData(fresh);
    saveSiteDataToAPI(fresh);
    serverSnapshot.current = fresh;
    setHasUnsavedChanges(false);
  }, []);

  return (
    <SiteDataContext.Provider value={{ siteData, updateSection, updateAll, resetToDefault, isLoading, hasUnsavedChanges, saveToServer, discardChanges }}>
      {children}
    </SiteDataContext.Provider>
  );
};

export function useSiteData(): SiteDataContextType {
  const ctx = useContext(SiteDataContext);
  if (!ctx) throw new Error("useSiteData must be used within SiteDataProvider");
  return ctx;
}


