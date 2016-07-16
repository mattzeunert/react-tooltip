'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp;

/* Decoraters */


/* Utils */


/* CSS */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _staticMethods = require('./decorators/staticMethods');

var _staticMethods2 = _interopRequireDefault(_staticMethods);

var _windowListener = require('./decorators/windowListener');

var _windowListener2 = _interopRequireDefault(_windowListener);

var _customEvent = require('./decorators/customEvent');

var _customEvent2 = _interopRequireDefault(_customEvent);

var _isCapture = require('./decorators/isCapture');

var _isCapture2 = _interopRequireDefault(_isCapture);

var _getPosition = require('./utils/getPosition');

var _getPosition2 = _interopRequireDefault(_getPosition);

var _getTipContent = require('./utils/getTipContent');

var _getTipContent2 = _interopRequireDefault(_getTipContent);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactTooltip = (0, _staticMethods2.default)(_class = (0, _windowListener2.default)(_class = (0, _customEvent2.default)(_class = (0, _isCapture2.default)(_class = (_temp = _class2 = function (_Component) {
  _inherits(ReactTooltip, _Component);

  function ReactTooltip(props) {
    _classCallCheck(this, ReactTooltip);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ReactTooltip).call(this, props));

    _this.state = {
      place: 'top', // Direction of tooltip
      type: 'dark', // Color theme of tooltip
      effect: 'float', // float or fixed
      show: false,
      border: false,
      placeholder: '',
      offset: {},
      extraClass: '',
      html: false,
      delayHide: 0,
      delayShow: 0,
      event: props.event || null,
      eventOff: props.eventOff || null,
      currentEvent: null, // Current mouse event
      currentTarget: null // Current target of mouse event
    };

    _this.addBodyListeners();

    _this.mount = true;
    _this.delayShowLoop = null;
    _this.delayHideLoop = null;
    _this.intervalUpdateContent = null;

    _this.boundShowTooltip = _this.showTooltip.bind(_this);
    _this.boundUpdateTooltip = _this.updateTooltip.bind(_this);
    _this.boundHideTooltip = _this.hideTooltip.bind(_this);
    return _this;
  }

  _createClass(ReactTooltip, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setStyleHeader(); // Set the style to the <link>
      this.bindListener(); // Bind listener for tooltip
      this.bindWindowEvents(); // Bind global event for static method
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.mount = false;

      this.clearTimer();

      this.unbindListener();
      this.removeScrollListener();
      this.unbindWindowEvents();
    }
  }, {
    key: 'addBodyListeners',
    value: function addBodyListeners() {
      var _this2 = this;

      var body = document.body;
      body.addEventListener('mouseover', function (e) {
        var elWithTooltip = e.target;

        while (elWithTooltip.getAttribute('data-tip') === null) {
          elWithTooltip = elWithTooltip.parentNode;
          if (elWithTooltip.tagName === "HTML") {
            return;
          }
        }

        if (_this2.props.id && _this2.props.id !== elWithTooltip.getAttribute('data-for')) {
          return;
        }

        e = {
          target: elWithTooltip,
          type: "mouseover"
        };
        _this2.boundShowTooltip(e);
      });

      body.addEventListener('mouseout', function (e) {
        var elWithTooltip = e.target;

        while (elWithTooltip.getAttribute('data-tip') === null) {
          elWithTooltip = elWithTooltip.parentNode;
          if (elWithTooltip.tagName === "HTML") {
            return;
          }
        }

        if (_this2.props.id && _this2.props.id !== elWithTooltip.getAttribute('data-for')) {
          return;
        }

        e = {
          target: elWithTooltip,
          type: "mouseout"
        };
        _this2.boundHideTooltip(e);
      });
    }
  }, {
    key: 'removeBodyListeners',
    value: function removeBodyListeners() {}

    /**
     * Bind listener to the target elements
     * These listeners used to trigger showing or hiding the tooltip
     */

  }, {
    key: 'bindListener',
    value: function bindListener() {}
    // const {id, globalEventOff} = this.props
    // let targetArray = this.getTargetArray(id)
    //
    // targetArray.forEach(target => {
    //   const isCaptureMode = this.isCapture(target)
    //   if (target.getAttribute('currentItem') === null) {
    //     target.setAttribute('currentItem', 'false')
    //   }
    //
    //   if (this.isCustomEvent(target)) {
    //     this.customBindListener(target)
    //     return
    //   }
    //
    //   target.removeEventListener('mouseenter', this.boundShowTooltip)
    //   target.addEventListener('mouseenter', this.boundShowTooltip, isCaptureMode)
    //
    //   target.removeEventListener('mousemove', this.boundUpdateTooltip)
    //   target.addEventListener('mousemove', this.boundUpdateTooltip, isCaptureMode)
    //
    //   target.removeEventListener('mouseleave', this.boundHideTooltip)
    //   target.addEventListener('mouseleave', this.boundHideTooltip, isCaptureMode)
    // })
    //
    // // Global event to hide tooltip
    // if (globalEventOff) {
    //   window.removeEventListener(globalEventOff, this.boundHideTooltip)
    //   window.addEventListener(globalEventOff, this.boundHideTooltip, false)
    // }


    /**
     * Unbind listeners on target elements
     */

  }, {
    key: 'unbindListener',
    value: function unbindListener() {}
    // const {id, globalEventOff} = this.props
    // const targetArray = this.getTargetArray(id)
    //
    // targetArray.forEach(target => {
    //   if (this.isCustomEvent(target)) {
    //     this.customUnbindListener(target)
    //     return
    //   }
    //
    //   target.removeEventListener('mouseenter', this.boundShowTooltip)
    //   target.removeEventListener('mousemove', this.boundUpdateTooltip)
    //   target.removeEventListener('mouseleave', this.boundHideTooltip)
    // })
    //
    // if (globalEventOff) window.removeEventListener(globalEventOff, this.boundHideTooltip)


    /**
     * When mouse enter, show the tooltip
     */

  }, {
    key: 'showTooltip',
    value: function showTooltip(e) {
      var _this3 = this;

      // Get the tooltip content
      // calculate in this phrase so that tip width height can be detected
      var _props = this.props;
      var children = _props.children;
      var multiline = _props.multiline;
      var getContent = _props.getContent;

      var originTooltip = e.target.getAttribute('data-tip');
      var isMultiline = e.target.getAttribute('data-multiline') || multiline || false;

      var content = children;
      if (getContent) {
        if (Array.isArray(getContent)) {
          content = getContent[0] && getContent[0]();
        } else {
          content = getContent();
        }
      }

      var placeholder = (0, _getTipContent2.default)(originTooltip, content, isMultiline);

      this.setState({
        placeholder: placeholder,
        place: e.target.getAttribute('data-place') || this.props.place || 'top',
        type: e.target.getAttribute('data-type') || this.props.type || 'dark',
        effect: e.target.getAttribute('data-effect') || this.props.effect || 'float',
        offset: e.target.getAttribute('data-offset') || this.props.offset || {},
        html: e.target.getAttribute('data-html') === 'true' || this.props.html || false,
        delayShow: e.target.getAttribute('data-delay-show') || this.props.delayShow || 0,
        delayHide: e.target.getAttribute('data-delay-hide') || this.props.delayHide || 0,
        border: e.target.getAttribute('data-border') === 'true' || this.props.border || false,
        extraClass: e.target.getAttribute('data-class') || this.props.class || ''
      }, function () {
        _this3.addScrollListener(e);
        _this3.updateTooltip(e);

        if (getContent && Array.isArray(getContent)) {
          _this3.intervalUpdateContent = setInterval(function () {
            var getContent = _this3.props.getContent;

            var placeholder = (0, _getTipContent2.default)(originTooltip, getContent[0](), isMultiline);
            _this3.setState({
              placeholder: placeholder
            });
          }, getContent[1]);
        }
      });
    }

    /**
     * When mouse hover, updatetooltip
     */

  }, {
    key: 'updateTooltip',
    value: function updateTooltip(e) {
      var _this4 = this;

      if (e.type === 'mousemove' && this.state.effect === 'solid') {
        return;
      }

      var _state = this.state;
      var delayShow = _state.delayShow;
      var show = _state.show;
      var placeholder = this.state.placeholder;

      var delayTime = show ? 0 : parseInt(delayShow, 10);
      var eventTarget = e.target;

      clearTimeout(this.delayShowLoop);
      this.delayShowLoop = setTimeout(function () {
        if (typeof placeholder === 'string') placeholder = placeholder.trim();
        if (Array.isArray(placeholder) && placeholder.length > 0 || placeholder) {
          _this4.setState({
            currentEvent: e,
            currentTarget: eventTarget,
            show: true
          }, function () {
            _this4.updatePosition();
          });
        }
      }, delayTime);
    }

    /**
     * When mouse leave, hide tooltip
     */

  }, {
    key: 'hideTooltip',
    value: function hideTooltip() {
      var _this5 = this;

      var delayHide = this.state.delayHide;


      if (!this.mount) return;

      this.clearTimer();
      this.delayHideLoop = setTimeout(function () {
        _this5.setState({
          show: false
        });
        _this5.removeScrollListener();
      }, parseInt(delayHide, 10));
    }

    /**
     * Add scroll eventlistener when tooltip show
     * automatically hide the tooltip when scrolling
     */

  }, {
    key: 'addScrollListener',
    value: function addScrollListener(e) {
      var isCaptureMode = this.isCapture(e.target);
      window.addEventListener('scroll', this.boundHideTooltip, isCaptureMode);
    }
  }, {
    key: 'removeScrollListener',
    value: function removeScrollListener() {
      window.removeEventListener('scroll', this.boundHideTooltip);
    }

    // Calculation the position

  }, {
    key: 'updatePosition',
    value: function updatePosition() {
      var _this6 = this;

      var _state2 = this.state;
      var currentEvent = _state2.currentEvent;
      var currentTarget = _state2.currentTarget;
      var place = _state2.place;
      var effect = _state2.effect;
      var offset = _state2.offset;

      var node = _reactDom2.default.findDOMNode(this);

      var result = (0, _getPosition2.default)(currentEvent, currentTarget, node, place, effect, offset);

      if (result.isNewState) {
        // Switch to reverse placement
        return this.setState(result.newState, function () {
          _this6.updatePosition();
        });
      }
      // Set tooltip position
      node.style.left = result.position.left + 'px';
      node.style.top = result.position.top + 'px';
    }

    /**
     * Set style tag in header
     * in this way we can insert default css
     */

  }, {
    key: 'setStyleHeader',
    value: function setStyleHeader() {
      if (!document.getElementsByTagName('head')[0].querySelector('style[id="react-tooltip"]')) {
        var tag = document.createElement('style');
        tag.id = 'react-tooltip';
        tag.innerHTML = _style2.default;
        document.getElementsByTagName('head')[0].appendChild(tag);
      }
    }

    /**
     * CLear all kinds of timeout of interval
     */

  }, {
    key: 'clearTimer',
    value: function clearTimer() {
      clearTimeout(this.delayShowLoop);
      clearTimeout(this.delayHideLoop);
      clearInterval(this.intervalUpdateContent);
    }
  }, {
    key: 'render',
    value: function render() {
      var _state3 = this.state;
      var placeholder = _state3.placeholder;
      var extraClass = _state3.extraClass;
      var html = _state3.html;

      var tooltipClass = (0, _classnames2.default)('__react_component_tooltip', { 'show': this.state.show }, { 'border': this.state.border }, { 'place-top': this.state.place === 'top' }, { 'place-bottom': this.state.place === 'bottom' }, { 'place-left': this.state.place === 'left' }, { 'place-right': this.state.place === 'right' }, { 'type-dark': this.state.type === 'dark' }, { 'type-success': this.state.type === 'success' }, { 'type-warning': this.state.type === 'warning' }, { 'type-error': this.state.type === 'error' }, { 'type-info': this.state.type === 'info' }, { 'type-light': this.state.type === 'light' });

      if (html) {
        return _react2.default.createElement('div', { className: tooltipClass + ' ' + extraClass,
          'data-id': 'tooltip',
          dangerouslySetInnerHTML: { __html: placeholder } });
      } else {
        return _react2.default.createElement(
          'div',
          { className: tooltipClass + ' ' + extraClass,
            'data-id': 'tooltip' },
          placeholder
        );
      }
    }
  }]);

  return ReactTooltip;
}(_react.Component), _class2.propTypes = {
  children: _react.PropTypes.any,
  place: _react.PropTypes.string,
  type: _react.PropTypes.string,
  effect: _react.PropTypes.string,
  offset: _react.PropTypes.object,
  multiline: _react.PropTypes.bool,
  border: _react.PropTypes.bool,
  class: _react.PropTypes.string,
  id: _react.PropTypes.string,
  html: _react.PropTypes.bool,
  delayHide: _react.PropTypes.number,
  delayShow: _react.PropTypes.number,
  event: _react.PropTypes.string,
  eventOff: _react.PropTypes.string,
  watchWindow: _react.PropTypes.bool,
  isCapture: _react.PropTypes.bool,
  globalEventOff: _react.PropTypes.string,
  getContent: _react.PropTypes.any
}, _temp)) || _class) || _class) || _class) || _class;

/* export default not fit for standalone, it will exports {default:...} */


module.exports = ReactTooltip;