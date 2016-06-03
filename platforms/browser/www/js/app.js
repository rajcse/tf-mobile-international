(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0});var _config=require("../config"),_config2=_interopRequireDefault(_config),_pubRecConstants=require("../constants/pubRecConstants"),_pubRecConstants2=_interopRequireDefault(_pubRecConstants),_dispatcher=require("../dispatcher"),_dispatcher2=_interopRequireDefault(_dispatcher);exports["default"]={receiveSearchResults:function(e){_dispatcher2["default"].dispatch({actionType:_pubRecConstants2["default"].actions.RECEIVE_SEARCH_RESULTS,results:e})},receiveRecordId:function(e,t){_dispatcher2["default"].dispatch({actionType:_pubRecConstants2["default"].actions.RECEIVE_RECORD_ID,recordId:e,reportType:t})},receiveReport:function(e){_dispatcher2["default"].dispatch({actionType:_pubRecConstants2["default"].actions.RECEIVE_REPORT,report:e})},receiveUser:function(e){_dispatcher2["default"].dispatch({actionType:_pubRecConstants2["default"].actions.RECEIVE_USER,user:e})},receiveUsage:function(e){_dispatcher2["default"].dispatch({actionType:_pubRecConstants2["default"].actions.RECEIVE_USAGE,usage:e})}};

},{"../config":17,"../constants/pubRecConstants":18,"../dispatcher":19}],2:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0});var _config=require("../config"),_config2=_interopRequireDefault(_config),_pubRecConstants=require("../constants/pubRecConstants"),_pubRecConstants2=_interopRequireDefault(_pubRecConstants),_dispatcher=require("../dispatcher"),_dispatcher2=_interopRequireDefault(_dispatcher),_PubRecAPI=require("../utils/PubRecAPI"),_PubRecAPI2=_interopRequireDefault(_PubRecAPI);exports["default"]={search:function(e){_dispatcher2["default"].dispatch({actionType:_pubRecConstants2["default"].actions.SEARCH,criteria:e}),_PubRecAPI2["default"].search(e)},clearSearchResults:function(){_dispatcher2["default"].dispatch({actionType:_pubRecConstants2["default"].actions.CLEAR_SEARCH_RESULTS})},updateSearchCriteria:function(e){_dispatcher2["default"].dispatch({actionType:_pubRecConstants2["default"].actions.UPDATE_CRITERIA,updates:e})},fetchRecordId:function(e,t){_dispatcher2["default"].dispatch({actionType:_pubRecConstants2["default"].actions.FETCH_RECORD_ID,recordData:e,reportType:t}),_PubRecAPI2["default"].fetchRecordId(e,t)},clearNavigation:function(){_dispatcher2["default"].dispatch({actionType:_pubRecConstants2["default"].actions.CLEAR_NAVIGATION})},fetchReport:function(e){_dispatcher2["default"].dispatch({actionType:_pubRecConstants2["default"].actions.FETCH_REPORT,criteria:e}),_PubRecAPI2["default"].fetchReport(e)},checkLocalUser:function(){_dispatcher2["default"].dispatch({actionType:_pubRecConstants2["default"].actions.CHECK_LOCAL_USER}),_PubRecAPI2["default"].checkLocalUser()},login:function(e){_dispatcher2["default"].dispatch({actionType:_pubRecConstants2["default"].actions.LOGIN,credentials:e}),_PubRecAPI2["default"].login(e)},logout:function(){_dispatcher2["default"].dispatch({actionType:_pubRecConstants2["default"].actions.LOGOUT}),_PubRecAPI2["default"].logout()},getUsage:function(e){_dispatcher2["default"].dispatch({actionType:_pubRecConstants2["default"].actions.GET_USAGE}),_PubRecAPI2["default"].getUsage(e)}};

},{"../config":17,"../constants/pubRecConstants":18,"../dispatcher":19,"../utils/PubRecAPI":24}],3:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var _createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,r,o){return r&&e(t.prototype,r),o&&e(t,o),t}}(),_config=require("./config"),_config2=_interopRequireDefault(_config),_pubRecConstants=require("./constants/pubRecConstants"),_pubRecConstants2=_interopRequireDefault(_pubRecConstants),_lodash=require("lodash"),_lodash2=_interopRequireDefault(_lodash),_react=require("react"),_react2=_interopRequireDefault(_react),_reactDom=require("react-dom"),_reactDom2=_interopRequireDefault(_reactDom),_reactRouter=require("react-router"),_viewActions=require("./actions/viewActions"),_viewActions2=_interopRequireDefault(_viewActions),_Header=require("./components/Header"),_Header2=_interopRequireDefault(_Header),_Navigation=require("./components/Navigation"),_Navigation2=_interopRequireDefault(_Navigation),_Login=require("./components/Login"),_Login2=_interopRequireDefault(_Login),_Dashboard=require("./components/Dashboard"),_Dashboard2=_interopRequireDefault(_Dashboard),_Search=require("./components/Search"),_Search2=_interopRequireDefault(_Search),_Support=require("./components/Support"),_Support2=_interopRequireDefault(_Support),_Account=require("./components/Account"),_Account2=_interopRequireDefault(_Account),_Report=require("./components/Report"),_Report2=_interopRequireDefault(_Report),_resultsStore=require("./stores/resultsStore"),_resultsStore2=_interopRequireDefault(_resultsStore),_userStore=require("./stores/userStore"),_userStore2=_interopRequireDefault(_userStore),styles={app:{padding:"70px 10px 60px"}},TfApp=function(e){function t(e){_classCallCheck(this,t);var r=_possibleConstructorReturn(this,Object.getPrototypeOf(t).call(this,e));return _viewActions2["default"].clearSearchResults(),_viewActions2["default"].checkLocalUser(),r.state={search:{results:_resultsStore2["default"].getAllResults(),searching:_resultsStore2["default"].isSearching(),criteria:_resultsStore2["default"].getCriteria()},user:_userStore2["default"].getUser(),usage:_userStore2["default"].getUsage()},r.onResultsChange=r.onResultsChange.bind(r),r.onUserChange=r.onUserChange.bind(r),r}return _inherits(t,e),_createClass(t,[{key:"onResultsChange",value:function(){this.setState({search:{results:_resultsStore2["default"].getAllResults(),searching:_resultsStore2["default"].isSearching(),criteria:_resultsStore2["default"].getCriteria()}})}},{key:"onUserChange",value:function(){this.setState({user:_userStore2["default"].getUser(),usage:_userStore2["default"].getUsage()})}},{key:"componentWillMount",value:function(){_userStore2["default"].addChangeListener(this.onUserChange),_resultsStore2["default"].addChangeListener(this.onResultsChange)}},{key:"componentWillUnmount",value:function(){_userStore2["default"].removeChangeListener(this.onUserChange),_resultsStore2["default"].removeChangeListener(this.onResultsChange)}},{key:"render",value:function(){return _userStore2["default"].isLoggedIn()?_react2["default"].createElement("div",{style:styles.app},_react2["default"].createElement(_Header2["default"],null),_react2["default"].cloneElement(this.props.children,{appState:this.state}),_react2["default"].createElement(_Navigation2["default"],null)):_react2["default"].createElement(_Login2["default"],null)}}]),t}(_react.Component);window.initializeApp=function(){_reactDom2["default"].render(_react2["default"].createElement(_reactRouter.Router,{history:_reactRouter.hashHistory},_react2["default"].createElement(_reactRouter.Route,{path:"/",component:TfApp},_react2["default"].createElement(_reactRouter.IndexRoute,{component:_Dashboard2["default"]}),_react2["default"].createElement(_reactRouter.Route,{path:"/search",component:_Search2["default"]}),_react2["default"].createElement(_reactRouter.Route,{path:"/support",component:_Support2["default"]}),_react2["default"].createElement(_reactRouter.Route,{path:"/account",component:_Account2["default"]}),_react2["default"].createElement(_reactRouter.Route,{path:"/:reportType(/:recordId)",component:_Report2["default"]}))),document.querySelector("#app"))};

},{"./actions/viewActions":2,"./components/Account":4,"./components/Dashboard":5,"./components/Header":7,"./components/Login":8,"./components/Navigation":9,"./components/Report":11,"./components/Search":13,"./components/Support":15,"./config":17,"./constants/pubRecConstants":18,"./stores/resultsStore":21,"./stores/userStore":22,"lodash":"lodash","react":"react","react-dom":"react-dom","react-router":79}],4:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,r,o){return r&&e(t.prototype,r),o&&e(t,o),t}}(),_config=require("../config.js"),_config2=_interopRequireDefault(_config),_lodash=require("lodash"),_lodash2=_interopRequireDefault(_lodash),_react=require("react"),_react2=_interopRequireDefault(_react),_viewActions=require("../actions/viewActions"),_viewActions2=_interopRequireDefault(_viewActions),Support=function(e){function t(e){_classCallCheck(this,t);var r=_possibleConstructorReturn(this,Object.getPrototypeOf(t).call(this,e));return r.doLogout=r.doLogout.bind(r),r}return _inherits(t,e),_createClass(t,[{key:"doLogout",value:function(){_viewActions2["default"].logout()}},{key:"render",value:function(){return _react2["default"].createElement("div",null,"ACCOUNT PAGE!!!",_react2["default"].createElement("br",null),_react2["default"].createElement("button",{onClick:this.doLogout},"Logout"))}}]),t}(_react.Component);exports["default"]=Support;var styles={};

},{"../actions/viewActions":2,"../config.js":17,"lodash":"lodash","react":"react"}],5:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(exports,"__esModule",{value:!0});var _extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o])}return e},_createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,r,o){return r&&e(t.prototype,r),o&&e(t,o),t}}(),_config=require("../config.js"),_config2=_interopRequireDefault(_config),_lodash=require("lodash"),_lodash2=_interopRequireDefault(_lodash),_react=require("react"),_react2=_interopRequireDefault(_react),_reactRouter=require("react-router"),_viewActions=require("../actions/viewActions"),_viewActions2=_interopRequireDefault(_viewActions),_userStore=require("../stores/userStore"),_userStore2=_interopRequireDefault(_userStore),_DashboardRow=require("./DashboardRow"),_DashboardRow2=_interopRequireDefault(_DashboardRow),Support=function(e){function t(){return _classCallCheck(this,t),_possibleConstructorReturn(this,Object.getPrototypeOf(t).apply(this,arguments))}return _inherits(t,e),_createClass(t,[{key:"componentWillMount",value:function(){_viewActions2["default"].getUsage(this.props.appState.user.id)}},{key:"render",value:function(){return _react2["default"].createElement("div",null,"DASHBOARD",_react2["default"].createElement("ul",null,this.props.appState.usage.map(function(e){return _react2["default"].createElement(_DashboardRow2["default"],_extends({key:JSON.stringify(e.data.id)},e))})))}}]),t}(_react.Component);exports["default"]=Support;var styles={};

},{"../actions/viewActions":2,"../config.js":17,"../stores/userStore":22,"./DashboardRow":6,"lodash":"lodash","react":"react","react-router":79}],6:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0});var _config=require("../config.js"),_config2=_interopRequireDefault(_config),_react=require("react"),_react2=_interopRequireDefault(_react),_reactRouter=require("react-router"),DashboardRow=function(e){return _react2["default"].createElement("li",null,_react2["default"].createElement(_reactRouter.Link,{to:"/people/"+e.id[2]},e.data.name.first," ",e.data.name.last))};exports["default"]=DashboardRow;var styles={};

},{"../config.js":17,"react":"react","react-router":79}],7:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),_config=require("../config.js"),_config2=_interopRequireDefault(_config),_react=require("react"),_react2=_interopRequireDefault(_react),Header=function(e){function t(){return _classCallCheck(this,t),_possibleConstructorReturn(this,Object.getPrototypeOf(t).apply(this,arguments))}return _inherits(t,e),_createClass(t,[{key:"render",value:function(){return _react2["default"].createElement("header",{style:styles.header},_react2["default"].createElement("img",{style:styles.logo,src:"img/tf-logo-white.png"}))}}]),t}(_react.Component);exports["default"]=Header;var styles={header:{backgroundColor:_config2["default"].themeStyles.brandGreen,padding:"20px 0 10px",height:20,position:"fixed",top:0,left:0,width:"100%",zIndex:99999},logo:{display:"block",margin:"0 auto",width:140,height:19}};

},{"../config.js":17,"react":"react"}],8:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),_config=require("../config.js"),_config2=_interopRequireDefault(_config),_lodash=require("lodash"),_lodash2=_interopRequireDefault(_lodash),_react=require("react"),_react2=_interopRequireDefault(_react),_viewActions=require("../actions/viewActions"),_viewActions2=_interopRequireDefault(_viewActions),Login=function(e){function t(e){_classCallCheck(this,t);var n=_possibleConstructorReturn(this,Object.getPrototypeOf(t).call(this,e));return n.state={email:"",password:""},n.doLogin=n.doLogin.bind(n),n.handleChange=n.handleChange.bind(n),n}return _inherits(t,e),_createClass(t,[{key:"doLogin",value:function(){_viewActions2["default"].login(this.state)}},{key:"handleChange",value:function(e){var t={};t[e.target.name]=e.target.value,this.setState(t)}},{key:"render",value:function(){return _react2["default"].createElement("div",null,_react2["default"].createElement("input",{type:"text",placeholder:"Email Address",defaultValue:this.state.email,style:styles.textInput,name:"email",onChange:this.handleChange}),_react2["default"].createElement("input",{type:"password",placeholder:"Password",defaultValue:this.state.password,style:styles.textInput,name:"password",onChange:this.handleChange}),_react2["default"].createElement("button",{style:styles.button,onClick:this.doLogin},"Login"))}}]),t}(_react.Component);exports["default"]=Login;var styles={};

},{"../actions/viewActions":2,"../config.js":17,"lodash":"lodash","react":"react"}],9:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),_config=require("../config.js"),_config2=_interopRequireDefault(_config),_react=require("react"),_react2=_interopRequireDefault(_react),_reactRouter=require("react-router"),Navigation=function(e){function t(){return _classCallCheck(this,t),_possibleConstructorReturn(this,Object.getPrototypeOf(t).apply(this,arguments))}return _inherits(t,e),_createClass(t,[{key:"render",value:function(){return _react2["default"].createElement("nav",{style:styles.navigation},_react2["default"].createElement("ul",{style:styles.navBar},_react2["default"].createElement("li",{style:styles.navItem},_react2["default"].createElement(_reactRouter.IndexLink,{to:"/",style:styles.link,activeStyle:styles.active},"H")),_react2["default"].createElement("li",{style:styles.navItem},_react2["default"].createElement(_reactRouter.Link,{to:"/search",style:styles.link,activeStyle:styles.active},"S")),_react2["default"].createElement("li",{style:styles.navItem},_react2["default"].createElement(_reactRouter.Link,{to:"/support",style:styles.link,activeStyle:styles.active},"C")),_react2["default"].createElement("li",{style:styles.navItem},_react2["default"].createElement(_reactRouter.Link,{to:"/account",style:styles.link,activeStyle:styles.active},"A"))))}}]),t}(_react.Component);exports["default"]=Navigation;var styles={navigation:{backgroundColor:_config2["default"].themeStyles.brandWhite,padding:"15px 0",position:"fixed",bottom:0,left:0,width:"100%",height:50,boxSizing:"border-box",borderTop:"1px solid "+_config2["default"].themeStyles.brandGray,zIndex:99999},navBar:{listStyle:"none",margin:0,padding:0},navItem:{display:"block","float":"left",width:"25%",boxSizing:"border-box",padding:"0 10px",textAlign:"center"},link:{color:_config2["default"].themeStyles.brandBlack},active:{color:_config2["default"].themeStyles.brandBlue,textShadow:"0 0 3px "+_config2["default"].themeStyles.brandBlue}};

},{"../config.js":17,"react":"react","react-router":79}],10:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0});var _config=require("../config.js"),_config2=_interopRequireDefault(_config),_react=require("react"),_react2=_interopRequireDefault(_react),_TeaserLink=require("./TeaserLink"),_TeaserLink2=_interopRequireDefault(_TeaserLink),PersonRow=function(e){var r=e.locations?e.locations[0].address.display:"";return _react2["default"].createElement("li",null,e.names[0].first," ",e.names[0].last," - ",r,_react2["default"].createElement(_TeaserLink2["default"],{person:e,reportType:_config2["default"].constants.reportTypes.PERSON,buttonText:"Open Report"}))};exports["default"]=PersonRow;var styles={};

},{"../config.js":17,"./TeaserLink":16,"react":"react"}],11:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,r,o){return r&&e(t.prototype,r),o&&e(t,o),t}}(),_config=require("../config.js"),_config2=_interopRequireDefault(_config),_pubRecConstants=require("../constants/pubRecConstants"),_pubRecConstants2=_interopRequireDefault(_pubRecConstants),_lodash=require("lodash"),_lodash2=_interopRequireDefault(_lodash),_react=require("react"),_react2=_interopRequireDefault(_react),_reactRouter=require("react-router"),_viewActions=require("../actions/viewActions"),_viewActions2=_interopRequireDefault(_viewActions),_reportStore=require("../stores/reportStore"),_reportStore2=_interopRequireDefault(_reportStore),Report=function(e){function t(e){_classCallCheck(this,t);var r=_possibleConstructorReturn(this,Object.getPrototypeOf(t).call(this,e));return r.state={report:null,isLoading:!1},r.onReportChange=r.onReportChange.bind(r),r}return _inherits(t,e),_createClass(t,[{key:"onReportChange",value:function(){console.log("report change triggered"),this.setState({report:_reportStore2["default"].getCurrentReport(),isLoading:!1})}},{key:"componentWillMount",value:function(){_reportStore2["default"].addChangeListener(this.onReportChange),_viewActions2["default"].fetchReport({reportType:this.props.params.reportType,recordId:this.props.params.recordId})}},{key:"componentWillReceiveProps",value:function(e){console.log("componentWillReceiveProps"),e.params.reportType===this.props.params.reportType&&e.params.recordId===this.props.params.recordId||(this.setState({isLoading:!0}),_viewActions2["default"].fetchReport({reportType:e.params.reportType,recordId:e.params.recordId}))}},{key:"componentWillUnmount",value:function(){_reportStore2["default"].removeChangeListener(this.onReportChange)}},{key:"render",value:function(){return console.log("report rendering"),console.log(this.state.report),this.state.report?this.state.isLoading?_react2["default"].createElement("div",{style:styles.loading},_react2["default"].createElement("div",{style:styles.loader},_react2["default"].createElement("div",{style:styles.loadingText},"LOADING...")),_react2["default"].createElement(PersonReport,{person:this.state.report})):_react2["default"].createElement("div",null,_react2["default"].createElement(PersonReport,{person:this.state.report})):_react2["default"].createElement("div",null,"Fetching Record ID: ",this.props.params.recordId," ...")}}]),t}(_react.Component);exports["default"]=Report;var PersonReport=function(e){var t=e.person,r=(e.person.reportMeta.isPremium,[]);return r.push(_react2["default"].createElement(PersonalSection,{key:"report-section-"+Math.ceil(1e4*Math.random()),person:t})),_react2["default"].createElement("div",null,_react2["default"].createElement("p",null,t.names[0].first," ",t.names[0].last," - ",t.reportMeta.recordId,_react2["default"].createElement("br",null),_react2["default"].createElement(_reactRouter.Link,{to:"/people/8fa0274d-9c15-4595-9367-c8e1ab595087"},"Go to Joe's report"),_react2["default"].createElement("br",null),_react2["default"].createElement(_reactRouter.Link,{to:"/people/51070b95-0216-4c80-b790-887fb3e6ebf7"},"Go to Brian's report"),_react2["default"].createElement("br",null),_react2["default"].createElement(_reactRouter.Link,{to:"/people/"+Date.now()},"Go to a broken/unseen report")),_react2["default"].createElement("h1",null,"Report Data"),r)},PersonalSection=function(e){var t=e.person,r=t.names[0],o=t.names.slice(1);return _react2["default"].createElement("section",{style:styles.personalSection},_react2["default"].createElement("h3",null,"Personal Data"),_react2["default"].createElement(PersonalSectionRow,{rowLabel:"Name",key:"name-"+Math.ceil(1e5*Math.random()),rowContent:r.first+" "+r.middle+" "+r.last}),_react2["default"].createElement(PersonalSectionRowSeparator,null),o.map(function(e){return _react2["default"].createElement(PersonalSectionRow,{rowLabel:"Alias",key:"alias-"+Math.ceil(1e5*Math.random()),rowContent:e.first+" "+e.middle+" "+e.last})}))},PersonalSectionRow=function(e){return _react2["default"].createElement("div",null,e.rowLabel,": ",e.rowContent)},PersonalSectionRowSeparator=function(e){return _react2["default"].createElement("hr",null)},styles={loading:{position:"relative"},loader:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(0, 0, 0, .5)"},loadingText:{position:"absolute",top:"50%",width:"100%",textAlign:"center",textTransform:"uppercase",transform:"translateY(-50%)",fontSize:"20px"},personalSection:{}};

},{"../actions/viewActions":2,"../config.js":17,"../constants/pubRecConstants":18,"../stores/reportStore":20,"lodash":"lodash","react":"react","react-router":79}],12:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0});var _extends=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},_config=require("../config.js"),_config2=_interopRequireDefault(_config),_react=require("react"),_react2=_interopRequireDefault(_react),_PersonRow=require("./PersonRow"),_PersonRow2=_interopRequireDefault(_PersonRow),ResultsList=function(e){return _react2["default"].createElement("ul",{id:"results"},e.results.map(function(e){return _react2["default"].createElement(_PersonRow2["default"],_extends({key:e["@search_pointer"]},e))}))};exports["default"]=ResultsList;var styles={};

},{"../config.js":17,"./PersonRow":10,"react":"react"}],13:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),_config=require("../config.js"),_config2=_interopRequireDefault(_config),_lodash=require("lodash"),_lodash2=_interopRequireDefault(_lodash),_react=require("react"),_react2=_interopRequireDefault(_react),_SearchForm=require("./SearchForm"),_SearchForm2=_interopRequireDefault(_SearchForm),_ResultsList=require("./ResultsList"),_ResultsList2=_interopRequireDefault(_ResultsList),Search=function(e){function t(){return _classCallCheck(this,t),_possibleConstructorReturn(this,Object.getPrototypeOf(t).apply(this,arguments))}return _inherits(t,e),_createClass(t,[{key:"render",value:function(){var e=this.props.appState.search;return e.searching?_react2["default"].createElement("div",null,_react2["default"].createElement(_SearchForm2["default"],{firstName:e.criteria.firstName,lastName:e.criteria.lastName,state:e.criteria.state}),_react2["default"].createElement("p",null,"We are currently searching for ",e.criteria.firstName," ",e.criteria.lastName," in ",e.criteria.state)):e.results?_react2["default"].createElement("div",null,_react2["default"].createElement(_SearchForm2["default"],{firstName:e.criteria.firstName,lastName:e.criteria.lastName,state:e.criteria.state}),_react2["default"].createElement(_ResultsList2["default"],{results:e.results})):_react2["default"].createElement("div",null,_react2["default"].createElement(_SearchForm2["default"],{firstName:e.criteria.firstName,lastName:e.criteria.lastName,state:e.criteria.state}))}}]),t}(_react.Component);exports["default"]=Search;var styles={};

},{"../config.js":17,"./ResultsList":12,"./SearchForm":14,"lodash":"lodash","react":"react"}],14:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}(),_config=require("../config.js"),_config2=_interopRequireDefault(_config),_lodash=require("lodash"),_lodash2=_interopRequireDefault(_lodash),_react=require("react"),_react2=_interopRequireDefault(_react),_viewActions=require("../actions/viewActions"),_viewActions2=_interopRequireDefault(_viewActions),SearchForm=function(e){function t(e){_classCallCheck(this,t);var a=_possibleConstructorReturn(this,Object.getPrototypeOf(t).call(this,e));return a.doSearch=a.doSearch.bind(a),a}return _inherits(t,e),_createClass(t,[{key:"handleInputChange",value:function(e){_viewActions2["default"].updateSearchCriteria({field:e.target.name,value:e.target.value})}},{key:"doSearch",value:function(){_viewActions2["default"].search({firstName:this.props.firstName,lastName:this.props.lastName,state:this.props.state})}},{key:"render",value:function(){return _react2["default"].createElement("div",null,_react2["default"].createElement("input",{type:"text",placeholder:"First Name",defaultValue:this.props.firstName,style:styles.textInput,onBlur:this.handleInputChange,name:"firstName"}),_react2["default"].createElement("input",{type:"text",placeholder:"Last Name",defaultValue:this.props.lastName,style:styles.textInput,onBlur:this.handleInputChange,name:"lastName"}),_react2["default"].createElement("select",{name:"state",defaultValue:this.props.state,onChange:this.handleInputChange,style:styles.select},_react2["default"].createElement("option",{value:"ALL"},"All"),_react2["default"].createElement("option",{value:"CA"},"California")),_react2["default"].createElement("button",{style:styles.button,onClick:this.doSearch},"Search"))}}]),t}(_react.Component);exports["default"]=SearchForm;var styles={button:{fontWeight:"bold",width:"100%",padding:"15px 0",fontSize:18},textInput:{height:40,padding:5,"float":"left",width:"50%"},select:{clear:"both",width:"100%",height:40}};

},{"../actions/viewActions":2,"../config.js":17,"lodash":"lodash","react":"react"}],15:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),_config=require("../config.js"),_config2=_interopRequireDefault(_config),_lodash=require("lodash"),_lodash2=_interopRequireDefault(_lodash),_react=require("react"),_react2=_interopRequireDefault(_react),Support=function(e){function t(){return _classCallCheck(this,t),_possibleConstructorReturn(this,Object.getPrototypeOf(t).apply(this,arguments))}return _inherits(t,e),_createClass(t,[{key:"render",value:function(){return _react2["default"].createElement("div",null,"SUPPORT PAGE!!!")}}]),t}(_react.Component);exports["default"]=Support;var styles={};

},{"../config.js":17,"lodash":"lodash","react":"react"}],16:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),_config=require("../config.js"),_config2=_interopRequireDefault(_config),_pubRecConstants=require("../constants/pubRecConstants"),_pubRecConstants2=_interopRequireDefault(_pubRecConstants),_lodash=require("lodash"),_lodash2=_interopRequireDefault(_lodash),_react=require("react"),_react2=_interopRequireDefault(_react),_viewActions=require("../actions/viewActions"),_viewActions2=_interopRequireDefault(_viewActions),TeaserLink=function(e){function t(e){_classCallCheck(this,t);var r=_possibleConstructorReturn(this,Object.getPrototypeOf(t).call(this,e));return r.selectTeaser=r.selectTeaser.bind(r),r}return _inherits(t,e),_createClass(t,[{key:"createPersonRecord",value:function(){var e=this.props.person,t={pointer:e["@search_pointer"],lexis_id:e["@id"],name:{first:null,last:null,middle:null,raw:null,suffix:null,type:null},location:{address:{street:null,street2:null,city:null,state:null,zip_code:null}},dobs:{date:null,date_range:null},dods:{date:null,date_range:null}};return e.names&&(t.name={first:e.names[0].first,last:e.names[0].last,middle:e.names[0].middle,raw:e.names[0].raw,suffix:e.names[0].suffix,type:e.names[0].type}),e.locations&&(t.location.address={street:e.locations[0].address.street,street2:e.locations[0].address.street2,city:e.locations[0].address.city,state:e.locations[0].address.state,zip_code:e.locations[0].address.zip_code}),e.dobs&&(t.dobs={date:e.dobs[0].date,date_range:e.dobs[0].date_range}),e.dods&&(t.dods={date:e.dods[0].date,date_range:e.dods[0].date_range}),t}},{key:"selectTeaser",value:function(){var e=void 0;switch(this.props.reportType){case _pubRecConstants2["default"].reportTypes.PERSON:e=this.createPersonRecord()}_viewActions2["default"].fetchRecordId(e,this.props.reportType)}},{key:"render",value:function(){return _react2["default"].createElement("button",{onClick:this.selectTeaser},this.props.buttonText)}}]),t}(_react.Component);exports["default"]=TeaserLink;var styles={};

},{"../actions/viewActions":2,"../config.js":17,"../constants/pubRecConstants":18,"lodash":"lodash","react":"react"}],17:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]={API_ROOT:"http://www.api.truthfinder.app.public-records.local.tcg.io",themeStyles:{brandBlue:"#209DD2",brandGreen:"#57bf93",brandYellow:"#ffd20a",brandBlack:"#3e3e3e",brandWhite:"#fff",brandGray:"#e1e1e1",brandSlate:"#607d8b"},constants:{actions:{SEARCH:"SEARCH",UPDATE_CRITERIA:"UPDATE_CRITERIA",ADD_RECORD:"ADD_RECORD",CLEAR_NAVIGATION:"CLEAR_NAVIGATION",FETCH_REPORT:"FETCH_REPORT",LOGIN:"LOGIN",LOGOUT:"LOGOUT"},reportTypes:{PERSON:"people",PHONE:"phones",LOCATION:"locations"}}};

},{}],18:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]={actions:{SEARCH:"SEARCH",RECEIVE_SEARCH_RESULTS:"RECEIVE_SEARCH_RESULTS",UPDATE_CRITERIA:"UPDATE_CRITERIA",FETCH_RECORD_ID:"FETCH_RECORD_ID",RECEIVE_RECORD_ID:"RECEIVE_RECORD_ID",CLEAR_NAVIGATION:"CLEAR_NAVIGATION",FETCH_REPORT:"FETCH_REPORT",RECEIVE_REPORT:"RECEIVE_REPORT",LOGIN:"LOGIN",RECEIVE_USER:"RECEIVE_USER",LOGOUT:"LOGOUT",RECEIVE_USAGE:"RECEIVE_USAGE"},reportTypes:{PERSON:"people",PHONE:"phones",LOCATION:"locations"}};

},{}],19:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _flux=require("flux");exports["default"]=new _flux.Dispatcher;

},{"flux":"flux"}],20:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,r,o){return r&&e(t.prototype,r),o&&e(t,o),t}}(),_events=require("events"),_pubRecConstants=require("../constants/pubRecConstants"),_pubRecConstants2=_interopRequireDefault(_pubRecConstants),_config=require("../config.js"),_config2=_interopRequireDefault(_config),_lodash=require("lodash"),_lodash2=_interopRequireDefault(_lodash),_dispatcher=require("../dispatcher"),_dispatcher2=_interopRequireDefault(_dispatcher);require("isomorphic-fetch");var _testPerson=require("../testPerson"),_testPerson2=_interopRequireDefault(_testPerson);require("es6-promise").polyfill();var CHANGE_EVENT="change",_reportHistory=[],_errors=null,ReportStore=function(e){function t(){return _classCallCheck(this,t),_possibleConstructorReturn(this,Object.getPrototypeOf(t).apply(this,arguments))}return _inherits(t,e),_createClass(t,[{key:"getCurrentReport",value:function(){return _reportHistory[_reportHistory.length-1]||null}},{key:"emitChange",value:function(){this.emit(CHANGE_EVENT)}},{key:"addChangeListener",value:function(e){this.on(CHANGE_EVENT,e)}},{key:"removeChangeListener",value:function(e){this.removeListener(CHANGE_EVENT,e)}}]),t}(_events.EventEmitter),reportStore=new ReportStore;_dispatcher2["default"].register(function(e){switch(e.actionType){case _pubRecConstants2["default"].actions.RECEIVE_REPORT:var t=_lodash2["default"].findIndex(_reportHistory,{reportMeta:{recordId:e.report.reportMeta.recordId}});t>=0&&_reportHistory.splice(t,1)[0],_reportHistory.push(e.report),_reportHistory.length>10&&_reportHistory.shift(),reportStore.emitChange();break;case _pubRecConstants2["default"].actions.FETCH_RECORD_ID:break;case _pubRecConstants2["default"].actions.RECEIVE_RECORD_ID:console.log(e.recordId),console.log(e.reportType)}}),exports["default"]=reportStore;

},{"../config.js":17,"../constants/pubRecConstants":18,"../dispatcher":19,"../testPerson":23,"es6-promise":28,"events":"events","isomorphic-fetch":47,"lodash":"lodash"}],21:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),_events=require("events"),_config=require("../config.js"),_config2=_interopRequireDefault(_config),_pubRecConstants=require("../constants/pubRecConstants"),_pubRecConstants2=_interopRequireDefault(_pubRecConstants),_lodash=require("lodash"),_lodash2=_interopRequireDefault(_lodash),_dispatcher=require("../dispatcher"),_dispatcher2=_interopRequireDefault(_dispatcher),CHANGE_EVENT="change",_results=[],_criteria={},_searching=!1,ResultsStore=function(e){function t(){return _classCallCheck(this,t),_possibleConstructorReturn(this,Object.getPrototypeOf(t).apply(this,arguments))}return _inherits(t,e),_createClass(t,[{key:"getAllResults",value:function(){return _results}},{key:"getCriteria",value:function(){return _criteria}},{key:"isSearching",value:function(){return _searching}},{key:"emitChange",value:function(){this.emit(CHANGE_EVENT)}},{key:"addChangeListener",value:function(e){this.on(CHANGE_EVENT,e)}},{key:"removeChangeListener",value:function(e){this.removeListener(CHANGE_EVENT,e)}}]),t}(_events.EventEmitter),resultsStore=new ResultsStore;_dispatcher2["default"].register(function(e){switch(e.actionType){case _pubRecConstants2["default"].actions.UPDATE_CRITERIA:_criteria[e.updates.field]=e.updates.value,resultsStore.emitChange();break;case _pubRecConstants2["default"].actions.SEARCH:_searching=!0,resultsStore.emitChange();break;case _pubRecConstants2["default"].actions.CLEAR_SEARCH_RESULTS:_results=[],_criteria={},_searching=!1,resultsStore.emitChange();break;case _pubRecConstants2["default"].actions.RECEIVE_SEARCH_RESULTS:_searching=!1,_results=e.results,resultsStore.emitChange()}}),exports["default"]=resultsStore;

},{"../config.js":17,"../constants/pubRecConstants":18,"../dispatcher":19,"events":"events","lodash":"lodash"}],22:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),_events=require("events"),_config=require("../config.js"),_config2=_interopRequireDefault(_config),_pubRecConstants=require("../constants/pubRecConstants"),_pubRecConstants2=_interopRequireDefault(_pubRecConstants),_lodash=require("lodash"),_lodash2=_interopRequireDefault(_lodash),_dispatcher=require("../dispatcher"),_dispatcher2=_interopRequireDefault(_dispatcher),CHANGE_EVENT="change",_user=null,_usage=[],UserStore=function(e){function t(){return _classCallCheck(this,t),_possibleConstructorReturn(this,Object.getPrototypeOf(t).apply(this,arguments))}return _inherits(t,e),_createClass(t,[{key:"getUser",value:function(){return _user}},{key:"getUsage",value:function(){return _usage}},{key:"isLoggedIn",value:function(){return null!==_user}},{key:"emitChange",value:function(){this.emit(CHANGE_EVENT)}},{key:"addChangeListener",value:function(e){this.on(CHANGE_EVENT,e)}},{key:"removeChangeListener",value:function(e){this.removeListener(CHANGE_EVENT,e)}}]),t}(_events.EventEmitter),userStore=new UserStore;_dispatcher2["default"].register(function(e){switch(e.actionType){case _pubRecConstants2["default"].actions.RECEIVE_USER:_user=e.user,userStore.emitChange();break;case _pubRecConstants2["default"].actions.RECEIVE_USAGE:console.log(e.usage),_usage=e.usage,userStore.emitChange();break;case _pubRecConstants2["default"].actions.LOGOUT:_user=null,_usage=[],userStore.emitChange()}}),exports["default"]=userStore;

},{"../config.js":17,"../constants/pubRecConstants":18,"../dispatcher":19,"events":"events","lodash":"lodash"}],23:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]={inferred:!1,included_with:"",confidence:0,score:0,criteria:null,"@provider":"local.person.lexis.basic,local.person.lexis.email,local.person.lexis.teaser,pipl,local.person.npd.marriage,local.person.npd.criminal_records_name_state,local.person.bustedmugs.mugshot_search","@valid_since":{month:0,day:0,year:0},completeness:{counts:{"@id":1,"@provider_ids":3,"@search_pointer":0,accidents:0,additional_records:0,aircrafts:0,associates:0,available_criminal_records:0,bankruptcies:0,best_info:0,comp_person:0,concealed_weapon_id:0,consumer_snapshot:0,controlled_substances:0,corporate_affiliations:0,country:0,criminal_conviction_id:0,criminal_records:1,date_first_seen:1,date_last_cohabit:0,date_last_seen:1,dating_profiles:0,death_county:0,death_state:0,death_verification_code:0,divorces:1,dobs:2,dods:0,driver_licenses:0,educations:0,emails:1,ethnicity:0,faa_certifications:0,faa_licenses:0,firearm_explosives:0,foreclosures:0,gender:1,hunting_fishing_licenses:0,images:1,imposters:0,jobs:8,language:0,liens_judgments:0,locations:4,marriages:2,meta:1,names:2,notices_of_defaults:0,people_at_works:0,phones:1,possible_persons:0,possible_student_records:0,probability:0,professional_licenses:0,properties:0,providers:0,related_persons:5,relationships:0,sanctions:0,sexual_offender_id:0,sexual_offenses:0,source_sections:0,sources:8,ssn_info:0,subject_ssn_indicator:0,superior_liens:0,type:1,ucc_filings:0,urls:1,user_ids:0,usernames:0,vehicles:0,voter_registrations:0,watercrafts:0,weapon_permits:0,websites:0},scores:{naive:.3320227173438183}},type:"subject","@id":"043814721055","@provider_ids":[{id:"043814721055",provider:"local.person.lexis.basic"},{id:"043814721055",provider:"lexis"},{id:"823d2178-cc1f-490d-9877-0fcbfa64bb1e",provider:"pipl"}],"@search_pointer":"4:eJyKVsrKT1XSUQKitNKitMSifAgHDRmYGFsYmpgbGRqYmirFAgIAAP__VOELiA==",date_first_seen:{date:null,date_range:{start:{month:2,day:1,year:2004},end:{month:2,day:29,year:2004}}},date_last_seen:{date:null,date_range:{start:{month:12,day:1,year:2015},end:{month:12,day:31,year:2015}}},dobs:[{inferred:!1,included_with:"",confidence:0,score:0,criteria:null,"@provider":"local.person.lexis.basic","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},date:{month:6,day:25,year:1985},date_range:null,age:30,zodiac:{sign:"cancer",overview:"Coupled Cancers will feel the effects of amorous Venus between now and October 28. Sure, you want to connect on an intellectual level, but allow for some intimate explorations to fire things up between the sheets. Single? Try something new! Though you're not one to have a booty-buddy, now might be time for a no-strings attached fling. For now, it could be much more satisfying than you've ever allowed yourself to believe.\n       ",personality:"Cancer is a water sign, symbolized by the crab. This is a nurturing, sensitive sign who enjoys the creature comforts of home. Many Cancers have a fierce domestic streak and enjoy staying home, surrounded by loved ones. This sign honors tradition and strives to uphold family values. However, Cancers are ruled by the temperamental Moon, and their moods can change at a momentâ??s notice. But, this sensitivity also makes them extremely empathetic. When you need a friend, turn to an understanding Cancer. ",description:"",date_range:"Jun 21 - Jul 22",horoscope:{horoscope:"",date:{month:5,day:26,year:2016},content:"A seemingly trivial issue seems to get harder and harder as the day goes on. You can’t quite figure out what’s what, but you can probably get some help if you ask the right person."}}},{inferred:!1,included_with:"",confidence:0,score:0,criteria:null,"@provider":"local.person.lexis.email","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},date:{month:6,day:21,year:1985},date_range:null,age:0,zodiac:{sign:"cancer",overview:"Coupled Cancers will feel the effects of amorous Venus between now and October 28. Sure, you want to connect on an intellectual level, but allow for some intimate explorations to fire things up between the sheets. Single? Try something new! Though you're not one to have a booty-buddy, now might be time for a no-strings attached fling. For now, it could be much more satisfying than you've ever allowed yourself to believe.\n       ",personality:"Cancer is a water sign, symbolized by the crab. This is a nurturing, sensitive sign who enjoys the creature comforts of home. Many Cancers have a fierce domestic streak and enjoy staying home, surrounded by loved ones. This sign honors tradition and strives to uphold family values. However, Cancers are ruled by the temperamental Moon, and their moods can change at a momentâ??s notice. But, this sensitivity also makes them extremely empathetic. When you need a friend, turn to an understanding Cancer. ",description:"",date_range:"Jun 21 - Jul 22",horoscope:{horoscope:"",date:{month:5,day:26,year:2016},content:"A seemingly trivial issue seems to get harder and harder as the day goes on. You can’t quite figure out what’s what, but you can probably get some help if you ask the right person."}}}],dods:null,gender:{inferred:!1,included_with:"",confidence:0,score:0,criteria:null,"@provider":"local.person.lexis.basic","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},content:"Male"},ethnicity:null,language:null,country:null,locations:[{inferred:!1,included_with:"",confidence:0,score:0,criteria:null,"@provider":"local.person.lexis.basic","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},date_first_seen:{date:null,date_range:{start:{month:2,day:1,year:2004},end:{month:2,day:29,year:2004}}},date_last_seen:{date:null,date_range:{start:{month:12,day:1,year:2015},end:{month:12,day:31,year:2015}}},shared:null,residents:null,properties:null,verified:null,"@search_pointer":"4:eJyKVrIwNlLwzcxJTC_KL05UcC5R0lFyzijNSVQIyywuSQTxEnMy0_KL8jLBHEcgYWloaWgApC0MDIyBFFw3SB6k39hIz8zUwMQMyNQ1NDTXMzA2NDFRigUEAAD__4y9HF0=",address:{inferred:!1,included_with:"",confidence:0,score:0,criteria:null,"@provider":"local.person.lexis.basic","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},display:"832 Milagrosa Ct\nChula Vista, CA 91910-8003",type:"Street; address contains a valid primary number range.",usage:"Residential",country:"US",county:"San Diego",county_fips:"06073",congressional_district:"51",city:"Chula Vista",state:"California",state_code:"CA",street:"832 Milagrosa Ct",street_post_direction:"",street_pre_direction:"",street_name:"Milagrosa",street_suffix:"Ct",street1:"832 Milagrosa Ct",street2:"",street_number:"832",unit_number:"",zip_code:"91910",zip4:"8003",ZipType:"Standard",po_box:"",unit_designation:"",is_deliverable:!0,is_receiving_mail:!0,coordinates:{latitude:32.65046,longitude:-117.03144,accuracy:"Accurate to a 9-digit ZIP Code level (most precise but NOT rooftop level)"},time_zone:"Pacific",utc_offset:-8,dst:!0,active:!0,high_risk_indicators:null,dpv:{match_code:"Confirmed; entire address was DPV confirmed deliverable.",footnotes:"City/state/ZIP + street are all valid. ZIP+4 matched; confirmed entire address; address is valid. ",cmra:!1,vacant:!1},date_last_seen:{date:{month:12,day:31,year:2015},date_range:null},date_first_seen:{date:{month:2,day:1,year:2004},date_range:null}},crime:null,sex_offenders:null,sex_offenders_count:35,criminals:null,census:null,forecast:null,nearby_persons:null,neighbors:null,historical_neighbors:null,LocationID:"",top_cities:null,zip_codes:null},{inferred:!1,included_with:"",confidence:0,score:0,criteria:null,"@provider":"local.person.lexis.basic","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},date_first_seen:{date:null,date_range:{start:{month:1,day:1,year:2013},end:{month:12,day:31,year:2013}}},date_last_seen:{date:null,date_range:{start:{month:3,day:1,year:2016},end:{month:3,day:31,year:2016}}},shared:null,residents:null,properties:null,verified:null,"@search_pointer":"4:eJyKVjI0MjJV8CzOScxLUXAsS1UIzcssUTAzMFPSUQpOzFNwyUxNzweynRNzMtPyi_IyE0EcRyBhaWRoYAikzU3NjYEUxAggA2gIkDQ20jM3NDA2BTJ1DQ3N9QxNjYHKYgEBAAD__7dcHGQ=",address:{inferred:!1,included_with:"",confidence:0,score:0,criteria:null,"@provider":"local.person.lexis.basic","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},display:"1225 Island Ave Unit 606\nSan Diego, CA 92101-7573",type:"High-rise; address contains apartment or building sub-units.",usage:"Residential",country:"US",county:"San Diego",county_fips:"06073",congressional_district:"52",city:"San Diego",state:"California",state_code:"CA",street:"1225 Island Ave Unit 606",street_post_direction:"",street_pre_direction:"",street_name:"Island",street_suffix:"Ave",street1:"1225 Island Ave",street2:"Unit 606",street_number:"1225",unit_number:"606",zip_code:"92101",zip4:"7573",ZipType:"Standard",po_box:"",unit_designation:"Unit",is_deliverable:!0,is_receiving_mail:!0,coordinates:{latitude:32.71035,longitude:-117.15373,accuracy:"Accurate to a 9-digit ZIP Code level (most precise but NOT rooftop level)"},time_zone:"Pacific",utc_offset:-8,dst:!0,active:!0,high_risk_indicators:null,dpv:{match_code:"Confirmed; entire address was DPV confirmed deliverable.",footnotes:"City/state/ZIP + street are all valid. ZIP+4 matched; confirmed entire address; address is valid. ",cmra:!1,vacant:!1},date_last_seen:{date:{month:3,day:31,year:2016},date_range:null},date_first_seen:{date:{month:1,day:1,year:2013},date_range:null}},crime:null,sex_offenders:null,sex_offenders_count:78,criminals:null,census:null,forecast:null,nearby_persons:null,neighbors:null,historical_neighbors:null,LocationID:"",top_cities:null,zip_codes:null},{inferred:!1,included_with:"",confidence:0,score:0,criteria:null,"@provider":"local.person.lexis.basic","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},date_first_seen:{date:null,date_range:{start:{month:1,day:1,year:2010},end:{month:12,day:31,year:2010}}},date_last_seen:{date:null,date_range:{start:{month:11,day:1,year:2014},end:{month:11,day:30,year:2014}}},shared:null,residents:null,properties:null,verified:null,"@search_pointer":"4:eJyKVjIxMzBQ8EnMzc8rUQguUTA0MlXSUQpOzFNwyUxNzweynRNzMtPyi_IyE0EcRyBhaWRoYAmkjU2NQBREM0gXiDA20rMwMDI2BzJ1DQ3N9YyMTS3MlGIBAQAA___DPxok",address:{inferred:!1,included_with:"",confidence:0,score:0,criteria:null,"@provider":"local.person.lexis.basic","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},display:"4600 Lamont St 125\nSan Diego, CA 92109-3529",type:"High-rise; address contains apartment or building sub-units.",usage:"Residential",country:"US",county:"San Diego",county_fips:"06073",congressional_district:"52",city:"San Diego",state:"California",state_code:"CA",street:"4600 Lamont St 125",street_post_direction:"",street_pre_direction:"",street_name:"Lamont",street_suffix:"St",street1:"4600 Lamont St",street2:"125",street_number:"4600",unit_number:"125125",zip_code:"92109",zip4:"3529",ZipType:"Standard",po_box:"",unit_designation:"",is_deliverable:!0,is_receiving_mail:!0,coordinates:{latitude:32.80237,longitude:-117.23586,accuracy:"Accurate to a 9-digit ZIP Code level (most precise but NOT rooftop level)"},time_zone:"Pacific",utc_offset:-8,dst:!0,active:!0,high_risk_indicators:null,dpv:{match_code:"Confirmed By Dropping Secondary; address was DPV confirmed by dropping secondary info (apartment, suite, etc.).",footnotes:"City/state/ZIP + street are all valid. Confirmed address by dropping secondary (apartment, suite, etc.) information. ",cmra:!1,vacant:!1},date_last_seen:{date:{month:11,day:30,year:2014},date_range:null},date_first_seen:{date:{month:1,day:1,year:2010},date_range:null}},crime:null,sex_offenders:null,sex_offenders_count:12,criminals:null,census:null,forecast:null,nearby_persons:null,neighbors:null,historical_neighbors:null,LocationID:"",top_cities:null,zip_codes:null},{inferred:!1,included_with:"",confidence:0,score:0,criteria:null,"@provider":"local.person.lexis.email","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},date_first_seen:null,date_last_seen:null,shared:null,residents:null,properties:null,verified:null,"@search_pointer":"4:eJyKVjI0MzBUcE0sylEITywqSs1TcClS0lHyyc9LV3BKTUzOAHKcE3My0_KL8jITQRxHIGFpYGFoCqRNDA0NgBSSdiAPbICxsZ65hYWpJZCpa2hooWdoaGlorBQLCAAA___VHBzw",address:{inferred:!1,included_with:"",confidence:0,score:0,criteria:null,"@provider":"local.person.lexis.email","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},display:"1601 Earl Warren Dr\nLong Beach, CA 90815-4110",type:"Street; address contains a valid primary number range.",usage:"Commercial",country:"US",county:"Los Angeles",county_fips:"06037",congressional_district:"47",city:"Long Beach",state:"California",state_code:"CA",street:"1601 Earl Warren Dr",street_post_direction:"",street_pre_direction:"",street_name:"Earl Warren",street_suffix:"Dr",street1:"1601 Earl Warren Dr",street2:"",street_number:"1601",unit_number:"",zip_code:"90815",zip4:"4110",ZipType:"Standard",po_box:"",unit_designation:"",is_deliverable:!0,is_receiving_mail:!0,coordinates:{latitude:33.78859,longitude:-118.11913,accuracy:"Accurate to a 9-digit ZIP Code level (most precise but NOT rooftop level)"},time_zone:"Pacific",utc_offset:-8,dst:!0,active:!0,high_risk_indicators:null,dpv:{match_code:"Confirmed; entire address was DPV confirmed deliverable.",footnotes:"City/state/ZIP + street are all valid. ZIP+4 matched; confirmed entire address; address is valid. ",cmra:!1,vacant:!1},date_last_seen:null,date_first_seen:null},crime:null,sex_offenders:null,sex_offenders_count:7,criminals:null,census:null,forecast:null,nearby_persons:null,neighbors:null,historical_neighbors:null,LocationID:"",top_cities:null,zip_codes:null}],educations:null,emails:[{inferred:!1,included_with:"",confidence:0,score:0,criteria:null,"@provider":"local.person.lexis.email,pipl,pipl,pipl,pipl,pipl","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},address:"ipod@modbikes.com",address_md5:"",disposable:!1,email_provider:!1,website:"HTTP://WWW.DAILYPRESS.COM/",login_date:{month:10,day:15,year:2003}}],images:[{inferred:!1,included_with:"",confidence:.99683,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:10,day:5,year:2015},completeness:{counts:null,scores:null},source_url:"http://www.linkedin.com/pub/joe-furfaro/3a/007/712",token:"0ta0H6wdnzqYExIZlimDaqnQpKkpf-U5-clzArHz9X_1f3yokOAHp9CkNKh4ffMPpGb1XaGpqUaysmyHco818oSjx9R8SAY0TuHqSP3cJ3aiqgiHzbr8TAfuchg1YzvE9vZtS-kuWGlCiOUzny7zCGAHsTbE1WJKD5nA09vJS5wGY_5XJ-X_",thumbnail_token:"3H8Hh5AktpzdsrosmSyw9-s4feXv64kOKYMY0sc-8JmLl5dGPvnK1S2OdxcQigvJlNoLsRNIe3P755f6DxuuM92CYypyWsolE2NWnc3RDgScq_GVv2HAFNdRst8wv6EU_Ea6LASY4ptyCJ__2IiL6DVR3nEmrbf9XFwhJgQ9Ep2ceKz-7xUwoOg_E9NSeNaevOy-zmp5KHZe6Y68_DbIhUVJzOhZmD7D-7CYqY-KAKRS_T2dhfBj-PDTVWnnU-smAvM1D2EHBb8ekHdfWDOnJhVNmYipHOdCXSXYLZhgP7pJ1x5yr48i3ezU975KxfhlpqNQm65CIKruinQm2R-benTZiI5gO84eZqL5qYuF4c9Lgyuo9Sa0_6Ac1EGQh3ltO4TlTZoSmbRRTQiMHTwGeCzGwNZC05VoBXa3N1sHuE4liUmwJj4Cfw==",url:"https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/2/000/215/10d/108f7bb.jpg",TypeName:""}],jobs:[{inferred:!1,included_with:"",confidence:.99683,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:10,day:5,year:2015},completeness:{counts:null,scores:null},title:"Graphic Designer/Web Developer, Co-Founder/Owner",organization:"Mr. Stache, Photographer",industry:"Graphic Design",date_range:{start:null,end:null},display:"Graphic Designer/Web Developer, Co-Founder/Owner at Mr. Stache, Photographer"},{inferred:!1,included_with:"",confidence:.99683,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:1,day:1,year:2014},completeness:{counts:null,scores:null},title:"Front End Developer",organization:"The Control Group Media Company, Inc.",industry:"",date_range:{start:null,end:null},display:"Front End Developer at The Control Group Media Company, Inc. (since 2013)"},{inferred:!1,included_with:"",confidence:.99683,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:10,day:5,year:2015},completeness:{counts:null,scores:null},title:"Front End Development Team Lead",organization:"The Control Group Media Company, Inc.",industry:"",date_range:{start:null,end:null},display:"Front End Development Team Lead at The Control Group Media Company, Inc. (since 2013)"},{inferred:!1,included_with:"",confidence:.99683,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:1,day:1,year:2014},completeness:{counts:null,scores:null},title:"Go-to-Guy",organization:"Ultra Design Agency",industry:"",date_range:{start:{month:1,day:1,year:2012},end:{month:2,day:1,year:2013}},display:"Go-to-Guy at Ultra Design Agency (2012-2013)"},{inferred:!1,included_with:"",confidence:.99683,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:12,day:10,year:2013},completeness:{counts:null,scores:null},title:"Co-Founder/Owner",organization:"Mr. Stache",industry:"Graphic Design",date_range:{start:null,end:null},display:"Co-Founder/Owner at Mr. Stache (since 2011)"},{inferred:!1,included_with:"",confidence:.99683,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:1,day:1,year:2014},completeness:{counts:null,scores:null},title:"Project Engineer",organization:"Largo Concrete Inc.",industry:"",date_range:{start:{month:9,day:1,year:2010},end:{month:10,day:1,year:2011}},display:"Project Engineer at Largo Concrete Inc. (2010-2011)"},{inferred:!1,included_with:"",confidence:.99683,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:1,day:1,year:2014},completeness:{counts:null,scores:null},title:"Project Engineer",organization:"Snyder Langston",industry:"",date_range:{start:{month:6,day:1,year:2007},end:{month:10,day:1,year:2009}},display:"Project Engineer at Snyder Langston (2007-2009)"},{inferred:!1,included_with:"",confidence:.99683,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:1,day:1,year:2014},completeness:{counts:null,scores:null},title:"Graphic/Web Designer, Co-Founder/Owner",organization:"Mr. Stache, Photographer",industry:"",date_range:{start:null,end:null},display:"Graphic/Web Designer, Co-Founder/Owner at Mr. Stache, Photographer"}],faa_licenses:null,names:[{inferred:!1,included_with:"",confidence:0,score:0,criteria:null,"@provider":"local.person.lexis.basic","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},type:"",first:"Joseph",middle:"J",last:"Furfaro",prefix:"Mr",suffix:"",raw:"",display:"Joseph J Furfaro",name_checks:null,first_meta:{possible_misspelling:!1,type:"",origin:"",usage:""}},{inferred:!1,included_with:"",confidence:0,score:0,criteria:null,"@provider":"local.person.lexis.email","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},type:"",first:"Joe",middle:"",last:"Furfaro",prefix:"",suffix:"",raw:"",display:"Joe Furfaro",name_checks:null,first_meta:{possible_misspelling:!1,type:"",origin:"",usage:""}}],phones:[{inferred:!1,included_with:"",confidence:0,score:0,criteria:null,"@provider":"local.person.lexis.basic","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},display:"(619) 482-2064",number:"6194822064",iso_country:"US",formatted:{national:6194822064,e164_number:"+16194822064",international:"+1 619-482-2064",rfc3966:"tel:+1-619-482-2064",extension:"",country_code:1,country_region_iso:"US"},"@search_pointer":"",line_type:"Landline",listing_types:[],extension:"",carrier:"AT&T California",do_not_call:null,is_prepaid:null,is_connected:null,reputation:{spam_score:0,spam_index:0,level:0,details:null},listing_name:"FURFARO JOSEPH",phone_region:{inferred:!1,included_with:"",confidence:0,score:0,criteria:null,"@provider":"","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},display:"",type:"",usage:"",country:"",county:"",county_fips:"",congressional_district:"",city:"CHULA VISTA",state:"CA",state_code:"",street:"",street_post_direction:"",street_pre_direction:"",street_name:"",street_suffix:"",street1:"",street2:"",street_number:"",unit_number:"",zip_code:"91910",zip4:"",ZipType:"",po_box:"",unit_designation:"",is_deliverable:!1,is_receiving_mail:!1,coordinates:{latitude:32.642526844845,longitude:-117.076307217357,accuracy:""},time_zone:"",utc_offset:0,dst:!1,active:!1,high_risk_indicators:null,dpv:{match_code:"",footnotes:"",cmra:!1,vacant:!1},date_last_seen:null,date_first_seen:null},is_old:!1,name:{inferred:!1,included_with:"",confidence:0,score:0,criteria:null,"@provider":"local.person.lexis.basic","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},type:"",first:"",middle:"",last:"",prefix:"",suffix:"",raw:"FURFARO JOSEPH",display:"",name_checks:null,first_meta:{possible_misspelling:!1,type:"",origin:"",usage:""}},date_first_seen:null,date_last_seen:null,high_risk_indicators:null,is_valid:null,phone_contact_score:0,phone_to_name:null,subscriber_name:"",warnings:null,subscriber_gender:"",is_commercial:null}],urls:[{inferred:!1,included_with:"",confidence:1,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:1,day:1,year:1},completeness:{counts:null,scores:null},source_id:"5013376cd23a12034c4fa1db48a5801a",name:"10Digits.us",category:"contact_details",domain:"10digits.us",url:"http://10digits.us/n/Joe_Furfaro/Sheridan_OR/9657fb687544a1cc9dd40c640adcccc2"}],usernames:null,user_ids:null,websites:null,relationships:null,related_persons:[{inferred:!1,included_with:"",confidence:0,score:0,criteria:null,"@provider":"local.person.lexis.teaser","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},type:"relative","@id":"113521617269","@provider_ids":null,"@search_pointer":"4:eJyKVlLSUfIFYrfSorTEonwgS8FXAcFBQ4aGxqZGhmaG5kZmlkqxgAAAAP__zDMN3Q==",date_first_seen:null,date_last_seen:null,dobs:null,dods:null,gender:null,ethnicity:null,language:null,country:null,locations:null,educations:null,emails:null,images:null,jobs:null,faa_licenses:null,names:[{inferred:!1,included_with:"",confidence:0,score:0,criteria:null,"@provider":"local.person.lexis.teaser","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},type:"",first:"",middle:"M",last:"Furfaro",prefix:"",suffix:"",raw:"",display:" M Furfaro",name_checks:null,first_meta:{possible_misspelling:!1,type:"",origin:"",usage:""}}],phones:null,urls:null,usernames:null,user_ids:null,websites:null,relationships:null,related_persons:null,possible_persons:null,bankruptcies:null,controlled_substances:null,sources:null,available_criminal_records:-1,criminal_records:null,marriages:null,divorces:null,additional_records:null,dating_profiles:null},{inferred:!1,included_with:"",confidence:0,score:0,criteria:null,"@provider":"local.person.lexis.teaser","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},type:"relative","@id":"000875578742","@provider_ids":null,"@search_pointer":"4:eJyKVvLKL04tyFDSUQoDYrfSorTEonwgCyKsEKaAEEJDBgYGFuampuYW5iZGSrGAAAAA__8DFxLK",date_first_seen:null,date_last_seen:null,dobs:null,dods:null,gender:null,ethnicity:null,language:null,country:null,locations:null,educations:null,emails:null,images:null,jobs:null,faa_licenses:null,names:[{inferred:!1,included_with:"",confidence:0,score:0,criteria:null,"@provider":"local.person.lexis.teaser","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},type:"",first:"Joseph",middle:"V",last:"Furfaro",prefix:"",suffix:"",raw:"",display:"Joseph V Furfaro",name_checks:null,first_meta:{possible_misspelling:!1,type:"",origin:"",usage:""}}],phones:null,urls:null,usernames:null,user_ids:null,websites:null,relationships:null,related_persons:null,possible_persons:null,bankruptcies:null,controlled_substances:null,sources:null,available_criminal_records:null,criminal_records:null,marriages:null,divorces:null,additional_records:null,dating_profiles:null},{inferred:!1,included_with:"",confidence:0,score:0,criteria:null,"@provider":"local.person.lexis.teaser","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},type:"relative","@id":"000875083791","@provider_ids":null,"@search_pointer":"4:eJyKVgrKTM5ILEpR0lFyAWK30qK0xKJ8IAsqruCigBBDQwYGBhbmpgYWxuaWhkqxgAAAAP__K_ETSQ==",date_first_seen:null,date_last_seen:null,dobs:null,dods:null,gender:null,ethnicity:null,language:null,country:null,locations:null,educations:null,emails:null,images:null,jobs:null,faa_licenses:null,names:[{inferred:!1,included_with:"",confidence:0,score:0,criteria:null,"@provider":"local.person.lexis.teaser","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},type:"",first:"Richard",middle:"D",last:"Furfaro",prefix:"",suffix:"",raw:"",display:"Richard D Furfaro",name_checks:null,first_meta:{possible_misspelling:!1,type:"",origin:"",usage:""}}],phones:null,urls:null,usernames:null,user_ids:null,websites:null,relationships:null,related_persons:null,possible_persons:null,bankruptcies:null,controlled_substances:null,sources:null,available_criminal_records:0,criminal_records:null,marriages:null,divorces:null,additional_records:null,dating_profiles:null},{inferred:!1,included_with:"",confidence:0,score:0,criteria:null,"@provider":"local.person.lexis.teaser","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},type:"relative","@id":"000875942593","@provider_ids":null,"@search_pointer":"4:eJyKVgpOzEspSlTSUfIFYrfSorTEonwgCyKs4KuAEEJDBgYGFuamliZGppbGSrGAAAAA___4WRKX",date_first_seen:null,date_last_seen:null,dobs:null,dods:null,gender:null,ethnicity:null,language:null,country:null,locations:null,educations:null,emails:null,images:null,jobs:null,faa_licenses:null,names:[{inferred:!1,included_with:"",confidence:0,score:0,criteria:null,"@provider":"local.person.lexis.teaser","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},type:"",first:"Sandra",middle:"M",last:"Furfaro",prefix:"",suffix:"",raw:"",display:"Sandra M Furfaro",name_checks:null,first_meta:{possible_misspelling:!1,type:"",origin:"",usage:""}}],phones:null,urls:null,usernames:null,user_ids:null,websites:null,relationships:null,related_persons:null,possible_persons:null,bankruptcies:null,controlled_substances:null,sources:null,available_criminal_records:0,criminal_records:null,marriages:null,divorces:null,additional_records:null,dating_profiles:null},{inferred:!1,included_with:"",confidence:0,score:0,criteria:null,"@provider":"local.person.lexis.teaser","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},type:"relative","@id":"000875942193","@provider_ids":null,"@search_pointer":"4:eJyKVgpOzEspSlTSUXIEYrfSorTEonwgCyKs4KiAEEJDBgYGFuamliZGhpbGSrGAAAAA___zcRJ7",date_first_seen:null,date_last_seen:null,dobs:null,dods:null,gender:null,ethnicity:null,language:null,country:null,locations:null,educations:null,emails:null,images:null,jobs:null,faa_licenses:null,names:[{inferred:!1,included_with:"",confidence:0,score:0,criteria:null,"@provider":"local.person.lexis.teaser","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},type:"",first:"Sandra",middle:"A",last:"Furfaro",prefix:"",suffix:"",raw:"",display:"Sandra A Furfaro",name_checks:null,first_meta:{possible_misspelling:!1,type:"",origin:"",usage:""}}],phones:null,urls:null,usernames:null,user_ids:null,websites:null,relationships:null,related_persons:null,possible_persons:null,bankruptcies:null,controlled_substances:null,sources:null,available_criminal_records:0,criminal_records:null,marriages:null,divorces:null,additional_records:null,dating_profiles:null}],possible_persons:null,bankruptcies:null,controlled_substances:null,sources:[{inferred:!1,included_with:"",confidence:1,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},name:"USA Contacts",category:"contact_details",domain:"","@origin_url":"",names:[{inferred:!1,included_with:"",confidence:1,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:12,day:1,year:2014},completeness:{counts:null,scores:null},type:"",first:"Joe",middle:"",last:"Furfaro",prefix:"",suffix:"",raw:"",display:"Joe Furfaro",name_checks:null,first_meta:{possible_misspelling:!1,type:"",origin:"",usage:""}}],emails:null,usernames:null,phones:[{inferred:!1,included_with:"",confidence:1,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:12,day:1,year:2014},completeness:{counts:null,scores:null},display:"(503) 949-3514",number:"5039493514",iso_country:"US",formatted:{national:5039493514,e164_number:"+15039493514",international:"+1 503-949-3514",rfc3966:"tel:+1-503-949-3514",extension:"",country_code:1,country_region_iso:"US"},"@search_pointer":"",line_type:"",listing_types:null,extension:"",carrier:"",do_not_call:null,is_prepaid:null,is_connected:null,reputation:{spam_score:0,spam_index:0,level:0,details:null},phone_region:{inferred:!1,included_with:"",confidence:0,score:0,criteria:null,"@provider":"","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},display:"",type:"",usage:"",country:"",county:"",county_fips:"",congressional_district:"",city:"",state:"",state_code:"",street:"",street_post_direction:"",street_pre_direction:"",street_name:"",street_suffix:"",street1:"",street2:"",street_number:"",unit_number:"",zip_code:"",zip4:"",ZipType:"",po_box:"",unit_designation:"",is_deliverable:!1,is_receiving_mail:!1,coordinates:{latitude:null,longitude:null,accuracy:""},time_zone:"",utc_offset:0,dst:!1,active:!1,high_risk_indicators:null,dpv:{match_code:"",footnotes:"",cmra:!1,vacant:!1},date_last_seen:null,date_first_seen:null},is_old:!1,date_first_seen:null,date_last_seen:null,high_risk_indicators:null,is_valid:null,phone_contact_score:0,phone_to_name:null,subscriber_name:"",warnings:null,subscriber_gender:"",is_commercial:null}],gender:null,dob:null,language:null,ethnicity:null,origin_countries:null,addresses:[{inferred:!1,included_with:"",confidence:1,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:12,day:1,year:2014},completeness:{counts:null,scores:null},display:"1601 Earl Warren Dr. N211\nSheridan, OR 97378",type:"",usage:"",country:"US",county:"",county_fips:"",congressional_district:"",city:"Sheridan",state:"Oregon",state_code:"OR",street:"1601 Earl Warren Dr. N211",street_post_direction:"",street_pre_direction:"",street_name:"Earl Warren Dr. N211",street_suffix:"",street1:"1601 Earl Warren Dr. N211",street2:"",street_number:"1601",unit_number:"",zip_code:"97378",zip4:"",ZipType:"",po_box:"",unit_designation:"",is_deliverable:!1,is_receiving_mail:!1,coordinates:{latitude:null,longitude:null,accuracy:""},time_zone:"",utc_offset:0,dst:!1,active:!1,high_risk_indicators:null,dpv:{match_code:"",footnotes:"",cmra:!1,vacant:!1},date_last_seen:null,date_first_seen:null}],jobs:null,educations:null,relationships:null,user_ids:null,images:null,tags:null,urls:null},{inferred:!1,included_with:"",confidence:.99683,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},name:"LinkedIn",category:"professional_and_business",domain:"linkedin.com","@origin_url":"http://www.linkedin.com/pub/joe-furfaro/3a/007/712",names:[{inferred:!1,included_with:"",confidence:.99683,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:12,day:10,year:2013},completeness:{counts:null,scores:null},type:"",first:"Joe",middle:"",last:"Furfaro",prefix:"",suffix:"",raw:"",display:"Joe Furfaro",name_checks:null,first_meta:{possible_misspelling:!1,type:"",origin:"",usage:""}}],emails:null,usernames:null,phones:null,gender:null,dob:null,language:null,ethnicity:null,origin_countries:null,addresses:[{inferred:!1,included_with:"",confidence:.99683,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:1,day:1,year:2014},completeness:{counts:null,scores:null},display:"San Diego, CA",type:"",usage:"",country:"US",county:"",county_fips:"",congressional_district:"",city:"San Diego",state:"California",state_code:"CA",street:"",street_post_direction:"",street_pre_direction:"",
street_name:"",street_suffix:"",street1:"",street2:"",street_number:"",unit_number:"",zip_code:"",zip4:"",ZipType:"",po_box:"",unit_designation:"",is_deliverable:!1,is_receiving_mail:!1,coordinates:{latitude:null,longitude:null,accuracy:""},time_zone:"",utc_offset:0,dst:!1,active:!1,high_risk_indicators:null,dpv:{match_code:"",footnotes:"",cmra:!1,vacant:!1},date_last_seen:null,date_first_seen:null}],jobs:[{inferred:!1,included_with:"",confidence:.99683,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:10,day:5,year:2015},completeness:{counts:null,scores:null},title:"Graphic Designer/Web Developer, Co-Founder/Owner",organization:"Mr. Stache, Photographer",industry:"Graphic Design",date_range:{start:null,end:null},display:"Graphic Designer/Web Developer, Co-Founder/Owner at Mr. Stache, Photographer"},{inferred:!1,included_with:"",confidence:.99683,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:1,day:1,year:2014},completeness:{counts:null,scores:null},title:"Front End Developer",organization:"The Control Group Media Company, Inc.",industry:"",date_range:{start:null,end:null},display:"Front End Developer at The Control Group Media Company, Inc. (since 2013)"},{inferred:!1,included_with:"",confidence:.99683,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:10,day:5,year:2015},completeness:{counts:null,scores:null},title:"Front End Development Team Lead",organization:"The Control Group Media Company, Inc.",industry:"",date_range:{start:null,end:null},display:"Front End Development Team Lead at The Control Group Media Company, Inc. (since 2013)"},{inferred:!1,included_with:"",confidence:.99683,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:1,day:1,year:2014},completeness:{counts:null,scores:null},title:"Go-to-Guy",organization:"Ultra Design Agency",industry:"",date_range:{start:{month:1,day:1,year:2012},end:{month:2,day:1,year:2013}},display:"Go-to-Guy at Ultra Design Agency (2012-2013)"},{inferred:!1,included_with:"",confidence:.99683,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:12,day:10,year:2013},completeness:{counts:null,scores:null},title:"Co-Founder/Owner",organization:"Mr. Stache",industry:"Graphic Design",date_range:{start:null,end:null},display:"Co-Founder/Owner at Mr. Stache (since 2011)"},{inferred:!1,included_with:"",confidence:.99683,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:1,day:1,year:2014},completeness:{counts:null,scores:null},title:"Project Engineer",organization:"Largo Concrete Inc.",industry:"",date_range:{start:{month:9,day:1,year:2010},end:{month:10,day:1,year:2011}},display:"Project Engineer at Largo Concrete Inc. (2010-2011)"},{inferred:!1,included_with:"",confidence:.99683,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:1,day:1,year:2014},completeness:{counts:null,scores:null},title:"Project Engineer",organization:"Snyder Langston",industry:"",date_range:{start:{month:6,day:1,year:2007},end:{month:10,day:1,year:2009}},display:"Project Engineer at Snyder Langston (2007-2009)"},{inferred:!1,included_with:"",confidence:.99683,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:1,day:1,year:2014},completeness:{counts:null,scores:null},title:"Graphic/Web Designer, Co-Founder/Owner",organization:"Mr. Stache, Photographer",industry:"",date_range:{start:null,end:null},display:"Graphic/Web Designer, Co-Founder/Owner at Mr. Stache, Photographer"}],educations:[{inferred:!1,included_with:"",confidence:.99683,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:12,day:10,year:2013},completeness:{counts:null,scores:null},start:{month:1,day:1,year:2003},end:{month:12,day:31,year:2008},degree:"Bachelor of Science - Construction Engineering Management",display:"Bachelor of Science - Construction Engineering Management from California State University-Long Beach (2003-2008)",school:"California State University-Long Beach"},{inferred:!1,included_with:"",confidence:.99683,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:10,day:5,year:2015},completeness:{counts:null,scores:null},start:{month:1,day:1,year:1999},end:{month:12,day:31,year:2003},degree:"",display:"University of San Diego High School (1999-2003)",school:"University of San Diego High School"}],relationships:null,user_ids:[{inferred:!1,included_with:"",confidence:.99683,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},content:"3a/7/712@linkedin"},{inferred:!1,included_with:"",confidence:.99683,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},content:"137368382@linkedin"},{inferred:!1,included_with:"",confidence:.99683,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},content:"#7120073a@linkedin"}],images:[{inferred:!1,included_with:"",confidence:.99683,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:10,day:5,year:2015},completeness:{counts:null,scores:null},source_url:"http://www.linkedin.com/pub/joe-furfaro/3a/007/712",token:"0ta0H6wdnzqYExIZlimDaqnQpKkpf-U5-clzArHz9X_1f3yokOAHp9CkNKh4ffMPpGb1XaGpqUaysmyHco818oSjx9R8SAY0TuHqSP3cJ3aiqgiHzbr8TAfuchg1YzvE9vZtS-kuWGlCiOUzny7zCGAHsTbE1WJKD5nA09vJS5wGY_5XJ-X_",thumbnail_token:"3H8Hh5AktpzdsrosmSyw9-s4feXv64kOKYMY0sc-8JmLl5dGPvnK1S2OdxcQigvJlNoLsRNIe3P755f6DxuuM92CYypyWsolE2NWnc3RDgScq_GVv2HAFNdRst8wv6EU_Ea6LASY4ptyCJ__2IiL6DVR3nEmrbf9XFwhJgQ9Ep2ceKz-7xUwoOg_E9NSeNaevOy-zmp5KHZe6Y68_DbIhUVJzOhZmD7D-7CYqY-KAKRS_T2dhfBj-PDTVWnnU-smAvM1D2EHBb8ekHdfWDOnJhVNmYipHOdCXSXYLZhgP7pJ1x5yr48i3ezU975KxfhlpqNQm65CIKruinQm2R-benTZiI5gO84eZqL5qYuF4c9Lgyuo9Sa0_6Ac1EGQh3ltO4TlTZoSmbRRTQiMHTwGeCzGwNZC05VoBXa3N1sHuE4liUmwJj4Cfw==",url:"https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/2/000/215/10d/108f7bb.jpg",TypeName:""}],tags:[{inferred:!1,included_with:"",confidence:.99683,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},"@classification":"skill",content:"Web Development"},{inferred:!1,included_with:"",confidence:.99683,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},"@classification":"skill",content:"Photoshop"},{inferred:!1,included_with:"",confidence:.99683,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},"@classification":"skill",content:"Illustrator"},{inferred:!1,included_with:"",confidence:.99683,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},"@classification":"skill",content:"Digital Photography"},{inferred:!1,included_with:"",confidence:.99683,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},"@classification":"skill",content:"Wordpress"},{inferred:!1,included_with:"",confidence:.99683,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},"@classification":"skill",content:"Project Management"},{inferred:!1,included_with:"",confidence:.99683,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},"@classification":"skill",content:"HTML 5"},{inferred:!1,included_with:"",confidence:.99683,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},"@classification":"skill",content:"CSS3"},{inferred:!1,included_with:"",confidence:.99683,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},"@classification":"skill",content:"jQuery"},{inferred:!1,included_with:"",confidence:.99683,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},"@classification":"skill",content:"PHP"},{inferred:!1,included_with:"",confidence:.99683,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},"@classification":"skill",content:"Screen Printing"},{inferred:!1,included_with:"",confidence:.99683,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},"@classification":"skill",content:"Aperture"},{inferred:!1,included_with:"",confidence:.99683,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},"@classification":"skill",content:"Mac OS X"},{inferred:!1,included_with:"",confidence:.99683,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},"@classification":"skill",content:"Construction Estimating"},{inferred:!1,included_with:"",confidence:.99683,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},"@classification":"skill",content:"Project Engineering"},{inferred:!1,included_with:"",confidence:.99683,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},"@classification":"skill",content:"Construction Management"},{inferred:!1,included_with:"",confidence:.99683,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},"@classification":"skill",content:"Logo Design"},{inferred:!1,included_with:"",confidence:.99683,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},"@classification":"skill",content:"Graphics"},{inferred:!1,included_with:"",confidence:.99683,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},"@classification":"skill",content:"Adobe Creative Suite"},{inferred:!1,included_with:"",confidence:.99683,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},"@classification":"skill",content:"CSS"},{inferred:!1,included_with:"",confidence:.99683,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},"@classification":"skill",content:"JavaScript"},{inferred:!1,included_with:"",confidence:.99683,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},"@classification":"skill",content:"Website Development"},{inferred:!1,included_with:"",confidence:.99683,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},"@classification":"group",content:"Founders Under 40"},{inferred:!1,included_with:"",confidence:.99683,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},"@classification":"group",content:"Legit Entrepreneurs Network"},{inferred:!1,included_with:"",confidence:.99683,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},"@classification":"group",content:"Screen Printers Unite & Grow"},{inferred:!1,included_with:"",confidence:.99683,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},"@classification":"livepreview",content:"Joe Furfaro. Graphic/Web Designer, Co-Founder/Owner at Mr. Stache, Photographer. Greater San Diego Area. |. Graphic Design. Co-Founder/Owner at Mr Stache. Go-to-Guy at Ultra Design Agency (Sole Proprietorship), Project Engineer at Largo Concrete Inc. Project Engineer at Snyder Langston. California State University-Long Beach. I'm the kid that asked \"why?\" in your high school Math class. Never one to accept anything without reason, I strive to better my skills with every project. In the world of web design and development, what worked yesterday will be accomplished more beautifully and efficiently tomorrow. My strong desire to always improve upon any given solution keeps me at the forefront of development standards, and one step ahead of the design trends. I'm a firm believer of reinventing the wheel - just because it's been done doesn't mean it shouldn't be done again. On development only projects, designers will hear me say \"I'll figure it out\" far more often than \"You can't do that\", which allows them an open world of design possibilities that sets clients' websites above the rest. My strongest fields are those that merge both right and left brain thinking, so it's of no coincidence that my professional services are web design/development, and photography. Specialties: Pixel perfect web design/development, cost/project management, creative problem solving, lifestyle/editorial photography"}],urls:[{inferred:!1,included_with:"",confidence:.99683,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:1,day:1,year:2014},completeness:{counts:null,scores:null},source_id:"",name:"",category:"personal_profiles",domain:"joefurfaro.com",url:"http://www.joefurfaro.com"},{inferred:!1,included_with:"",confidence:.99683,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:1,day:1,year:2014},completeness:{counts:null,scores:null},source_id:"",name:"",category:"personal_profiles",domain:"mrstachedesign.com",url:"http://www.mrstachedesign.com"}]},{inferred:!1,included_with:"",confidence:.69797,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},name:"USA Auto Owners",category:"contact_details",domain:"","@origin_url":"",names:[{inferred:!1,included_with:"",confidence:.69797,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:10,day:2,year:2013},completeness:{counts:null,scores:null},type:"",first:"Joe",middle:"",last:"Furfaro",prefix:"",suffix:"",raw:"",display:"Joe Furfaro",name_checks:null,first_meta:{possible_misspelling:!1,type:"",origin:"",usage:""}}],emails:null,usernames:null,phones:null,gender:null,dob:null,language:null,ethnicity:null,origin_countries:null,addresses:[{inferred:!1,included_with:"",confidence:.69797,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:10,day:2,year:2013},completeness:{counts:null,scores:null},display:"1121 Crandon Boulevard E506\nKey Biscayne, FL 33149",type:"",usage:"",country:"US",county:"",county_fips:"",congressional_district:"",city:"Key Biscayne",state:"Florida",state_code:"FL",street:"1121 Crandon Boulevard E506",street_post_direction:"",street_pre_direction:"",street_name:"Crandon Boulevard",street_suffix:"",street1:"1121 Crandon Boulevard",street2:"E506",street_number:"1121",unit_number:"E506",zip_code:"33149",zip4:"",ZipType:"",po_box:"",unit_designation:"",is_deliverable:!1,is_receiving_mail:!1,coordinates:{latitude:null,longitude:null,accuracy:""},time_zone:"",utc_offset:0,dst:!1,active:!1,high_risk_indicators:null,dpv:{match_code:"",footnotes:"",cmra:!1,vacant:!1},date_last_seen:null,date_first_seen:null}],jobs:null,educations:null,relationships:null,user_ids:null,images:null,tags:null,urls:null},{inferred:!1,included_with:"",confidence:.69797,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},name:"USA Auto Owners",category:"contact_details",domain:"","@origin_url":"",names:[{inferred:!1,included_with:"",confidence:.69797,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:10,day:2,year:2013},completeness:{counts:null,scores:null},type:"",first:"Joseph",middle:"V",last:"Furfaro",prefix:"",suffix:"",raw:"",display:"Joseph V Furfaro",name_checks:null,first_meta:{possible_misspelling:!1,type:"",origin:"",usage:""}}],emails:null,usernames:null,phones:null,gender:null,dob:null,language:null,ethnicity:null,origin_countries:null,addresses:[{inferred:!1,included_with:"",confidence:.69797,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:10,day:2,year:2013},completeness:{counts:null,scores:null},display:"1121 Crandon Boulevard E506\nKey Biscayne, FL 33149",type:"",usage:"",country:"US",county:"",county_fips:"",congressional_district:"",city:"Key Biscayne",state:"Florida",state_code:"FL",street:"1121 Crandon Boulevard E506",street_post_direction:"",street_pre_direction:"",street_name:"Crandon Boulevard",street_suffix:"",street1:"1121 Crandon Boulevard",street2:"E506",street_number:"1121",unit_number:"E506",zip_code:"33149",zip4:"",ZipType:"",po_box:"",unit_designation:"",is_deliverable:!1,is_receiving_mail:!1,coordinates:{latitude:null,longitude:null,accuracy:""},time_zone:"",utc_offset:0,dst:!1,active:!1,high_risk_indicators:null,dpv:{match_code:"",footnotes:"",cmra:!1,vacant:!1},date_last_seen:null,date_first_seen:null}],jobs:null,educations:null,relationships:null,user_ids:null,images:null,tags:null,urls:null},{inferred:!1,included_with:"",confidence:.69797,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},name:"Amazon",category:"personal_profiles",domain:"amazon.com","@origin_url":"http://www.amazon.com/gp/pdp/profile/A301MN1RFO8RSS/",names:[{inferred:!1,included_with:"",confidence:.69797,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:9,day:30,year:2009},completeness:{counts:null,scores:null},type:"",first:"Joe",middle:"",last:"Furfaro",prefix:"",suffix:"",raw:"",display:"Joe Furfaro",name_checks:null,first_meta:{possible_misspelling:!1,type:"",origin:"",usage:""}}],emails:null,usernames:null,phones:null,gender:null,dob:null,language:null,ethnicity:null,origin_countries:null,addresses:[{inferred:!1,included_with:"",confidence:.69797,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:9,day:30,year:2009},completeness:{counts:null,scores:null},display:"Chula Vista, CA",type:"",usage:"",country:"US",county:"",county_fips:"",congressional_district:"",city:"Chula Vista",state:"California",state_code:"CA",street:"",street_post_direction:"",street_pre_direction:"",street_name:"",street_suffix:"",street1:"",street2:"",street_number:"",unit_number:"",zip_code:"",zip4:"",ZipType:"",po_box:"",unit_designation:"",is_deliverable:!1,is_receiving_mail:!1,coordinates:{latitude:null,longitude:null,accuracy:""},time_zone:"",utc_offset:0,dst:!1,active:!1,high_risk_indicators:null,dpv:{match_code:"",footnotes:"",cmra:!1,vacant:!1},date_last_seen:null,date_first_seen:null}],jobs:null,educations:null,relationships:null,user_ids:null,images:null,tags:null,urls:[{inferred:!1,included_with:"",confidence:.69797,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:4,day:27,year:2010},completeness:{counts:null,scores:null},source_id:"",name:"",category:"personal_profiles",domain:"amazon.com",url:"http://www.amazon.com/wishlist/YV7YCE6XJ8PC"}]},{inferred:!1,included_with:"",confidence:.69797,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},name:"Infospace",category:"contact_details",domain:"kevdb.infospace.com","@origin_url":"http://kevdb.infospace.com/home/white-pages/kevdb?showrec=21202951res-us&OTMPL=/white-pages/details.htm",names:[{inferred:!1,included_with:"",confidence:.69797,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:3,day:8,year:2008},completeness:{counts:null,scores:null},type:"",first:"Joseph",middle:"V",last:"Furfaro",prefix:"",suffix:"",raw:"",display:"Joseph V Furfaro",name_checks:null,first_meta:{possible_misspelling:!1,type:"",origin:"",usage:""}}],emails:null,usernames:null,phones:null,gender:null,dob:null,language:null,ethnicity:null,origin_countries:null,addresses:[{inferred:!1,included_with:"",confidence:.69797,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:3,day:8,year:2008},completeness:{counts:null,scores:null},display:"Key Biscayne, FL 33149",type:"",usage:"",country:"US",county:"",county_fips:"",congressional_district:"",city:"Key Biscayne",state:"Florida",state_code:"FL",street:"",street_post_direction:"",street_pre_direction:"",street_name:"",street_suffix:"",street1:"",street2:"",street_number:"",unit_number:"",zip_code:"33149",zip4:"",ZipType:"",po_box:"",unit_designation:"",is_deliverable:!1,is_receiving_mail:!1,coordinates:{latitude:null,longitude:null,accuracy:""},time_zone:"",utc_offset:0,dst:!1,active:!1,high_risk_indicators:null,dpv:{match_code:"",footnotes:"",cmra:!1,vacant:!1},date_last_seen:null,date_first_seen:null}],jobs:null,educations:null,relationships:null,user_ids:null,images:null,tags:null,urls:null},{inferred:!1,included_with:"",confidence:.69797,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},name:"hi5",category:"personal_profiles",domain:"hi5.com","@origin_url":"http://www.hi5.com/friend/p96039145--profile--html",names:[{inferred:!1,included_with:"",confidence:.69797,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:10,day:20,year:2009},completeness:{counts:null,scores:null},type:"alias",first:"Joe",middle:"",last:"Furfaro",prefix:"",suffix:"",raw:"",display:"Joe Furfaro",name_checks:null,first_meta:{possible_misspelling:!1,type:"",origin:"",usage:""}}],emails:null,usernames:null,phones:null,gender:null,dob:null,language:null,ethnicity:null,origin_countries:null,addresses:[{inferred:!1,included_with:"",confidence:.69797,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:10,day:20,year:2009},completeness:{counts:null,scores:null},display:"Chula Vista, CA",type:"",usage:"",country:"US",county:"",county_fips:"",congressional_district:"",city:"Chula Vista",state:"California",state_code:"CA",street:"",street_post_direction:"",street_pre_direction:"",street_name:"",street_suffix:"",street1:"",street2:"",street_number:"",unit_number:"",zip_code:"",zip4:"",ZipType:"",po_box:"",unit_designation:"",is_deliverable:!1,is_receiving_mail:!1,coordinates:{latitude:null,longitude:null,accuracy:""},time_zone:"",utc_offset:0,dst:!1,active:!1,high_risk_indicators:null,dpv:{match_code:"",footnotes:"",cmra:!1,vacant:!1},date_last_seen:null,date_first_seen:null}],jobs:null,educations:null,relationships:null,user_ids:[{inferred:!1,included_with:"",confidence:.69797,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},content:"96039145@hi5"}],images:null,tags:null,urls:null},{inferred:!1,included_with:"",confidence:.69797,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},name:"Tagged",category:"personal_profiles",domain:"tagged.com","@origin_url":"http://www.tagged.com/mypage.html?uid=27371461",names:[{inferred:!1,included_with:"",confidence:.69797,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:1,day:18,year:2008},completeness:{counts:null,scores:null},type:"",first:"Joe",middle:"",last:"Furfaro",prefix:"",suffix:"",raw:"",display:"Joe Furfaro",name_checks:null,first_meta:{possible_misspelling:!1,type:"",origin:"",usage:""}}],emails:null,usernames:null,phones:null,gender:null,dob:null,language:null,ethnicity:null,origin_countries:null,addresses:[{inferred:!1,included_with:"",confidence:.69797,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:1,day:18,year:2008},completeness:{counts:null,scores:null},display:"Chula Vista, CA",type:"",usage:"",country:"US",county:"",county_fips:"",congressional_district:"",city:"Chula Vista",state:"California",state_code:"CA",street:"",street_post_direction:"",street_pre_direction:"",street_name:"",street_suffix:"",street1:"",street2:"",street_number:"",unit_number:"",zip_code:"",zip4:"",ZipType:"",po_box:"",unit_designation:"",is_deliverable:!1,is_receiving_mail:!1,coordinates:{latitude:null,longitude:null,accuracy:""},time_zone:"",utc_offset:0,dst:!1,active:!1,high_risk_indicators:null,dpv:{match_code:"",footnotes:"",cmra:!1,vacant:!1},date_last_seen:null,date_first_seen:null}],jobs:null,educations:null,relationships:null,user_ids:[{inferred:!1,included_with:"",confidence:.69797,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},content:"27371461@tagged"}],images:null,tags:null,urls:[{inferred:!1,included_with:"",confidence:.69797,score:0,criteria:null,"@provider":"pipl","@valid_since":{month:1,day:18,year:2008},completeness:{counts:null,scores:null},source_id:"",name:"",category:"personal_profiles",domain:"tagged.com",url:"http://www.tagged.com/photo_gallery.html?uid=27371461"}]}],available_criminal_records:null,criminal_records:[{inferred:!1,included_with:"",confidence:0,score:.5,criteria:null,"@provider":"NPD","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},date_last_seen:null,matching_fields:{city:!1,data_source_state:!0,dob:!1,first:!0,last:!0,middle:!0,state:!1,zip_code:!1},offender_id:"",case_number:"08807LNFurfaro",county_of_origin:"",doc_number:"",case_filing_date:{month:9,day:5,year:2009},eyes:"",hair:"",height:"",weight:"",race:"",sex:"",skin:"",data_source:"Orangecaview",data_source_name:"CA Orange Superior Court",data_source_state:"CA",ssn:"",unique_id:"",state_of_birth:"",state_of_origin:"",status:"",address:null,name:{inferred:!1,included_with:"",confidence:0,score:0,criteria:null,"@provider":"","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},type:"",first:"Joseph",middle:"James",last:"Furfaro",prefix:"",suffix:"",raw:"",display:"Joseph James Furfaro",name_checks:null,first_meta:{possible_misspelling:!1,type:"",origin:"",usage:""}},dob:null,case_type_description:"",akas:null,offenses:[{inferred:!1,included_with:"",confidence:0,score:0,criteria:null,"@provider":"NPD","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},adjudication_withheld:"",case_number:"08807LNFurfaro",case_type:"",case_type_description:"",count:"",county:"",description:"Citation",maximum_term:"",minimum_term:"",number_counts:"",offense_date:null,offense_type:"",sentence:"",sentence_length_description:"",sentence_date:null,incarceration_date:null,appeal:null,arrest:null,court:{inferred:!1,included_with:"",confidence:0,score:0,criteria:null,"@provider":"","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},case_number:"",costs:"",description:"Ca Orange Superior Court",disposition:"",disposition_date:{month:9,day:15,year:2009},fine:"",level:"",offense:"",plea:"",statute:"",suspended_fine:"",conviction_date:null,conviction_place:""},court_sentence:null,ncic_code:"",charge_category:"Criminal/traffic"}],prison_sentences:null,parole_sentences:null,activities:null,mugshots:null,military_service:"",generation:"",dob_aka:null,scars_marks_tattoos:null}],marriages:[{inferred:!1,included_with:"",confidence:0,score:0,criteria:null,"@provider":"local.person.npd.marriage","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},person1_name:{inferred:!1,included_with:"",confidence:0,score:0,criteria:null,"@provider":"","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},type:"",first:"Joseph",middle:"C",last:"Furfaro",prefix:"",suffix:"",raw:"",display:"Joseph C Furfaro",name_checks:null,first_meta:{possible_misspelling:!1,type:"",origin:"",usage:""}},person2_name:{inferred:!1,included_with:"",confidence:0,score:0,criteria:null,"@provider":"","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},type:"",first:"Delores",middle:"E",last:"Branch",prefix:"",suffix:"",raw:"",display:"Delores E Branch",name_checks:null,first_meta:{possible_misspelling:!1,type:"",origin:"",usage:""}},state:"CT",county:"",date:{month:9,day:4,year:1993}},{inferred:!1,included_with:"",confidence:0,score:0,criteria:null,"@provider":"local.person.npd.marriage","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},person1_name:{inferred:!1,included_with:"",confidence:0,score:0,criteria:null,"@provider":"","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},type:"",first:"Joseph",middle:"C",last:"Furfaro",prefix:"",suffix:"",raw:"",display:"Joseph C Furfaro",name_checks:null,first_meta:{possible_misspelling:!1,type:"",origin:"",usage:""}},person2_name:{inferred:!1,included_with:"",confidence:0,score:0,criteria:null,"@provider":"","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},type:"",first:"Patricia",middle:"D",last:"Moore",prefix:"",suffix:"",raw:"",display:"Patricia D Moore",name_checks:null,first_meta:{possible_misspelling:!1,type:"",origin:"",usage:""}},state:"CA",county:"Orange",date:{month:3,day:5,year:1971}}],divorces:[{inferred:!1,included_with:"",confidence:0,score:0,criteria:null,"@provider":"local.person.npd.marriage","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},person1_name:{inferred:!1,included_with:"",confidence:0,score:0,criteria:null,"@provider":"","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},type:"",first:"Joseph",middle:"",last:"Furfaro",prefix:"",suffix:"",raw:"",display:"Joseph Furfaro",name_checks:null,first_meta:{possible_misspelling:!1,type:"",origin:"",usage:""}},person2_name:{inferred:!1,included_with:"",confidence:0,score:0,criteria:null,"@provider":"","@valid_since":{month:0,day:0,year:0},completeness:{counts:null,scores:null},type:"",first:"Marie",middle:"",last:"Furfaro",prefix:"",suffix:"",raw:"",display:"Marie Furfaro",name_checks:null,first_meta:{possible_misspelling:!1,type:"",origin:"",usage:""}},state:"FL",county:"Marion",date:{month:1,day:30,year:1998},decree_type:"",docket_number:""}],additional_records:null,dating_profiles:null};

},{}],24:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function serialize(e,t){var o=[];for(var n in e)if(e.hasOwnProperty(n)){var r=t?t+"["+n+"]":n,s=e[n];o.push("object"==("undefined"==typeof s?"undefined":_typeof(s))?serialize(s,r):encodeURIComponent(r)+"="+encodeURIComponent(s))}return o.join("&")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e},_lodash=require("lodash"),_lodash2=_interopRequireDefault(_lodash);require("isomorphic-fetch");var _pubRecConstants=require("../constants/pubRecConstants"),_pubRecConstants2=_interopRequireDefault(_pubRecConstants),_config=require("../config.js"),_config2=_interopRequireDefault(_config),_serverActions=require("../actions/serverActions"),_serverActions2=_interopRequireDefault(_serverActions);require("es6-promise").polyfill();var _jwt=null,PubRecAPI=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"search",value:function(e){fetch(_config2["default"].API_ROOT+"/people/?"+serialize(e)).then(function(e){return e.json()}).then(function(e){_serverActions2["default"].receiveSearchResults(e.people)})}},{key:"fetchRecordId",value:function(e,t){fetch(_config2["default"].API_ROOT+"/person",{headers:{"Content-Type":"application/json",Authorization:"Bearer "+_jwt},method:"POST",body:JSON.stringify({person:e})}).then(function(e){if("application/json"!==e.headers.get("Content-Type")){var t=new Error(e.statusText);throw t.response=e,t}return e}).then(function(e){return e.json()}).then(function(e){e.success?_serverActions2["default"].receiveRecordId(e.recordId,t):console.log(e.errors)})["catch"](function(e){console.error(e)})}},{key:"checkLocalUser",value:function(){console.log("Checking for local user");var e=window.localStorage.getItem("user");if(e)try{e=JSON.parse(e),_jwt=e.jwt,_serverActions2["default"].receiveUser(e)}catch(t){}}},{key:"login",value:function(e){fetch(_config2["default"].API_ROOT+"/login",{headers:{"Content-Type":"application/x-www-form-urlencoded"},method:"POST",body:serialize(e)}).then(function(e){if("application/json"!==e.headers.get("Content-Type")){var t=new Error(e.statusText);throw t.response=e,t}return e}).then(function(e){return e.json()}).then(function(e){e.success?(_jwt=e.user.jwt,window.localStorage.setItem("user",JSON.stringify(e.user)),_serverActions2["default"].receiveUser(e.user)):console.log(e.errors)})["catch"](function(e){console.error(e)})}},{key:"logout",value:function(){_jwt=null,window.localStorage.removeItem("user"),window.localStorage.removeItem("usage")}},{key:"fetchReport",value:function(e){fetch(_config2["default"].API_ROOT+"/people/"+e.recordId,{Authorization:"Bearer "+_jwt}).then(function(e){if("application/json"!==e.headers.get("Content-Type")){var t=new Error(e.statusText);throw t.response=e,t}return e}).then(function(e){return e.json()}).then(function(e){e.success?_serverActions2["default"].receiveReport(e.report):console.log(e.errors)})["catch"](function(e){console.error(e)})}},{key:"getUsage",value:function(e){fetch(_config2["default"].API_ROOT+"/users/"+e+"/usage",{headers:{"Content-Type":"application/x-www-form-urlencoded",Authorization:"Bearer "+_jwt}}).then(function(e){if("application/json"!==e.headers.get("Content-Type")){var t=new Error(e.statusText);throw t.response=e,t}return e}).then(function(e){return e.json()}).then(function(e){e.success?(console.log("asgfadsf"),_serverActions2["default"].receiveUsage(e.records),window.localStorage.setItem("usage",JSON.stringify(e.records))):_errors=e.errors})["catch"](function(e){console.error(e)})}}]),e}(),pubRecAPI=new PubRecAPI;exports["default"]=pubRecAPI;

},{"../actions/serverActions":1,"../config.js":17,"../constants/pubRecConstants":18,"es6-promise":28,"isomorphic-fetch":47,"lodash":"lodash"}],25:[function(require,module,exports){
var pSlice = Array.prototype.slice;
var objectKeys = require('./lib/keys.js');
var isArguments = require('./lib/is_arguments.js');

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer (x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}

},{"./lib/is_arguments.js":26,"./lib/keys.js":27}],26:[function(require,module,exports){
var supportsArgumentsClass = (function(){
  return Object.prototype.toString.call(arguments)
})() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object){
  return object &&
    typeof object == 'object' &&
    typeof object.length == 'number' &&
    Object.prototype.hasOwnProperty.call(object, 'callee') &&
    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
    false;
};

},{}],27:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],28:[function(require,module,exports){
(function (process,global){
/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
 * @version   3.2.1
 */

(function() {
    "use strict";
    function lib$es6$promise$utils$$objectOrFunction(x) {
      return typeof x === 'function' || (typeof x === 'object' && x !== null);
    }

    function lib$es6$promise$utils$$isFunction(x) {
      return typeof x === 'function';
    }

    function lib$es6$promise$utils$$isMaybeThenable(x) {
      return typeof x === 'object' && x !== null;
    }

    var lib$es6$promise$utils$$_isArray;
    if (!Array.isArray) {
      lib$es6$promise$utils$$_isArray = function (x) {
        return Object.prototype.toString.call(x) === '[object Array]';
      };
    } else {
      lib$es6$promise$utils$$_isArray = Array.isArray;
    }

    var lib$es6$promise$utils$$isArray = lib$es6$promise$utils$$_isArray;
    var lib$es6$promise$asap$$len = 0;
    var lib$es6$promise$asap$$vertxNext;
    var lib$es6$promise$asap$$customSchedulerFn;

    var lib$es6$promise$asap$$asap = function asap(callback, arg) {
      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len] = callback;
      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len + 1] = arg;
      lib$es6$promise$asap$$len += 2;
      if (lib$es6$promise$asap$$len === 2) {
        // If len is 2, that means that we need to schedule an async flush.
        // If additional callbacks are queued before the queue is flushed, they
        // will be processed by this flush that we are scheduling.
        if (lib$es6$promise$asap$$customSchedulerFn) {
          lib$es6$promise$asap$$customSchedulerFn(lib$es6$promise$asap$$flush);
        } else {
          lib$es6$promise$asap$$scheduleFlush();
        }
      }
    }

    function lib$es6$promise$asap$$setScheduler(scheduleFn) {
      lib$es6$promise$asap$$customSchedulerFn = scheduleFn;
    }

    function lib$es6$promise$asap$$setAsap(asapFn) {
      lib$es6$promise$asap$$asap = asapFn;
    }

    var lib$es6$promise$asap$$browserWindow = (typeof window !== 'undefined') ? window : undefined;
    var lib$es6$promise$asap$$browserGlobal = lib$es6$promise$asap$$browserWindow || {};
    var lib$es6$promise$asap$$BrowserMutationObserver = lib$es6$promise$asap$$browserGlobal.MutationObserver || lib$es6$promise$asap$$browserGlobal.WebKitMutationObserver;
    var lib$es6$promise$asap$$isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

    // test for web worker but not in IE10
    var lib$es6$promise$asap$$isWorker = typeof Uint8ClampedArray !== 'undefined' &&
      typeof importScripts !== 'undefined' &&
      typeof MessageChannel !== 'undefined';

    // node
    function lib$es6$promise$asap$$useNextTick() {
      // node version 0.10.x displays a deprecation warning when nextTick is used recursively
      // see https://github.com/cujojs/when/issues/410 for details
      return function() {
        process.nextTick(lib$es6$promise$asap$$flush);
      };
    }

    // vertx
    function lib$es6$promise$asap$$useVertxTimer() {
      return function() {
        lib$es6$promise$asap$$vertxNext(lib$es6$promise$asap$$flush);
      };
    }

    function lib$es6$promise$asap$$useMutationObserver() {
      var iterations = 0;
      var observer = new lib$es6$promise$asap$$BrowserMutationObserver(lib$es6$promise$asap$$flush);
      var node = document.createTextNode('');
      observer.observe(node, { characterData: true });

      return function() {
        node.data = (iterations = ++iterations % 2);
      };
    }

    // web worker
    function lib$es6$promise$asap$$useMessageChannel() {
      var channel = new MessageChannel();
      channel.port1.onmessage = lib$es6$promise$asap$$flush;
      return function () {
        channel.port2.postMessage(0);
      };
    }

    function lib$es6$promise$asap$$useSetTimeout() {
      return function() {
        setTimeout(lib$es6$promise$asap$$flush, 1);
      };
    }

    var lib$es6$promise$asap$$queue = new Array(1000);
    function lib$es6$promise$asap$$flush() {
      for (var i = 0; i < lib$es6$promise$asap$$len; i+=2) {
        var callback = lib$es6$promise$asap$$queue[i];
        var arg = lib$es6$promise$asap$$queue[i+1];

        callback(arg);

        lib$es6$promise$asap$$queue[i] = undefined;
        lib$es6$promise$asap$$queue[i+1] = undefined;
      }

      lib$es6$promise$asap$$len = 0;
    }

    function lib$es6$promise$asap$$attemptVertx() {
      try {
        var r = require;
        var vertx = r('vertx');
        lib$es6$promise$asap$$vertxNext = vertx.runOnLoop || vertx.runOnContext;
        return lib$es6$promise$asap$$useVertxTimer();
      } catch(e) {
        return lib$es6$promise$asap$$useSetTimeout();
      }
    }

    var lib$es6$promise$asap$$scheduleFlush;
    // Decide what async method to use to triggering processing of queued callbacks:
    if (lib$es6$promise$asap$$isNode) {
      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useNextTick();
    } else if (lib$es6$promise$asap$$BrowserMutationObserver) {
      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMutationObserver();
    } else if (lib$es6$promise$asap$$isWorker) {
      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMessageChannel();
    } else if (lib$es6$promise$asap$$browserWindow === undefined && typeof require === 'function') {
      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$attemptVertx();
    } else {
      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useSetTimeout();
    }
    function lib$es6$promise$then$$then(onFulfillment, onRejection) {
      var parent = this;

      var child = new this.constructor(lib$es6$promise$$internal$$noop);

      if (child[lib$es6$promise$$internal$$PROMISE_ID] === undefined) {
        lib$es6$promise$$internal$$makePromise(child);
      }

      var state = parent._state;

      if (state) {
        var callback = arguments[state - 1];
        lib$es6$promise$asap$$asap(function(){
          lib$es6$promise$$internal$$invokeCallback(state, child, callback, parent._result);
        });
      } else {
        lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection);
      }

      return child;
    }
    var lib$es6$promise$then$$default = lib$es6$promise$then$$then;
    function lib$es6$promise$promise$resolve$$resolve(object) {
      /*jshint validthis:true */
      var Constructor = this;

      if (object && typeof object === 'object' && object.constructor === Constructor) {
        return object;
      }

      var promise = new Constructor(lib$es6$promise$$internal$$noop);
      lib$es6$promise$$internal$$resolve(promise, object);
      return promise;
    }
    var lib$es6$promise$promise$resolve$$default = lib$es6$promise$promise$resolve$$resolve;
    var lib$es6$promise$$internal$$PROMISE_ID = Math.random().toString(36).substring(16);

    function lib$es6$promise$$internal$$noop() {}

    var lib$es6$promise$$internal$$PENDING   = void 0;
    var lib$es6$promise$$internal$$FULFILLED = 1;
    var lib$es6$promise$$internal$$REJECTED  = 2;

    var lib$es6$promise$$internal$$GET_THEN_ERROR = new lib$es6$promise$$internal$$ErrorObject();

    function lib$es6$promise$$internal$$selfFulfillment() {
      return new TypeError("You cannot resolve a promise with itself");
    }

    function lib$es6$promise$$internal$$cannotReturnOwn() {
      return new TypeError('A promises callback cannot return that same promise.');
    }

    function lib$es6$promise$$internal$$getThen(promise) {
      try {
        return promise.then;
      } catch(error) {
        lib$es6$promise$$internal$$GET_THEN_ERROR.error = error;
        return lib$es6$promise$$internal$$GET_THEN_ERROR;
      }
    }

    function lib$es6$promise$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
      try {
        then.call(value, fulfillmentHandler, rejectionHandler);
      } catch(e) {
        return e;
      }
    }

    function lib$es6$promise$$internal$$handleForeignThenable(promise, thenable, then) {
       lib$es6$promise$asap$$asap(function(promise) {
        var sealed = false;
        var error = lib$es6$promise$$internal$$tryThen(then, thenable, function(value) {
          if (sealed) { return; }
          sealed = true;
          if (thenable !== value) {
            lib$es6$promise$$internal$$resolve(promise, value);
          } else {
            lib$es6$promise$$internal$$fulfill(promise, value);
          }
        }, function(reason) {
          if (sealed) { return; }
          sealed = true;

          lib$es6$promise$$internal$$reject(promise, reason);
        }, 'Settle: ' + (promise._label || ' unknown promise'));

        if (!sealed && error) {
          sealed = true;
          lib$es6$promise$$internal$$reject(promise, error);
        }
      }, promise);
    }

    function lib$es6$promise$$internal$$handleOwnThenable(promise, thenable) {
      if (thenable._state === lib$es6$promise$$internal$$FULFILLED) {
        lib$es6$promise$$internal$$fulfill(promise, thenable._result);
      } else if (thenable._state === lib$es6$promise$$internal$$REJECTED) {
        lib$es6$promise$$internal$$reject(promise, thenable._result);
      } else {
        lib$es6$promise$$internal$$subscribe(thenable, undefined, function(value) {
          lib$es6$promise$$internal$$resolve(promise, value);
        }, function(reason) {
          lib$es6$promise$$internal$$reject(promise, reason);
        });
      }
    }

    function lib$es6$promise$$internal$$handleMaybeThenable(promise, maybeThenable, then) {
      if (maybeThenable.constructor === promise.constructor &&
          then === lib$es6$promise$then$$default &&
          constructor.resolve === lib$es6$promise$promise$resolve$$default) {
        lib$es6$promise$$internal$$handleOwnThenable(promise, maybeThenable);
      } else {
        if (then === lib$es6$promise$$internal$$GET_THEN_ERROR) {
          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$GET_THEN_ERROR.error);
        } else if (then === undefined) {
          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
        } else if (lib$es6$promise$utils$$isFunction(then)) {
          lib$es6$promise$$internal$$handleForeignThenable(promise, maybeThenable, then);
        } else {
          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
        }
      }
    }

    function lib$es6$promise$$internal$$resolve(promise, value) {
      if (promise === value) {
        lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$selfFulfillment());
      } else if (lib$es6$promise$utils$$objectOrFunction(value)) {
        lib$es6$promise$$internal$$handleMaybeThenable(promise, value, lib$es6$promise$$internal$$getThen(value));
      } else {
        lib$es6$promise$$internal$$fulfill(promise, value);
      }
    }

    function lib$es6$promise$$internal$$publishRejection(promise) {
      if (promise._onerror) {
        promise._onerror(promise._result);
      }

      lib$es6$promise$$internal$$publish(promise);
    }

    function lib$es6$promise$$internal$$fulfill(promise, value) {
      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }

      promise._result = value;
      promise._state = lib$es6$promise$$internal$$FULFILLED;

      if (promise._subscribers.length !== 0) {
        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, promise);
      }
    }

    function lib$es6$promise$$internal$$reject(promise, reason) {
      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }
      promise._state = lib$es6$promise$$internal$$REJECTED;
      promise._result = reason;

      lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publishRejection, promise);
    }

    function lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
      var subscribers = parent._subscribers;
      var length = subscribers.length;

      parent._onerror = null;

      subscribers[length] = child;
      subscribers[length + lib$es6$promise$$internal$$FULFILLED] = onFulfillment;
      subscribers[length + lib$es6$promise$$internal$$REJECTED]  = onRejection;

      if (length === 0 && parent._state) {
        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, parent);
      }
    }

    function lib$es6$promise$$internal$$publish(promise) {
      var subscribers = promise._subscribers;
      var settled = promise._state;

      if (subscribers.length === 0) { return; }

      var child, callback, detail = promise._result;

      for (var i = 0; i < subscribers.length; i += 3) {
        child = subscribers[i];
        callback = subscribers[i + settled];

        if (child) {
          lib$es6$promise$$internal$$invokeCallback(settled, child, callback, detail);
        } else {
          callback(detail);
        }
      }

      promise._subscribers.length = 0;
    }

    function lib$es6$promise$$internal$$ErrorObject() {
      this.error = null;
    }

    var lib$es6$promise$$internal$$TRY_CATCH_ERROR = new lib$es6$promise$$internal$$ErrorObject();

    function lib$es6$promise$$internal$$tryCatch(callback, detail) {
      try {
        return callback(detail);
      } catch(e) {
        lib$es6$promise$$internal$$TRY_CATCH_ERROR.error = e;
        return lib$es6$promise$$internal$$TRY_CATCH_ERROR;
      }
    }

    function lib$es6$promise$$internal$$invokeCallback(settled, promise, callback, detail) {
      var hasCallback = lib$es6$promise$utils$$isFunction(callback),
          value, error, succeeded, failed;

      if (hasCallback) {
        value = lib$es6$promise$$internal$$tryCatch(callback, detail);

        if (value === lib$es6$promise$$internal$$TRY_CATCH_ERROR) {
          failed = true;
          error = value.error;
          value = null;
        } else {
          succeeded = true;
        }

        if (promise === value) {
          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$cannotReturnOwn());
          return;
        }

      } else {
        value = detail;
        succeeded = true;
      }

      if (promise._state !== lib$es6$promise$$internal$$PENDING) {
        // noop
      } else if (hasCallback && succeeded) {
        lib$es6$promise$$internal$$resolve(promise, value);
      } else if (failed) {
        lib$es6$promise$$internal$$reject(promise, error);
      } else if (settled === lib$es6$promise$$internal$$FULFILLED) {
        lib$es6$promise$$internal$$fulfill(promise, value);
      } else if (settled === lib$es6$promise$$internal$$REJECTED) {
        lib$es6$promise$$internal$$reject(promise, value);
      }
    }

    function lib$es6$promise$$internal$$initializePromise(promise, resolver) {
      try {
        resolver(function resolvePromise(value){
          lib$es6$promise$$internal$$resolve(promise, value);
        }, function rejectPromise(reason) {
          lib$es6$promise$$internal$$reject(promise, reason);
        });
      } catch(e) {
        lib$es6$promise$$internal$$reject(promise, e);
      }
    }

    var lib$es6$promise$$internal$$id = 0;
    function lib$es6$promise$$internal$$nextId() {
      return lib$es6$promise$$internal$$id++;
    }

    function lib$es6$promise$$internal$$makePromise(promise) {
      promise[lib$es6$promise$$internal$$PROMISE_ID] = lib$es6$promise$$internal$$id++;
      promise._state = undefined;
      promise._result = undefined;
      promise._subscribers = [];
    }

    function lib$es6$promise$promise$all$$all(entries) {
      return new lib$es6$promise$enumerator$$default(this, entries).promise;
    }
    var lib$es6$promise$promise$all$$default = lib$es6$promise$promise$all$$all;
    function lib$es6$promise$promise$race$$race(entries) {
      /*jshint validthis:true */
      var Constructor = this;

      if (!lib$es6$promise$utils$$isArray(entries)) {
        return new Constructor(function(resolve, reject) {
          reject(new TypeError('You must pass an array to race.'));
        });
      } else {
        return new Constructor(function(resolve, reject) {
          var length = entries.length;
          for (var i = 0; i < length; i++) {
            Constructor.resolve(entries[i]).then(resolve, reject);
          }
        });
      }
    }
    var lib$es6$promise$promise$race$$default = lib$es6$promise$promise$race$$race;
    function lib$es6$promise$promise$reject$$reject(reason) {
      /*jshint validthis:true */
      var Constructor = this;
      var promise = new Constructor(lib$es6$promise$$internal$$noop);
      lib$es6$promise$$internal$$reject(promise, reason);
      return promise;
    }
    var lib$es6$promise$promise$reject$$default = lib$es6$promise$promise$reject$$reject;


    function lib$es6$promise$promise$$needsResolver() {
      throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
    }

    function lib$es6$promise$promise$$needsNew() {
      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
    }

    var lib$es6$promise$promise$$default = lib$es6$promise$promise$$Promise;
    /**
      Promise objects represent the eventual result of an asynchronous operation. The
      primary way of interacting with a promise is through its `then` method, which
      registers callbacks to receive either a promise's eventual value or the reason
      why the promise cannot be fulfilled.

      Terminology
      -----------

      - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
      - `thenable` is an object or function that defines a `then` method.
      - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
      - `exception` is a value that is thrown using the throw statement.
      - `reason` is a value that indicates why a promise was rejected.
      - `settled` the final resting state of a promise, fulfilled or rejected.

      A promise can be in one of three states: pending, fulfilled, or rejected.

      Promises that are fulfilled have a fulfillment value and are in the fulfilled
      state.  Promises that are rejected have a rejection reason and are in the
      rejected state.  A fulfillment value is never a thenable.

      Promises can also be said to *resolve* a value.  If this value is also a
      promise, then the original promise's settled state will match the value's
      settled state.  So a promise that *resolves* a promise that rejects will
      itself reject, and a promise that *resolves* a promise that fulfills will
      itself fulfill.


      Basic Usage:
      ------------

      ```js
      var promise = new Promise(function(resolve, reject) {
        // on success
        resolve(value);

        // on failure
        reject(reason);
      });

      promise.then(function(value) {
        // on fulfillment
      }, function(reason) {
        // on rejection
      });
      ```

      Advanced Usage:
      ---------------

      Promises shine when abstracting away asynchronous interactions such as
      `XMLHttpRequest`s.

      ```js
      function getJSON(url) {
        return new Promise(function(resolve, reject){
          var xhr = new XMLHttpRequest();

          xhr.open('GET', url);
          xhr.onreadystatechange = handler;
          xhr.responseType = 'json';
          xhr.setRequestHeader('Accept', 'application/json');
          xhr.send();

          function handler() {
            if (this.readyState === this.DONE) {
              if (this.status === 200) {
                resolve(this.response);
              } else {
                reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
              }
            }
          };
        });
      }

      getJSON('/posts.json').then(function(json) {
        // on fulfillment
      }, function(reason) {
        // on rejection
      });
      ```

      Unlike callbacks, promises are great composable primitives.

      ```js
      Promise.all([
        getJSON('/posts'),
        getJSON('/comments')
      ]).then(function(values){
        values[0] // => postsJSON
        values[1] // => commentsJSON

        return values;
      });
      ```

      @class Promise
      @param {function} resolver
      Useful for tooling.
      @constructor
    */
    function lib$es6$promise$promise$$Promise(resolver) {
      this[lib$es6$promise$$internal$$PROMISE_ID] = lib$es6$promise$$internal$$nextId();
      this._result = this._state = undefined;
      this._subscribers = [];

      if (lib$es6$promise$$internal$$noop !== resolver) {
        typeof resolver !== 'function' && lib$es6$promise$promise$$needsResolver();
        this instanceof lib$es6$promise$promise$$Promise ? lib$es6$promise$$internal$$initializePromise(this, resolver) : lib$es6$promise$promise$$needsNew();
      }
    }

    lib$es6$promise$promise$$Promise.all = lib$es6$promise$promise$all$$default;
    lib$es6$promise$promise$$Promise.race = lib$es6$promise$promise$race$$default;
    lib$es6$promise$promise$$Promise.resolve = lib$es6$promise$promise$resolve$$default;
    lib$es6$promise$promise$$Promise.reject = lib$es6$promise$promise$reject$$default;
    lib$es6$promise$promise$$Promise._setScheduler = lib$es6$promise$asap$$setScheduler;
    lib$es6$promise$promise$$Promise._setAsap = lib$es6$promise$asap$$setAsap;
    lib$es6$promise$promise$$Promise._asap = lib$es6$promise$asap$$asap;

    lib$es6$promise$promise$$Promise.prototype = {
      constructor: lib$es6$promise$promise$$Promise,

    /**
      The primary way of interacting with a promise is through its `then` method,
      which registers callbacks to receive either a promise's eventual value or the
      reason why the promise cannot be fulfilled.

      ```js
      findUser().then(function(user){
        // user is available
      }, function(reason){
        // user is unavailable, and you are given the reason why
      });
      ```

      Chaining
      --------

      The return value of `then` is itself a promise.  This second, 'downstream'
      promise is resolved with the return value of the first promise's fulfillment
      or rejection handler, or rejected if the handler throws an exception.

      ```js
      findUser().then(function (user) {
        return user.name;
      }, function (reason) {
        return 'default name';
      }).then(function (userName) {
        // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
        // will be `'default name'`
      });

      findUser().then(function (user) {
        throw new Error('Found user, but still unhappy');
      }, function (reason) {
        throw new Error('`findUser` rejected and we're unhappy');
      }).then(function (value) {
        // never reached
      }, function (reason) {
        // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
        // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
      });
      ```
      If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.

      ```js
      findUser().then(function (user) {
        throw new PedagogicalException('Upstream error');
      }).then(function (value) {
        // never reached
      }).then(function (value) {
        // never reached
      }, function (reason) {
        // The `PedgagocialException` is propagated all the way down to here
      });
      ```

      Assimilation
      ------------

      Sometimes the value you want to propagate to a downstream promise can only be
      retrieved asynchronously. This can be achieved by returning a promise in the
      fulfillment or rejection handler. The downstream promise will then be pending
      until the returned promise is settled. This is called *assimilation*.

      ```js
      findUser().then(function (user) {
        return findCommentsByAuthor(user);
      }).then(function (comments) {
        // The user's comments are now available
      });
      ```

      If the assimliated promise rejects, then the downstream promise will also reject.

      ```js
      findUser().then(function (user) {
        return findCommentsByAuthor(user);
      }).then(function (comments) {
        // If `findCommentsByAuthor` fulfills, we'll have the value here
      }, function (reason) {
        // If `findCommentsByAuthor` rejects, we'll have the reason here
      });
      ```

      Simple Example
      --------------

      Synchronous Example

      ```javascript
      var result;

      try {
        result = findResult();
        // success
      } catch(reason) {
        // failure
      }
      ```

      Errback Example

      ```js
      findResult(function(result, err){
        if (err) {
          // failure
        } else {
          // success
        }
      });
      ```

      Promise Example;

      ```javascript
      findResult().then(function(result){
        // success
      }, function(reason){
        // failure
      });
      ```

      Advanced Example
      --------------

      Synchronous Example

      ```javascript
      var author, books;

      try {
        author = findAuthor();
        books  = findBooksByAuthor(author);
        // success
      } catch(reason) {
        // failure
      }
      ```

      Errback Example

      ```js

      function foundBooks(books) {

      }

      function failure(reason) {

      }

      findAuthor(function(author, err){
        if (err) {
          failure(err);
          // failure
        } else {
          try {
            findBoooksByAuthor(author, function(books, err) {
              if (err) {
                failure(err);
              } else {
                try {
                  foundBooks(books);
                } catch(reason) {
                  failure(reason);
                }
              }
            });
          } catch(error) {
            failure(err);
          }
          // success
        }
      });
      ```

      Promise Example;

      ```javascript
      findAuthor().
        then(findBooksByAuthor).
        then(function(books){
          // found books
      }).catch(function(reason){
        // something went wrong
      });
      ```

      @method then
      @param {Function} onFulfilled
      @param {Function} onRejected
      Useful for tooling.
      @return {Promise}
    */
      then: lib$es6$promise$then$$default,

    /**
      `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
      as the catch block of a try/catch statement.

      ```js
      function findAuthor(){
        throw new Error('couldn't find that author');
      }

      // synchronous
      try {
        findAuthor();
      } catch(reason) {
        // something went wrong
      }

      // async with promises
      findAuthor().catch(function(reason){
        // something went wrong
      });
      ```

      @method catch
      @param {Function} onRejection
      Useful for tooling.
      @return {Promise}
    */
      'catch': function(onRejection) {
        return this.then(null, onRejection);
      }
    };
    var lib$es6$promise$enumerator$$default = lib$es6$promise$enumerator$$Enumerator;
    function lib$es6$promise$enumerator$$Enumerator(Constructor, input) {
      this._instanceConstructor = Constructor;
      this.promise = new Constructor(lib$es6$promise$$internal$$noop);

      if (!this.promise[lib$es6$promise$$internal$$PROMISE_ID]) {
        lib$es6$promise$$internal$$makePromise(this.promise);
      }

      if (lib$es6$promise$utils$$isArray(input)) {
        this._input     = input;
        this.length     = input.length;
        this._remaining = input.length;

        this._result = new Array(this.length);

        if (this.length === 0) {
          lib$es6$promise$$internal$$fulfill(this.promise, this._result);
        } else {
          this.length = this.length || 0;
          this._enumerate();
          if (this._remaining === 0) {
            lib$es6$promise$$internal$$fulfill(this.promise, this._result);
          }
        }
      } else {
        lib$es6$promise$$internal$$reject(this.promise, lib$es6$promise$enumerator$$validationError());
      }
    }

    function lib$es6$promise$enumerator$$validationError() {
      return new Error('Array Methods must be provided an Array');
    }

    lib$es6$promise$enumerator$$Enumerator.prototype._enumerate = function() {
      var length  = this.length;
      var input   = this._input;

      for (var i = 0; this._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
        this._eachEntry(input[i], i);
      }
    };

    lib$es6$promise$enumerator$$Enumerator.prototype._eachEntry = function(entry, i) {
      var c = this._instanceConstructor;
      var resolve = c.resolve;

      if (resolve === lib$es6$promise$promise$resolve$$default) {
        var then = lib$es6$promise$$internal$$getThen(entry);

        if (then === lib$es6$promise$then$$default &&
            entry._state !== lib$es6$promise$$internal$$PENDING) {
          this._settledAt(entry._state, i, entry._result);
        } else if (typeof then !== 'function') {
          this._remaining--;
          this._result[i] = entry;
        } else if (c === lib$es6$promise$promise$$default) {
          var promise = new c(lib$es6$promise$$internal$$noop);
          lib$es6$promise$$internal$$handleMaybeThenable(promise, entry, then);
          this._willSettleAt(promise, i);
        } else {
          this._willSettleAt(new c(function(resolve) { resolve(entry); }), i);
        }
      } else {
        this._willSettleAt(resolve(entry), i);
      }
    };

    lib$es6$promise$enumerator$$Enumerator.prototype._settledAt = function(state, i, value) {
      var promise = this.promise;

      if (promise._state === lib$es6$promise$$internal$$PENDING) {
        this._remaining--;

        if (state === lib$es6$promise$$internal$$REJECTED) {
          lib$es6$promise$$internal$$reject(promise, value);
        } else {
          this._result[i] = value;
        }
      }

      if (this._remaining === 0) {
        lib$es6$promise$$internal$$fulfill(promise, this._result);
      }
    };

    lib$es6$promise$enumerator$$Enumerator.prototype._willSettleAt = function(promise, i) {
      var enumerator = this;

      lib$es6$promise$$internal$$subscribe(promise, undefined, function(value) {
        enumerator._settledAt(lib$es6$promise$$internal$$FULFILLED, i, value);
      }, function(reason) {
        enumerator._settledAt(lib$es6$promise$$internal$$REJECTED, i, reason);
      });
    };
    function lib$es6$promise$polyfill$$polyfill() {
      var local;

      if (typeof global !== 'undefined') {
          local = global;
      } else if (typeof self !== 'undefined') {
          local = self;
      } else {
          try {
              local = Function('return this')();
          } catch (e) {
              throw new Error('polyfill failed because global object is unavailable in this environment');
          }
      }

      var P = local.Promise;

      if (P && Object.prototype.toString.call(P.resolve()) === '[object Promise]' && !P.cast) {
        return;
      }

      local.Promise = lib$es6$promise$promise$$default;
    }
    var lib$es6$promise$polyfill$$default = lib$es6$promise$polyfill$$polyfill;

    var lib$es6$promise$umd$$ES6Promise = {
      'Promise': lib$es6$promise$promise$$default,
      'polyfill': lib$es6$promise$polyfill$$default
    };

    /* global define:true module:true window: true */
    if (typeof define === 'function' && define['amd']) {
      define(function() { return lib$es6$promise$umd$$ES6Promise; });
    } else if (typeof module !== 'undefined' && module['exports']) {
      module['exports'] = lib$es6$promise$umd$$ES6Promise;
    } else if (typeof this !== 'undefined') {
      this['ES6Promise'] = lib$es6$promise$umd$$ES6Promise;
    }

    lib$es6$promise$polyfill$$default();
}).call(this);


}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"_process":48}],29:[function(require,module,exports){
/**
 * Indicates that navigation was caused by a call to history.push.
 */
'use strict';

exports.__esModule = true;
var PUSH = 'PUSH';

exports.PUSH = PUSH;
/**
 * Indicates that navigation was caused by a call to history.replace.
 */
var REPLACE = 'REPLACE';

exports.REPLACE = REPLACE;
/**
 * Indicates that navigation was caused by some other action such
 * as using a browser's back/forward buttons and/or manually manipulating
 * the URL in a browser's location bar. This is the default.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate
 * for more information.
 */
var POP = 'POP';

exports.POP = POP;
exports['default'] = {
  PUSH: PUSH,
  REPLACE: REPLACE,
  POP: POP
};
},{}],30:[function(require,module,exports){
"use strict";

exports.__esModule = true;
var _slice = Array.prototype.slice;
exports.loopAsync = loopAsync;

function loopAsync(turns, work, callback) {
  var currentTurn = 0,
      isDone = false;
  var sync = false,
      hasNext = false,
      doneArgs = undefined;

  function done() {
    isDone = true;
    if (sync) {
      // Iterate instead of recursing if possible.
      doneArgs = [].concat(_slice.call(arguments));
      return;
    }

    callback.apply(this, arguments);
  }

  function next() {
    if (isDone) {
      return;
    }

    hasNext = true;
    if (sync) {
      // Iterate instead of recursing if possible.
      return;
    }

    sync = true;

    while (!isDone && currentTurn < turns && hasNext) {
      hasNext = false;
      work.call(this, currentTurn++, next, done);
    }

    sync = false;

    if (isDone) {
      // This means the loop finished synchronously.
      callback.apply(this, doneArgs);
      return;
    }

    if (currentTurn >= turns && hasNext) {
      isDone = true;
      callback();
    }
  }

  next();
}
},{}],31:[function(require,module,exports){
(function (process){
/*eslint-disable no-empty */
'use strict';

exports.__esModule = true;
exports.saveState = saveState;
exports.readState = readState;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var KeyPrefix = '@@History/';
var QuotaExceededErrors = ['QuotaExceededError', 'QUOTA_EXCEEDED_ERR'];

var SecurityError = 'SecurityError';

function createKey(key) {
  return KeyPrefix + key;
}

function saveState(key, state) {
  try {
    if (state == null) {
      window.sessionStorage.removeItem(createKey(key));
    } else {
      window.sessionStorage.setItem(createKey(key), JSON.stringify(state));
    }
  } catch (error) {
    if (error.name === SecurityError) {
      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
      // attempt to access window.sessionStorage.
      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] Unable to save state; sessionStorage is not available due to security settings') : undefined;

      return;
    }

    if (QuotaExceededErrors.indexOf(error.name) >= 0 && window.sessionStorage.length === 0) {
      // Safari "private mode" throws QuotaExceededError.
      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] Unable to save state; sessionStorage is not available in Safari private mode') : undefined;

      return;
    }

    throw error;
  }
}

function readState(key) {
  var json = undefined;
  try {
    json = window.sessionStorage.getItem(createKey(key));
  } catch (error) {
    if (error.name === SecurityError) {
      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
      // attempt to access window.sessionStorage.
      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] Unable to read state; sessionStorage is not available due to security settings') : undefined;

      return null;
    }
  }

  if (json) {
    try {
      return JSON.parse(json);
    } catch (error) {
      // Ignore invalid JSON.
    }
  }

  return null;
}
}).call(this,require('_process'))

},{"_process":48,"warning":88}],32:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.addEventListener = addEventListener;
exports.removeEventListener = removeEventListener;
exports.getHashPath = getHashPath;
exports.replaceHashPath = replaceHashPath;
exports.getWindowPath = getWindowPath;
exports.go = go;
exports.getUserConfirmation = getUserConfirmation;
exports.supportsHistory = supportsHistory;
exports.supportsGoWithoutReloadUsingHash = supportsGoWithoutReloadUsingHash;

