import { IclassElement, Idataset } from "../types";

export function calculateDistance(
  DataElement1: Idataset = { x: 0, y: 0 },
  DataElement2: Idataset = { x: 0, y: 0 }
) {
  return Math.sqrt(
    (DataElement2.x - DataElement1.x) * (DataElement2.x - DataElement1.x) +
      (DataElement2.y - DataElement1.y) * (DataElement2.y - DataElement1.y)
  );
}
