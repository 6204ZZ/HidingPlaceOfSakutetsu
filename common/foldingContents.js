//項目を折り畳み可能にするプログラム。HTMLにはたとえば次のように記述する
//<div class="foldingButtons">
//  <h2>
//      <div class="foldingStatus">ここには何も書かない</div>
//      項目のタイトルなどを記述
//  </h2>
//</div>
//<div class="foldingFactors">折り畳みしたい要素</div>
window.addEventListener('load', function () {
    const foldingButtons = document.getElementsByClassName('foldingButtons'); //クリックに反応する部分
    const foldingStatus = document.getElementsByClassName('foldingStatus'); //展開と折り畳みの状態を表示する部分
    let isVisible = []; //要素が表示されているか否かを示す変数
    const foldingFactors = document.getElementsByClassName('foldingFactors'); //折り畳みしたい要素
    for (let i = 0; i < foldingButtons.length; i++) {
        //初期設定
        isVisible[i] = false;
        foldingFactors[i].style.display = 'none';
        foldingStatus[i].innerHTML = '▼';
        foldingStatus[i].style.display = 'inline';
        foldingButtons[i].style.paddingTop = '5px';
        foldingButtons[i].style.paddingBottom = '10px';
        foldingButtons[i].style.cursor = 'pointer';

        //マウスカーソルが触れるとほんのり光る
        foldingButtons[i].addEventListener('mouseenter', function () {
            foldingButtons[i].style.backgroundColor = 'rgba(255, 217, 102, 0.35)';
        });

        //マウスカーソルが離れたら消灯する
        foldingButtons[i].addEventListener('mouseleave', function () {
            foldingButtons[i].style.backgroundColor = 'rgba(255, 217, 102, 0)';
        });

        //クリック時に表示非表示を切り替える
        foldingButtons[i].addEventListener('click', function () {
            isVisible[i] = !(isVisible[i]);
            if (isVisible[i]) {
                foldingFactors[i].style.display = 'block'; //再表示する
                foldingStatus[i].innerHTML = '▲';
            } else {
                foldingFactors[i].style.display = 'none'; //非表示にする
                foldingStatus[i].innerHTML = '▼';
            }
        });
    }
});