function addEventListener(node, event, listener) {
  if (node.addEventListener) {
    node.addEventListener(event, listener, false);
  } else {
    node.attachEvent('on' + event, listener);
  }
}

function removeEventListener(node, event, listener) {
  if (node.removeEventListener) {
    node.removeEventListener(event, listener, false);
  } else {
    node.detachEvent('on' + event, listener);
  }
}

function getHashPath() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  return window.location.href.split('#')[1] || '';
}

function replaceHashPath(path) {
  window.location.replace(window.location.pathname + window.location.search + '#' + path);
}

function getWindowPath() {
  return window.location.pathname + window.location.search + window.location.hash;
}

function go(n) {
  if (n) window.history.go(n);
}

function getUserConfirmation(message, callback) {
  callback(window.confirm(message));
}

/**
 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
 *
 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
 * changed to avoid false negatives for Windows Phones: https://github.com/rackt/react-router/issues/586
 */

function supportsHistory() {
  var ua = navigator.userAgent;
  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) {
    return false;
  }
  return window.history && 'pushState' in window.history;
}

/**
 * Returns false if using go(n) with hash history causes a full page reload.
 */

function supportsGoWithoutReloadUsingHash() {
  var ua = navigator.userAgent;
  return ua.indexOf('Firefox') === -1;
}
},{}],33:[function(require,module,exports){
'use strict';

exports.__esModule = true;
var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
exports.canUseDOM = canUseDOM;
},{}],34:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;
exports.extractPath = extractPath;
exports.parsePath = parsePath;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function extractPath(string) {
  var match = string.match(/^https?:\/\/[^\/]*/);

  if (match == null) return string;

  return string.substring(match[0].length);
}

