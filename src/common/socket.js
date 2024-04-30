const  initSocket = () => {
    //建立socket通道
    const ws = new WebSocket(
        'ws:192.168.111.40:8001/taskSocket'
    );
    //socket连接成功后的回调函数
    ws.onopen = () => {
        console.log('websocket连接成功！');
        //若项目中没有使用nginx转发请求则忽略这步
        setInterval(() => {
            this.keepAlive();
        }, 2000);
    };
    //接收来自服务端消息的回调函数
    ws.onmessage = evt => {
        console.log('已接收来自后台的消息：', evt.data);
        // 刷新数据
        this.taskList()
    };
    //关闭socket的回调函数
    ws.onclose = function () {
        // 关闭 websocket
        console.log('... 连接已关闭 ...');
    };
    // // 路由跳转时结束websocket链接
    // this.$router.afterEach(function() {
    //   this.ws.close();
    // });
}

// //持续向后台发送消息，用于维护socket通道不被nginx关闭
// export function  keepAlive(webSocket) {
//     if (webSocket) {
//         if (webSocket.readyState === webSocket.OPEN) {
//             this.ws.send('sxp-front-socket-health')
//         }
//     }
// }

export default {initSocket}
