export const findChildNode = (
  fromNodeList: NodeListOf<ChildNode>,
  childNodeName: string | RegExp
): ChildNode | null => {
  const childNodeFound = Array.from(fromNodeList).find((childNode: ChildNode) => {
    return childNode.nodeName === childNodeName || childNode.nodeName.match(childNodeName) !== null;
  });
  return childNodeFound ? childNodeFound : null;
};

export const findChildNodeValue = (
  fromNodeList: NodeListOf<ChildNode>,
  childNodeName: string | RegExp
): number | null => {
  const predicate = (childNode: ChildNode) =>
    childNode.nodeName === childNodeName || childNode.nodeName.match(childNodeName) !== null;
  let value = Array.from(fromNodeList).find(predicate)?.firstChild?.nodeValue;
  value = value !== undefined ? value : null;
  return value === null ? value : Number(value);
};

// Fetch activity track point extensions according https://www8.garmin.com/xmlschemas/ActivityExtensionv2.xsd schema
export const findTrackPointExtensionValue = (
  childNodes: NodeListOf<ChildNode>,
  extensionName: string
): number | null => {
  return findExtensionValue(childNodes, extensionName, 'TPX');
};

// Fetch activity lap extensions according https://www8.garmin.com/xmlschemas/ActivityExtensionv2.xsd schema
export const findLapExtensionValue = (childNodes: NodeListOf<ChildNode>, extensionName: string): number | null => {
  return findExtensionValue(childNodes, extensionName, 'LX');
};

export const findExtensionValue = (
  childNodes: NodeListOf<ChildNode>,
  extensionName: string,
  namespace: string
): number | null => {
  const trackPointsChild: ChildNode | null = findChildNode(childNodes, 'Extensions');
  if (!trackPointsChild) {
    return null;
  }
  const tpxChildNode = findChildNode(trackPointsChild.childNodes, new RegExp(`${namespace}$`, 'gi'));
  if (tpxChildNode) {
    const value = findChildNodeValue(tpxChildNode.childNodes, new RegExp(extensionName + '$'));
    return value !== null ? Number(value) : null;
  }
  return null;
};
