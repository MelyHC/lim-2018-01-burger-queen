(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(e,t,n){e.exports=n(40)},20:function(e,t,n){},38:function(e,t,n){},40:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),c=n(8),o=n.n(c),i=(n(20),n(14)),l=n(9),s=n(10),u=n(12),d=n(11),m=n(13),f=n(4),h=n.n(f),p=function(e){var t=e.name,n=e.price,a=e.add;return r.a.createElement("div",{className:"card text-center m-2 col-5 cursor p-2",onClick:function(){return a(t,n,t)}},r.a.createElement("span",null," ",t),r.a.createElement("span",null," s/.",n))},v=function(e){var t=e.name,n=e.price,a=e.count,c=e.remove,o=e.i,i=e.add,l=e.reduce;return r.a.createElement("tr",null,r.a.createElement("td",null,t),r.a.createElement("td",{className:"text-center"},"s/. ",n),r.a.createElement("td",{className:"text-center"},r.a.createElement("i",{className:"cursor fas fa-minus mr-2 text-secondary",onClick:function(){return l(n,t,o)}}),r.a.createElement("span",{className:"badge badge-pill badge-primary"},a),r.a.createElement("i",{className:"cursor fas fa-plus ml-2 text-secondary",onClick:function(){return i(n,t)}})),r.a.createElement("td",{className:"cursor",onClick:function(){return c(o)}},r.a.createElement("i",{className:"fas fa-trash text-danger"})))};n(36),n(38);h.a.initializeApp({apiKey:"AIzaSyDwB3qJRB-XpVaJIqAysxlPjL0bNpsKgd4",authDomain:"burger-queen-45463.firebaseapp.com",projectId:"burger-queen-45463"});var E=h.a.firestore();E.settings({timestampsInSnapshots:!0});var g=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(u.a)(this,Object(d.a)(t).call(this,e))).handleClick=function(){var e=n.state.newOrder,t=e.user,a=e.items,r=e.totalPrice;E.collection("orders").add({user:t,items:a,totalPrice:r}).then(function(e){n.setState({newOrder:{user:"",totalPrice:0,items:[]}}),console.log("Document written with ID: ",e.id)}).catch(function(e){console.error("Error adding document: ",e)})},n.handleChange=function(e){n.setState({typefood:e.target.name})},n.sumTotalOrder=function(e){var t=0;e.items.forEach(function(e){var n=e.price;return t+=n}),e.totalPrice=t,n.setState({newOrder:e})},n.addCount=function(e,t){var a=n.state.newOrder;a.items.forEach(function(n){n.id===t&&(n.price===e&&(e/=n.count),n.count++,n.price=e*n.count)}),n.sumTotalOrder(a)},n.reduceCount=function(e,t,a){var r=n.state.newOrder;r.items.forEach(function(r){r.id===t&&(r.price=e/r.count,r.count--,r.price=r.price*r.count,0===r.count&&n.handleRemove(a))}),n.sumTotalOrder(r)},n.handleAddItem=function(e,t,a){var r=n.state.newOrder;r.items.find(function(e){return e.id===a})?n.addCount(t,a):r.items.push({item:e,price:t,id:a,count:1}),n.sumTotalOrder(r)},n.handleRemove=function(e){var t=n.state.newOrder;t.items.splice(e,1),n.sumTotalOrder(t)},n.handleClient=function(e){n.setState({newOrder:Object(i.a)({},n.state.newOrder,{user:e.target.value})})},n.state={food:{},typefood:"breakfast",newOrder:{user:"",totalPrice:0,items:[]},orders:[]},n}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;E.collection("food").get().then(function(t){t.forEach(function(t){e.setState({food:t.data()})})})}},{key:"render",value:function(){var e=this,t=this.state,n=t.typefood,a=t.food,c=t.newOrder,o=Object.keys(a);return r.a.createElement("div",null,r.a.createElement("header",{className:"App-header bg-primary text-white"},r.a.createElement("h3",{className:""},"Burger Queen")),r.a.createElement("button",{className:"btn btn-primary m-2",name:"breakfast",onClick:this.handleChange},"Desayuno"),r.a.createElement("button",{className:"btn btn-primary m-2",name:"diner",onClick:this.handleChange},"Almuerzo/Cena"),r.a.createElement("div",{className:"container-fluid"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-md-7"},r.a.createElement("div",{className:"row"},o.length?a[n].map(function(t){var n=t.item,a=t.price;return r.a.createElement(p,{name:n,price:a,key:n,add:e.handleAddItem})}):r.a.createElement("span",{className:"ml-3"},"Cargando men\xfa ..."))),r.a.createElement("div",{className:"col-md-5"},r.a.createElement("table",{className:"table"},r.a.createElement("thead",null,r.a.createElement("tr",{className:"text-center"},r.a.createElement("th",{scope:"col"},"Item"),r.a.createElement("th",{scope:"col"},"Precio"),r.a.createElement("th",{scope:"col"},"Cantidad"),r.a.createElement("th",{scope:"col"}))),r.a.createElement("tbody",null,c.items.map(function(t,n){var a=t.item,c=t.price,o=t.count;return r.a.createElement(v,{name:a,price:c,key:n,i:n,count:o,add:e.addCount,remove:e.handleRemove,reduce:e.reduceCount})}),r.a.createElement("tr",{className:"text-center table-active"},r.a.createElement("th",null,"Total"),r.a.createElement("th",{className:"text-center"},"s/. ",c.totalPrice),r.a.createElement("td",{colSpan:"2"})),r.a.createElement("tr",null,r.a.createElement("td",{colSpan:"2"},r.a.createElement("input",{className:"form-control",type:"text",placeholder:"Cliente",onChange:this.handleClient,value:c.user})),r.a.createElement("td",{colSpan:"2"},r.a.createElement("button",{className:"btn btn-success",onClick:this.handleClick},"Enviar a cocina")))))))))}}]),t}(a.Component),w=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function b(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var n=e.installing;n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See http://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))}}}).catch(function(e){console.error("Error during service worker registration:",e)})}o.a.render(r.a.createElement(g,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/lim-2018-01-burger-queen",window.location).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("/lim-2018-01-burger-queen","/service-worker.js");w?(function(e,t){fetch(e).then(function(n){404===n.status||-1===n.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):b(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit http://bit.ly/CRA-PWA")})):b(t,e)})}}()}},[[15,2,1]]]);
//# sourceMappingURL=main.bf7c5dc0.chunk.js.map