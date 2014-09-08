var mercury = require('mercury');
var Link = require('../..');

var link = Link({
  model: {
    href: '#',
    content: 'a simple link'
  }
});

mercury.app(document.body, link.state, Link.render)



