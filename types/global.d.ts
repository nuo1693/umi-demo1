declare let D_SERVER_URL: string;

declare global {
  interface Window {
    onAMapLoadCallback: () => void;
  }
}

export {};
