import * as THREE from 'three';

// このクラス内に three.js のコードを書いていきます
export default class Canvas {
  constructor(elementId) {
    // ウィンドウサイズ
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    //マウス座標
    this.mouse = new THREE.Vector2(0, 0);
    //スクロール量
    this.scrollY = 0;
    //elementIdのついたDOM要素を取得
    this.element = document.getElementById(elementId);
    const rect = this.element.getBoundingClientRect();

    // レンダラーを作成
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.w, this.h);// 描画サイズ
    this.renderer.setPixelRatio(window.devicePixelRatio);// ピクセル比

    // #canvas-containerにレンダラーのcanvasを追加
    const container = document.getElementById("canvas-container");
    container.appendChild(this.renderer.domElement);

    //視野角をラジアンに変換
    const fov = 60;
    const fovRad = (fov / 2) * (Math.PI / 180);
    const dist = (this.h / 2) / Math.tan(fovRad);

    // カメラを作成 (視野角, 画面のアスペクト比, カメラに映る最短距離, カメラに映る最遠距離)
    this.camera = new THREE.PerspectiveCamera(fov, this.w / this.h, 1, dist * 2);
    this.camera.position.z = dist;// カメラを遠ざける

    // シーンを作成
    this.scene = new THREE.Scene();

    // ライトを作成
    this.light = new THREE.PointLight(0xffffff);
    this.light.position.set(0, 0, 400);// ライトの位置を設定

    // ライトをシーンに追加
    this.scene.add(this.light);

    // 立方体のジオメトリを作成(幅, 高さ, 奥行き)
    const depth = 300;
    const geo = new THREE.BoxGeometry(rect.width, rect.height, depth);

    // マテリアルを作成
    const mat = new THREE.MeshLambertMaterial({ color: 0x00ffff });

    // ジオメトリとマテリアルからメッシュを作成
    this.mesh = new THREE.Mesh(geo, mat);
    
    // ウィンドウ中心からDOMRect中心へのベクトルを求めてオフセットする
    const center = new THREE.Vector2(rect.x + rect.width / 2, rect.y + rect.height / 2); //DOMRectの中心座標
    const diff   = new THREE.Vector2(center.x - this.w / 2, center.y - this.h / 2);
    this.mesh.position.set(diff.x, -(diff.y + this.scrollY), -depth / 2);
    this.offsetY = this.mesh.position.y;

    // メッシュをシーンに追加
    this.scene.add(this.mesh);

    // 画面に表示
    //this.renderer.render(this.scene, this.camera);

    //描画ループ開始
    this.render();
  }

  render(){
    requestAnimationFrame(() => { this.render(); });

    //const sec = performance.now() / 500;

    //this.mesh.rotation.x = Math.cos(sec) * Math.PI / 2;
    //this.mesh.rotation.y = sec * Math.PI / 5;

    //スクロールに追従させる
    this.mesh.position.y = this.scrollY + this.offsetY;

    // 画面に表示
    this.renderer.render(this.scene, this.camera);
  }

  mouseMoved(x, y){
    this.mouse.x = x - (this.w / 2);
    this.mouse.y = -y + (this.h / 2);

    this.light.position.x = this.mouse.x;
    this.light.position.y = this.mouse.y;
  }

  scrolled(y){
    this.scrollY = y;
  }
};
