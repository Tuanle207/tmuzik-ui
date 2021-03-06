export const isDescendant = function(parent: any, child: any) {
  let node = child.parentNode;
  while (node) {
      if (node === parent) {
          return true;
      }

      // Traverse up to the parent
      node = node.parentNode;
  }

  // Go up until the root but couldn't find the `parent`
  return false;
};