const quickSort = (arr, sortFunc) => {
  let pivot = "iB";

  const solve = (arr, is) => {
    if (arr.length <= 1) return arr;

    const { iA = 0, iB = arr.length - 1 } = is || {};

    const a = arr[iA];
    const b = arr[iB];

    if (iB === iA) {
      const firstHalf = arr.slice(0, iB);
      const secHalf = arr.slice(iB + 1);
      return [...solve(firstHalf), b, ...solve(secHalf)];
    }

    switch (sortFunc(a, b) > 0) {
      case true:
        arr[iA] = b;
        arr[iB] = a;

        pivot = pivot == "iB" ? "iA" : "iB";
        break;
      case false:
        break;
    }

    const newIs = {
      iA,
      iB,
    };

    const op = (val) => (pivot === "iB" ? val - 1 : val + 1);

    newIs[pivot] = op(newIs[pivot]);

    return solve(arr, newIs);
  };

  return solve(arr);
};

export default quickSort;
