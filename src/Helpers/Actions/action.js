export function delet(index, array) {
  return array.filter((value, idx) => {
    return idx != index;
  });
}

export function deletMany(idxArr, array) {
  return array.filter((value, idx) => {
    return !idxArr.includes(idx);
  });
}
