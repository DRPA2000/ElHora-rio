/*

@license
dhtmlxScheduler v.5.3.11 Standard

To use dhtmlxScheduler in non-GPL projects (and get Pro version of the product), please obtain Commercial/Enterprise or Ultimate license on our site https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing or contact us at sales@dhtmlx.com

(c) XB Software Ltd.

*/
Scheduler.plugin(function(e){e.config.limit_start=null,e.config.limit_end=null,e.config.limit_view=!1,e.config.check_limits=!0,e.config.mark_now=!0,e.config.display_marked_timespans=!0,e._temp_limit_scope=function(){function t(t,a,i,n,r){var o=e,s=[],d={_props:"map_to",matrix:"y_property"};for(var _ in d){var l=d[_];if(o[_])for(var c in o[_]){var h=o[_][c],u=h[l];t[u]&&(s=o._add_timespan_zones(s,e._get_blocked_zones(a[c],t[u],i,n,r)))}}
return s=o._add_timespan_zones(s,e._get_blocked_zones(a,"global",i,n,r))}var a=null,i="dhx_time_block",n="default",r=function(e,t,a){return t instanceof Date&&a instanceof Date?(e.start_date=t,e.end_date=a):(e.days=t,e.zones=a),e},o=function(e,t,a){var n="object"==typeof e?e:{days:e};return n.type=i,n.css="",t&&(a&&(n.sections=a),n=r(n,e,t)),n};e.blockTime=function(t,a,i){var n=o(t,a,i);return e.addMarkedTimespan(n)},e.unblockTime=function(t,a,i){a=a||"fullday";var n=o(t,a,i)
;return e.deleteMarkedTimespan(n)},e.attachEvent("onBeforeViewChange",function(t,a,i,n){function r(t,a){var i=e.config.limit_start,n=e.config.limit_end,r=e.date.add(t,1,a);return t.valueOf()>n.valueOf()||r<=i.valueOf()}return!e.config.limit_view||(n=n||a,i=i||t,!r(n,i)||a.valueOf()==n.valueOf())||(setTimeout(function(){var t=r(a,i)?e.config.limit_start:a;e.setCurrentView(r(t,i)?null:t,i)},1),!1)}),e.checkInMarkedTimespan=function(a,i,r){i=i||n
;for(var o=!0,s=new Date(a.start_date.valueOf()),d=e.date.add(s,1,"day"),_=e._marked_timespans;s<a.end_date;s=e.date.date_part(d),d=e.date.add(s,1,"day")){var l=+e.date.date_part(new Date(s)),c=s.getDay(),h=t(a,_,c,l,i);if(h)for(var u=0;u<h.length;u+=2){var v=e._get_zone_minutes(s),g=a.end_date>d||a.end_date.getDate()!=s.getDate()?1440:e._get_zone_minutes(a.end_date),f=h[u],m=h[u+1];if(f<g&&m>v&&!(o="function"==typeof r&&r(a,v,g,f,m)))break}}return!o};var s=e.checkLimitViolation=function(t){
if(!t)return!0;if(!e.config.check_limits)return!0;var a=e,n=a.config,r=[];if(t.rec_type)for(var o=e.getRecDates(t),s=0;s<o.length;s++){var d=e._copy_event(t);e._lame_copy(d,o[s]),r.push(d)}else r=[t];for(var _=!0,l=0;l<r.length;l++){var c=!0,d=r[l];d._timed=e.isOneDayEvent(d),c=!n.limit_start||!n.limit_end||d.start_date.valueOf()>=n.limit_start.valueOf()&&d.end_date.valueOf()<=n.limit_end.valueOf(),c&&(c=!e.checkInMarkedTimespan(d,i,function(e,t,i,n,r){var o=!0
;return t<=r&&t>=n&&((1440==r||i<r)&&(o=!1),e._timed&&a._drag_id&&"new-size"==a._drag_mode?(e.start_date.setHours(0),e.start_date.setMinutes(r)):o=!1),(i>=n&&i<r||t<n&&i>r)&&(e._timed&&a._drag_id&&"new-size"==a._drag_mode?(e.end_date.setHours(0),e.end_date.setMinutes(n)):o=!1),o})),c||(c=a.checkEvent("onLimitViolation")?a.callEvent("onLimitViolation",[d.id,d]):c),_=_&&c}return _||(a._drag_id=null,a._drag_mode=null),_};e._get_blocked_zones=function(e,t,a,i,n){var r=[]
;if(e&&e[t])for(var o=e[t],s=this._get_relevant_blocked_zones(a,i,o,n),d=0;d<s.length;d++)r=this._add_timespan_zones(r,s[d].zones);return r},e._get_relevant_blocked_zones=function(e,t,a,i){return a[t]&&a[t][i]?a[t][i]:a[e]&&a[e][i]?a[e][i]:[]},e.attachEvent("onMouseDown",function(e){return!(e==i)}),e.attachEvent("onBeforeDrag",function(t){return!t||s(e.getEvent(t))}),e.attachEvent("onClick",function(t,a){return s(e.getEvent(t))}),e.attachEvent("onBeforeLightbox",function(t){var i=e.getEvent(t)
;return a=[i.start_date,i.end_date],s(i)}),e.attachEvent("onEventSave",function(t,a,i){if(!a.start_date||!a.end_date){var n=e.getEvent(t);a.start_date=new Date(n.start_date),a.end_date=new Date(n.end_date)}if(a.rec_type){var r=e._lame_clone(a);return e._roll_back_dates(r),s(r)}return s(a)}),e.attachEvent("onEventAdded",function(t){if(!t)return!0;var a=e.getEvent(t)
;return!s(a)&&e.config.limit_start&&e.config.limit_end&&(a.start_date<e.config.limit_start&&(a.start_date=new Date(e.config.limit_start)),a.start_date.valueOf()>=e.config.limit_end.valueOf()&&(a.start_date=this.date.add(e.config.limit_end,-1,"day")),a.end_date<e.config.limit_start&&(a.end_date=new Date(e.config.limit_start)),a.end_date.valueOf()>=e.config.limit_end.valueOf()&&(a.end_date=this.date.add(e.config.limit_end,-1,"day")),
a.start_date.valueOf()>=a.end_date.valueOf()&&(a.end_date=this.date.add(a.start_date,this.config.event_duration||this.config.time_step,"minute")),a._timed=this.isOneDayEvent(a)),!0}),e.attachEvent("onEventChanged",function(t){if(!t)return!0;var i=e.getEvent(t);if(!s(i)){if(!a)return!1;i.start_date=a[0],i.end_date=a[1],i._timed=this.isOneDayEvent(i)}return!0}),e.attachEvent("onBeforeEventChanged",function(e,t,a){return s(e)}),e.attachEvent("onBeforeEventCreated",function(t){
var a=e.getActionData(t).date,i={_timed:!0,start_date:a,end_date:e.date.add(a,e.config.time_step,"minute")};return s(i)}),e.attachEvent("onViewChange",function(){e._mark_now()}),e.attachEvent("onAfterSchedulerResize",function(){return window.setTimeout(function(){e._mark_now()},1),!0}),e.attachEvent("onTemplatesReady",function(){e._mark_now_timer=window.setInterval(function(){e._is_initialized()&&e._mark_now()},6e4)}),e._mark_now=function(t){var a="dhx_now_time";this._els[a]||(this._els[a]=[])
;var i=e._currentDate(),n=this.config;if(e._remove_mark_now(),!t&&n.mark_now&&i<this._max_date&&i>this._min_date&&i.getHours()>=n.first_hour&&i.getHours()<n.last_hour){var r=this.locate_holder_day(i);this._els[a]=e._append_mark_now(r,i)}},e._append_mark_now=function(t,a){var i="dhx_now_time",n=e._get_zone_minutes(a),r={zones:[n,n+1],css:i,type:i};if(!this._table_view){if(this._props&&this._props[this._mode]){var o,s,d=this._props[this._mode],_=d.size||d.options.length
;d.days>1?(d.size&&d.options.length&&(t=(d.position+t)/d.options.length*d.size),o=t,s=t+_):(o=0,s=o+_);for(var l=[],c=o;c<s;c++){var h=c;r.days=h;var u=e._render_marked_timespan(r,null,h)[0];l.push(u)}return l}return r.days=t,e._render_marked_timespan(r,null,t)}if("month"==this._mode)return r.days=+e.date.date_part(a),e._render_marked_timespan(r,null,null)},e._remove_mark_now=function(){for(var e="dhx_now_time",t=this._els[e],a=0;a<t.length;a++){var i=t[a],n=i.parentNode;n&&n.removeChild(i)}
this._els[e]=[]},e._marked_timespans={global:{}},e._get_zone_minutes=function(e){return 60*e.getHours()+e.getMinutes()},e._prepare_timespan_options=function(t){var a=[],i=[];if("fullweek"==t.days&&(t.days=[0,1,2,3,4,5,6]),t.days instanceof Array){for(var r=t.days.slice(),o=0;o<r.length;o++){var s=e._lame_clone(t);s.days=r[o],a.push.apply(a,e._prepare_timespan_options(s))}return a}if(!t||!(t.start_date&&t.end_date&&t.end_date>t.start_date||void 0!==t.days&&t.zones)&&!t.type)return a
;var d=0,_=1440;"fullday"==t.zones&&(t.zones=[d,_]),t.zones&&t.invert_zones&&(t.zones=e.invertZones(t.zones)),t.id=e.uid(),t.css=t.css||"",t.type=t.type||n;var l=t.sections;if(l){for(var c in l)if(l.hasOwnProperty(c)){var h=l[c];h instanceof Array||(h=[h]);for(var o=0;o<h.length;o++){var u=e._lame_copy({},t);u.sections={},u.sections[c]=h[o],i.push(u)}}}else i.push(t);for(var v=0;v<i.length;v++){var g=i[v],f=g.start_date,m=g.end_date
;if(f&&m)for(var p=e.date.date_part(new Date(f)),y=e.date.add(p,1,"day");p<m;){var u=e._lame_copy({},g);delete u.start_date,delete u.end_date,u.days=p.valueOf();var b=f>p?e._get_zone_minutes(f):d,x=m>y||m.getDate()!=p.getDate()?_:e._get_zone_minutes(m);u.zones=[b,x],a.push(u),p=y,y=e.date.add(y,1,"day")}else g.days instanceof Date&&(g.days=e.date.date_part(g.days).valueOf()),g.zones=t.zones.slice(),a.push(g)}return a},e._get_dates_by_index=function(t,a,i){var n=[]
;a=e.date.date_part(new Date(a||e._min_date)),i=new Date(i||e._max_date);for(var r=a.getDay(),o=t-r>=0?t-r:7-a.getDay()+t,s=e.date.add(a,o,"day");s<i;s=e.date.add(s,1,"week"))n.push(s);return n},e._get_css_classes_by_config=function(e){var t=[];return e.type==i&&(t.push(i),e.css&&t.push(i+"_reset")),t.push("dhx_marked_timespan",e.css),t.join(" ")},e._get_block_by_config=function(e){var t=document.createElement("div")
;return e.html&&("string"==typeof e.html?t.innerHTML=e.html:t.appendChild(e.html)),t},e._render_marked_timespan=function(t,a,i){var n=[],r=e.config,o=this._min_date,s=this._max_date,d=!1;if(!r.display_marked_timespans)return n;if(!i&&0!==i){if(t.days<7)i=t.days;else{var _=new Date(t.days);if(d=+_,!(+s>+_&&+o<=+_))return n;i=_.getDay()}var l=o.getDay();l>i?i=7-(l-i):i-=l}var c=t.zones,h=e._get_css_classes_by_config(t);if(e._table_view&&"month"==e._mode){var u=[],v=[];if(a)u.push(a),
v.push(i);else{v=d?[d]:e._get_dates_by_index(i);for(var g=0;g<v.length;g++)u.push(this._scales[v[g]])}for(var g=0;g<u.length;g++){a=u[g],i=v[g];var f=Math.floor((this._correct_shift(i,1)-o.valueOf())/(864e5*this._cols.length)),m=this.locate_holder_day(i,!1)%this._cols.length;if(!this._ignores[m]){
var p=this.config.rtl?this._colsS.col_length-1-m:m,y=e._get_block_by_config(t),b=Math.max(a.offsetHeight-1,0),x=Math.max(a.offsetWidth-1,0),w=this._colsS[p],k=this._colsS.heights[f]+(this._colsS.height?this.xy.month_scale_height+2:2)-1;y.className=h,y.style.top=k+"px",y.style.lineHeight=y.style.height=b+"px";for(var D=0;D<c.length;D+=2){var E=c[g],N=c[g+1];if(N<=E)return[];var S=y.cloneNode(!0);S.style.left=w+Math.round(E/1440*x)+"px",S.style.width=Math.round((N-E)/1440*x)+"px",a.appendChild(S),
n.push(S)}}}}else{var M=i;if(this._ignores[this.locate_holder_day(i,!1)])return n;if(this._props&&this._props[this._mode]&&t.sections&&t.sections[this._mode]){var A=this._props[this._mode];M=A.order[t.sections[this._mode]];var O=A.order[t.sections[this._mode]];if(A.days>1){M=M*(A.size||A.options.length)+O}else M=O,A.size&&M>A.position+A.size&&(M=0)}a=a||e.locate_holder(M);for(var g=0;g<c.length;g+=2){var E=Math.max(c[g],60*r.first_hour),N=Math.min(c[g+1],60*r.last_hour);if(N<=E){
if(g+2<c.length)continue;return[]}var S=e._get_block_by_config(t);S.className=h;var C=24*this.config.hour_size_px+1,T=36e5;S.style.top=Math.round((60*E*1e3-this.config.first_hour*T)*this.config.hour_size_px/T)%C+"px",S.style.lineHeight=S.style.height=Math.max(Math.round(60*(N-E)*1e3*this.config.hour_size_px/T)%C,1)+"px",a.appendChild(S),n.push(S)}}return n},e._mark_timespans=function(){var t=this._els.dhx_cal_data[0],a=[];if(e._table_view&&"month"==e._mode)for(var i in this._scales){
var n=new Date(+i);a.push.apply(a,e._on_scale_add_marker(this._scales[i],n))}else for(var n=new Date(e._min_date),r=0,o=t.childNodes.length;r<o;r++){var s=t.childNodes[r];s.firstChild&&e._getClassName(s.firstChild).indexOf("dhx_scale_hour")>-1||(a.push.apply(a,e._on_scale_add_marker(s,n)),n=e.date.add(n,1,"day"))}return a},e.markTimespan=function(t){var a=!1;this._els.dhx_cal_data||(e.get_elements(),a=!0);var i=e._marked_timespans_ids,n=e._marked_timespans_types,r=e._marked_timespans
;e.deleteMarkedTimespan(),e.addMarkedTimespan(t);var o=e._mark_timespans();return a&&(e._els=[]),e._marked_timespans_ids=i,e._marked_timespans_types=n,e._marked_timespans=r,o},e.unmarkTimespan=function(e){if(e)for(var t=0;t<e.length;t++){var a=e[t];a.parentNode&&a.parentNode.removeChild(a)}},e._addMarkerTimespanConfig=function(t){var a="global",i=e._marked_timespans,n=t.id,r=e._marked_timespans_ids;r[n]||(r[n]=[]);var o=t.days,s=t.sections,d=t.type;if(t.id=n,s){
for(var _ in s)if(s.hasOwnProperty(_)){i[_]||(i[_]={});var l=s[_],c=i[_];c[l]||(c[l]={}),c[l][o]||(c[l][o]={}),c[l][o][d]||(c[l][o][d]=[],e._marked_timespans_types||(e._marked_timespans_types={}),e._marked_timespans_types[d]||(e._marked_timespans_types[d]=!0));var h=c[l][o][d];t._array=h,h.push(t),r[n].push(t)}}else{i[a][o]||(i[a][o]={}),i[a][o][d]||(i[a][o][d]=[]),e._marked_timespans_types||(e._marked_timespans_types={}),e._marked_timespans_types[d]||(e._marked_timespans_types[d]=!0)
;var h=i[a][o][d];t._array=h,h.push(t),r[n].push(t)}},e._marked_timespans_ids={},e.addMarkedTimespan=function(t){var a=e._prepare_timespan_options(t);if(a.length){for(var i=a[0].id,n=0;n<a.length;n++)e._addMarkerTimespanConfig(a[n]);return i}},e._add_timespan_zones=function(e,t){var a=e.slice();if(t=t.slice(),!a.length)return t;for(var i=0;i<a.length;i+=2)for(var n=a[i],r=a[i+1],o=i+2==a.length,s=0;s<t.length;s+=2){var d=t[s],_=t[s+1];if(_>r&&d<=r||d<n&&_>=n)a[i]=Math.min(n,d),
a[i+1]=Math.max(r,_),i-=2;else{if(!o)continue;var l=n>d?0:2;a.splice(i+l,0,d,_)}t.splice(s--,2);break}return a},e._subtract_timespan_zones=function(e,t){for(var a=e.slice(),i=0;i<a.length;i+=2)for(var n=a[i],r=a[i+1],o=0;o<t.length;o+=2){var s=t[o],d=t[o+1];if(d>n&&s<r){var _=!1;n>=s&&r<=d&&a.splice(i,2),n<s&&(a.splice(i,2,n,s),_=!0),r>d&&a.splice(_?i+2:i,_?0:2,d,r),i-=2;break}}return a},e.invertZones=function(t){return e._subtract_timespan_zones([0,1440],t.slice())},
e._delete_marked_timespan_by_id=function(t){var a=e._marked_timespans_ids[t];if(a)for(var i=0;i<a.length;i++)for(var n=a[i],r=n._array,o=0;o<r.length;o++)if(r[o]==n){r.splice(o,1);break}},e._delete_marked_timespan_by_config=function(t){var a,i=e._marked_timespans,r=t.sections,o=t.days,s=t.type||n;if(r){for(var d in r)if(r.hasOwnProperty(d)&&i[d]){var _=r[d];i[d][_]&&(a=i[d][_])}}else a=i.global;if(a)if(void 0!==o)a[o]&&a[o][s]&&(e._addMarkerTimespanConfig(t),
e._delete_marked_timespans_list(a[o][s],t));else for(var l in a)if(a[l][s]){var c=e._lame_clone(t);t.days=l,e._addMarkerTimespanConfig(c),e._delete_marked_timespans_list(a[l][s],t)}},e._delete_marked_timespans_list=function(t,a){for(var i=0;i<t.length;i++){var n=t[i],r=e._subtract_timespan_zones(n.zones,a.zones);if(r.length)n.zones=r;else{t.splice(i,1),i--;for(var o=e._marked_timespans_ids[n.id],s=0;s<o.length;s++)if(o[s]==n){o.splice(s,1);break}}}},e.deleteMarkedTimespan=function(t){
if(arguments.length||(e._marked_timespans={global:{}},e._marked_timespans_ids={},e._marked_timespans_types={}),"object"!=typeof t)e._delete_marked_timespan_by_id(t);else{t.start_date&&t.end_date||(void 0!==t.days||t.type||(t.days="fullweek"),t.zones||(t.zones="fullday"));var a=[];if(t.type)a.push(t.type);else for(var i in e._marked_timespans_types)a.push(i);for(var n=e._prepare_timespan_options(t),r=0;r<n.length;r++)for(var o=n[r],s=0;s<a.length;s++){var d=e._lame_clone(o);d.type=a[s],
e._delete_marked_timespan_by_config(d)}}},e._get_types_to_render=function(t,a){var i=t?e._lame_copy({},t):{};for(var n in a||{})a.hasOwnProperty(n)&&(i[n]=a[n]);return i},e._get_configs_to_render=function(e){var t=[];for(var a in e)e.hasOwnProperty(a)&&t.push.apply(t,e[a]);return t},e._on_scale_add_marker=function(t,a){if(!e._table_view||"month"==e._mode){var i=a.getDay(),n=a.valueOf(),r=this._mode,o=e._marked_timespans,s=[],d=[];if(this._props&&this._props[r]){
var _=this._props[r],l=_.options,c=e._get_unit_index(_,a),h=l[c];if(_.days>1){var u=864e5,v=Math.round((a-e._min_date)/u),g=_.size||l.length;a=e.date.add(e._min_date,Math.floor(v/g),"day"),a=e.date.date_part(a)}else a=e.date.date_part(new Date(this._date));if(i=a.getDay(),n=a.valueOf(),o[r]&&o[r][h.key]){var f=o[r][h.key],m=e._get_types_to_render(f[i],f[n]);s.push.apply(s,e._get_configs_to_render(m))}}var p=o.global,y=p[n]||p[i];s.push.apply(s,e._get_configs_to_render(y))
;for(var b=0;b<s.length;b++)d.push.apply(d,e._render_marked_timespan(s[b],t,a));return d}},e.attachEvent("onScaleAdd",function(){e._on_scale_add_marker.apply(e,arguments)}),e.dblclick_dhx_marked_timespan=function(t,a){e.callEvent("onScaleDblClick",[e.getActionData(t).date,a,t]),e.config.dblclick_create&&e.addEventNow(e.getActionData(t).date,null,t)}},e._temp_limit_scope()});
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_limit.js.map