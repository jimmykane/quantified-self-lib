export class GXParser {
  constructor(xml: string, domParser: any = null) {
    domParser = domParser || DOMParser;
    const parser = new domParser();
    const root = parser.parseFromString(xml, 'text/xml');

    return this.parseChild(root.documentElement);
  }

  private parseChild(elm: any): any {
    const attrs: any = {};
    const attributes: any[] = elm.attributes;

    for (let i = 0; i < attributes.length; i++) {
      const attr: any = attributes[i];
      if (attr && attr.value) {
        attrs[attr.name] = attr.value;
      }
    }

    if (elm.childNodes) {
      const children = elm.childNodes;
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        const name = child.localName;
        if (!name) {
          continue;
        }

        if (!attrs[name]) {
          attrs[name] = [];
        }
        attrs[name].push(this.parseChild(child));
      }
    }

    if (Object.keys(attrs).length === 0) {
      return elm.textContent;
    }
    return attrs;
  }
}
