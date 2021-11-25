export interface Idataset {
  x: number;
  y: number;
}
export interface IclassElement {
  center: Idataset | undefined;
  elements: Idataset[];
  key?: number;
}