function parsePath(path) {
  var pathname = extractPath(path);
  var search = '';
  var hash = '';

  process.env.NODE_ENV !== 'production' ? _warning2['default'](path === pathname, 'A path must be pathname + search + hash only, not a fully qualified URL like "%s"', path) : undefined;

  var hashIndex = pathname.indexOf('#');
  if (hashIndex !== -1) {
    hash = pathname.substring(hashIndex);
    pathname = pathname.substring(0, hashIndex);
  }

  var searchIndex = pathname.indexOf('?');
  if (searchIndex !== -1) {
    search = pathname.substring(searchIndex);
    pathname = pathname.substring(0, searchIndex);
  }

  if (pathname === '') pathname = '/';

  return {
    pathname: pathname,
    search: search,
    hash: hash
  };
}
}).call(this,require('_process'))

},{"_process":48,"warning":88}],35:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _Actions = require('./Actions');

var _PathUtils = require('./PathUtils');

var _ExecutionEnvironment = require('./ExecutionEnvironment');

var _DOMUtils = require('./DOMUtils');

var _DOMStateStorage = require('./DOMStateStorage');

var _createDOMHistory = require('./createDOMHistory');

var _createDOMHistory2 = _interopRequireDefault(_createDOMHistory);

/**
 * Creates and returns a history object that uses HTML5's history API
 * (pushState, replaceState, and the popstate event) to manage history.
 * This is the recommended method of managing history in browsers because
 * it provides the cleanest URLs.
 *
 * Note: In browsers that do not support the HTML5 history API full
 * page reloads will be used to preserve URLs.
 */
