export default function (context, options = {}) {
  const { Syntax, RuleError, report, getSource } = context;
  return {
    [Syntax.Header](node) {
      if (node.parent.type === "Document") {
        let passed = false;
        let imageNode = null;
        let contentBeforeImage = false;
        let contentAfterImage = false;
        let fin = false;
        //console.log(node.parent);
        node.parent.children.forEach((nodeI) => {
          //console.log("nodeI:" + nodeI.type);
          if (fin) {
            return;
          }
          if (passed && nodeI.type === "Header") {
            //console.log("found next header, return" + nodeI.raw);
            fin = true;
            return;
          }
          let imageNodeSelf = false;
          if (nodeI.children != null) {
            nodeI.children.forEach((nodeIS) => {
              if (passed && nodeIS.raw.trim().length > 0) {
                if (nodeIS.type == "Image") {
                  //console.log("found image");
                  imageNode = nodeIS;
                  imageNodeSelf = true;
                }
              }
            });
            if (imageNodeSelf) {
              const contentLenOtherThanImage = nodeI.raw
                .replace(imageNode.raw, "")
                .trim().length;
              if (contentLenOtherThanImage > 0) {
                //console.log("image node parent node has extra." + nodeI.raw
                // .replace(imageNode.raw, "")
                // .trim());
                contentBeforeImage = true;
                contentAfterImage = true;
              }
            }
          }
          if (imageNodeSelf) {
            return;
          }

          if (
            passed &&
            nodeI.type !== "Image" &&
            nodeI.type !== "Header" &&
            nodeI.raw.trim().length > 0
          ) {
            //console.log("found contentBeforeImage" + nodeI.raw);
            contentBeforeImage = true;
          }
          if (
            passed &&
            imageNode != null &&
            nodeI.type !== "Header" &&
            nodeI.raw.trim().length > 0
          ) {
            //console.log("found contentAfterImage" + nodeI.raw);
            contentAfterImage = true;
          }
          if (nodeI == node) {
            passed = true;
            //console.log(passed);
          }
        });
        const debugInfo = `${passed}, ${
          imageNode == null
        }, ${contentBeforeImage}, ${contentAfterImage}`;
        //console.log(debugInfo);
        if (imageNode !== null && !contentBeforeImage && !contentAfterImage) {
          const indexOfBugs = imageNode.index;
          const ruleError = new RuleError("段落内容仅包含图片", {
            index: indexOfBugs // padding of index
          });
          report(imageNode, ruleError);
        }
      }
    },
    [Syntax.Image](node) {
      // "Str" node
      let parent = node.parent;
      //console.log(parent.parent.type);
      if (parent.parent.type === "ListItem") {
        const contentLenOtherThanImage = parent.raw
          .replace(node.raw, "")
          .trim().length;
        //console.log("c: " + parent.raw.replace(node.raw, "").trim());
        if (contentLenOtherThanImage == 0) {
          //console.log("node")
          //console.log(node.parent.parent.type)
          //console.log(node.parent.parent.children)
          if (node.parent.parent.children !== null && node.parent.parent.children.length > 1) {
            return;
          }
          //console.log(node.parent.type)
          //console.log(node.type)
          //console.log(node.raw)
          const indexOfBugs = node.index;
          const ruleError = new RuleError("列表内容仅包含图片", {
            index: indexOfBugs // padding of index
          });
          report(node, ruleError);
        }
      }
    }
  };
}
