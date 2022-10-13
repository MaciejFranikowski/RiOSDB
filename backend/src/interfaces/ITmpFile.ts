export interface ITmpFile {
  cleanupCallback: () => void;
  path: string;
}