function createBrowserHistory() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'Browser history needs a DOM') : _invariant2['default'](false) : undefined;

  var forceRefresh = options.forceRefresh;

  var isSupported = _DOMUtils.supportsHistory();
  var useRefresh = !isSupported || forceRefresh;

  function getCurrentLocation(historyState) {
    historyState = historyState || window.history.state || {};

    var path = _DOMUtils.getWindowPath();
    var _historyState = historyState;
    var key = _historyState.key;

    var state = undefined;
    if (key) {
      state = _DOMStateStorage.readState(key);
    } else {
      state = null;
      key = history.createKey();

      if (isSupported) window.history.replaceState(_extends({}, historyState, { key: key }), null);
    }

    var location = _PathUtils.parsePath(path);

    return history.createLocation(_extends({}, location, { state: state }), undefined, key);
  }

  function startPopStateListener(_ref) {
    var transitionTo = _ref.transitionTo;

    function popStateListener(event) {
      if (event.state === undefined) return; // Ignore extraneous popstate events in WebKit.

      transitionTo(getCurrentLocation(event.state));
    }

    _DOMUtils.addEventListener(window, 'popstate', popStateListener);

    return function () {
      _DOMUtils.removeEventListener(window, 'popstate', popStateListener);
    };
  }

  function finishTransition(location) {
    var basename = location.basename;
    var pathname = location.pathname;
    var search = location.search;
    var hash = location.hash;
    var state = location.state;
    var action = location.action;
    var key = location.key;

    if (action === _Actions.POP) return; // Nothing to do.

    _DOMStateStorage.saveState(key, state);

    var path = (basename || '') + pathname + search + hash;
    var historyState = {
      key: key
    };

    if (action === _Actions.PUSH) {
      if (useRefresh) {
        window.location.href = path;
        return false; // Prevent location update.
      } else {
          window.history.pushState(historyState, null, path);
        }
    } else {
      // REPLACE
      if (useRefresh) {
        window.location.replace(path);
        return false; // Prevent location update.
      } else {
          window.history.replaceState(historyState, null, path);
        }
    }
  }

  var history = _createDOMHistory2['default'](_extends({}, options, {
    getCurrentLocation: getCurrentLocation,
    finishTransition: finishTransition,
    saveState: _DOMStateStorage.saveState
  }));

  var listenerCount = 0,
      stopPopStateListener = undefined;

  function listenBefore(listener) {
    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);

    var unlisten = history.listenBefore(listener);

    return function () {
      unlisten();

      if (--listenerCount === 0) stopPopStateListener();
    };
  }

  function listen(listener) {
    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);

    var unlisten = history.listen(listener);

    return function () {
      unlisten();

      if (--listenerCount === 0) stopPopStateListener();
    };
  }

  // deprecated
  function registerTransitionHook(hook) {
    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);

    history.registerTransitionHook(hook);
  }

  // deprecated
  function unregisterTransitionHook(hook) {
    history.unregisterTransitionHook(hook);

    if (--listenerCount === 0) stopPopStateListener();
  }

  return _extends({}, history, {
    listenBefore: listenBefore,
    listen: listen,
    registerTransitionHook: registerTransitionHook,
    unregisterTransitionHook: unregisterTransitionHook
  });
}

