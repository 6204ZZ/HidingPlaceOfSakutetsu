//トップに戻るボタンを実装するプログラム

window.addEventListener('load', function () {
    let button = document.createElement('a');
    button.href = '#top';
    button.innerHTML = '▲';
    button.style.fontSize = '30px';
    button.style.color = '#FFD966'
    button.style.textAlign = 'center';
    button.style.position = 'fixed';
    button.style.border = 'solid 5px #FFD966';
    button.style.width = '50px';
    button.style.height = '50px';
    button.style.borderRadius = '7px';
    button.style.bottom = '10%';
    button.style.right = '10%';
    button.style.display = 'none';
    const BODY = document.getElementsByTagName('body');
    BODY[0].appendChild(button);

    button.addEventListener('mouseenter', function () {
        button.style.backgroundColor = '#FFD966';
        button.style.color = '#111111';
    });

    button.addEventListener('mouseleave', function () {
        button.style.backgroundColor = '#111111';
        button.style.color = '#FFD966';
    });

    this.window.addEventListener('scroll', function () {
        if (this.window.pageYOffset < 200) {
            button.style.display = 'none';
        } else if (this.window.pageYOffset < 800) { //じんわり表示
            button.style.display = 'block';
            button.style.opacity = (this.window.pageYOffset - 200) / (800 - 200);
        } else {
            button.style.display = 'block';
            button.style.opacity = '1';
        }
    });
});