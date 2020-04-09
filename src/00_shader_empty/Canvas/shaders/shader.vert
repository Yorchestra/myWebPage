// vertex shader ( 頂点シェーダー )
// このファイルに各頂点ごとの処理を記述します

varying vec2 vUv;//varying: 頂点シェーダーからフラグメントシェーダーに変数を送るための修飾子
uniform float uTime;

void main() {
  vUv = uv; //uv: ShaderMaterialで補完されるvec2型(xy)の変数。テクスチャ座標のこと

  gl_Position = vec4( position, 1.0 );
  //position: ShaderMaterialで補完される vec3 型(xyz)の変数。ジオメトリの頂点のこと。
}