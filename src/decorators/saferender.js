export default function safeRender(config = {active:true}) {
  return function (target) {
    if(config.active) {
      [
        "render",
        "componentWillMount",
        "componentDidMount",
        "componentWillReceiveProps",
        "componentWillUpdate",
        "componentDidUpdate",
        "componentWillUnmount",
        "ShouldComponentUpdate"
    ].forEach(method => {
        let blankFn =
            method === "ShouldComponentUpdate"
                ? safeShouldComponentUpdate
                : function() {
                      return null;
                  };
        let unsafe = target.prototype[method] || blankFn;
        config.errorHandler = config.errorHandler || function (report) {
          console.error(report)
        }
        target.prototype[method] = function() {
            try {
                return unsafe.call(this, arguments);
            } catch (e) {
                let report = {
                    displayname: target.name,
                    method: method,
                    message: e.stack,
                    state: this.state,
                    props: this.props
                };
                config.errorHandler(report);
                return blankFn.call(this, arguments)
            }
        };
    });
    }
     
  }
}
function safeShouldComponentUpdate() {
    return true;
}