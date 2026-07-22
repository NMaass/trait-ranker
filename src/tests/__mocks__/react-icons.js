const React = require("react");

// Lightweight stand-in for the entire react-icons package. React-icons is a
// huge ESM barrel ("cannot use import statement" / "cannot redefine property"
// under CRA 4's default jest transform). The tests don't assert on icon
// glyphs — every named icon renders nothing; IconContext is a real object so
// context consumers don't break.
const IconContext = React.createContext({});
const Stub = () => null;

module.exports = new Proxy(
  { IconContext, __esModule: true },
  {
    get(target, prop) {
      if (prop === "__esModule") return true;
      if (prop in target) return target[prop];
      return Stub;
    },
  }
);