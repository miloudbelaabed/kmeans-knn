import { IclassElement, Idataset } from "../types";
import { calculateDistance } from "./helpers";

const KmeansAlgorithme = (classesNumber: number, dataSet: Idataset[]) => {
  let classes: IclassElement[] = [];
  let clonedDataSet = [...dataSet];
  classes = new Array(classesNumber).fill(0).map((element, index: number) => {
    let dataElem: any = clonedDataSet.shift();
    let classItem: any = {
      elements: [dataElem],
      center: dataElem,
      name: `C${index}`,
    };
    return classItem;
  });

  let oldClasses = saveClassesItems(classes);
  let repeat: boolean = true;
  let classesHistory: any = [];

  while (repeat) {
    clonedDataSet.map((elem: Idataset) => {
      let minClassElement: IclassElement = classes[0];
      let minDistance: number = calculateDistance(elem, minClassElement.center);
      classes.map((classItem: IclassElement) => {
        let distance = calculateDistance(elem, classItem.center);
        if (distance < minDistance) {
          minClassElement = classItem;
          minDistance = distance;
        }
      });
      minClassElement.elements.push(elem);
    });

    classesHistory.push(classes);

    if (saveClassesItems(classes) === oldClasses) {
      repeat = false;
    } else {
      oldClasses = saveClassesItems(classes);
      classes = classes.map((classItem: IclassElement, index) => {
        let x = 0,
          y = 0;
        let elementNumbers = classItem.elements.length;
        classItem.elements.map((elemnt) => {
          x += elemnt.x;
          y += elemnt.y;
        });
        x = x / elementNumbers;
        y = y / elementNumbers;
        return {
          elements: [],
          center: { x, y },
          name: `C${index}`,
        };
      });
      clonedDataSet = [...dataSet];
    }
  }
  console.log(classesHistory);
  return classesHistory;
};

function saveClassesItems(classes: IclassElement[]) {
  let state: any = [];
  classes.map(({ elements }: any) => {
    state.push({ elements });
  });
  return JSON.stringify(state);
}

export default KmeansAlgorithme;