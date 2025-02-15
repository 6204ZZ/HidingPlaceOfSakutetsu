window.addEventListener('load',  function (){
    const notchID = document.getElementById('notchIndicator');
    const buttonID = document.getElementsByClassName('collision');
    const NOTCH = (buttonID.length - 1) / 2; //ノッチ段数(力行制動共通)
    let notch = -NOTCH; //ノッチ
    let targetNotch = -NOTCH; //notchをtargetNotchに追従させるように制御を行う
    const notchInterval = 100; //[ms]ノッチを追従させる間隔

    let angularVelocityID = document.getElementById('angularVelocity');
    let angularAccelerationID = document.getElementById('angularAcceleration');
    const rotorID = document.getElementsByClassName('rotor');
    const NUMBER_OF_AFTERIMAGE = rotorID.length; //残像の個数
    let theta = []; //角度 [deg]
    // let AFTERIMAGE_OPACITY = []; //残像の不透明度
    const AFTERIMAGE_OPACITY = 0.1; //残像の不透明度を定数化
    for (let i = 0; i < rotorID.length; i++) {
        theta[i] = 0;
        // AFTERIMAGE_OPACITY[i] = 0.1 * 1 ** (i + 1); //各残像の不透明度を計算
        // rotorID[i].style.opacity = AFTERIMAGE_OPACITY[i]; //各残像の不透明度を設定
        rotorID[i].style.opacity = AFTERIMAGE_OPACITY; //各残像の不透明度を定数化
    }
    let angularVelocityNeedleID = document.getElementById('angularVelocityNeedle');
    let angularAccelerationNeedleID = document.getElementById('angularAccelerationNeedle');
    let angularAccelerationNeedleAngle = 0; //角加速度計の針をなめらかに動かすための変数 [deg]
    const alphaResponce = 250; //targetAlphaに対するalphaの応答の時定数。大きいほど応答が遅くなる。
    const angularAccelerationNeedleResponce = 85; //角加速度計の針の時定数。大きいほど応答が遅くなる。

    let currentTime = 0; //今回の処理時刻[ms]
    let previousTime = 0; //前回の処理時刻[ms]
    let deltaTime = 0; //1フレームの所要時間[ms]
    let omega = 0; //角速度 [deg/s]
    let alpha = 0; //摩擦を考慮していない角加速度 [deg/s^2]
    let realAlpha = 0; //摩擦を考慮した角加速度 [deg/s^2]
    const NOTCH_STRENGTH = 600; //フルノッチの角加速度 [deg/s^2]
    function targetAlpha(notch) { //alphaが目指す値
        return NOTCH_STRENGTH / NOTCH * notch;
    }
    function friction(angularVelocity) { //角速度によらず一定な抵抗 [deg/s^2]、角速度に比例する抵抗の係数 [/s]、角速度の2乗に比例する抵抗の係数 [/deg]
        return 10 + 0 * angularVelocity + 0.00000134 * angularVelocity ** 2;
    }

    for(let i = 0; i < buttonID.length; i++) {
        buttonID[i].onmouseover = function () {
            targetNotch = -NOTCH + i;
        }
    }

    setInterval(function () {
        if (notch < targetNotch) {
            notch = notch + 1;
        } else if (notch > targetNotch) {
            notch = notch - 1;
        }

        if (notch > 0) {
            notchID.innerHTML = 'P' + notch;
            notchID.style.backgroundColor = '#005AFF';
            for (i = 0; i <= 2 * NOTCH; i++) {
                if (NOTCH < i && i <= notch + NOTCH) {
                    buttonID[i].style.opacity = '1';
                } else {
                    buttonID[i].style.opacity = '0.4';
                }
            }
        } else if (notch < 0) {
            notchID.innerHTML = 'B' + (-notch);
            notchID.style.backgroundColor = '#FF4B00';
            for (i = 0; i <= 2 * NOTCH; i++) {
                if (notch + NOTCH <= i && i < NOTCH) {
                    buttonID[i].style.opacity = '1';
                } else {
                    buttonID[i].style.opacity = '0.4';
                }
            }
        } else {
            notchID.innerHTML = 'N';
            notchID.style.backgroundColor = '#03AF7A';
            for (i = 0; i <= 2 * NOTCH; i++) {
                if (i === NOTCH) {
                    buttonID[i].style.opacity = '1';
                } else {
                    buttonID[i].style.opacity = '0.4';
                }
            }
        }
    }, notchInterval);

    const test = (timestamp) => {
        currentTime = timestamp;
        if (currentTime === undefined) { //初回のtimestanpはundefinedなので
            currentTime = 0;
        }
        deltaTime = currentTime - previousTime; //1フレームにかかった時間を計算
        previousTime = currentTime; //前回の処理時刻を更新
        alpha += (targetAlpha(notch) - alpha) / alphaResponce * deltaTime; //時定数がフレームレートに依存しないようにするためにdeltaTimeをかける
        realAlpha = alpha - friction(omega);
        omega += realAlpha * deltaTime / 1000;
        if (omega < 0) {
            realAlpha = 0;
            omega = 0;
        } else if (omega > 21000) {
            realAlpha = 0;
            omega = 21000;
        }

        theta[0] += omega * deltaTime / 1000;
        let afterimageDelayAngle = []; //要素0の画像を基準としたときの残像の遅れ角度 [deg]
        for (let i = 0; i < NUMBER_OF_AFTERIMAGE; i++) {
            afterimageDelayAngle[i] = i / (NUMBER_OF_AFTERIMAGE - 1) * deltaTime / 1000 * omega; //残像の遅れ角度を計算する。その最大値は(1コマの時間)×(角速度)
            theta[i] = theta[0] - afterimageDelayAngle[i]; //各残像の角度を計算する
            theta[i] = theta[i] % 360; //各残像の角度を0~360の範囲におさめる
            rotorID[NUMBER_OF_AFTERIMAGE - i - 1].style.rotate = theta[i] + 'deg'; //各残像を計算した角度に配置する。rotorIDの要素番号が小さい画像ほど下にあるが、角度theta[0]の画像を一番上にしたいので[NUMBER_OF_AFTERIMAGE - i - 1]と記述する
        }

        angularVelocityID.innerHTML = Math.round(omega / 6); //角速度を表示する。単位をdeg/sからrpmに変換するために6で割る
        angularVelocityNeedleID.style.rotate = -120 + omega / 100 + 'deg'; //角速度計の針を動かす。6000deg/sに対して60deg回転させたいので100で割る
        angularAccelerationID.innerHTML = Math.round(realAlpha / 6); //角加速度を表示する。単位をdeg/s^2からrpm/sに変換するために6で割る
        angularAccelerationNeedleAngle += (realAlpha / 10 - angularAccelerationNeedleAngle) / angularAccelerationNeedleResponce * deltaTime; //角速度計の針の角度を計算する。600deg/s^2に対して60deg回転させたいのでrealAlphaを10で割る
        //↓バックグラウンドから復帰したときに針が暴れるのを防ぐ処理
        if(angularAccelerationNeedleAngle < -120) {
            angularAccelerationNeedleAngle = -120;
        } else if(angularAccelerationNeedleAngle > 120) {
            angularAccelerationNeedleAngle = 120;
        }
        angularAccelerationNeedleID.style.rotate = angularAccelerationNeedleAngle + 'deg'; //角速度計の針を動かす
        requestAnimationFrame(test);
    }
    test();
});