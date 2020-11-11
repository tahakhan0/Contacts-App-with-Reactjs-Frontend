import _ from "lodash";

function paginate(itemList, currentPage, pageSize) {
  const startingIndex = (currentPage - 1) * pageSize;

  // converting list of items to a lodash object by _(Objectname) and
  // slicing from the starting index upto pageSize and
  // then converting this to an array.
  const val = _(itemList).slice(startingIndex).take(pageSize).value();

  return val;
}

export default paginate;
