const useNode = () => {
  const insertNode = function (tree, commentId, item) {
    if (tree.id === commentId) {
      return {
        ...tree,
        items: [
          ...tree.items,
          {
            id: new Date().getTime(),
            name: item,
            items: [],
          },
        ],
      };
    }

    return {
      ...tree,
      items: tree.items?.map((child) => insertNode(child, commentId, item)),
    };
  };

  const editNode = (tree, commentId, value) => {

    if (tree.id === commentId) {
      return { ...tree, name: value };
    }

    return {
      ...tree,
      items: tree.items?.map((child) => editNode(child, commentId, value)),
    };
  };

  const deleteNode = (tree, id) => {
    return {
      ...tree,
      items: tree.items
        .filter((child) => child.id !== id)
        .map((child) => deleteNode(child, id)),
    };
  };

  return { insertNode, editNode, deleteNode };
};

export default useNode;
