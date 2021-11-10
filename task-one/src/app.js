import FileTree from "./fileTree";

export function createFileTree(input) {
  const fileTree = new FileTree();
  let sortedInput = input.sort((a, b) => {
    return a.id - b.id;
  });
  sortedInput[0].parentId = 0;
  for (const inputNode of sortedInput) {
    const parentNode = inputNode.parentId
      ? fileTree.findNodeById(inputNode.parentId)
      : null;

    fileTree.createNode(
      inputNode.id,
      inputNode.name,
      inputNode.type,
      parentNode
    );
  }

  return fileTree;
}
