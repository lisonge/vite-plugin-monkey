import { DomUtils, ElementType, parseDocument } from 'htmlparser2';

interface ScriptResult {
  src: string;
  text: string;
}

export const parserHtmlScriptResult = (html: string): ScriptResult[] => {
  const doc = parseDocument(html);
  type Element =
    ReturnType<typeof DomUtils.findAll> extends Array<infer T> ? T : never;
  const scripts = DomUtils.getElementsByTagType(
    ElementType.Script,
    doc,
  ) as Element[];
  return scripts.map<ScriptResult>((p) => {
    const src = p.attribs.src ?? '';
    const textNode = p.firstChild;
    let text = '';
    if (textNode?.type == ElementType.Text) {
      text = textNode.data ?? '';
    }
    return { src, text };
  });
};
