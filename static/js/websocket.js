export default{
  wsUri:(window.top.location.protocol === 'https:' ? 'wss://' : 'ws://')+ window.top.location.host + "/api/v1/push_pull/join",
  registry: {},
  retryCount: 0,
  websocket : null,
  closeWebsocket : false,
  registerWebsocketCallback:function(key, sender, callback) {
    if (typeof callback == 'function') {
      this.registry[key] = this.registry[key] || {};
      this.registry[key][sender] = callback;
    }
  },
  unregisterWebsocketCallback:function(key, sender) {
    try {
      delete this.registry[key][sender];
    } catch (e) {

    }
  },
  openWebsocket:function() {
    if (this.websocket) {
      return
    }
    var t=this;
    this.websocket = new WebSocket(this.wsUri);

    this.websocket.onmessage = function (evt) {
      var data = JSON.parse(evt.data);
      if (data.category == 'error' && data.body === 401) {
        t.$router.push({path:'/'});
      }
      var match = /^redis\/(.*)$/.exec(data.format);
      if (match) {
        t.$http.get('/api/v1/redis/cache',{key:data.body},{emulateJSON:true}).then(function(res){
          var json=res.body;
          if (json.code == 401) {
            t.$router.push({path:'/'});
          } else {
            if (match[1] == 'object') {
              json.data = JSON.parse(json.data);
            }

            var reg = t.registry[data.category];
            if (reg) {
              var callback = reg[data.sender] || reg["*"];
              if (callback) {
                try {
                  callback(json.data);
                } catch (e) {

                }
              } else {
                //console.log(data);
              }
            }
          }
        }).catch(function(res){
          var json=res.body;
          if (json.code == 401) {
            t.$router.push({path:'/'});
          }
        })
      } else {
        var reg = t.registry[data.category];
        if (reg) {
          var callback = reg[data.sender] || reg["*"];
          if (callback) {
            if(data.category=='im'){
              try{
                callback(data);
              }catch (e){

              }
            }else{
              try {
                callback(data.body);
              } catch (e) {
              }
            }
          } else {
            //console.log(data);
          }
        }
      }
    }

    this.websocket.onopen = function () {
      t.retryCount = 0;
    }

    this.websocket.onclose = function () {
      console.log("websocket closed");

      if(t.closeWebsocket){
        t.websocket = null;
      }else{
        t.websocket = null;
        setTimeout(function () {
          console.log("retry websocket...");
          t.openWebsocket();
        }, Math.pow(2, t.retryCount) * 1000);

        if (t.retryCount < 5) {
          t.retryCount++;
        }
      }


    }

    this.websocket.onerror = function (evt) {
      console.log("websocket error", evt);
      if (t.websocket) {
        t.websocket.close();
        t.websocket = null;
      }
    }
  },
  randomStr:function() {
    var x = this.registry["action/result"];
    var str = Math.random().toString(36).substr(2);
    if (x && x.hasOwnProperty(str)) {
      this.randomStr()
    } else {
      return str;
    }
  }
}

