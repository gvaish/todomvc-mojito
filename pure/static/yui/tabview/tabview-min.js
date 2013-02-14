/*
YUI 3.7.3 (build 5687)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("tabview",function(e,t){var n=e.TabviewBase._queries,r=e.TabviewBase._classNames,i=".",s=e.ClassNameManager.getClassName,o=e.Base.create("tabView",e.Widget,[e.WidgetParent],{_afterChildAdded:function(e){this.get("contentBox").focusManager.refresh()},_defListNodeValueFn:function(){return e.Node.create(o.LIST_TEMPLATE)},_defPanelNodeValueFn:function(){return e.Node.create(o.PANEL_TEMPLATE)},_afterChildRemoved:function(e){var t=e.index,n=this.get("selection");n||(n=this.item(t-1)||this.item(0),n&&n.set("selected",1)),this.get("contentBox").focusManager.refresh()},_initAria:function(){var e=this.get("contentBox"),t=e.one(n.tabviewList);t&&t.setAttrs({role:"tablist"})},bindUI:function(){this.get("contentBox").plug(e.Plugin.NodeFocusManager,{descendants:i+r.tabLabel,keys:{next:"down:39",previous:"down:37"},circular:!0}),this.after("render",this._setDefSelection),this.after("addChild",this._afterChildAdded),this.after("removeChild",this._afterChildRemoved)},renderUI:function(){var e=this.get("contentBox");this._renderListBox(e),this._renderPanelBox(e),this._childrenContainer=this.get("listNode"),this._renderTabs(e)},_setDefSelection:function(e){var t=this.get("selection")||this.item(0);this.some(function(e){if(e.get("selected"))return t=e,!0}),t&&(this.set("selection",t),t.set("selected",1))},_renderListBox:function(e){var t=this.get("listNode");t.inDoc()||e.append(t)},_renderPanelBox:function(e){var t=this.get("panelNode");t.inDoc()||e.append(t)},_renderTabs:function(e){var t=e.all(n.tab),s=this.get("panelNode"),o=s?this.get("panelNode").get("children"):null,u=this;t&&(t.addClass(r.tab),e.all(n.tabLabel).addClass(r.tabLabel),e.all(n.tabPanel).addClass(r.tabPanel),t.each(function(e,t){var n=o?o.item(t):null;u.add({boundingBox:e,contentBox:e.one(i+r.tabLabel),label:e.one(i+r.tabLabel).get("text"),panelNode:n})}))}},{LIST_TEMPLATE:'<ul class="'+r.tabviewList+'"></ul>',PANEL_TEMPLATE:'<div class="'+r.tabviewPanel+'"></div>',ATTRS:{defaultChildType:{value:"Tab"},listNode:{setter:function(t){return t=e.one(t),t&&t.addClass(r.tabviewList),t},valueFn:"_defListNodeValueFn"},panelNode:{setter:function(t){return t=e.one(t),t&&t.addClass(r.tabviewPanel),t},valueFn:"_defPanelNodeValueFn"},tabIndex:{value:null}},HTML_PARSER:{listNode:n.tabviewList,panelNode:n.tabviewPanel}});e.TabView=o;var u=e.Lang,n=e.TabviewBase._queries,r=e.TabviewBase._classNames,s=e.ClassNameManager.getClassName;e.Tab=e.Base.create("tab",e.Widget,[e.WidgetChild],{BOUNDING_TEMPLATE:'<li class="'+r.tab+'"></li>',CONTENT_TEMPLATE:'<a class="'+r.tabLabel+'"></a>',PANEL_TEMPLATE:'<div class="'+r.tabPanel+'"></div>',_uiSetSelectedPanel:function(e){this.get("panelNode").toggleClass(r.selectedPanel,e)},_afterTabSelectedChange:function(e){this._uiSetSelectedPanel(e.newVal)},_afterParentChange:function(e){e.newVal?this._add():this._remove()},_initAria:function(){var t=this.get("contentBox"),n=t.get("id"),r=this.get("panelNode");n||(n=e.guid(),t.set("id",n)),t.set("role","tab"),t.get("parentNode").set("role","presentation"),r.setAttrs({role:"tabpanel","aria-labelledby":n})},syncUI:function(){this.set("label",this.get("label")),this.set("content",this.get("content")),this._uiSetSelectedPanel(this.get("selected"))},bindUI:function(){this.after("selectedChange",this._afterTabSelectedChange),this.after("parentChange",this._afterParentChange)},renderUI:function(){this._renderPanel(),this._initAria()},_renderPanel:function(){this.get("parent").get("panelNode").appendChild(this.get("panelNode"))},_add:function(){var e=this.get("parent").get("contentBox"),t=e.get("listNode"),n=e.get("panelNode");t&&t.appendChild(this.get("boundingBox")),n&&n.appendChild(this.get("panelNode"))},_remove:function(){this.get("boundingBox").remove(),this.get("panelNode").remove()},_onActivate:function(e){e.target===this&&(e.domEvent.preventDefault(),e.target.set("selected",1))},initializer:function(){this.publish(this.get("triggerEvent"),{defaultFn:this._onActivate})},_defLabelSetter:function(e){return this.get("contentBox").setContent(e),e},_defContentSetter:function(e){return this.get("panelNode").setContent(e),e},_defContentGetter:function(e){return this.get("panelNode").getContent()},_defPanelNodeValueFn:function(){var t=this.get("contentBox").get("href")||"",n=this.get("parent"),i=t.indexOf("#"),s;return t=t.substr(i),t.charAt(0)==="#"&&(s=e.one(t),s&&s.addClass(r.tabPanel)),!s&&n&&(s=n.get("panelNode").get("children").item(this.get("index"))),s||(s=e.Node.create(this.PANEL_TEMPLATE)),s}},{ATTRS:{triggerEvent:{value:"click"},label:{setter:"_defLabelSetter",validator:u.isString},content:{setter:"_defContentSetter",getter:"_defContentGetter"},panelNode:{setter:function(t){return t=e.one(t),t&&t.addClass(r.tabPanel),t},valueFn:"_defPanelNodeValueFn"},tabIndex:{value:null,validator:"_validTabIndex"}},HTML_PARSER:{selected:function(e){var t=this.get("boundingBox").hasClass(r.selectedTab)?1:0;return t}}})},"3.7.3",{requires:["widget","widget-parent","widget-child","tabview-base","node-pluginhost","node-focusmanager"],skinnable:!0});
