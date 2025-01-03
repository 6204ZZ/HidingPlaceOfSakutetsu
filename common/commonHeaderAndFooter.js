function commonHeader() {
    var html = "";
    html += '<a class="logo" href="/index.html">';
    html += '   <img src="/common/pictures/logo2.png" alt="作鉄の秘密基地">';
    html += '</a>';
    html += '<nav class="glovalNavi">';
    html += '   <ul>';
    html += '       <li><a href="/3D作品/3Dworks.html">3D作品</a></li>';
    html += '       <li><a href="/電子工作/electoronics.html">電子工作</a></li>';
    html += '       <li><a href="/イラスト/illustrations.html">イラスト</a></li>';
    html += '       <li><a href="">空き</a></li>';
    html += '       <li><a href="">空き</a></li>';
    html += '   </ul>';
    html += '</nav>';
    document.write(html);
}

function commonFooter() {
    var html = "";
    html += '<small>&copy; 2025 作鉄<br>過去の作鉄の現在の作鉄による未来の作鉄のためのサイト</small>';
    document.write(html);
}