exports['default'] = createBrowserHistory;
module.exports = exports['default'];
}).call(this,require('_process'))

},{"./Actions":29,"./DOMStateStorage":31,"./DOMUtils":32,"./ExecutionEnvironment":33,"./PathUtils":34,"./createDOMHistory":36,"_process":48,"invariant":46}],36:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _ExecutionEnvironment = require('./ExecutionEnvironment');

var _DOMUtils = require('./DOMUtils');

var _createHistory = require('./createHistory');

var _createHistory2 = _interopRequireDefault(_createHistory);

function createDOMHistory(options) {
  var history = _createHistory2['default'](_extends({
    getUserConfirmation: _DOMUtils.getUserConfirmation
  }, options, {
    go: _DOMUtils.go
  }));

  function listen(listener) {
    !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'DOM history needs a DOM') : _invariant2['default'](false) : undefined;

    return history.listen(listener);
  }

  return _extends({}, history, {
    listen: listen
  });
}

exports['default'] = createDOMHistory;
module.exports = exports['default'];
}).call(this,require('_process'))

},{"./DOMUtils":32,"./ExecutionEnvironment":33,"./createHistory":38,"_process":48,"invariant":46}],37:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _Actions = require('./Actions');

var _PathUtils = require('./PathUtils');

var _ExecutionEnvironment = require('./ExecutionEnvironment');

var _DOMUtils = require('./DOMUtils');

var _DOMStateStorage = require('./DOMStateStorage');

var _createDOMHistory = require('./createDOMHistory');

var _createDOMHistory2 = _interopRequireDefault(_createDOMHistory);

function isAbsolutePath(path) {
  return typeof path === 'string' && path.charAt(0) === '/';
}

function ensureSlash() {
  var path = _DOMUtils.getHashPath();

  if (isAbsolutePath(path)) return true;

  _DOMUtils.replaceHashPath('/' + path);

  return false;
}

function addQueryStringValueToPath(path, key, value) {
  return path + (path.indexOf('?') === -1 ? '?' : '&') + (key + '=' + value);
}

function stripQueryStringValueFromPath(path, key) {
  return path.replace(new RegExp('[?&]?' + key + '=[a-zA-Z0-9]+'), '');
}

function getQueryStringValueFromPath(path, key) {
  var match = path.match(new RegExp('\\?.*?\\b' + key + '=(.+?)\\b'));
  return match && match[1];
}

var DefaultQueryKey = '_k';

function createHashHistory() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'Hash history needs a DOM') : _invariant2['default'](false) : undefined;

  var queryKey = options.queryKey;

  if (queryKey === undefined || !!queryKey) queryKey = typeof queryKey === 'string' ? queryKey : DefaultQueryKey;

  function getCurrentLocation() {
    var path = _DOMUtils.getHashPath();

    var key = undefined,
        state = undefined;
    if (queryKey) {
      key = getQueryStringValueFromPath(path, queryKey);
      path = stripQueryStringValueFromPath(path, queryKey);

      if (key) {
        state = _DOMStateStorage.readState(key);
      } else {
        state = null;
        key = history.createKey();
        _DOMUtils.replaceHashPath(addQueryStringValueToPath(path, queryKey, key));
      }
    } else {
      key = state = null;
    }

    var location = _PathUtils.parsePath(path);

    return history.createLocation(_extends({}, location, { state: state }), undefined, key);
  }

  function startHashChangeListener(_ref) {
    var transitionTo = _ref.transitionTo;

    function hashChangeListener() {
      if (!ensureSlash()) return; // Always make sure hashes are preceeded with a /.

      transitionTo(getCurrentLocation());
    }

    ensureSlash();
    _DOMUtils.addEventListener(window, 'hashchange', hashChangeListener);

    return function () {
      _DOMUtils.removeEventListener(window, 'hashchange', hashChangeListener);
    };
  }

  function finishTransition(location) {
    var basename = location.basename;
    var pathname = location.pathname;
    var search = location.search;
    var state = location.state;
    var action = location.action;
    var key = location.key;

    if (action === _Actions.POP) return; // Nothing to do.

    var path = (basename || '') + pathname + search;

    if (queryKey) {
      path = addQueryStringValueToPath(path, queryKey, key);
      _DOMStateStorage.saveState(key, state);
    } else {
      // Drop key and state.
      location.key = location.state = null;
    }

    var currentHash = _DOMUtils.getHashPath();

    if (action === _Actions.PUSH) {
      if (currentHash !== path) {
        window.location.hash = path;
      } else {
        process.env.NODE_ENV !== 'production' ? _warning2['default'](false, 'You cannot PUSH the same path using hash history') : undefined;
      }
    } else if (currentHash !== path) {
      // REPLACE
      _DOMUtils.replaceHashPath(path);
    }
  }

  var history = _createDOMHistory2['default'](_extends({}, options, {
    getCurrentLocation: getCurrentLocation,
    finishTransition: finishTransition,
    saveState: _DOMStateStorage.saveState
  }));

  var listenerCount = 0,
      stopHashChangeListener = undefined;

  function listenBefore(listener) {
    if (++listenerCount === 1) stopHashChangeListener = startHashChangeListener(history);

    var unlisten = history.listenBefore(listener);

    return function () {
      unlisten();

      if (--listenerCount === 0) stopHashChangeListener();
    };
  }

  function listen(listener) {
    if (++listenerCount === 1) stopHashChangeListener = startHashChangeListener(history);

    var unlisten = history.listen(listener);

    return function () {
      unlisten();

      if (--listenerCount === 0) stopHashChangeListener();
    };
  }

  function push(location) {
    process.env.NODE_ENV !== 'production' ? _warning2['default'](queryKey || location.state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;

    history.push(location);
  }

  function replace(location) {
    process.env.NODE_ENV !== 'production' ? _warning2['default'](queryKey || location.state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;

    history.replace(location);
  }

  var goIsSupportedWithoutReload = _DOMUtils.supportsGoWithoutReloadUsingHash();

  function go(n) {
    process.env.NODE_ENV !== 'production' ? _warning2['default'](goIsSupportedWithoutReload, 'Hash history go(n) causes a full page reload in this browser') : undefined;

    history.go(n);
  }

  function createHref(path) {
    return '#' + history.createHref(path);
  }

  // deprecated
  function registerTransitionHook(hook) {
    if (++listenerCount === 1) stopHashChangeListener = startHashChangeListener(history);

    history.registerTransitionHook(hook);
  }

  // deprecated
  function unregisterTransitionHook(hook) {
    history.unregisterTransitionHook(hook);

    if (--listenerCount === 0) stopHashChangeListener();
  }

  // deprecated
  function pushState(state, path) {
    process.env.NODE_ENV !== 'production' ? _warning2['default'](queryKey || state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;

    history.pushState(state, path);
  }

  // deprecated
  function replaceState(state, path) {
    process.env.NODE_ENV !== 'production' ? _warning2['default'](queryKey || state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;

    history.replaceState(state, path);
  }

  return _extends({}, history, {
    listenBefore: listenBefore,
    listen: listen,
    push: push,
    replace: replace,
    go: go,
    createHref: createHref,

    registerTransitionHook: registerTransitionHook, // deprecated - warning is in createHistory
    unregisterTransitionHook: unregisterTransitionHook, // deprecated - warning is in createHistory
    pushState: pushState, // deprecated - warning is in createHistory
    replaceState: replaceState // deprecated - warning is in createHistory
  });
}

exports['default'] = createHashHistory;
module.exports = exports['default'];
}).call(this,require('_process'))

},{"./Actions":29,"./DOMStateStorage":31,"./DOMUtils":32,"./ExecutionEnvironment":33,"./PathUtils":34,"./createDOMHistory":36,"_process":48,"invariant":46,"warning":88}],38:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _deepEqual = require('deep-equal');

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _PathUtils = require('./PathUtils');

var _AsyncUtils = require('./AsyncUtils');

var _Actions = require('./Actions');

var _createLocation2 = require('./createLocation');

var _createLocation3 = _interopRequireDefault(_createLocation2);

var _runTransitionHook = require('./runTransitionHook');

var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);

var _deprecate = require('./deprecate');

var _deprecate2 = _interopRequireDefault(_deprecate);

function createRandomKey(length) {
  return Math.random().toString(36).substr(2, length);
}

function locationsAreEqual(a, b) {
  return a.pathname === b.pathname && a.search === b.search &&
  //a.action === b.action && // Different action !== location change.
  a.key === b.key && _deepEqual2['default'](a.state, b.state);
}

var DefaultKeyLength = 6;

function createHistory() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var getCurrentLocation = options.getCurrentLocation;
  var finishTransition = options.finishTransition;
  var saveState = options.saveState;
  var go = options.go;
  var getUserConfirmation = options.getUserConfirmation;
  var keyLength = options.keyLength;

  if (typeof keyLength !== 'number') keyLength = DefaultKeyLength;

  var transitionHooks = [];

  function listenBefore(hook) {
    transitionHooks.push(hook);

    return function () {
      transitionHooks = transitionHooks.filter(function (item) {
        return item !== hook;
      });
    };
  }

  var allKeys = [];
  var changeListeners = [];
  var location = undefined;

  function getCurrent() {
    if (pendingLocation && pendingLocation.action === _Actions.POP) {
      return allKeys.indexOf(pendingLocation.key);
    } else if (location) {
      return allKeys.indexOf(location.key);
    } else {
      return -1;
    }
  }

  function updateLocation(newLocation) {
    var current = getCurrent();

    location = newLocation;

    if (location.action === _Actions.PUSH) {
      allKeys = [].concat(allKeys.slice(0, current + 1), [location.key]);
    } else if (location.action === _Actions.REPLACE) {
      allKeys[current] = location.key;
    }

    changeListeners.forEach(function (listener) {
      listener(location);
    });
  }

  function listen(listener) {
    changeListeners.push(listener);

    if (location) {
      listener(location);
    } else {
      var _location = getCurrentLocation();
      allKeys = [_location.key];
      updateLocation(_location);
    }

    return function () {
      changeListeners = changeListeners.filter(function (item) {
        return item !== listener;
      });
    };
  }

  function confirmTransitionTo(location, callback) {
    _AsyncUtils.loopAsync(transitionHooks.length, function (index, next, done) {
      _runTransitionHook2['default'](transitionHooks[index], location, function (result) {
        if (result != null) {
          done(result);
        } else {
          next();
        }
      });
    }, function (message) {
      if (getUserConfirmation && typeof message === 'string') {
        getUserConfirmation(message, function (ok) {
          callback(ok !== false);
        });
      } else {
        callback(message !== false);
      }
    });
  }

  var pendingLocation = undefined;

  function transitionTo(nextLocation) {
    if (location && locationsAreEqual(location, nextLocation)) return; // Nothing to do.

    pendingLocation = nextLocation;

    confirmTransitionTo(nextLocation, function (ok) {
      if (pendingLocation !== nextLocation) return; // Transition was interrupted.

      if (ok) {
        // treat PUSH to current path like REPLACE to be consistent with browsers
        if (nextLocation.action === _Actions.PUSH) {
          var prevPath = createPath(location);
          var nextPath = createPath(nextLocation);

          if (nextPath === prevPath && _deepEqual2['default'](location.state, nextLocation.state)) nextLocation.action = _Actions.REPLACE;
        }

        if (finishTransition(nextLocation) !== false) updateLocation(nextLocation);
      } else if (location && nextLocation.action === _Actions.POP) {
        var prevIndex = allKeys.indexOf(location.key);
        var nextIndex = allKeys.indexOf(nextLocation.key);

        if (prevIndex !== -1 && nextIndex !== -1) go(prevIndex - nextIndex); // Restore the URL.
      }
    });
  }

  function push(location) {
    transitionTo(createLocation(location, _Actions.PUSH, createKey()));
  }

  function replace(location) {
    transitionTo(createLocation(location, _Actions.REPLACE, createKey()));
  }

  function goBack() {
    go(-1);
  }

  function goForward() {
    go(1);
  }

  function createKey() {
    return createRandomKey(keyLength);
  }

  function createPath(location) {
    if (location == null || typeof location === 'string') return location;

    var pathname = location.pathname;
    var search = location.search;
    var hash = location.hash;

    var result = pathname;

    if (search) result += search;

    if (hash) result += hash;

    return result;
  }

  function createHref(location) {
    return createPath(location);
  }

  function createLocation(location, action) {
    var key = arguments.length <= 2 || arguments[2] === undefined ? createKey() : arguments[2];

    if (typeof action === 'object') {
      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, 'The state (2nd) argument to history.createLocation is deprecated; use a ' + 'location descriptor instead') : undefined;

      if (typeof location === 'string') location = _PathUtils.parsePath(location);

      location = _extends({}, location, { state: action });

      action = key;
      key = arguments[3] || createKey();
    }

    return _createLocation3['default'](location, action, key);
  }

  // deprecated
  function setState(state) {
    if (location) {
      updateLocationState(location, state);
      updateLocation(location);
    } else {
      updateLocationState(getCurrentLocation(), state);
    }
  }

  function updateLocationState(location, state) {
    location.state = _extends({}, location.state, state);
    saveState(location.key, location.state);
  }

  // deprecated
  function registerTransitionHook(hook) {
    if (transitionHooks.indexOf(hook) === -1) transitionHooks.push(hook);
  }

  // deprecated
  function unregisterTransitionHook(hook) {
    transitionHooks = transitionHooks.filter(function (item) {
      return item !== hook;
    });
  }

  // deprecated
  function pushState(state, path) {
    if (typeof path === 'string') path = _PathUtils.parsePath(path);

    push(_extends({ state: state }, path));
  }

  // deprecated
  function replaceState(state, path) {
    if (typeof path === 'string') path = _PathUtils.parsePath(path);

    replace(_extends({ state: state }, path));
  }

  return {
    listenBefore: listenBefore,
    listen: listen,
    transitionTo: transitionTo,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    createKey: createKey,
    createPath: createPath,
    createHref: createHref,
    createLocation: createLocation,

    setState: _deprecate2['default'](setState, 'setState is deprecated; use location.key to save state instead'),
    registerTransitionHook: _deprecate2['default'](registerTransitionHook, 'registerTransitionHook is deprecated; use listenBefore instead'),
    unregisterTransitionHook: _deprecate2['default'](unregisterTransitionHook, 'unregisterTransitionHook is deprecated; use the callback returned from listenBefore instead'),
    pushState: _deprecate2['default'](pushState, 'pushState is deprecated; use push instead'),
    replaceState: _deprecate2['default'](replaceState, 'replaceState is deprecated; use replace instead')
  };
}

exports['default'] = createHistory;
module.exports = exports['default'];
}).call(this,require('_process'))

},{"./Actions":29,"./AsyncUtils":30,"./PathUtils":34,"./createLocation":39,"./deprecate":41,"./runTransitionHook":42,"_process":48,"deep-equal":25,"warning":88}],39:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _Actions = require('./Actions');

var _PathUtils = require('./PathUtils');

function createLocation() {
  var location = arguments.length <= 0 || arguments[0] === undefined ? '/' : arguments[0];
  var action = arguments.length <= 1 || arguments[1] === undefined ? _Actions.POP : arguments[1];
  var key = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

  var _fourthArg = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

  if (typeof location === 'string') location = _PathUtils.parsePath(location);

  if (typeof action === 'object') {
    process.env.NODE_ENV !== 'production' ? _warning2['default'](false, 'The state (2nd) argument to createLocation is deprecated; use a ' + 'location descriptor instead') : undefined;

    location = _extends({}, location, { state: action });

    action = key || _Actions.POP;
    key = _fourthArg;
  }

  var pathname = location.pathname || '/';
  var search = location.search || '';
  var hash = location.hash || '';
  var state = location.state || null;

  return {
    pathname: pathname,
    search: search,
    hash: hash,
    state: state,
    action: action,
    key: key
  };
}

exports['default'] = createLocation;
module.exports = exports['default'];
}).call(this,require('_process'))

},{"./Actions":29,"./PathUtils":34,"_process":48,"warning":88}],40:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _PathUtils = require('./PathUtils');

var _Actions = require('./Actions');

var _createHistory = require('./createHistory');

var _createHistory2 = _interopRequireDefault(_createHistory);

function createStateStorage(entries) {
  return entries.filter(function (entry) {
    return entry.state;
  }).reduce(function (memo, entry) {
    memo[entry.key] = entry.state;
    return memo;
  }, {});
}

function createMemoryHistory() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  if (Array.isArray(options)) {
    options = { entries: options };
  } else if (typeof options === 'string') {
    options = { entries: [options] };
  }

  var history = _createHistory2['default'](_extends({}, options, {
    getCurrentLocation: getCurrentLocation,
    finishTransition: finishTransition,
    saveState: saveState,
    go: go
  }));

  var _options = options;
  var entries = _options.entries;
  var current = _options.current;

  if (typeof entries === 'string') {
    entries = [entries];
  } else if (!Array.isArray(entries)) {
    entries = ['/'];
  }

  entries = entries.map(function (entry) {
    var key = history.createKey();

    if (typeof entry === 'string') return { pathname: entry, key: key };

    if (typeof entry === 'object' && entry) return _extends({}, entry, { key: key });

    !false ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'Unable to create history entry from %s', entry) : _invariant2['default'](false) : undefined;
  });

  if (current == null) {
    current = entries.length - 1;
  } else {
    !(current >= 0 && current < entries.length) ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'Current index must be >= 0 and < %s, was %s', entries.length, current) : _invariant2['default'](false) : undefined;
  }

  var storage = createStateStorage(entries);

  function saveState(key, state) {
    storage[key] = state;
  }

  function readState(key) {
    return storage[key];
  }

  function getCurrentLocation() {
    var entry = entries[current];
    var basename = entry.basename;
    var pathname = entry.pathname;
    var search = entry.search;

    var path = (basename || '') + pathname + (search || '');

    var key = undefined,
        state = undefined;
    if (entry.key) {
      key = entry.key;
      state = readState(key);
    } else {
      key = history.createKey();
      state = null;
      entry.key = key;
    }

    var location = _PathUtils.parsePath(path);

    return history.createLocation(_extends({}, location, { state: state }), undefined, key);
  }

  function canGo(n) {
    var index = current + n;
    return index >= 0 && index < entries.length;
  }

  function go(n) {
    if (n) {
      if (!canGo(n)) {
        process.env.NODE_ENV !== 'production' ? _warning2['default'](false, 'Cannot go(%s) there is not enough history', n) : undefined;
        return;
      }

      current += n;

      var currentLocation = getCurrentLocation();

      // change action to POP
      history.transitionTo(_extends({}, currentLocation, { action: _Actions.POP }));
    }
  }

  function finishTransition(location) {
    switch (location.action) {
      case _Actions.PUSH:
        current += 1;

        // if we are not on the top of stack
        // remove rest and push new
        if (current < entries.length) entries.splice(current);

        entries.push(location);
        saveState(location.key, location.state);
        break;
      case _Actions.REPLACE:
        entries[current] = location;
        saveState(location.key, location.state);
        break;
    }
  }

  return history;
}

exports['default'] = createMemoryHistory;
module.exports = exports['default'];
}).call(this,require('_process'))

},{"./Actions":29,"./PathUtils":34,"./createHistory":38,"_process":48,"invariant":46,"warning":88}],41:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function deprecate(fn, message) {
  return function () {
    process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] ' + message) : undefined;
    return fn.apply(this, arguments);
  };
}

exports['default'] = deprecate;
module.exports = exports['default'];
}).call(this,require('_process'))

},{"_process":48,"warning":88}],42:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function runTransitionHook(hook, location, callback) {
  var result = hook(location, callback);

  if (hook.length < 2) {
    // Assume the hook runs synchronously and automatically
    // call the callback with the return value.
    callback(result);
  } else {
    process.env.NODE_ENV !== 'production' ? _warning2['default'](result === undefined, 'You should not "return" in a transition hook with a callback argument; call the callback instead') : undefined;
  }
}

exports['default'] = runTransitionHook;
module.exports = exports['default'];
}).call(this,require('_process'))

},{"_process":48,"warning":88}],43:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _ExecutionEnvironment = require('./ExecutionEnvironment');

var _PathUtils = require('./PathUtils');

var _runTransitionHook = require('./runTransitionHook');

var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);

var _deprecate = require('./deprecate');

var _deprecate2 = _interopRequireDefault(_deprecate);

function useBasename(createHistory) {
  return function () {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var history = createHistory(options);

    var basename = options.basename;

    var checkedBaseHref = false;

    function checkBaseHref() {
      if (checkedBaseHref) {
        return;
      }

      // Automatically use the value of <base href> in HTML
      // documents as basename if it's not explicitly given.
      if (basename == null && _ExecutionEnvironment.canUseDOM) {
        var base = document.getElementsByTagName('base')[0];
        var baseHref = base && base.getAttribute('href');

        if (baseHref != null) {
          basename = baseHref;

          process.env.NODE_ENV !== 'production' ? _warning2['default'](false, 'Automatically setting basename using <base href> is deprecated and will ' + 'be removed in the next major release. The semantics of <base href> are ' + 'subtly different from basename. Please pass the basename explicitly in ' + 'the options to createHistory') : undefined;
        }
      }

      checkedBaseHref = true;
    }

    function addBasename(location) {
      checkBaseHref();

      if (basename && location.basename == null) {
        if (location.pathname.indexOf(basename) === 0) {
          location.pathname = location.pathname.substring(basename.length);
          location.basename = basename;

          if (location.pathname === '') location.pathname = '/';
        } else {
          location.basename = '';
        }
      }

      return location;
    }

    function prependBasename(location) {
      checkBaseHref();

      if (!basename) return location;

      if (typeof location === 'string') location = _PathUtils.parsePath(location);

      var pname = location.pathname;
      var normalizedBasename = basename.slice(-1) === '/' ? basename : basename + '/';
      var normalizedPathname = pname.charAt(0) === '/' ? pname.slice(1) : pname;
      var pathname = normalizedBasename + normalizedPathname;

      return _extends({}, location, {
        pathname: pathname
      });
    }

    // Override all read methods with basename-aware versions.
    function listenBefore(hook) {
      return history.listenBefore(function (location, callback) {
        _runTransitionHook2['default'](hook, addBasename(location), callback);
      });
    }

    function listen(listener) {
      return history.listen(function (location) {
        listener(addBasename(location));
      });
    }

    // Override all write methods with basename-aware versions.
    function push(location) {
      history.push(prependBasename(location));
    }

    function replace(location) {
      history.replace(prependBasename(location));
    }

    function createPath(location) {
      return history.createPath(prependBasename(location));
    }

    function createHref(location) {
      return history.createHref(prependBasename(location));
    }

    function createLocation(location) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return addBasename(history.createLocation.apply(history, [prependBasename(location)].concat(args)));
    }

    // deprecated
    function pushState(state, path) {
      if (typeof path === 'string') path = _PathUtils.parsePath(path);

      push(_extends({ state: state }, path));
    }

    // deprecated
    function replaceState(state, path) {
      if (typeof path === 'string') path = _PathUtils.parsePath(path);

      replace(_extends({ state: state }, path));
    }

    return _extends({}, history, {
      listenBefore: listenBefore,
      listen: listen,
      push: push,
      replace: replace,
      createPath: createPath,
      createHref: createHref,
      createLocation: createLocation,

      pushState: _deprecate2['default'](pushState, 'pushState is deprecated; use push instead'),
      replaceState: _deprecate2['default'](replaceState, 'replaceState is deprecated; use replace instead')
    });
  };
}

