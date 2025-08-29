// Mock Firebase Module for Launch Simulation

/**
 * In a real application, this would import from the Firebase SDK:
 * import { initializeApp } from 'firebase/app';
 * import { getPerformance } from 'firebase/performance';
 */

// Mock Firebase config
const firebaseConfig = {
  apiKey: "AIzaSy...-pr3t3nd-k3y",
  authDomain: "zenith-lend.firebaseapp.com",
  projectId: "zenith-lend",
  storageBucket: "zenith-lend.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:mock-app-id"
};

const mockApp = { name: "[DEFAULT]" };

// Mock Performance object
const mockPerformance = {
    trace: (traceName: string) => {
        const startTime = performance.now();
        console.log(`[Perf-Trace] Started: ${traceName}`);
        return {
            start: () => console.log(`[Perf-Trace] Manual start for ${traceName}`),
            stop: () => {
                const duration = performance.now() - startTime;
                console.log(`[Perf-Trace] Stopped: ${traceName}. Duration: ${duration.toFixed(2)}ms`);
            },
            putAttribute: (key: string, value: string) => console.log(`[Perf-Trace] Attribute for ${traceName}: ${key} = ${value}`),
        }
    }
};

/**
 * Simulates the initialization of the Firebase app.
 */
export const initializeFirebase = () => {
  console.log("[Firebase] Initializing with mock config...", firebaseConfig.projectId);
  // In a real app: const app = initializeApp(firebaseConfig);
  return mockApp;
};

/**
 * Simulates getting the Firebase Performance instance.
 */
export const getPerf = (app: any) => {
    console.log("[Firebase] Performance Monitoring is Active.");
    return mockPerformance;
}
