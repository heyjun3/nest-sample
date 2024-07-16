const add = (n1: number, n2: number) => n1 + n2;
const addcur = (
  (n1: number) => (n2: number) =>
    add(n1, n2)
)(1)(2);
console.warn(addcur);
