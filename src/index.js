export default function(context, options = {}) {
    const {Syntax, RuleError, report, getSource} = context;
    return {
        [Syntax.Image](node){ // "Str" node
            const contentLenOtherThanImage = node.parent.raw.replace(node.raw, "").trim().length;
            if (contentLenOtherThanImage == 0) {
                const indexOfBugs = node.index;
                const ruleError = new RuleError("内容仅包含图片", {
                    index: indexOfBugs // padding of index
                });
                report(node, ruleError);
            }
        }
    }
};