exports['default'] = useBasename;
module.exports = exports['default'];
}).call(this,require('_process'))

},{"./ExecutionEnvironment":33,"./PathUtils":34,"./deprecate":41,"./runTransitionHook":42,"_process":48,"warning":88}],44:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _queryString = require('query-string');

var _runTransitionHook = require('./runTransitionHook');

var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);

var _PathUtils = require('./PathUtils');

var _deprecate = require('./deprecate');

var _deprecate2 = _interopRequireDefault(_deprecate);

var SEARCH_BASE_KEY = '$searchBase';

function defaultStringifyQuery(query) {
  return _queryString.stringify(query).replace(/%20/g, '+');
}

var defaultParseQueryString = _queryString.parse;

function isNestedObject(object) {
  for (var p in object) {
    if (Object.prototype.hasOwnProperty.call(object, p) && typeof object[p] === 'object' && !Array.isArray(object[p]) && object[p] !== null) return true;
  }return false;
}

/**
 * Returns a new createHistory function that may be used to create
 * history objects that know how to handle URL queries.
 */
function useQueries(createHistory) {
  return function () {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var history = createHistory(options);

    var stringifyQuery = options.stringifyQuery;
    var parseQueryString = options.parseQueryString;

    if (typeof stringifyQuery !== 'function') stringifyQuery = defaultStringifyQuery;

    if (typeof parseQueryString !== 'function') parseQueryString = defaultParseQueryString;

    function addQuery(location) {
      if (location.query == null) {
        var search = location.search;

        location.query = parseQueryString(search.substring(1));
        location[SEARCH_BASE_KEY] = { search: search, searchBase: '' };
      }

      // TODO: Instead of all the book-keeping here, this should just strip the
      // stringified query from the search.

      return location;
    }

    function appendQuery(location, query) {
      var _extends2;

      var searchBaseSpec = location[SEARCH_BASE_KEY];
      var queryString = query ? stringifyQuery(query) : '';
      if (!searchBaseSpec && !queryString) {
        return location;
      }

      process.env.NODE_ENV !== 'production' ? _warning2['default'](stringifyQuery !== defaultStringifyQuery || !isNestedObject(query), 'useQueries does not stringify nested query objects by default; ' + 'use a custom stringifyQuery function') : undefined;

      if (typeof location === 'string') location = _PathUtils.parsePath(location);

      var searchBase = undefined;
      if (searchBaseSpec && location.search === searchBaseSpec.search) {
        searchBase = searchBaseSpec.searchBase;
      } else {
        searchBase = location.search || '';
      }

      var search = searchBase;
      if (queryString) {
        search += (search ? '&' : '?') + queryString;
      }

      return _extends({}, location, (_extends2 = {
        search: search
      }, _extends2[SEARCH_BASE_KEY] = { search: search, searchBase: searchBase }, _extends2));
    }

    // Override all read methods with query-aware versions.
    function listenBefore(hook) {
      return history.listenBefore(function (location, callback) {
        _runTransitionHook2['default'](hook, addQuery(location), callback);
      });
    }

    function listen(listener) {
      return history.listen(function (location) {
        listener(addQuery(location));
      });
    }

    // Override all write methods with query-aware versions.
    function push(location) {
      history.push(appendQuery(location, location.query));
    }

    function replace(location) {
      history.replace(appendQuery(location, location.query));
    }

    function createPath(location, query) {
      process.env.NODE_ENV !== 'production' ? _warning2['default'](!query, 'the query argument to createPath is deprecated; use a location descriptor instead') : undefined;

      return history.createPath(appendQuery(location, query || location.query));
    }

    function createHref(location, query) {
      process.env.NODE_ENV !== 'production' ? _warning2['default'](!query, 'the query argument to createHref is deprecated; use a location descriptor instead') : undefined;

      return history.createHref(appendQuery(location, query || location.query));
    }

    function createLocation(location) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var fullLocation = history.createLocation.apply(history, [appendQuery(location, location.query)].concat(args));
      if (location.query) {
        fullLocation.query = location.query;
      }
      return addQuery(fullLocation);
    }

    // deprecated
    function pushState(state, path, query) {
      if (typeof path === 'string') path = _PathUtils.parsePath(path);

      push(_extends({ state: state }, path, { query: query }));
    }

    // deprecated
    function replaceState(state, path, query) {
      if (typeof path === 'string') path = _PathUtils.parsePath(path);

      replace(_extends({ state: state }, path, { query: query }));
    }

    return _extends({}, history, {
      listenBefore: listenBefore,
      listen: listen,
      push: push,
      replace: replace,
      createPath: createPath,
      createHref: createHref,
      createLocation: createLocation,

      pushState: _deprecate2['default'](pushState, 'pushState is deprecated; use push instead'),
      replaceState: _deprecate2['default'](replaceState, 'replaceState is deprecated; use replace instead')
    });
  };
}

exports['default'] = useQueries;
module.exports = exports['default'];
}).call(this,require('_process'))

},{"./PathUtils":34,"./deprecate":41,"./runTransitionHook":42,"_process":48,"query-string":49,"warning":88}],45:[function(require,module,exports){
/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

var REACT_STATICS = {
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    mixins: true,
    propTypes: true,
    type: true
};

var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    arguments: true,
    arity: true
};

module.exports = function hoistNonReactStatics(targetComponent, sourceComponent) {
    if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components
        var keys = Object.getOwnPropertyNames(sourceComponent);
        for (var i=0; i<keys.length; ++i) {
            if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]]) {
                try {
                    targetComponent[keys[i]] = sourceComponent[keys[i]];
                } catch (error) {

                }
            }
        }
    }

    return targetComponent;
};

},{}],46:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (process.env.NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

}).call(this,require('_process'))

},{"_process":48}],47:[function(require,module,exports){
// the whatwg-fetch polyfill installs the fetch() function
// on the global object (window or self)
//
// Return that as the export for use in Webpack, Browserify etc.
require('whatwg-fetch');
module.exports = self.fetch.bind(self);

},{"whatwg-fetch":89}],48:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],49:[function(require,module,exports){
'use strict';
var strictUriEncode = require('strict-uri-encode');

exports.extract = function (str) {
	return str.split('?')[1] || '';
};

exports.parse = function (str) {
	if (typeof str !== 'string') {
		return {};
	}

	str = str.trim().replace(/^(\?|#|&)/, '');

	if (!str) {
		return {};
	}

	return str.split('&').reduce(function (ret, param) {
		var parts = param.replace(/\+/g, ' ').split('=');
		// Firefox (pre 40) decodes `%3D` to `=`
		// https://github.com/sindresorhus/query-string/pull/37
		var key = parts.shift();
		var val = parts.length > 0 ? parts.join('=') : undefined;

		key = decodeURIComponent(key);

		// missing `=` should be `null`:
		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
		val = val === undefined ? null : decodeURIComponent(val);

		if (!ret.hasOwnProperty(key)) {
			ret[key] = val;
		} else if (Array.isArray(ret[key])) {
			ret[key].push(val);
		} else {
			ret[key] = [ret[key], val];
		}

		return ret;
	}, {});
};

exports.stringify = function (obj) {
	return obj ? Object.keys(obj).sort().map(function (key) {
		var val = obj[key];

		if (val === undefined) {
			return '';
		}

		if (val === null) {
			return key;
		}

		if (Array.isArray(val)) {
			return val.slice().sort().map(function (val2) {
				return strictUriEncode(key) + '=' + strictUriEncode(val2);
			}).join('&');
		}

		return strictUriEncode(key) + '=' + strictUriEncode(val);
	}).filter(function (x) {
		return x.length > 0;
	}).join('&') : '';
};

},{"strict-uri-encode":87}],50:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.loopAsync = loopAsync;
exports.mapAsync = mapAsync;
function loopAsync(turns, work, callback) {
  var currentTurn = 0,
      isDone = false;
  var sync = false,
      hasNext = false,
      doneArgs = void 0;

  function done() {
    isDone = true;
    if (sync) {
      // Iterate instead of recursing if possible.
      doneArgs = [].concat(Array.prototype.slice.call(arguments));
      return;
    }

    callback.apply(this, arguments);
  }

  function next() {
    if (isDone) {
      return;
    }

    hasNext = true;
    if (sync) {
      // Iterate instead of recursing if possible.
      return;
    }

    sync = true;

    while (!isDone && currentTurn < turns && hasNext) {
      hasNext = false;
      work.call(this, currentTurn++, next, done);
    }

    sync = false;

    if (isDone) {
      // This means the loop finished synchronously.
      callback.apply(this, doneArgs);
      return;
    }

    if (currentTurn >= turns && hasNext) {
      isDone = true;
      callback();
    }
  }

  next();
}

function mapAsync(array, work, callback) {
  var length = array.length;
  var values = [];

  if (length === 0) return callback(null, values);

  var isDone = false,
      doneCount = 0;

  function done(index, error, value) {
    if (isDone) return;

    if (error) {
      isDone = true;
      callback(error);
    } else {
      values[index] = value;

      isDone = ++doneCount === length;

      if (isDone) callback(null, values);
    }
  }

  array.forEach(function (item, index) {
    work(item, index, function (error, value) {
      done(index, error, value);
    });
  });
}
},{}],51:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

var _routerWarning = require('./routerWarning');

var _routerWarning2 = _interopRequireDefault(_routerWarning);

var _InternalPropTypes = require('./InternalPropTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A mixin that adds the "history" instance variable to components.
 */
var History = {

  contextTypes: {
    history: _InternalPropTypes.history
  },

  componentWillMount: function componentWillMount() {
    process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, 'the `History` mixin is deprecated, please access `context.router` with your own `contextTypes`. http://tiny.cc/router-historymixin') : void 0;
    this.history = this.context.history;
  }
};

exports.default = History;
module.exports = exports['default'];
}).call(this,require('_process'))

},{"./InternalPropTypes":55,"./routerWarning":83,"_process":48}],52:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Link = require('./Link');

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * An <IndexLink> is used to link to an <IndexRoute>.
 */
var IndexLink = _react2.default.createClass({
  displayName: 'IndexLink',
  render: function render() {
    return _react2.default.createElement(_Link2.default, _extends({}, this.props, { onlyActiveOnIndex: true }));
  }
});

exports.default = IndexLink;
module.exports = exports['default'];
},{"./Link":57,"react":"react"}],53:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _routerWarning = require('./routerWarning');

var _routerWarning2 = _interopRequireDefault(_routerWarning);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _Redirect = require('./Redirect');

var _Redirect2 = _interopRequireDefault(_Redirect);

var _InternalPropTypes = require('./InternalPropTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _React$PropTypes = _react2.default.PropTypes;
var string = _React$PropTypes.string;
var object = _React$PropTypes.object;

/**
 * An <IndexRedirect> is used to redirect from an indexRoute.
 */

var IndexRedirect = _react2.default.createClass({
  displayName: 'IndexRedirect',


  statics: {
    createRouteFromReactElement: function createRouteFromReactElement(element, parentRoute) {
      /* istanbul ignore else: sanity check */
      if (parentRoute) {
        parentRoute.indexRoute = _Redirect2.default.createRouteFromReactElement(element);
      } else {
        process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, 'An <IndexRedirect> does not make sense at the root of your route config') : void 0;
      }
    }
  },

  propTypes: {
    to: string.isRequired,
    query: object,
    state: object,
    onEnter: _InternalPropTypes.falsy,
    children: _InternalPropTypes.falsy
  },

  /* istanbul ignore next: sanity check */
  render: function render() {
    !false ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, '<IndexRedirect> elements are for router configuration only and should not be rendered') : (0, _invariant2.default)(false) : void 0;
  }
});

exports.default = IndexRedirect;
module.exports = exports['default'];
}).call(this,require('_process'))

},{"./InternalPropTypes":55,"./Redirect":60,"./routerWarning":83,"_process":48,"invariant":46,"react":"react"}],54:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _routerWarning = require('./routerWarning');

var _routerWarning2 = _interopRequireDefault(_routerWarning);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _RouteUtils = require('./RouteUtils');

var _InternalPropTypes = require('./InternalPropTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var func = _react2.default.PropTypes.func;

/**
 * An <IndexRoute> is used to specify its parent's <Route indexRoute> in
 * a JSX route config.
 */

var IndexRoute = _react2.default.createClass({
  displayName: 'IndexRoute',


  statics: {
    createRouteFromReactElement: function createRouteFromReactElement(element, parentRoute) {
      /* istanbul ignore else: sanity check */
      if (parentRoute) {
        parentRoute.indexRoute = (0, _RouteUtils.createRouteFromReactElement)(element);
      } else {
        process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, 'An <IndexRoute> does not make sense at the root of your route config') : void 0;
      }
    }
  },

  propTypes: {
    path: _InternalPropTypes.falsy,
    component: _InternalPropTypes.component,
    components: _InternalPropTypes.components,
    getComponent: func,
    getComponents: func
  },

  /* istanbul ignore next: sanity check */
  render: function render() {
    !false ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, '<IndexRoute> elements are for router configuration only and should not be rendered') : (0, _invariant2.default)(false) : void 0;
  }
});

exports.default = IndexRoute;
module.exports = exports['default'];
}).call(this,require('_process'))

},{"./InternalPropTypes":55,"./RouteUtils":63,"./routerWarning":83,"_process":48,"invariant":46,"react":"react"}],55:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.routes = exports.route = exports.components = exports.component = exports.history = undefined;
exports.falsy = falsy;

var _react = require('react');

var func = _react.PropTypes.func;
var object = _react.PropTypes.object;
var arrayOf = _react.PropTypes.arrayOf;
var oneOfType = _react.PropTypes.oneOfType;
var element = _react.PropTypes.element;
var shape = _react.PropTypes.shape;
var string = _react.PropTypes.string;
function falsy(props, propName, componentName) {
  if (props[propName]) return new Error('<' + componentName + '> should not have a "' + propName + '" prop');
}

var history = exports.history = shape({
  listen: func.isRequired,
  push: func.isRequired,
  replace: func.isRequired,
  go: func.isRequired,
  goBack: func.isRequired,
  goForward: func.isRequired
});

var component = exports.component = oneOfType([func, string]);
var components = exports.components = oneOfType([component, object]);
var route = exports.route = oneOfType([object, element]);
var routes = exports.routes = oneOfType([route, arrayOf(route)]);
},{"react":"react"}],56:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

var _routerWarning = require('./routerWarning');

var _routerWarning2 = _interopRequireDefault(_routerWarning);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var object = _react2.default.PropTypes.object;

/**
 * The Lifecycle mixin adds the routerWillLeave lifecycle method to a
 * component that may be used to cancel a transition or prompt the user
 * for confirmation.
 *
 * On standard transitions, routerWillLeave receives a single argument: the
 * location we're transitioning to. To cancel the transition, return false.
 * To prompt the user for confirmation, return a prompt message (string).
 *
 * During the beforeunload event (assuming you're using the useBeforeUnload
 * history enhancer), routerWillLeave does not receive a location object
 * because it isn't possible for us to know the location we're transitioning
 * to. In this case routerWillLeave must return a prompt message to prevent
 * the user from closing the window/tab.
 */

var Lifecycle = {

  contextTypes: {
    history: object.isRequired,
    // Nested children receive the route as context, either
    // set by the route component using the RouteContext mixin
    // or by some other ancestor.
    route: object
  },

  propTypes: {
    // Route components receive the route object as a prop.
    route: object
  },

  componentDidMount: function componentDidMount() {
    process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, 'the `Lifecycle` mixin is deprecated, please use `context.router.setRouteLeaveHook(route, hook)`. http://tiny.cc/router-lifecyclemixin') : void 0;
    !this.routerWillLeave ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'The Lifecycle mixin requires you to define a routerWillLeave method') : (0, _invariant2.default)(false) : void 0;

    var route = this.props.route || this.context.route;

    !route ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'The Lifecycle mixin must be used on either a) a <Route component> or ' + 'b) a descendant of a <Route component> that uses the RouteContext mixin') : (0, _invariant2.default)(false) : void 0;

    this._unlistenBeforeLeavingRoute = this.context.history.listenBeforeLeavingRoute(route, this.routerWillLeave);
  },
  componentWillUnmount: function componentWillUnmount() {
    if (this._unlistenBeforeLeavingRoute) this._unlistenBeforeLeavingRoute();
  }
};

exports.default = Lifecycle;
module.exports = exports['default'];
}).call(this,require('_process'))

},{"./routerWarning":83,"_process":48,"invariant":46,"react":"react"}],57:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _routerWarning = require('./routerWarning');

var _routerWarning2 = _interopRequireDefault(_routerWarning);

var _PropTypes = require('./PropTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _React$PropTypes = _react2.default.PropTypes;
var bool = _React$PropTypes.bool;
var object = _React$PropTypes.object;
var string = _React$PropTypes.string;
var func = _React$PropTypes.func;
var oneOfType = _React$PropTypes.oneOfType;


function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

// TODO: De-duplicate against hasAnyProperties in createTransitionManager.
function isEmptyObject(object) {
  for (var p in object) {
    if (Object.prototype.hasOwnProperty.call(object, p)) return false;
  }return true;
}

function createLocationDescriptor(to, _ref) {
  var query = _ref.query;
  var hash = _ref.hash;
  var state = _ref.state;

  if (query || hash || state) {
    return { pathname: to, query: query, hash: hash, state: state };
  }

  return to;
}

/**
 * A <Link> is used to create an <a> element that links to a route.
 * When that route is active, the link gets the value of its
 * activeClassName prop.
 *
 * For example, assuming you have the following route:
 *
 *   <Route path="/posts/:postID" component={Post} />
 *
 * You could use the following component to link to that route:
 *
 *   <Link to={`/posts/${post.id}`} />
 *
 * Links may pass along location state and/or query string parameters
 * in the state/query props, respectively.
 *
 *   <Link ... query={{ show: true }} state={{ the: 'state' }} />
 */
var Link = _react2.default.createClass({
  displayName: 'Link',


  contextTypes: {
    router: _PropTypes.routerShape
  },

  propTypes: {
    to: oneOfType([string, object]).isRequired,
    query: object,
    hash: string,
    state: object,
    activeStyle: object,
    activeClassName: string,
    onlyActiveOnIndex: bool.isRequired,
    onClick: func,
    target: string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      onlyActiveOnIndex: false,
      style: {}
    };
  },
  handleClick: function handleClick(event) {
    var allowTransition = true;

    if (this.props.onClick) this.props.onClick(event);

    if (isModifiedEvent(event) || !isLeftClickEvent(event)) return;

    if (event.defaultPrevented === true) allowTransition = false;

    // If target prop is set (e.g. to "_blank") let browser handle link.
    /* istanbul ignore if: untestable with Karma */
    if (this.props.target) {
      if (!allowTransition) event.preventDefault();

      return;
    }

    event.preventDefault();

    if (allowTransition) {
      var _props = this.props;
      var to = _props.to;
      var query = _props.query;
      var hash = _props.hash;
      var state = _props.state;

      var location = createLocationDescriptor(to, { query: query, hash: hash, state: state });

      this.context.router.push(location);
    }
  },
  render: function render() {
    var _props2 = this.props;
    var to = _props2.to;
    var query = _props2.query;
    var hash = _props2.hash;
    var state = _props2.state;
    var activeClassName = _props2.activeClassName;
    var activeStyle = _props2.activeStyle;
    var onlyActiveOnIndex = _props2.onlyActiveOnIndex;

    var props = _objectWithoutProperties(_props2, ['to', 'query', 'hash', 'state', 'activeClassName', 'activeStyle', 'onlyActiveOnIndex']);

    process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(!(query || hash || state), 'the `query`, `hash`, and `state` props on `<Link>` are deprecated, use `<Link to={{ pathname, query, hash, state }}/>. http://tiny.cc/router-isActivedeprecated') : void 0;

    // Ignore if rendered outside the context of router, simplifies unit testing.
    var router = this.context.router;


    if (router) {
      var location = createLocationDescriptor(to, { query: query, hash: hash, state: state });
      props.href = router.createHref(location);

      if (activeClassName || activeStyle != null && !isEmptyObject(activeStyle)) {
        if (router.isActive(location, onlyActiveOnIndex)) {
          if (activeClassName) {
            if (props.className) {
              props.className += ' ' + activeClassName;
            } else {
              props.className = activeClassName;
            }
          }

          if (activeStyle) props.style = _extends({}, props.style, activeStyle);
        }
      }
    }

    return _react2.default.createElement('a', _extends({}, props, { onClick: this.handleClick }));
  }
});

exports.default = Link;
module.exports = exports['default'];
}).call(this,require('_process'))

},{"./PropTypes":59,"./routerWarning":83,"_process":48,"react":"react"}],58:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;
exports.compilePattern = compilePattern;
exports.matchPattern = matchPattern;
exports.getParamNames = getParamNames;
exports.getParams = getParams;
exports.formatPattern = formatPattern;

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function _compilePattern(pattern) {
  var regexpSource = '';
  var paramNames = [];
  var tokens = [];

  var match = void 0,
      lastIndex = 0,
      matcher = /:([a-zA-Z_$][a-zA-Z0-9_$]*)|\*\*|\*|\(|\)/g;
  while (match = matcher.exec(pattern)) {
    if (match.index !== lastIndex) {
      tokens.push(pattern.slice(lastIndex, match.index));
      regexpSource += escapeRegExp(pattern.slice(lastIndex, match.index));
    }

    if (match[1]) {
      regexpSource += '([^/]+)';
      paramNames.push(match[1]);
    } else if (match[0] === '**') {
      regexpSource += '(.*)';
      paramNames.push('splat');
    } else if (match[0] === '*') {
      regexpSource += '(.*?)';
      paramNames.push('splat');
    } else if (match[0] === '(') {
      regexpSource += '(?:';
    } else if (match[0] === ')') {
      regexpSource += ')?';
    }

    tokens.push(match[0]);

    lastIndex = matcher.lastIndex;
  }

  if (lastIndex !== pattern.length) {
    tokens.push(pattern.slice(lastIndex, pattern.length));
    regexpSource += escapeRegExp(pattern.slice(lastIndex, pattern.length));
  }

  return {
    pattern: pattern,
    regexpSource: regexpSource,
    paramNames: paramNames,
    tokens: tokens
  };
}

var CompiledPatternsCache = {};

function compilePattern(pattern) {
  if (!(pattern in CompiledPatternsCache)) CompiledPatternsCache[pattern] = _compilePattern(pattern);

  return CompiledPatternsCache[pattern];
}

/**
 * Attempts to match a pattern on the given pathname. Patterns may use
 * the following special characters:
 *
 * - :paramName     Matches a URL segment up to the next /, ?, or #. The
 *                  captured string is considered a "param"
 * - ()             Wraps a segment of the URL that is optional
 * - *              Consumes (non-greedy) all characters up to the next
 *                  character in the pattern, or to the end of the URL if
 *                  there is none
 * - **             Consumes (greedy) all characters up to the next character
 *                  in the pattern, or to the end of the URL if there is none
 *
 *  The function calls callback(error, matched) when finished.
 * The return value is an object with the following properties:
 *
 * - remainingPathname
 * - paramNames
 * - paramValues
 */
function matchPattern(pattern, pathname) {
  // Ensure pattern starts with leading slash for consistency with pathname.
  if (pattern.charAt(0) !== '/') {
    pattern = '/' + pattern;
  }

  var _compilePattern2 = compilePattern(pattern);

  var regexpSource = _compilePattern2.regexpSource;
  var paramNames = _compilePattern2.paramNames;
  var tokens = _compilePattern2.tokens;


  if (pattern.charAt(pattern.length - 1) !== '/') {
    regexpSource += '/?'; // Allow optional path separator at end.
  }

  // Special-case patterns like '*' for catch-all routes.
  if (tokens[tokens.length - 1] === '*') {
    regexpSource += '$';
  }

  var match = pathname.match(new RegExp('^' + regexpSource, 'i'));
  if (match == null) {
    return null;
  }

  var matchedPath = match[0];
  var remainingPathname = pathname.substr(matchedPath.length);

  if (remainingPathname) {
    // Require that the match ends at a path separator, if we didn't match
    // the full path, so any remaining pathname is a new path segment.
    if (matchedPath.charAt(matchedPath.length - 1) !== '/') {
      return null;
    }

    // If there is a remaining pathname, treat the path separator as part of
    // the remaining pathname for properly continuing the match.
    remainingPathname = '/' + remainingPathname;
  }

  return {
    remainingPathname: remainingPathname,
    paramNames: paramNames,
    paramValues: match.slice(1).map(function (v) {
      return v && decodeURIComponent(v);
    })
  };
}

function getParamNames(pattern) {
  return compilePattern(pattern).paramNames;
}

function getParams(pattern, pathname) {
  var match = matchPattern(pattern, pathname);
  if (!match) {
    return null;
  }

  var paramNames = match.paramNames;
  var paramValues = match.paramValues;

  var params = {};

  paramNames.forEach(function (paramName, index) {
    params[paramName] = paramValues[index];
  });

  return params;
}

/**
 * Returns a version of the given pattern with params interpolated. Throws
 * if there is a dynamic segment of the pattern for which there is no param.
 */
function formatPattern(pattern, params) {
  params = params || {};

  var _compilePattern3 = compilePattern(pattern);

  var tokens = _compilePattern3.tokens;

  var parenCount = 0,
      pathname = '',
      splatIndex = 0;

  var token = void 0,
      paramName = void 0,
      paramValue = void 0;
  for (var i = 0, len = tokens.length; i < len; ++i) {
    token = tokens[i];

    if (token === '*' || token === '**') {
      paramValue = Array.isArray(params.splat) ? params.splat[splatIndex++] : params.splat;

      !(paramValue != null || parenCount > 0) ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'Missing splat #%s for path "%s"', splatIndex, pattern) : (0, _invariant2.default)(false) : void 0;

      if (paramValue != null) pathname += encodeURI(paramValue);
    } else if (token === '(') {
      parenCount += 1;
    } else if (token === ')') {
      parenCount -= 1;
    } else if (token.charAt(0) === ':') {
      paramName = token.substring(1);
      paramValue = params[paramName];

      !(paramValue != null || parenCount > 0) ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'Missing "%s" parameter for path "%s"', paramName, pattern) : (0, _invariant2.default)(false) : void 0;

      if (paramValue != null) pathname += encodeURIComponent(paramValue);
    } else {
      pathname += token;
    }
  }

  return pathname.replace(/\/+/g, '/');
}
}).call(this,require('_process'))

},{"_process":48,"invariant":46}],59:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;
exports.router = exports.routes = exports.route = exports.components = exports.component = exports.location = exports.history = exports.falsy = exports.locationShape = exports.routerShape = undefined;

var _react = require('react');

var _deprecateObjectProperties = require('./deprecateObjectProperties');

var _deprecateObjectProperties2 = _interopRequireDefault(_deprecateObjectProperties);

var _InternalPropTypes = require('./InternalPropTypes');

var InternalPropTypes = _interopRequireWildcard(_InternalPropTypes);

var _routerWarning = require('./routerWarning');

var _routerWarning2 = _interopRequireDefault(_routerWarning);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var func = _react.PropTypes.func;
var object = _react.PropTypes.object;
var shape = _react.PropTypes.shape;
var string = _react.PropTypes.string;
var routerShape = exports.routerShape = shape({
  push: func.isRequired,
  replace: func.isRequired,
  go: func.isRequired,
  goBack: func.isRequired,
  goForward: func.isRequired,
  setRouteLeaveHook: func.isRequired,
  isActive: func.isRequired
});

var locationShape = exports.locationShape = shape({
  pathname: string.isRequired,
  search: string.isRequired,
  state: object,
  action: string.isRequired,
  key: string
});

// Deprecated stuff below:

var falsy = exports.falsy = InternalPropTypes.falsy;
var history = exports.history = InternalPropTypes.history;
var location = exports.location = locationShape;
var component = exports.component = InternalPropTypes.component;
var components = exports.components = InternalPropTypes.components;
var route = exports.route = InternalPropTypes.route;
var routes = exports.routes = InternalPropTypes.routes;
var router = exports.router = routerShape;

if (process.env.NODE_ENV !== 'production') {
  (function () {
    var deprecatePropType = function deprecatePropType(propType, message) {
      return function () {
        process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, message) : void 0;
        return propType.apply(undefined, arguments);
      };
    };

    var deprecateInternalPropType = function deprecateInternalPropType(propType) {
      return deprecatePropType(propType, 'This prop type is not intended for external use, and was previously exported by mistake. These internal prop types are deprecated for external use, and will be removed in a later version.');
    };

    var deprecateRenamedPropType = function deprecateRenamedPropType(propType, name) {
      return deprecatePropType(propType, 'The `' + name + '` prop type is now exported as `' + name + 'Shape` to avoid name conflicts. This export is deprecated and will be removed in a later version.');
    };

    exports.falsy = falsy = deprecateInternalPropType(falsy);
    exports.history = history = deprecateInternalPropType(history);
    exports.component = component = deprecateInternalPropType(component);
    exports.components = components = deprecateInternalPropType(components);
    exports.route = route = deprecateInternalPropType(route);
    exports.routes = routes = deprecateInternalPropType(routes);

    exports.location = location = deprecateRenamedPropType(location, 'location');
    exports.router = router = deprecateRenamedPropType(router, 'router');
  })();
}

var defaultExport = {
  falsy: falsy,
  history: history,
  location: location,
  component: component,
  components: components,
  route: route,
  // For some reason, routes was never here.
  router: router
};

if (process.env.NODE_ENV !== 'production') {
  defaultExport = (0, _deprecateObjectProperties2.default)(defaultExport, 'The default export from `react-router/lib/PropTypes` is deprecated. Please use the named exports instead.');
}

exports.default = defaultExport;
}).call(this,require('_process'))

},{"./InternalPropTypes":55,"./deprecateObjectProperties":75,"./routerWarning":83,"_process":48,"react":"react"}],60:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _RouteUtils = require('./RouteUtils');

var _PatternUtils = require('./PatternUtils');

