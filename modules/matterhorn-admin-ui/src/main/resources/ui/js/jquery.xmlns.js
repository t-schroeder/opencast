(function(a){var b={xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",html:"http://www.w3.org/1999/xhtml/"};var c={};for(var d in b){c[b[d]]=d}a.extend({xmlns:a.extend({},b,{"":"*"})});var e=[];a.fn.extend({xmlns:function(b,c){if(typeof b=="string"){b={"":b}}if(b){e.push(a.xmlns);a.xmlns=a.extend({},a.xmlns,b);if(c!==undefined){if(typeof c=="string"){return this.find(c).xmlns(undefined)}else{var d=this;try{d=c.call(this);if(!d){d=this}}finally{d.xmlns(undefined)}return d}}else{return this}}else{a.xmlns=e?e.pop():{};return this}}});var f=function(b){if(!b){return a.xmlns[""]}b=b.substr(0,b.length-1);if(b==""||b=="*"){return b}var c=a.xmlns[b];if(typeof c=="undefined"){throw"Syntax error, undefined namespace prefix '"+b+"'"}return c};var g=function(b,c){a.expr.match[b]=new RegExp(c.source+/(?![^\[]*\])(?![^\(]*\))/.source);if(a.expr.leftMatch){a.expr.leftMatch[b]=new RegExp(/(^(?:.|\r|\n)*?)/.source+a.expr.match[b].source.replace(/\\(\d+)/g,function(a,b){return"\\"+(b-0+1)}))}};g("TAG",/^((?:((?:[\w\u00c0-\uFFFF\*_-]*\|)?)((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)))/);var h=document.createElement("div");var i=false;h.appendChild(document.createComment(""));if(h.getElementsByTagName("*").length>0){i=true}var j=true;if(h.localName&&h.localName=="div"){j=false}h=null;a.expr.find.TAG=function(a,b,c){var d=f(a[2]);var e=a[3];var g;if(typeof b.getElementsByTagNameNS!="undefined"){g=b.getElementsByTagNameNS(d,e)}else if(typeof b.selectNodes!="undefined"){if(b.ownerDocument){b.ownerDocument.setProperty("SelectionLanguage","XPath")}else{b.setProperty("SelectionLanguage","XPath")}var h="";if(d!="*"){if(e!="*"){h="namespace-uri()='"+d+"' and local-name()='"+e+"'"}else{h="namespace-uri()='"+d+"'"}}else{if(e!="*"){h="local-name()='"+e+"'"}}if(h){g=b.selectNodes("descendant-or-self::*["+h+"]")}else{g=b.selectNodes("descendant-or-self::*")}}else{g=b.getElementsByTagName(e);if(i&&e=="*"){var j=[];for(var k=0;g[k];k++){if(g[k].nodeType==1){j.push(g[k])}}g=j}if(g&&d!="*"){var j=[];for(var k=0;g[k];k++){if(g[k].namespaceURI==d||g[k].tagUrn==d){j.push(g[k])}}g=j}}return g};var k=function(a){return a.nodeType===9&&a.documentElement.nodeName!=="HTML"||!!a.ownerDocument&&a.ownerDocument.documentElement.nodeName!=="HTML"};a.expr.preFilter.TAG=function(a,b,c,d,e,g){var h=a[3];if(!g){if(j){h=h.toUpperCase()}else{h=h.toLowerCase()}}return[a[0],f(a[2]),h]};a.expr.filter.TAG=function(a,b){var c=b[1];var d=b[2];var e=a.namespaceURI?a.namespaceURI:a.tagUrn;var f=a.localName?a.localName:a.tagName;if(c=="*"||e==c||c==""&&!e){return d=="*"&&a.nodeType==1||f==d}return false};g("ATTR",/\[\s*((?:((?:[\w\u00c0-\uFFFF\*_-]*\|)?)((?:[\w\u00c0-\uFFFF_-]|\\.)+)))\s*(?:(\S?=)\s*(['"]*)(.*?)\5|)\s*\]/);a.expr.preFilter.ATTR=function(b,c,d,e,g,h){var i=b[3].replace(/\\/g,"");if(!h&&a.expr.attrMap[i]){b[3]=a.expr.attrMap[i]}if(b[4]=="~="){b[6]=" "+b[6]+" "}if(!b[2]||b[2]=="|"){b[2]=""}else{b[2]=f(b[2])}return b};var l=function(a,b,c){var d=a+"";return a==null?b==="!=":b==="="?d===c:b==="*="?d.indexOf(c)>=0:b==="~="?(" "+d+" ").indexOf(c)>=0:!c?d&&a!==false:b==="!="?d!=c:b==="^="?d.indexOf(c)===0:b==="$="?d.substr(d.length-c.length)===c:b==="|="?d===c||d.substr(0,c.length+1)===c+"-":false};a.expr.filter.ATTR=function(b,d){var e=d[2];var f=d[3];var g=d[4];var h=d[6];var i;if(e==""){i=a.expr.attrHandle[f]?a.expr.attrHandle[f](b):b[f]!=null?b[f]:b.getAttribute(f);return l(i,g,h)}if(e!="*"&&typeof b.getAttributeNS!="undefined"){return l(b.getAttributeNS(e,f),g,h)}var j=b.attributes;for(var k=0;j[k];k++){var m=j[k].localName;if(!m){m=j[k].nodeName;var n=m.indexOf(":");if(n>=0){m=m.substr(n+1)}}if(m==f){i=j[k].nodeValue;if(e=="*"||j[k].namespaceURI==e){if(l(i,g,h)){return true}}if(j[k].namespaceURI===""&&j[k].prefix){if(j[k].prefix==c[e]){if(l(i,g,h)){return true}}}}}return false}})(jQuery)