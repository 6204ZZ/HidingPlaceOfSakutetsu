//項目を折り畳み可能にするプログラム。HTMLには次のように記述する
//<div class="foldingButtons">ここには何も書かない</div>
//<div class="foldingFactors">折り畳みしたい要素</div>
window.onload = init;
function init() {
    const foldingButtons = document.getElementsByClassName('foldingButtons');
    let isVisible = []; //要素が表示されているか否かを示す変数
    let foldingFactors = document.getElementsByClassName('foldingFactors');
    for (let i = 0; i < foldingButtons.length; i++) {
        isVisible[i] = false; //デフォルトで要素を非表示にする
        foldingFactors[i].style.display = 'none';
        foldingButtons[i].innerHTML = '展開する'
        foldingButtons[i].style.backgroundColor = '#800000'

        foldingButtons[i].addEventListener('click', function () {
            isVisible[i] = !(isVisible[i]);
            if (isVisible[i]) {
                foldingFactors[i].style.display = 'block'; //再表示する
                foldingButtons[i].innerHTML = '折り畳む'
                foldingButtons[i].style.backgroundColor = '#008080'
            } else {
                foldingFactors[i].style.display = 'none'; //非表示にする
                foldingButtons[i].innerHTML = '展開する'
                foldingButtons[i].style.backgroundColor = '#800000'
            }
        });
    }
}