var _InternalPropTypes = require('./InternalPropTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _React$PropTypes = _react2.default.PropTypes;
var string = _React$PropTypes.string;
var object = _React$PropTypes.object;

/**
 * A <Redirect> is used to declare another URL path a client should
 * be sent to when they request a given URL.
 *
 * Redirects are placed alongside routes in the route configuration
 * and are traversed in the same manner.
 */

var Redirect = _react2.default.createClass({
  displayName: 'Redirect',


  statics: {
    createRouteFromReactElement: function createRouteFromReactElement(element) {
      var route = (0, _RouteUtils.createRouteFromReactElement)(element);

      if (route.from) route.path = route.from;

      route.onEnter = function (nextState, replace) {
        var location = nextState.location;
        var params = nextState.params;


        var pathname = void 0;
        if (route.to.charAt(0) === '/') {
          pathname = (0, _PatternUtils.formatPattern)(route.to, params);
        } else if (!route.to) {
          pathname = location.pathname;
        } else {
          var routeIndex = nextState.routes.indexOf(route);
          var parentPattern = Redirect.getRoutePattern(nextState.routes, routeIndex - 1);
          var pattern = parentPattern.replace(/\/*$/, '/') + route.to;
          pathname = (0, _PatternUtils.formatPattern)(pattern, params);
        }

        replace({
          pathname: pathname,
          query: route.query || location.query,
          state: route.state || location.state
        });
      };

      return route;
    },
    getRoutePattern: function getRoutePattern(routes, routeIndex) {
      var parentPattern = '';

      for (var i = routeIndex; i >= 0; i--) {
        var route = routes[i];
        var pattern = route.path || '';

        parentPattern = pattern.replace(/\/*$/, '/') + parentPattern;

        if (pattern.indexOf('/') === 0) break;
      }

      return '/' + parentPattern;
    }
  },

  propTypes: {
    path: string,
    from: string, // Alias for path
    to: string.isRequired,
    query: object,
    state: object,
    onEnter: _InternalPropTypes.falsy,
    children: _InternalPropTypes.falsy
  },

  /* istanbul ignore next: sanity check */
  render: function render() {
    !false ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, '<Redirect> elements are for router configuration only and should not be rendered') : (0, _invariant2.default)(false) : void 0;
  }
});

exports.default = Redirect;
module.exports = exports['default'];
}).call(this,require('_process'))

},{"./InternalPropTypes":55,"./PatternUtils":58,"./RouteUtils":63,"_process":48,"invariant":46,"react":"react"}],61:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _RouteUtils = require('./RouteUtils');

var _InternalPropTypes = require('./InternalPropTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _React$PropTypes = _react2.default.PropTypes;
var string = _React$PropTypes.string;
var func = _React$PropTypes.func;

/**
 * A <Route> is used to declare which components are rendered to the
 * page when the URL matches a given pattern.
 *
 * Routes are arranged in a nested tree structure. When a new URL is
 * requested, the tree is searched depth-first to find a route whose
 * path matches the URL.  When one is found, all routes in the tree
 * that lead to it are considered "active" and their components are
 * rendered into the DOM, nested in the same order as in the tree.
 */

var Route = _react2.default.createClass({
  displayName: 'Route',


  statics: {
    createRouteFromReactElement: _RouteUtils.createRouteFromReactElement
  },

  propTypes: {
    path: string,
    component: _InternalPropTypes.component,
    components: _InternalPropTypes.components,
    getComponent: func,
    getComponents: func
  },

  /* istanbul ignore next: sanity check */
  render: function render() {
    !false ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, '<Route> elements are for router configuration only and should not be rendered') : (0, _invariant2.default)(false) : void 0;
  }
});

exports.default = Route;
module.exports = exports['default'];
}).call(this,require('_process'))

},{"./InternalPropTypes":55,"./RouteUtils":63,"_process":48,"invariant":46,"react":"react"}],62:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

var _routerWarning = require('./routerWarning');

var _routerWarning2 = _interopRequireDefault(_routerWarning);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var object = _react2.default.PropTypes.object;

/**
 * The RouteContext mixin provides a convenient way for route
 * components to set the route in context. This is needed for
 * routes that render elements that want to use the Lifecycle
 * mixin to prevent transitions.
 */

var RouteContext = {

  propTypes: {
    route: object.isRequired
  },

  childContextTypes: {
    route: object.isRequired
  },

  getChildContext: function getChildContext() {
    return {
      route: this.props.route
    };
  },
  componentWillMount: function componentWillMount() {
    process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, 'The `RouteContext` mixin is deprecated. You can provide `this.props.route` on context with your own `contextTypes`. http://tiny.cc/router-routecontextmixin') : void 0;
  }
};

exports.default = RouteContext;
module.exports = exports['default'];
}).call(this,require('_process'))

},{"./routerWarning":83,"_process":48,"react":"react"}],63:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.isReactChildren = isReactChildren;
exports.createRouteFromReactElement = createRouteFromReactElement;
exports.createRoutesFromReactChildren = createRoutesFromReactChildren;
exports.createRoutes = createRoutes;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _routerWarning = require('./routerWarning');

var _routerWarning2 = _interopRequireDefault(_routerWarning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isValidChild(object) {
  return object == null || _react2.default.isValidElement(object);
}

function isReactChildren(object) {
  return isValidChild(object) || Array.isArray(object) && object.every(isValidChild);
}

function checkPropTypes(componentName, propTypes, props) {
  componentName = componentName || 'UnknownComponent';

  for (var propName in propTypes) {
    if (Object.prototype.hasOwnProperty.call(propTypes, propName)) {
      var error = propTypes[propName](props, propName, componentName);

      /* istanbul ignore if: error logging */
      if (error instanceof Error) process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, error.message) : void 0;
    }
  }
}

function createRoute(defaultProps, props) {
  return _extends({}, defaultProps, props);
}

function createRouteFromReactElement(element) {
  var type = element.type;
  var route = createRoute(type.defaultProps, element.props);

  if (type.propTypes) checkPropTypes(type.displayName || type.name, type.propTypes, route);

  if (route.children) {
    var childRoutes = createRoutesFromReactChildren(route.children, route);

    if (childRoutes.length) route.childRoutes = childRoutes;

    delete route.children;
  }

  return route;
}

/**
 * Creates and returns a routes object from the given ReactChildren. JSX
 * provides a convenient way to visualize how routes in the hierarchy are
 * nested.
 *
 *   import { Route, createRoutesFromReactChildren } from 'react-router'
 *   
 *   const routes = createRoutesFromReactChildren(
 *     <Route component={App}>
 *       <Route path="home" component={Dashboard}/>
 *       <Route path="news" component={NewsFeed}/>
 *     </Route>
 *   )
 *
 * Note: This method is automatically used when you provide <Route> children
 * to a <Router> component.
 */
function createRoutesFromReactChildren(children, parentRoute) {
  var routes = [];

  _react2.default.Children.forEach(children, function (element) {
    if (_react2.default.isValidElement(element)) {
      // Component classes may have a static create* method.
      if (element.type.createRouteFromReactElement) {
        var route = element.type.createRouteFromReactElement(element, parentRoute);

        if (route) routes.push(route);
      } else {
        routes.push(createRouteFromReactElement(element));
      }
    }
  });

  return routes;
}

/**
 * Creates and returns an array of routes from the given object which
 * may be a JSX route, a plain object route, or an array of either.
 */
function createRoutes(routes) {
  if (isReactChildren(routes)) {
    routes = createRoutesFromReactChildren(routes);
  } else if (routes && !Array.isArray(routes)) {
    routes = [routes];
  }

  return routes;
}
}).call(this,require('_process'))

},{"./routerWarning":83,"_process":48,"react":"react"}],64:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createHashHistory = require('history/lib/createHashHistory');

var _createHashHistory2 = _interopRequireDefault(_createHashHistory);

var _useQueries = require('history/lib/useQueries');

var _useQueries2 = _interopRequireDefault(_useQueries);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createTransitionManager = require('./createTransitionManager');

var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);

var _InternalPropTypes = require('./InternalPropTypes');

var _RouterContext = require('./RouterContext');

var _RouterContext2 = _interopRequireDefault(_RouterContext);

var _RouteUtils = require('./RouteUtils');

var _RouterUtils = require('./RouterUtils');

var _routerWarning = require('./routerWarning');

var _routerWarning2 = _interopRequireDefault(_routerWarning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function isDeprecatedHistory(history) {
  return !history || !history.__v2_compatible__;
}

var _React$PropTypes = _react2.default.PropTypes;
var func = _React$PropTypes.func;
var object = _React$PropTypes.object;

/**
 * A <Router> is a high-level API for automatically setting up
 * a router that renders a <RouterContext> with all the props
 * it needs each time the URL changes.
 */

var Router = _react2.default.createClass({
  displayName: 'Router',


  propTypes: {
    history: object,
    children: _InternalPropTypes.routes,
    routes: _InternalPropTypes.routes, // alias for children
    render: func,
    createElement: func,
    onError: func,
    onUpdate: func,

    // PRIVATE: For client-side rehydration of server match.
    matchContext: object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      render: function render(props) {
        return _react2.default.createElement(_RouterContext2.default, props);
      }
    };
  },
  getInitialState: function getInitialState() {
    return {
      location: null,
      routes: null,
      params: null,
      components: null
    };
  },
  handleError: function handleError(error) {
    if (this.props.onError) {
      this.props.onError.call(this, error);
    } else {
      // Throw errors by default so we don't silently swallow them!
      throw error; // This error probably occurred in getChildRoutes or getComponents.
    }
  },
  componentWillMount: function componentWillMount() {
    var _this = this;

    var _props = this.props;
    var parseQueryString = _props.parseQueryString;
    var stringifyQuery = _props.stringifyQuery;

    process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(!(parseQueryString || stringifyQuery), '`parseQueryString` and `stringifyQuery` are deprecated. Please create a custom history. http://tiny.cc/router-customquerystring') : void 0;

    var _createRouterObjects = this.createRouterObjects();

    var history = _createRouterObjects.history;
    var transitionManager = _createRouterObjects.transitionManager;
    var router = _createRouterObjects.router;


    this._unlisten = transitionManager.listen(function (error, state) {
      if (error) {
        _this.handleError(error);
      } else {
        _this.setState(state, _this.props.onUpdate);
      }
    });

    this.history = history;
    this.router = router;
  },
  createRouterObjects: function createRouterObjects() {
    var matchContext = this.props.matchContext;

    if (matchContext) {
      return matchContext;
    }

    var history = this.props.history;
    var _props2 = this.props;
    var routes = _props2.routes;
    var children = _props2.children;


    if (isDeprecatedHistory(history)) {
      history = this.wrapDeprecatedHistory(history);
    }

    var transitionManager = (0, _createTransitionManager2.default)(history, (0, _RouteUtils.createRoutes)(routes || children));
    var router = (0, _RouterUtils.createRouterObject)(history, transitionManager);
    var routingHistory = (0, _RouterUtils.createRoutingHistory)(history, transitionManager);

    return { history: routingHistory, transitionManager: transitionManager, router: router };
  },
  wrapDeprecatedHistory: function wrapDeprecatedHistory(history) {
    var _props3 = this.props;
    var parseQueryString = _props3.parseQueryString;
    var stringifyQuery = _props3.stringifyQuery;


    var createHistory = void 0;
    if (history) {
      process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, 'It appears you have provided a deprecated history object to `<Router/>`, please use a history provided by ' + 'React Router with `import { browserHistory } from \'react-router\'` or `import { hashHistory } from \'react-router\'`. ' + 'If you are using a custom history please create it with `useRouterHistory`, see http://tiny.cc/router-usinghistory for details.') : void 0;
      createHistory = function createHistory() {
        return history;
      };
    } else {
      process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, '`Router` no longer defaults the history prop to hash history. Please use the `hashHistory` singleton instead. http://tiny.cc/router-defaulthistory') : void 0;
      createHistory = _createHashHistory2.default;
    }

    return (0, _useQueries2.default)(createHistory)({ parseQueryString: parseQueryString, stringifyQuery: stringifyQuery });
  },


  /* istanbul ignore next: sanity check */
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(nextProps.history === this.props.history, 'You cannot change <Router history>; it will be ignored') : void 0;

    process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)((nextProps.routes || nextProps.children) === (this.props.routes || this.props.children), 'You cannot change <Router routes>; it will be ignored') : void 0;
  },
  componentWillUnmount: function componentWillUnmount() {
    if (this._unlisten) this._unlisten();
  },
  render: function render() {
    var _state = this.state;
    var location = _state.location;
    var routes = _state.routes;
    var params = _state.params;
    var components = _state.components;
    var _props4 = this.props;
    var createElement = _props4.createElement;
    var render = _props4.render;

    var props = _objectWithoutProperties(_props4, ['createElement', 'render']);

    if (location == null) return null; // Async match

    // Only forward non-Router-specific props to routing context, as those are
    // the only ones that might be custom routing context props.
    Object.keys(Router.propTypes).forEach(function (propType) {
      return delete props[propType];
    });

    return render(_extends({}, props, {
      history: this.history,
      router: this.router,
      location: location,
      routes: routes,
      params: params,
      components: components,
      createElement: createElement
    }));
  }
});

exports.default = Router;
module.exports = exports['default'];
}).call(this,require('_process'))

},{"./InternalPropTypes":55,"./RouteUtils":63,"./RouterContext":65,"./RouterUtils":66,"./createTransitionManager":74,"./routerWarning":83,"_process":48,"history/lib/createHashHistory":37,"history/lib/useQueries":44,"react":"react"}],65:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _deprecateObjectProperties = require('./deprecateObjectProperties');

var _deprecateObjectProperties2 = _interopRequireDefault(_deprecateObjectProperties);

var _getRouteParams = require('./getRouteParams');

var _getRouteParams2 = _interopRequireDefault(_getRouteParams);

var _RouteUtils = require('./RouteUtils');

var _routerWarning = require('./routerWarning');

var _routerWarning2 = _interopRequireDefault(_routerWarning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _React$PropTypes = _react2.default.PropTypes;
var array = _React$PropTypes.array;
var func = _React$PropTypes.func;
var object = _React$PropTypes.object;

/**
 * A <RouterContext> renders the component tree for a given router state
 * and sets the history object and the current location in context.
 */

var RouterContext = _react2.default.createClass({
  displayName: 'RouterContext',


  propTypes: {
    history: object,
    router: object.isRequired,
    location: object.isRequired,
    routes: array.isRequired,
    params: object.isRequired,
    components: array.isRequired,
    createElement: func.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      createElement: _react2.default.createElement
    };
  },


  childContextTypes: {
    history: object,
    location: object.isRequired,
    router: object.isRequired
  },

  getChildContext: function getChildContext() {
    var _props = this.props;
    var router = _props.router;
    var history = _props.history;
    var location = _props.location;

    if (!router) {
      process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, '`<RouterContext>` expects a `router` rather than a `history`') : void 0;

      router = _extends({}, history, {
        setRouteLeaveHook: history.listenBeforeLeavingRoute
      });
      delete router.listenBeforeLeavingRoute;
    }

    if (process.env.NODE_ENV !== 'production') {
      location = (0, _deprecateObjectProperties2.default)(location, '`context.location` is deprecated, please use a route component\'s `props.location` instead. http://tiny.cc/router-accessinglocation');
    }

    return { history: history, location: location, router: router };
  },
  createElement: function createElement(component, props) {
    return component == null ? null : this.props.createElement(component, props);
  },
  render: function render() {
    var _this = this;

    var _props2 = this.props;
    var history = _props2.history;
    var location = _props2.location;
    var routes = _props2.routes;
    var params = _props2.params;
    var components = _props2.components;

    var element = null;

    if (components) {
      element = components.reduceRight(function (element, components, index) {
        if (components == null) return element; // Don't create new children; use the grandchildren.

        var route = routes[index];
        var routeParams = (0, _getRouteParams2.default)(route, params);
        var props = {
          history: history,
          location: location,
          params: params,
          route: route,
          routeParams: routeParams,
          routes: routes
        };

        if ((0, _RouteUtils.isReactChildren)(element)) {
          props.children = element;
        } else if (element) {
          for (var prop in element) {
            if (Object.prototype.hasOwnProperty.call(element, prop)) props[prop] = element[prop];
          }
        }

        if ((typeof components === 'undefined' ? 'undefined' : _typeof(components)) === 'object') {
          var elements = {};

          for (var key in components) {
            if (Object.prototype.hasOwnProperty.call(components, key)) {
              // Pass through the key as a prop to createElement to allow
              // custom createElement functions to know which named component
              // they're rendering, for e.g. matching up to fetched data.
              elements[key] = _this.createElement(components[key], _extends({
                key: key }, props));
            }
          }

          return elements;
        }

        return _this.createElement(components, props);
      }, element);
    }

    !(element === null || element === false || _react2.default.isValidElement(element)) ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'The root route must render a single element') : (0, _invariant2.default)(false) : void 0;

    return element;
  }
});

exports.default = RouterContext;
module.exports = exports['default'];
}).call(this,require('_process'))

},{"./RouteUtils":63,"./deprecateObjectProperties":75,"./getRouteParams":77,"./routerWarning":83,"_process":48,"invariant":46,"react":"react"}],66:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.createRouterObject = createRouterObject;
exports.createRoutingHistory = createRoutingHistory;

var _deprecateObjectProperties = require('./deprecateObjectProperties');

var _deprecateObjectProperties2 = _interopRequireDefault(_deprecateObjectProperties);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createRouterObject(history, transitionManager) {
  return _extends({}, history, {
    setRouteLeaveHook: transitionManager.listenBeforeLeavingRoute,
    isActive: transitionManager.isActive
  });
}

// deprecated
function createRoutingHistory(history, transitionManager) {
  history = _extends({}, history, transitionManager);

  if (process.env.NODE_ENV !== 'production') {
    history = (0, _deprecateObjectProperties2.default)(history, '`props.history` and `context.history` are deprecated. Please use `context.router`. http://tiny.cc/router-contextchanges');
  }

  return history;
}
}).call(this,require('_process'))

},{"./deprecateObjectProperties":75,"_process":48}],67:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _RouterContext = require('./RouterContext');

var _RouterContext2 = _interopRequireDefault(_RouterContext);

var _routerWarning = require('./routerWarning');

var _routerWarning2 = _interopRequireDefault(_routerWarning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RoutingContext = _react2.default.createClass({
  displayName: 'RoutingContext',
  componentWillMount: function componentWillMount() {
    process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, '`RoutingContext` has been renamed to `RouterContext`. Please use `import { RouterContext } from \'react-router\'`. http://tiny.cc/router-routercontext') : void 0;
  },
  render: function render() {
    return _react2.default.createElement(_RouterContext2.default, this.props);
  }
});

exports.default = RoutingContext;
module.exports = exports['default'];
}).call(this,require('_process'))

},{"./RouterContext":65,"./routerWarning":83,"_process":48,"react":"react"}],68:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;
exports.runEnterHooks = runEnterHooks;
exports.runChangeHooks = runChangeHooks;
exports.runLeaveHooks = runLeaveHooks;

var _AsyncUtils = require('./AsyncUtils');

var _routerWarning = require('./routerWarning');

var _routerWarning2 = _interopRequireDefault(_routerWarning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createTransitionHook(hook, route, asyncArity) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    hook.apply(route, args);

    if (hook.length < asyncArity) {
      var callback = args[args.length - 1];
      // Assume hook executes synchronously and
      // automatically call the callback.
      callback();
    }
  };
}

function getEnterHooks(routes) {
  return routes.reduce(function (hooks, route) {
    if (route.onEnter) hooks.push(createTransitionHook(route.onEnter, route, 3));

    return hooks;
  }, []);
}

function getChangeHooks(routes) {
  return routes.reduce(function (hooks, route) {
    if (route.onChange) hooks.push(createTransitionHook(route.onChange, route, 4));
    return hooks;
  }, []);
}

function runTransitionHooks(length, iter, callback) {
  if (!length) {
    callback();
    return;
  }

  var redirectInfo = void 0;
  function replace(location, deprecatedPathname, deprecatedQuery) {
    if (deprecatedPathname) {
      process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, '`replaceState(state, pathname, query) is deprecated; use `replace(location)` with a location descriptor instead. http://tiny.cc/router-isActivedeprecated') : void 0;
      redirectInfo = {
        pathname: deprecatedPathname,
        query: deprecatedQuery,
        state: location
      };

      return;
    }

    redirectInfo = location;
  }

  (0, _AsyncUtils.loopAsync)(length, function (index, next, done) {
    iter(index, replace, function (error) {
      if (error || redirectInfo) {
        done(error, redirectInfo); // No need to continue.
      } else {
          next();
        }
    });
  }, callback);
}

/**
 * Runs all onEnter hooks in the given array of routes in order
 * with onEnter(nextState, replace, callback) and calls
 * callback(error, redirectInfo) when finished. The first hook
 * to use replace short-circuits the loop.
 *
 * If a hook needs to run asynchronously, it may use the callback
 * function. However, doing so will cause the transition to pause,
 * which could lead to a non-responsive UI if the hook is slow.
 */
function runEnterHooks(routes, nextState, callback) {
  var hooks = getEnterHooks(routes);
  return runTransitionHooks(hooks.length, function (index, replace, next) {
    hooks[index](nextState, replace, next);
  }, callback);
}

/**
 * Runs all onChange hooks in the given array of routes in order
 * with onChange(prevState, nextState, replace, callback) and calls
 * callback(error, redirectInfo) when finished. The first hook
 * to use replace short-circuits the loop.
 *
 * If a hook needs to run asynchronously, it may use the callback
 * function. However, doing so will cause the transition to pause,
 * which could lead to a non-responsive UI if the hook is slow.
 */
function runChangeHooks(routes, state, nextState, callback) {
  var hooks = getChangeHooks(routes);
  return runTransitionHooks(hooks.length, function (index, replace, next) {
    hooks[index](state, nextState, replace, next);
  }, callback);
}

/**
 * Runs all onLeave hooks in the given array of routes in order.
 */
function runLeaveHooks(routes) {
  for (var i = 0, len = routes.length; i < len; ++i) {
    if (routes[i].onLeave) routes[i].onLeave.call(routes[i]);
  }
}
}).call(this,require('_process'))

},{"./AsyncUtils":50,"./routerWarning":83,"_process":48}],69:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _RouterContext = require('./RouterContext');

var _RouterContext2 = _interopRequireDefault(_RouterContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  var withContext = middlewares.map(function (m) {
    return m.renderRouterContext;
  }).filter(function (f) {
    return f;
  });
  var withComponent = middlewares.map(function (m) {
    return m.renderRouteComponent;
  }).filter(function (f) {
    return f;
  });
  var makeCreateElement = function makeCreateElement() {
    var baseCreateElement = arguments.length <= 0 || arguments[0] === undefined ? _react.createElement : arguments[0];
    return function (Component, props) {
      return withComponent.reduceRight(function (previous, renderRouteComponent) {
        return renderRouteComponent(previous, props);
      }, baseCreateElement(Component, props));
    };
  };

  return function (renderProps) {
    return withContext.reduceRight(function (previous, renderRouterContext) {
      return renderRouterContext(previous, renderProps);
    }, _react2.default.createElement(_RouterContext2.default, _extends({}, renderProps, {
      createElement: makeCreateElement(renderProps.createElement)
    })));
  };
};

module.exports = exports['default'];
},{"./RouterContext":65,"react":"react"}],70:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _createBrowserHistory = require('history/lib/createBrowserHistory');

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _createRouterHistory = require('./createRouterHistory');

var _createRouterHistory2 = _interopRequireDefault(_createRouterHistory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _createRouterHistory2.default)(_createBrowserHistory2.default);
module.exports = exports['default'];
},{"./createRouterHistory":73,"history/lib/createBrowserHistory":35}],71:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _PatternUtils = require('./PatternUtils');

function routeParamsChanged(route, prevState, nextState) {
  if (!route.path) return false;

  var paramNames = (0, _PatternUtils.getParamNames)(route.path);

  return paramNames.some(function (paramName) {
    return prevState.params[paramName] !== nextState.params[paramName];
  });
}

/**
 * Returns an object of { leaveRoutes, changeRoutes, enterRoutes } determined by
 * the change from prevState to nextState. We leave routes if either
 * 1) they are not in the next state or 2) they are in the next state
 * but their params have changed (i.e. /users/123 => /users/456).
 *
 * leaveRoutes are ordered starting at the leaf route of the tree
 * we're leaving up to the common parent route. enterRoutes are ordered
 * from the top of the tree we're entering down to the leaf route.
 *
 * changeRoutes are any routes that didn't leave or enter during
 * the transition.
 */
function computeChangedRoutes(prevState, nextState) {
  var prevRoutes = prevState && prevState.routes;
  var nextRoutes = nextState.routes;

  var leaveRoutes = void 0,
      changeRoutes = void 0,
      enterRoutes = void 0;
  if (prevRoutes) {
    (function () {
      var parentIsLeaving = false;
      leaveRoutes = prevRoutes.filter(function (route) {
        if (parentIsLeaving) {
          return true;
        } else {
          var isLeaving = nextRoutes.indexOf(route) === -1 || routeParamsChanged(route, prevState, nextState);
          if (isLeaving) parentIsLeaving = true;
          return isLeaving;
        }
      });

      // onLeave hooks start at the leaf route.
      leaveRoutes.reverse();

      enterRoutes = [];
      changeRoutes = [];

      nextRoutes.forEach(function (route) {
        var isNew = prevRoutes.indexOf(route) === -1;
        var paramsChanged = leaveRoutes.indexOf(route) !== -1;

        if (isNew || paramsChanged) enterRoutes.push(route);else changeRoutes.push(route);
      });
    })();
  } else {
    leaveRoutes = [];
    changeRoutes = [];
    enterRoutes = nextRoutes;
  }

  return {
    leaveRoutes: leaveRoutes,
    changeRoutes: changeRoutes,
    enterRoutes: enterRoutes
  };
}

exports.default = computeChangedRoutes;
module.exports = exports['default'];
},{"./PatternUtils":58}],72:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.default = createMemoryHistory;

var _useQueries = require('history/lib/useQueries');

var _useQueries2 = _interopRequireDefault(_useQueries);

var _useBasename = require('history/lib/useBasename');

var _useBasename2 = _interopRequireDefault(_useBasename);

var _createMemoryHistory = require('history/lib/createMemoryHistory');

var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createMemoryHistory(options) {
  // signatures and type checking differ between `useRoutes` and
  // `createMemoryHistory`, have to create `memoryHistory` first because
  // `useQueries` doesn't understand the signature
  var memoryHistory = (0, _createMemoryHistory2.default)(options);
  var createHistory = function createHistory() {
    return memoryHistory;
  };
  var history = (0, _useQueries2.default)((0, _useBasename2.default)(createHistory))(options);
  history.__v2_compatible__ = true;
  return history;
}
module.exports = exports['default'];
},{"history/lib/createMemoryHistory":40,"history/lib/useBasename":43,"history/lib/useQueries":44}],73:[function(require,module,exports){
'use strict';

exports.__esModule = true;

exports.default = function (createHistory) {
  var history = void 0;
  if (canUseDOM) history = (0, _useRouterHistory2.default)(createHistory)();
  return history;
};

var _useRouterHistory = require('./useRouterHistory');

var _useRouterHistory2 = _interopRequireDefault(_useRouterHistory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

module.exports = exports['default'];
},{"./useRouterHistory":84}],74:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = createTransitionManager;

var _routerWarning = require('./routerWarning');

var _routerWarning2 = _interopRequireDefault(_routerWarning);

var _Actions = require('history/lib/Actions');

var _computeChangedRoutes2 = require('./computeChangedRoutes');

var _computeChangedRoutes3 = _interopRequireDefault(_computeChangedRoutes2);

var _TransitionUtils = require('./TransitionUtils');

var _isActive2 = require('./isActive');

var _isActive3 = _interopRequireDefault(_isActive2);

var _getComponents = require('./getComponents');

var _getComponents2 = _interopRequireDefault(_getComponents);

var _matchRoutes = require('./matchRoutes');

var _matchRoutes2 = _interopRequireDefault(_matchRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hasAnyProperties(object) {
  for (var p in object) {
    if (Object.prototype.hasOwnProperty.call(object, p)) return true;
  }return false;
}

function createTransitionManager(history, routes) {
  var state = {};

  // Signature should be (location, indexOnly), but needs to support (path,
  // query, indexOnly)
  function isActive(location) {
    var indexOnlyOrDeprecatedQuery = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
    var deprecatedIndexOnly = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

    var indexOnly = void 0;
    if (indexOnlyOrDeprecatedQuery && indexOnlyOrDeprecatedQuery !== true || deprecatedIndexOnly !== null) {
      process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, '`isActive(pathname, query, indexOnly) is deprecated; use `isActive(location, indexOnly)` with a location descriptor instead. http://tiny.cc/router-isActivedeprecated') : void 0;
      location = { pathname: location, query: indexOnlyOrDeprecatedQuery };
      indexOnly = deprecatedIndexOnly || false;
    } else {
      location = history.createLocation(location);
      indexOnly = indexOnlyOrDeprecatedQuery;
    }

    return (0, _isActive3.default)(location, indexOnly, state.location, state.routes, state.params);
  }

  function createLocationFromRedirectInfo(location) {
    return history.createLocation(location, _Actions.REPLACE);
  }

  var partialNextState = void 0;

  function match(location, callback) {
    if (partialNextState && partialNextState.location === location) {
      // Continue from where we left off.
      finishMatch(partialNextState, callback);
    } else {
      (0, _matchRoutes2.default)(routes, location, function (error, nextState) {
        if (error) {
          callback(error);
        } else if (nextState) {
          finishMatch(_extends({}, nextState, { location: location }), callback);
        } else {
          callback();
        }
      });
    }
  }

  function finishMatch(nextState, callback) {
    var _computeChangedRoutes = (0, _computeChangedRoutes3.default)(state, nextState);

    var leaveRoutes = _computeChangedRoutes.leaveRoutes;
    var changeRoutes = _computeChangedRoutes.changeRoutes;
    var enterRoutes = _computeChangedRoutes.enterRoutes;


    (0, _TransitionUtils.runLeaveHooks)(leaveRoutes);

    // Tear down confirmation hooks for left routes
    leaveRoutes.filter(function (route) {
      return enterRoutes.indexOf(route) === -1;
    }).forEach(removeListenBeforeHooksForRoute);

    // change and enter hooks are run in series
    (0, _TransitionUtils.runChangeHooks)(changeRoutes, state, nextState, function (error, redirectInfo) {
      if (error || redirectInfo) return handleErrorOrRedirect(error, redirectInfo);

      (0, _TransitionUtils.runEnterHooks)(enterRoutes, nextState, finishEnterHooks);
    });

    function finishEnterHooks(error, redirectInfo) {
      if (error || redirectInfo) return handleErrorOrRedirect(error, redirectInfo);

      // TODO: Fetch components after state is updated.
      (0, _getComponents2.default)(nextState, function (error, components) {
        if (error) {
          callback(error);
        } else {
          // TODO: Make match a pure function and have some other API
          // for "match and update state".
          callback(null, null, state = _extends({}, nextState, { components: components }));
        }
      });
    }

    function handleErrorOrRedirect(error, redirectInfo) {
      if (error) callback(error);else callback(null, createLocationFromRedirectInfo(redirectInfo));
    }
  }

  var RouteGuid = 1;

  function getRouteID(route) {
    var create = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    return route.__id__ || create && (route.__id__ = RouteGuid++);
  }

  var RouteHooks = Object.create(null);

  function getRouteHooksForRoutes(routes) {
    return routes.reduce(function (hooks, route) {
      hooks.push.apply(hooks, RouteHooks[getRouteID(route)]);
      return hooks;
    }, []);
  }

  function transitionHook(location, callback) {
    (0, _matchRoutes2.default)(routes, location, function (error, nextState) {
      if (nextState == null) {
        // TODO: We didn't actually match anything, but hang
        // onto error/nextState so we don't have to matchRoutes
        // again in the listen callback.
        callback();
        return;
      }

      // Cache some state here so we don't have to
      // matchRoutes() again in the listen callback.
      partialNextState = _extends({}, nextState, { location: location });

      var hooks = getRouteHooksForRoutes((0, _computeChangedRoutes3.default)(state, partialNextState).leaveRoutes);

      var result = void 0;
      for (var i = 0, len = hooks.length; result == null && i < len; ++i) {
        // Passing the location arg here indicates to
        // the user that this is a transition hook.
        result = hooks[i](location);
      }

      callback(result);
    });
  }

  /* istanbul ignore next: untestable with Karma */
  function beforeUnloadHook() {
    // Synchronously check to see if any route hooks want
    // to prevent the current window/tab from closing.
    if (state.routes) {
      var hooks = getRouteHooksForRoutes(state.routes);

      var message = void 0;
      for (var i = 0, len = hooks.length; typeof message !== 'string' && i < len; ++i) {
        // Passing no args indicates to the user that this is a
        // beforeunload hook. We don't know the next location.
        message = hooks[i]();
      }

      return message;
    }
  }

  var unlistenBefore = void 0,
      unlistenBeforeUnload = void 0;

  function removeListenBeforeHooksForRoute(route) {
    var routeID = getRouteID(route, false);
    if (!routeID) {
      return;
    }

    delete RouteHooks[routeID];

    if (!hasAnyProperties(RouteHooks)) {
      // teardown transition & beforeunload hooks
      if (unlistenBefore) {
        unlistenBefore();
        unlistenBefore = null;
      }

      if (unlistenBeforeUnload) {
        unlistenBeforeUnload();
        unlistenBeforeUnload = null;
      }
    }
  }

  /**
   * Registers the given hook function to run before leaving the given route.
   *
   * During a normal transition, the hook function receives the next location
   * as its only argument and must return either a) a prompt message to show
   * the user, to make sure they want to leave the page or b) false, to prevent
   * the transition.
   *
   * During the beforeunload event (in browsers) the hook receives no arguments.
   * In this case it must return a prompt message to prevent the transition.
   *
   * Returns a function that may be used to unbind the listener.
   */
  function listenBeforeLeavingRoute(route, hook) {
    // TODO: Warn if they register for a route that isn't currently
    // active. They're probably doing something wrong, like re-creating
    // route objects on every location change.
    var routeID = getRouteID(route);
    var hooks = RouteHooks[routeID];

    if (!hooks) {
      var thereWereNoRouteHooks = !hasAnyProperties(RouteHooks);

      RouteHooks[routeID] = [hook];

      if (thereWereNoRouteHooks) {
        // setup transition & beforeunload hooks
        unlistenBefore = history.listenBefore(transitionHook);

        if (history.listenBeforeUnload) unlistenBeforeUnload = history.listenBeforeUnload(beforeUnloadHook);
      }
    } else {
      if (hooks.indexOf(hook) === -1) {
        process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, 'adding multiple leave hooks for the same route is deprecated; manage multiple confirmations in your own code instead') : void 0;

        hooks.push(hook);
      }
    }

    return function () {
      var hooks = RouteHooks[routeID];

      if (hooks) {
        var newHooks = hooks.filter(function (item) {
          return item !== hook;
        });

        if (newHooks.length === 0) {
          removeListenBeforeHooksForRoute(route);
        } else {
          RouteHooks[routeID] = newHooks;
        }
      }
    };
  }

  /**
   * This is the API for stateful environments. As the location
   * changes, we update state and call the listener. We can also
   * gracefully handle errors and redirects.
   */
  function listen(listener) {
    // TODO: Only use a single history listener. Otherwise we'll
    // end up with multiple concurrent calls to match.
    return history.listen(function (location) {
      if (state.location === location) {
        listener(null, state);
      } else {
        match(location, function (error, redirectLocation, nextState) {
          if (error) {
            listener(error);
          } else if (redirectLocation) {
            history.transitionTo(redirectLocation);
          } else if (nextState) {
            listener(null, nextState);
          } else {
            process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, 'Location "%s" did not match any routes', location.pathname + location.search + location.hash) : void 0;
          }
        });
      }
    });
  }

  return {
    isActive: isActive,
    match: match,
    listenBeforeLeavingRoute: listenBeforeLeavingRoute,
    listen: listen
  };
}

