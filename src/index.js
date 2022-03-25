export default function(context, options = {}) {
    const {Syntax, RuleError, report, getSource} = context;
    return {
        [Syntax.Image](node){ // "Str" node
            let parent = node.parent;
            // console.log(parent.parent.type);
            if (parent.parent.type === "ListItem") {
                const contentLenOtherThanImage = parent.raw.replace(node.raw, "").trim().length;
                // console.log("c: " + parent.raw.replace(node.raw, "").trim());
                if (contentLenOtherThanImage == 0) {
                    const indexOfBugs = node.index;
                    const ruleError = new RuleError("内容仅包含图片", {
                        index: indexOfBugs // padding of index
                    });
                    report(node, ruleError);
                }
            }   
        }
    }
};
