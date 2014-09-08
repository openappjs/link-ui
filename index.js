var mercury = require('mercury');
var h = mercury.h;

var Link = function (options) {
  options = options || {};
  var children = options.children || [];
  var config = options.config || {};
  var model = options.model || {};
  var style = options.style || {};

  var state = mercury.struct({
    children: mercury.array(children),
    config: mercury.struct(config),
    model: mercury.struct(model),
    render: mercury.value(Link.render),
    style: mercury.struct(style)
  });

  return {state: state};
};

Link.render = function (state, events) {
  var children = state.children;
  var content = state.model.content;
  var recursiveRender = function(children, content) {
    if (content) return content

    var renderedChildren = [];
    if (children.length > 0) {
      for (var i=0; i<children.length; i++) {
        var child = children[i];
        if (child && child.render) {
          renderedChildren.push(child.render(child));
        } else {
          renderedChildren.push(child);
        }
      }
    }
    return renderedChildren;
  };

  return h('a', {
    id: state.config.id,
    className: state.config.className,
    lang: state.config.lang,
    dir: state.config.dir,
    style: state.style,
    href: state.model.href,
    target: state.model.target,
  }, recursiveRender(children, content));

}


module.exports = Link;