//export default useRoutes
module.exports = exports['default'];
}).call(this,require('_process'))

},{"./TransitionUtils":68,"./computeChangedRoutes":71,"./getComponents":76,"./isActive":80,"./matchRoutes":82,"./routerWarning":83,"_process":48,"history/lib/Actions":29}],75:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;
exports.canUseMembrane = undefined;

var _routerWarning = require('./routerWarning');

var _routerWarning2 = _interopRequireDefault(_routerWarning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canUseMembrane = exports.canUseMembrane = false;

// No-op by default.
var deprecateObjectProperties = function deprecateObjectProperties(object) {
  return object;
};

if (process.env.NODE_ENV !== 'production') {
  try {
    if (Object.defineProperty({}, 'x', {
      get: function get() {
        return true;
      }
    }).x) {
      exports.canUseMembrane = canUseMembrane = true;
    }
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */

  if (canUseMembrane) {
    deprecateObjectProperties = function deprecateObjectProperties(object, message) {
      // Wrap the deprecated object in a membrane to warn on property access.
      var membrane = {};

      var _loop = function _loop(prop) {
        if (!Object.prototype.hasOwnProperty.call(object, prop)) {
          return 'continue';
        }

        if (typeof object[prop] === 'function') {
          // Can't use fat arrow here because of use of arguments below.
          membrane[prop] = function () {
            process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, message) : void 0;
            return object[prop].apply(object, arguments);
          };
          return 'continue';
        }

        // These properties are non-enumerable to prevent React dev tools from
        // seeing them and causing spurious warnings when accessing them. In
        // principle this could be done with a proxy, but support for the
        // ownKeys trap on proxies is not universal, even among browsers that
        // otherwise support proxies.
        Object.defineProperty(membrane, prop, {
          get: function get() {
            process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, message) : void 0;
            return object[prop];
          }
        });
      };

      for (var prop in object) {
        var _ret = _loop(prop);

        if (_ret === 'continue') continue;
      }

      return membrane;
    };
  }
}

exports.default = deprecateObjectProperties;
}).call(this,require('_process'))

},{"./routerWarning":83,"_process":48}],76:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _AsyncUtils = require('./AsyncUtils');

var _deprecateObjectProperties = require('./deprecateObjectProperties');

var _routerWarning = require('./routerWarning');

var _routerWarning2 = _interopRequireDefault(_routerWarning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getComponentsForRoute(nextState, route, callback) {
  if (route.component || route.components) {
    callback(null, route.component || route.components);
    return;
  }

  var getComponent = route.getComponent || route.getComponents;
  if (!getComponent) {
    callback();
    return;
  }

  var location = nextState.location;

  var nextStateWithLocation = void 0;

  if (process.env.NODE_ENV !== 'production' && _deprecateObjectProperties.canUseMembrane) {
    nextStateWithLocation = _extends({}, nextState);

    // I don't use deprecateObjectProperties here because I want to keep the
    // same code path between development and production, in that we just
    // assign extra properties to the copy of the state object in both cases.

    var _loop = function _loop(prop) {
      if (!Object.prototype.hasOwnProperty.call(location, prop)) {
        return 'continue';
      }

      Object.defineProperty(nextStateWithLocation, prop, {
        get: function get() {
          process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, 'Accessing location properties from the first argument to `getComponent` and `getComponents` is deprecated. That argument is now the router state (`nextState`) rather than the location. To access the location, use `nextState.location`.') : void 0;
          return location[prop];
        }
      });
    };

    for (var prop in location) {
      var _ret = _loop(prop);

      if (_ret === 'continue') continue;
    }
  } else {
    nextStateWithLocation = _extends({}, nextState, location);
  }

  getComponent.call(route, nextStateWithLocation, callback);
}

/**
 * Asynchronously fetches all components needed for the given router
 * state and calls callback(error, components) when finished.
 *
 * Note: This operation may finish synchronously if no routes have an
 * asynchronous getComponents method.
 */
function getComponents(nextState, callback) {
  (0, _AsyncUtils.mapAsync)(nextState.routes, function (route, index, callback) {
    getComponentsForRoute(nextState, route, callback);
  }, callback);
}

exports.default = getComponents;
module.exports = exports['default'];
}).call(this,require('_process'))

},{"./AsyncUtils":50,"./deprecateObjectProperties":75,"./routerWarning":83,"_process":48}],77:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _PatternUtils = require('./PatternUtils');

/**
 * Extracts an object of params the given route cares about from
 * the given params object.
 */
function getRouteParams(route, params) {
  var routeParams = {};

  if (!route.path) return routeParams;

  var paramNames = (0, _PatternUtils.getParamNames)(route.path);

  for (var p in params) {
    if (Object.prototype.hasOwnProperty.call(params, p) && paramNames.indexOf(p) !== -1) {
      routeParams[p] = params[p];
    }
  }

  return routeParams;
}

exports.default = getRouteParams;
module.exports = exports['default'];
},{"./PatternUtils":58}],78:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _createHashHistory = require('history/lib/createHashHistory');

var _createHashHistory2 = _interopRequireDefault(_createHashHistory);

var _createRouterHistory = require('./createRouterHistory');

var _createRouterHistory2 = _interopRequireDefault(_createRouterHistory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _createRouterHistory2.default)(_createHashHistory2.default);
module.exports = exports['default'];
},{"./createRouterHistory":73,"history/lib/createHashHistory":37}],79:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.createMemoryHistory = exports.hashHistory = exports.browserHistory = exports.applyRouterMiddleware = exports.formatPattern = exports.useRouterHistory = exports.match = exports.routerShape = exports.locationShape = exports.PropTypes = exports.RoutingContext = exports.RouterContext = exports.createRoutes = exports.useRoutes = exports.RouteContext = exports.Lifecycle = exports.History = exports.Route = exports.Redirect = exports.IndexRoute = exports.IndexRedirect = exports.withRouter = exports.IndexLink = exports.Link = exports.Router = undefined;

var _RouteUtils = require('./RouteUtils');

Object.defineProperty(exports, 'createRoutes', {
  enumerable: true,
  get: function get() {
    return _RouteUtils.createRoutes;
  }
});

var _PropTypes2 = require('./PropTypes');

Object.defineProperty(exports, 'locationShape', {
  enumerable: true,
  get: function get() {
    return _PropTypes2.locationShape;
  }
});
Object.defineProperty(exports, 'routerShape', {
  enumerable: true,
  get: function get() {
    return _PropTypes2.routerShape;
  }
});

var _PatternUtils = require('./PatternUtils');

Object.defineProperty(exports, 'formatPattern', {
  enumerable: true,
  get: function get() {
    return _PatternUtils.formatPattern;
  }
});

var _Router2 = require('./Router');

var _Router3 = _interopRequireDefault(_Router2);

var _Link2 = require('./Link');

var _Link3 = _interopRequireDefault(_Link2);

var _IndexLink2 = require('./IndexLink');

var _IndexLink3 = _interopRequireDefault(_IndexLink2);

var _withRouter2 = require('./withRouter');

var _withRouter3 = _interopRequireDefault(_withRouter2);

var _IndexRedirect2 = require('./IndexRedirect');

var _IndexRedirect3 = _interopRequireDefault(_IndexRedirect2);

var _IndexRoute2 = require('./IndexRoute');

var _IndexRoute3 = _interopRequireDefault(_IndexRoute2);

var _Redirect2 = require('./Redirect');

var _Redirect3 = _interopRequireDefault(_Redirect2);

var _Route2 = require('./Route');

var _Route3 = _interopRequireDefault(_Route2);

var _History2 = require('./History');

var _History3 = _interopRequireDefault(_History2);

var _Lifecycle2 = require('./Lifecycle');

var _Lifecycle3 = _interopRequireDefault(_Lifecycle2);

var _RouteContext2 = require('./RouteContext');

var _RouteContext3 = _interopRequireDefault(_RouteContext2);

var _useRoutes2 = require('./useRoutes');

var _useRoutes3 = _interopRequireDefault(_useRoutes2);

var _RouterContext2 = require('./RouterContext');

var _RouterContext3 = _interopRequireDefault(_RouterContext2);

var _RoutingContext2 = require('./RoutingContext');

var _RoutingContext3 = _interopRequireDefault(_RoutingContext2);

var _PropTypes3 = _interopRequireDefault(_PropTypes2);

var _match2 = require('./match');

var _match3 = _interopRequireDefault(_match2);

var _useRouterHistory2 = require('./useRouterHistory');

var _useRouterHistory3 = _interopRequireDefault(_useRouterHistory2);

var _applyRouterMiddleware2 = require('./applyRouterMiddleware');

var _applyRouterMiddleware3 = _interopRequireDefault(_applyRouterMiddleware2);

var _browserHistory2 = require('./browserHistory');

var _browserHistory3 = _interopRequireDefault(_browserHistory2);

var _hashHistory2 = require('./hashHistory');

var _hashHistory3 = _interopRequireDefault(_hashHistory2);

var _createMemoryHistory2 = require('./createMemoryHistory');

var _createMemoryHistory3 = _interopRequireDefault(_createMemoryHistory2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Router = _Router3.default; /* components */

exports.Link = _Link3.default;
exports.IndexLink = _IndexLink3.default;
exports.withRouter = _withRouter3.default;

/* components (configuration) */

exports.IndexRedirect = _IndexRedirect3.default;
exports.IndexRoute = _IndexRoute3.default;
exports.Redirect = _Redirect3.default;
exports.Route = _Route3.default;

/* mixins */

exports.History = _History3.default;
exports.Lifecycle = _Lifecycle3.default;
exports.RouteContext = _RouteContext3.default;

/* utils */

exports.useRoutes = _useRoutes3.default;
exports.RouterContext = _RouterContext3.default;
exports.RoutingContext = _RoutingContext3.default;
exports.PropTypes = _PropTypes3.default;
exports.match = _match3.default;
exports.useRouterHistory = _useRouterHistory3.default;
exports.applyRouterMiddleware = _applyRouterMiddleware3.default;

/* histories */

exports.browserHistory = _browserHistory3.default;
exports.hashHistory = _hashHistory3.default;
exports.createMemoryHistory = _createMemoryHistory3.default;
},{"./History":51,"./IndexLink":52,"./IndexRedirect":53,"./IndexRoute":54,"./Lifecycle":56,"./Link":57,"./PatternUtils":58,"./PropTypes":59,"./Redirect":60,"./Route":61,"./RouteContext":62,"./RouteUtils":63,"./Router":64,"./RouterContext":65,"./RoutingContext":67,"./applyRouterMiddleware":69,"./browserHistory":70,"./createMemoryHistory":72,"./hashHistory":78,"./match":81,"./useRouterHistory":84,"./useRoutes":85,"./withRouter":86}],80:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = isActive;

var _PatternUtils = require('./PatternUtils');

function deepEqual(a, b) {
  if (a == b) return true;

  if (a == null || b == null) return false;

  if (Array.isArray(a)) {
    return Array.isArray(b) && a.length === b.length && a.every(function (item, index) {
      return deepEqual(item, b[index]);
    });
  }

  if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object') {
    for (var p in a) {
      if (!Object.prototype.hasOwnProperty.call(a, p)) {
        continue;
      }

      if (a[p] === undefined) {
        if (b[p] !== undefined) {
          return false;
        }
      } else if (!Object.prototype.hasOwnProperty.call(b, p)) {
        return false;
      } else if (!deepEqual(a[p], b[p])) {
        return false;
      }
    }

    return true;
  }

  return String(a) === String(b);
}

/**
 * Returns true if the current pathname matches the supplied one, net of
 * leading and trailing slash normalization. This is sufficient for an
 * indexOnly route match.
 */
function pathIsActive(pathname, currentPathname) {
  // Normalize leading slash for consistency. Leading slash on pathname has
  // already been normalized in isActive. See caveat there.
  if (currentPathname.charAt(0) !== '/') {
    currentPathname = '/' + currentPathname;
  }

  // Normalize the end of both path names too. Maybe `/foo/` shouldn't show
  // `/foo` as active, but in this case, we would already have failed the
  // match.
  if (pathname.charAt(pathname.length - 1) !== '/') {
    pathname += '/';
  }
  if (currentPathname.charAt(currentPathname.length - 1) !== '/') {
    currentPathname += '/';
  }

  return currentPathname === pathname;
}

/**
 * Returns true if the given pathname matches the active routes and params.
 */
function routeIsActive(pathname, routes, params) {
  var remainingPathname = pathname,
      paramNames = [],
      paramValues = [];

  // for...of would work here but it's probably slower post-transpilation.
  for (var i = 0, len = routes.length; i < len; ++i) {
    var route = routes[i];
    var pattern = route.path || '';

    if (pattern.charAt(0) === '/') {
      remainingPathname = pathname;
      paramNames = [];
      paramValues = [];
    }

    if (remainingPathname !== null && pattern) {
      var matched = (0, _PatternUtils.matchPattern)(pattern, remainingPathname);
      if (matched) {
        remainingPathname = matched.remainingPathname;
        paramNames = [].concat(paramNames, matched.paramNames);
        paramValues = [].concat(paramValues, matched.paramValues);
      } else {
        remainingPathname = null;
      }

      if (remainingPathname === '') {
        // We have an exact match on the route. Just check that all the params
        // match.
        // FIXME: This doesn't work on repeated params.
        return paramNames.every(function (paramName, index) {
          return String(paramValues[index]) === String(params[paramName]);
        });
      }
    }
  }

  return false;
}

/**
 * Returns true if all key/value pairs in the given query are
 * currently active.
 */
function queryIsActive(query, activeQuery) {
  if (activeQuery == null) return query == null;

  if (query == null) return true;

  return deepEqual(query, activeQuery);
}

/**
 * Returns true if a <Link> to the given pathname/query combination is
 * currently active.
 */
function isActive(_ref, indexOnly, currentLocation, routes, params) {
  var pathname = _ref.pathname;
  var query = _ref.query;

  if (currentLocation == null) return false;

  // TODO: This is a bit ugly. It keeps around support for treating pathnames
  // without preceding slashes as absolute paths, but possibly also works
  // around the same quirks with basenames as in matchRoutes.
  if (pathname.charAt(0) !== '/') {
    pathname = '/' + pathname;
  }

  if (!pathIsActive(pathname, currentLocation.pathname)) {
    // The path check is necessary and sufficient for indexOnly, but otherwise
    // we still need to check the routes.
    if (indexOnly || !routeIsActive(pathname, routes, params)) {
      return false;
    }
  }

  return queryIsActive(query, currentLocation.query);
}
module.exports = exports['default'];
},{"./PatternUtils":58}],81:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _createMemoryHistory = require('./createMemoryHistory');

var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);

var _createTransitionManager = require('./createTransitionManager');

var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);

var _RouteUtils = require('./RouteUtils');

var _RouterUtils = require('./RouterUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * A high-level API to be used for server-side rendering.
 *
 * This function matches a location to a set of routes and calls
 * callback(error, redirectLocation, renderProps) when finished.
 *
 * Note: You probably don't want to use this in a browser unless you're using
 * server-side rendering with async routes.
 */
function match(_ref, callback) {
  var history = _ref.history;
  var routes = _ref.routes;
  var location = _ref.location;

  var options = _objectWithoutProperties(_ref, ['history', 'routes', 'location']);

  !(history || location) ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'match needs a history or a location') : (0, _invariant2.default)(false) : void 0;

  history = history ? history : (0, _createMemoryHistory2.default)(options);
  var transitionManager = (0, _createTransitionManager2.default)(history, (0, _RouteUtils.createRoutes)(routes));

  var unlisten = void 0;

  if (location) {
    // Allow match({ location: '/the/path', ... })
    location = history.createLocation(location);
  } else {
    // Pick up the location from the history via synchronous history.listen
    // call if needed.
    unlisten = history.listen(function (historyLocation) {
      location = historyLocation;
    });
  }

  var router = (0, _RouterUtils.createRouterObject)(history, transitionManager);
  history = (0, _RouterUtils.createRoutingHistory)(history, transitionManager);

  transitionManager.match(location, function (error, redirectLocation, nextState) {
    callback(error, redirectLocation, nextState && _extends({}, nextState, {
      history: history,
      router: router,
      matchContext: { history: history, transitionManager: transitionManager, router: router }
    }));

    // Defer removing the listener to here to prevent DOM histories from having
    // to unwind DOM event listeners unnecessarily, in case callback renders a
    // <Router> and attaches another history listener.
    if (unlisten) {
      unlisten();
    }
  });
}

exports.default = match;
module.exports = exports['default'];
}).call(this,require('_process'))

},{"./RouteUtils":63,"./RouterUtils":66,"./createMemoryHistory":72,"./createTransitionManager":74,"_process":48,"invariant":46}],82:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = matchRoutes;

var _routerWarning = require('./routerWarning');

var _routerWarning2 = _interopRequireDefault(_routerWarning);

var _AsyncUtils = require('./AsyncUtils');

var _PatternUtils = require('./PatternUtils');

var _RouteUtils = require('./RouteUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getChildRoutes(route, location, callback) {
  if (route.childRoutes) {
    return [null, route.childRoutes];
  }
  if (!route.getChildRoutes) {
    return [];
  }

  var sync = true,
      result = void 0;

  route.getChildRoutes(location, function (error, childRoutes) {
    childRoutes = !error && (0, _RouteUtils.createRoutes)(childRoutes);
    if (sync) {
      result = [error, childRoutes];
      return;
    }

    callback(error, childRoutes);
  });

  sync = false;
  return result; // Might be undefined.
}

function getIndexRoute(route, location, callback) {
  if (route.indexRoute) {
    callback(null, route.indexRoute);
  } else if (route.getIndexRoute) {
    route.getIndexRoute(location, function (error, indexRoute) {
      callback(error, !error && (0, _RouteUtils.createRoutes)(indexRoute)[0]);
    });
  } else if (route.childRoutes) {
    (function () {
      var pathless = route.childRoutes.filter(function (childRoute) {
        return !childRoute.path;
      });

      (0, _AsyncUtils.loopAsync)(pathless.length, function (index, next, done) {
        getIndexRoute(pathless[index], location, function (error, indexRoute) {
          if (error || indexRoute) {
            var routes = [pathless[index]].concat(Array.isArray(indexRoute) ? indexRoute : [indexRoute]);
            done(error, routes);
          } else {
            next();
          }
        });
      }, function (err, routes) {
        callback(null, routes);
      });
    })();
  } else {
    callback();
  }
}

function assignParams(params, paramNames, paramValues) {
  return paramNames.reduce(function (params, paramName, index) {
    var paramValue = paramValues && paramValues[index];

    if (Array.isArray(params[paramName])) {
      params[paramName].push(paramValue);
    } else if (paramName in params) {
      params[paramName] = [params[paramName], paramValue];
    } else {
      params[paramName] = paramValue;
    }

    return params;
  }, params);
}

function createParams(paramNames, paramValues) {
  return assignParams({}, paramNames, paramValues);
}

function matchRouteDeep(route, location, remainingPathname, paramNames, paramValues, callback) {
  var pattern = route.path || '';

  if (pattern.charAt(0) === '/') {
    remainingPathname = location.pathname;
    paramNames = [];
    paramValues = [];
  }

  // Only try to match the path if the route actually has a pattern, and if
  // we're not just searching for potential nested absolute paths.
  if (remainingPathname !== null && pattern) {
    try {
      var matched = (0, _PatternUtils.matchPattern)(pattern, remainingPathname);
      if (matched) {
        remainingPathname = matched.remainingPathname;
        paramNames = [].concat(paramNames, matched.paramNames);
        paramValues = [].concat(paramValues, matched.paramValues);
      } else {
        remainingPathname = null;
      }
    } catch (error) {
      callback(error);
    }

    // By assumption, pattern is non-empty here, which is the prerequisite for
    // actually terminating a match.
    if (remainingPathname === '') {
      var _ret2 = function () {
        var match = {
          routes: [route],
          params: createParams(paramNames, paramValues)
        };

        getIndexRoute(route, location, function (error, indexRoute) {
          if (error) {
            callback(error);
          } else {
            if (Array.isArray(indexRoute)) {
              var _match$routes;

              process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(indexRoute.every(function (route) {
                return !route.path;
              }), 'Index routes should not have paths') : void 0;
              (_match$routes = match.routes).push.apply(_match$routes, indexRoute);
            } else if (indexRoute) {
              process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(!indexRoute.path, 'Index routes should not have paths') : void 0;
              match.routes.push(indexRoute);
            }

            callback(null, match);
          }
        });

        return {
          v: void 0
        };
      }();

      if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
    }
  }

  if (remainingPathname != null || route.childRoutes) {
    // Either a) this route matched at least some of the path or b)
    // we don't have to load this route's children asynchronously. In
    // either case continue checking for matches in the subtree.
    var onChildRoutes = function onChildRoutes(error, childRoutes) {
      if (error) {
        callback(error);
      } else if (childRoutes) {
        // Check the child routes to see if any of them match.
        matchRoutes(childRoutes, location, function (error, match) {
          if (error) {
            callback(error);
          } else if (match) {
            // A child route matched! Augment the match and pass it up the stack.
            match.routes.unshift(route);
            callback(null, match);
          } else {
            callback();
          }
        }, remainingPathname, paramNames, paramValues);
      } else {
        callback();
      }
    };

    var result = getChildRoutes(route, location, onChildRoutes);
    if (result) {
      onChildRoutes.apply(undefined, result);
    }
  } else {
    callback();
  }
}

/**
 * Asynchronously matches the given location to a set of routes and calls
 * callback(error, state) when finished. The state object will have the
 * following properties:
 *
 * - routes       An array of routes that matched, in hierarchical order
 * - params       An object of URL parameters
 *
 * Note: This operation may finish synchronously if no routes have an
 * asynchronous getChildRoutes method.
 */
function matchRoutes(routes, location, callback, remainingPathname) {
  var paramNames = arguments.length <= 4 || arguments[4] === undefined ? [] : arguments[4];
  var paramValues = arguments.length <= 5 || arguments[5] === undefined ? [] : arguments[5];

  if (remainingPathname === undefined) {
    // TODO: This is a little bit ugly, but it works around a quirk in history
    // that strips the leading slash from pathnames when using basenames with
    // trailing slashes.
    if (location.pathname.charAt(0) !== '/') {
      location = _extends({}, location, {
        pathname: '/' + location.pathname
      });
    }
    remainingPathname = location.pathname;
  }

  (0, _AsyncUtils.loopAsync)(routes.length, function (index, next, done) {
    matchRouteDeep(routes[index], location, remainingPathname, paramNames, paramValues, function (error, match) {
      if (error || match) {
        done(error, match);
      } else {
        next();
      }
    });
  }, callback);
}
module.exports = exports['default'];
}).call(this,require('_process'))

},{"./AsyncUtils":50,"./PatternUtils":58,"./RouteUtils":63,"./routerWarning":83,"_process":48}],83:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.default = routerWarning;
exports._resetWarned = _resetWarned;

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var warned = {};

function routerWarning(falseToWarn, message) {
  // Only issue deprecation warnings once.
  if (message.indexOf('deprecated') !== -1) {
    if (warned[message]) {
      return;
    }

    warned[message] = true;
  }

  message = '[react-router] ' + message;

  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  _warning2.default.apply(undefined, [falseToWarn, message].concat(args));
}

function _resetWarned() {
  warned = {};
}
},{"warning":88}],84:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.default = useRouterHistory;

var _useQueries = require('history/lib/useQueries');

var _useQueries2 = _interopRequireDefault(_useQueries);

var _useBasename = require('history/lib/useBasename');

var _useBasename2 = _interopRequireDefault(_useBasename);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useRouterHistory(createHistory) {
  return function (options) {
    var history = (0, _useQueries2.default)((0, _useBasename2.default)(createHistory))(options);
    history.__v2_compatible__ = true;
    return history;
  };
}
module.exports = exports['default'];
},{"history/lib/useBasename":43,"history/lib/useQueries":44}],85:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _useQueries = require('history/lib/useQueries');

var _useQueries2 = _interopRequireDefault(_useQueries);

var _createTransitionManager = require('./createTransitionManager');

var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);

var _routerWarning = require('./routerWarning');

var _routerWarning2 = _interopRequireDefault(_routerWarning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * Returns a new createHistory function that may be used to create
 * history objects that know about routing.
 *
 * Enhances history objects with the following methods:
 *
 * - listen((error, nextState) => {})
 * - listenBeforeLeavingRoute(route, (nextLocation) => {})
 * - match(location, (error, redirectLocation, nextState) => {})
 * - isActive(pathname, query, indexOnly=false)
 */
function useRoutes(createHistory) {
  process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, '`useRoutes` is deprecated. Please use `createTransitionManager` instead.') : void 0;

  return function () {
    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var routes = _ref.routes;

    var options = _objectWithoutProperties(_ref, ['routes']);

    var history = (0, _useQueries2.default)(createHistory)(options);
    var transitionManager = (0, _createTransitionManager2.default)(history, routes);
    return _extends({}, history, transitionManager);
  };
}

exports.default = useRoutes;
module.exports = exports['default'];
}).call(this,require('_process'))

},{"./createTransitionManager":74,"./routerWarning":83,"_process":48,"history/lib/useQueries":44}],86:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = withRouter;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _hoistNonReactStatics = require('hoist-non-react-statics');

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var _PropTypes = require('./PropTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function withRouter(WrappedComponent) {
  var WithRouter = _react2.default.createClass({
    displayName: 'WithRouter',

    contextTypes: { router: _PropTypes.routerShape },
    render: function render() {
      return _react2.default.createElement(WrappedComponent, _extends({}, this.props, { router: this.context.router }));
    }
  });

  WithRouter.displayName = 'withRouter(' + getDisplayName(WrappedComponent) + ')';
  WithRouter.WrappedComponent = WrappedComponent;

  return (0, _hoistNonReactStatics2.default)(WithRouter, WrappedComponent);
}
module.exports = exports['default'];
},{"./PropTypes":59,"hoist-non-react-statics":45,"react":"react"}],87:[function(require,module,exports){
'use strict';
module.exports = function (str) {
	return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
		return '%' + c.charCodeAt(0).toString(16).toUpperCase();
	});
};

},{}],88:[function(require,module,exports){
(function (process){
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = function() {};

if (process.env.NODE_ENV !== 'production') {
  warning = function(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error(
        '`warning(condition, format, ...args)` requires a warning ' +
        'message argument'
      );
    }

    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
      throw new Error(
        'The warning format should be able to uniquely identify this ' +
        'warning. Please, use a more descriptive format than: ' + format
      );
    }

    if (!condition) {
      var argIndex = 0;
      var message = 'Warning: ' +
        format.replace(/%s/g, function() {
          return args[argIndex++];
        });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch(x) {}
    }
  };
}

module.exports = warning;

}).call(this,require('_process'))

},{"_process":48}],89:[function(require,module,exports){
(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)

    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var list = this.map[name]
    if (!list) {
      list = []
      this.map[name] = list
    }
    list.push(value)
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    var values = this.map[normalizeName(name)]
    return values ? values[0] : null
  }

  Headers.prototype.getAll = function(name) {
    return this.map[normalizeName(name)] || []
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = [normalizeValue(value)]
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    Object.getOwnPropertyNames(this.map).forEach(function(name) {
      this.map[name].forEach(function(value) {
        callback.call(thisArg, value, name, this)
      }, this)
    }, this)
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    reader.readAsArrayBuffer(blob)
    return fileReaderReady(reader)
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    reader.readAsText(blob)
    return fileReaderReady(reader)
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (!body) {
        this._bodyText = ''
      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
        // Only support ArrayBuffers for POST method.
        // Receiving ArrayBuffers happens via Blobs, instead.
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        return this.blob().then(readBlobAsArrayBuffer)
      }

      this.text = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return readBlobAsText(this._bodyBlob)
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as text')
        } else {
          return Promise.resolve(this._bodyText)
        }
      }
    } else {
      this.text = function() {
        var rejected = consumed(this)
        return rejected ? rejected : Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body
    if (Request.prototype.isPrototypeOf(input)) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = input
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this)
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function headers(xhr) {
    var head = new Headers()
    var pairs = (xhr.getAllResponseHeaders() || '').trim().split('\n')
    pairs.forEach(function(header) {
      var split = header.trim().split(':')
      var key = split.shift().trim()
      var value = split.join(':').trim()
      head.append(key, value)
    })
    return head
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = options.status
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = options.statusText
    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request
      if (Request.prototype.isPrototypeOf(input) && !init) {
        request = input
      } else {
        request = new Request(input, init)
      }

      var xhr = new XMLHttpRequest()

      function responseURL() {
        if ('responseURL' in xhr) {
          return xhr.responseURL
        }

        // Avoid security warnings on getResponseHeader when not allowed by CORS
        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
          return xhr.getResponseHeader('X-Request-URL')
        }

        return
      }

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: headers(xhr),
          url: responseURL()
        }
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);

},{}]},{},[3])
//# sourceMappingURL=app.js.map
