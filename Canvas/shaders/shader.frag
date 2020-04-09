// fragment shader ( フラグメントシェーダー、ピクセルシェーダー )
// このファイルに各ピクセルごとの処理を記述します

varying vec2 vUv;

uniform float uAspect;
uniform float uTime;
uniform vec2 uMouse;
uniform float uRadius;

void main() {
  vec2 uv = vec2(vUv.x * uAspect, vUv.y); //xをアスペクト補正したテクスチャ座標
  vec2 center = vec2(uMouse.x * uAspect, uMouse.y); //xをアスペクト補正した画面の中心
  //float dist = length(vUv - center); //中心から現在のピクセルまでの距離を取得
  float lightness = uRadius / length(uv - center);
  lightness = clamp(lightness, 0.0, 5.0);
  vec4 color = vec4( vec3(lightness), 1.0 );

  color *= vec4(0.7, 0.3, 0.2, 1.0);

  gl_FragColor = color;
}