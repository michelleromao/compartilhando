import React from "react";

import Svg, { Path } from 'react-native-svg';

export function Logo({width, height}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? "79"}
      height={height ?? "79"}
      fill="none"
      viewBox="0 0 79 79"
    >
      <Path
        fill="#1D1843"
        d="M17.365 35.222c-2.445 0-4.427 1.915-4.427 4.278v34.222c0 2.363 1.982 4.278 4.427 4.278h13.281V60.889c0-2.363 1.982-4.278 4.427-4.278h8.854c2.445 0 4.428 1.915 4.428 4.278V78h13.28c2.446 0 4.428-1.915 4.428-4.278V39.5c0-2.363-1.982-4.278-4.427-4.278h-44.27z"
      />
      <Path
        fill="#1D1843"
        d="M77.13 39.5C83.77 39.5 50.567 1 39.5 1v38.5h37.63z"
      />
      <Path
        fill="#1D1843"
        fillRule="evenodd"
        d="M39.5 1C28.432 1-4.77 39.5 1.87 39.5H39.5V1zm-6.884 13.959c.643-.34.879-1.12.527-1.742-.353-.622-1.16-.85-1.803-.51-4.648 2.46-8.685 6.015-11.49 12.623-.279.656.046 1.406.724 1.675.68.269 1.455-.045 1.733-.7 2.55-6.005 6.132-9.136 10.309-11.346z"
        clipRule="evenodd"
      />
      <Path
        stroke="#1D1843"
        strokeWidth="0.2"
        d="M39.5 1c11.067 0 44.27 38.5 37.63 38.5H39.5m0-38.5v38.5m0-38.5C28.432 1-4.77 39.5 1.87 39.5H39.5m-26.562 0c0-2.363 1.982-4.278 4.427-4.278h44.27c2.446 0 4.428 1.915 4.428 4.278v34.222c0 2.363-1.982 4.278-4.427 4.278H48.354V60.889c0-2.363-1.982-4.278-4.427-4.278h-8.854c-2.445 0-4.427 1.915-4.427 4.278V78h-13.28c-2.446 0-4.428-1.915-4.428-4.278V39.5zm20.205-26.283a1.261 1.261 0 01-.527 1.742c-4.177 2.21-7.76 5.34-10.309 11.345-.278.656-1.054.97-1.732.7-.68-.268-1.004-1.018-.725-1.674 2.805-6.608 6.842-10.162 11.49-12.622.643-.34 1.45-.113 1.803.509z"
      ></Path>
    </Svg>
  );
}

export function EyeOpen() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="13"
      fill="none"
      viewBox="0 0 28 13"
    >
      <Path
        fill="#1D1843"
        fillRule="evenodd"
        d="M28 6.222c0-1.65-1.475-3.233-4.1-4.4C21.273.656 17.712 0 14 0S6.726.656 4.1 1.822C1.476 2.99 0 4.572 0 6.222h9.333H0c0 1.65 1.475 3.233 4.1 4.4 2.626 1.167 6.187 1.822 9.9 1.822s7.274-.655 9.9-1.822c2.625-1.167 4.1-2.75 4.1-4.4h-9.333H28zm-9.333 0a4.667 4.667 0 10-9.334 0 4.667 4.667 0 009.334 0z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
}

export function EyeClose() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="19"
      fill="none"
      viewBox="0 0 28 19"
    >
      <Path
        fill="#1D1843"
        fillRule="evenodd"
        d="M23.363.843a.5.5 0 10-.726-.686l-3.694 3.91a30.075 30.075 0 00-4.943-.4c-3.713 0-7.274.655-9.9 1.822C1.476 6.656 0 8.24 0 9.89c0 1.65 1.475 3.233 4.1 4.4 1.174.521 2.535.94 4.013 1.245l-2.477 2.623a.5.5 0 10.728.686l2.923-3.095c1.498.238 3.091.363 4.713.363 3.713 0 7.274-.655 9.9-1.822 2.625-1.167 4.1-2.75 4.1-4.4 0-1.65-1.475-3.233-4.1-4.4-1.116-.495-2.4-.899-3.792-1.199L23.363.843zM16.9 6.232a4.667 4.667 0 00-6.385 6.76l6.385-6.76zm-5.644 7.432l6.357-6.73a4.667 4.667 0 01-6.356 6.73z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
}

export function Camera() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="16"
      fill="none"
      viewBox="0 0 24 16"
    >
      <Path
        fill="#1D1843"
        fillRule="evenodd"
        d="M6.667 1a1 1 0 011-1h8.666a1 1 0 011 1v.333H23a1 1 0 011 1V15a1 1 0 01-1 1H1a1 1 0 01-1-1V2.333a1 1 0 011-1h5.667V1zM12 13a5 5 0 100-10 5 5 0 000 10z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
}

export function PhotoDefault() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="87"
      height="87"
      fill="none"
      viewBox="0 0 87 87"
    >
      <Path
        fill="#8E8BA1"
        fillRule="evenodd"
        d="M43.5 87C67.524 87 87 67.524 87 43.5S67.524 0 43.5 0 0 19.476 0 43.5 19.476 87 43.5 87zm15.767-54.667c0 5.608-3.543 10.464-8.705 12.819 3.036 1.196 5.825 3.16 8.14 5.785C62.736 55.507 65 61.704 65 68.167H22c0-6.463 2.265-12.66 6.297-17.23 2.316-2.625 5.105-4.589 8.14-5.785-5.161-2.355-8.704-7.21-8.704-12.819C27.733 24.417 34.793 18 43.5 18c8.708 0 15.767 6.417 15.767 14.333z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
}

export function PhotoDefaultBlue() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="38"
      height="38"
      fill="none"
      viewBox="0 0 38 38"
    >
      <Path
        fill="#1D1843"
        fillRule="evenodd"
        d="M19 38c10.493 0 19-8.507 19-19S29.493 0 19 0 0 8.507 0 19s8.507 19 19 19zm6.434-23.877c0 2.45-1.547 4.57-3.802 5.598 1.326.523 2.544 1.38 3.556 2.527 1.761 1.996 2.75 4.703 2.75 7.526H9.157c0-2.823.99-5.53 2.75-7.526 1.012-1.146 2.23-2.004 3.556-2.527-2.255-1.028-3.802-3.149-3.802-5.598 0-3.458 3.083-6.26 6.887-6.26 3.803 0 6.886 2.802 6.886 6.26z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
}

export function BuyIcon() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="23"
      fill="none"
      viewBox="0 0 21 23"
    >
      <Path
        fill="#1D1843"
        fillRule="evenodd"
        d="M4.162 9.324a16.14 16.14 0 00-.079 1.223v.021c0 .343-.26.621-.583.621-.322 0-.583-.278-.583-.621H3.5h-.583v-.037c0-.02 0-.052.002-.09a17.262 17.262 0 01.07-1.116h1.173zm12.676 0a16.105 16.105 0 01.078 1.223v.021c0 .343.262.621.584.621.322 0 .583-.278.583-.621H17.5h.583v-.037c0-.02 0-.052-.002-.09a17.123 17.123 0 00-.07-1.116h.584c.578 0 2.891 13.675 2.313 13.675H.092C-.486 23 1.827 9.324 2.405 9.324h.584c.012-.122.026-.252.042-.388.112-.962.34-2.256.798-3.56.458-1.3 1.158-2.643 2.237-3.665C7.156.678 8.606 0 10.5 0c1.893 0 3.344.678 4.434 1.711 1.08 1.022 1.78 2.365 2.237 3.665.459 1.304.686 2.598.799 3.56.015.136.03.266.04.388h-1.172zm0 0a17.816 17.816 0 00-.026-.233c-.106-.903-.317-2.095-.733-3.278-.418-1.186-1.03-2.33-1.92-3.173-.878-.831-2.052-1.397-3.659-1.397-1.607 0-2.781.566-3.66 1.397-.89.843-1.502 1.987-1.919 3.173-.416 1.183-.627 2.375-.733 3.278-.01.08-.018.158-.026.233h12.676z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
}
export function BillIcon() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="24"
      fill="none"
      viewBox="0 0 22 24"
    >
      <Path
        fill="#1D1843"
        fillRule="evenodd"
        d="M1.968 0C1.255 0 .676.579.676 1.292v20.676c0 .714.579 1.293 1.292 1.293H20.06c.713 0 1.292-.58 1.292-1.293V1.292C21.352.58 20.773 0 20.06 0H1.968zm4.765 14.864c0 2.34 1.789 3.692 3.635 3.978v1.834a.646.646 0 001.292 0v-1.808c.821-.095 1.626-.405 2.275-.965.837-.722 1.36-1.813 1.36-3.234h-.647.647v-.02l-.001-.042a6.7 6.7 0 00-.055-.646 6.448 6.448 0 00-.39-1.524c-.226-.562-.579-1.163-1.136-1.626-.568-.473-1.315-.772-2.26-.772-1.51 0-1.985-.388-2.181-.733-.117-.205-.186-.48-.214-.848-.028-.365-.012-.767.006-1.232l.001-.025c.02-.51.274-.895.704-1.175.447-.29 1.074-.455 1.739-.453.664.001 1.299.169 1.757.463.444.286.708.676.739 1.179a.646.646 0 101.29-.079c-.06-.988-.607-1.721-1.33-2.186-.667-.43-1.495-.642-2.304-.667V2.584a.646.646 0 00-1.292 0v1.822a4.042 4.042 0 00-1.304.537c-.72.47-1.252 1.211-1.29 2.208l-.003.06c-.017.435-.035.904-.002 1.344.035.464.13.952.38 1.391.54.947 1.617 1.386 3.304 1.386.652 0 1.104.198 1.434.473.342.284.588.679.762 1.113.174.433.264.874.31 1.214a5.372 5.372 0 01.043.51v.027h.646-.646c0 1.08-.386 1.802-.911 2.256-.54.466-1.285.698-2.063.681-1.588-.036-3.002-1.059-3.002-2.742a.646.646 0 00-1.293 0z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
}
export function TaskIcon() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="24"
      fill="none"
      viewBox="0 0 21 24"
    >
      <Path
        fill="#1D1843"
        fillRule="evenodd"
        d="M1.292 0C.58 0 0 .579 0 1.292v20.676c0 .714.579 1.293 1.292 1.293h18.092c.713 0 1.292-.58 1.292-1.293V1.292C20.676.58 20.097 0 19.384 0H1.292zM18.7 4.02c-.442-1.344-2.327-2.666-3.77-2.645-.257.004-1.006.939-1.994 2.358.578 1.89 2.17 3.012 4.213 2.962 1.001-1.413 1.63-2.434 1.55-2.675zM4.285 17.543S9.217 9.22 12.397 4.517c.742 1.73 2.291 2.804 4.204 2.94-3.343 4.588-9.489 12.07-9.489 12.07s-3.233 2.622-3.713 2.285c-.48-.337.886-4.269.886-4.269z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
}
export function RuleIcon() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="23"
      fill="none"
      viewBox="0 0 22 23"
    >
      <Path
        fill="#1D1843"
        fillRule="evenodd"
        d="M.676 1.278C.676.572 1.264 0 1.988 0h18.375c.725 0 1.313.572 1.313 1.278v20.444c0 .706-.588 1.278-1.313 1.278H1.988c-.724 0-1.312-.572-1.312-1.278V1.278zm13.257 1.194c-.582-1.583-4.608-1.602-5.25 0-.641 1.603 1.18 15.417 2.493 15.417 1.312 0 3.34-13.833 2.757-15.417zm-2.757 19.25c.725 0 1.313-.572 1.313-1.278 0-.705-.588-1.277-1.313-1.277s-1.313.572-1.313 1.277c0 .706.588 1.278 1.313 1.278z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
}
export function HomeIcon() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      fill="none"
      viewBox="0 0 24 25"
    >
      <Path
        fill="#1D1843"
        d="M5.676 11.222c-.699 0-1.265.572-1.265 1.278v10.222c0 .706.566 1.278 1.265 1.278H9.47v-5.111c0-.706.567-1.278 1.265-1.278h2.53c.699 0 1.265.572 1.265 1.278V24h3.795c.698 0 1.264-.572 1.264-1.278V12.5c0-.706-.566-1.278-1.264-1.278H5.675z"
      ></Path>
      <Path
        fill="#1D1843"
        d="M22.751 12.5C24.65 12.5 15.162 1 12 1v11.5h10.751zM1.249 12.5C-.65 12.5 8.838 1 12 1v11.5H1.249z"
      ></Path>
      <Path
        stroke="#1D1843"
        strokeWidth="0.2"
        d="M12 1c3.162 0 12.649 11.5 10.751 11.5H12M12 1v11.5M12 1C8.838 1-.649 12.5 1.249 12.5H12m-6.324-1.278c-.699 0-1.265.572-1.265 1.278v10.222c0 .706.566 1.278 1.265 1.278H9.47v-5.111c0-.706.567-1.278 1.265-1.278h2.53c.699 0 1.265.572 1.265 1.278V24h3.795c.698 0 1.264-.572 1.264-1.278V12.5c0-.706-.566-1.278-1.264-1.278H5.675z"
      ></Path>
    </Svg>
  );
}

export function Lavar({ width, height }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width} //46
      height={height} //44
      fill="none"
      viewBox="0 0 46 44"
    >
      <Path
        fill="#1D1843"
        fillRule="evenodd"
        d="M18.927 37.853c10.452 0 18.926-8.474 18.926-18.927C37.853 8.475 29.379 0 18.926 0 8.475 0 0 8.474 0 18.927c0 10.452 8.474 18.926 18.927 18.926zM31.944 21.51a.244.244 0 00.289-.195 13.518 13.518 0 10-7.603 9.868.244.244 0 00.115-.329.251.251 0 00-.332-.116 13.024 13.024 0 117.334-9.52.251.251 0 00.197.292zm-1.205-8.649a13.279 13.279 0 011.257 8.412h-.001l-.001.001h-.003c-.003 0-.009-.004-.007-.013a13.264 13.264 0 10-7.47 9.695c.009-.003.014.001.015.004l.001.002v.003a13.28 13.28 0 116.209-18.104zm3.4 9.07l.093.931.768.535-.93.094-.535.767-.094-.93-.767-.534.93-.095.535-.767zM30.7 26.913l-.094-.93-.534.767-.93.094.767.535.094.93.535-.768.93-.094-.768-.534z"
        clipRule="evenodd"
      ></Path>
      <Path
        fill="#F6F6F6"
        fillRule="evenodd"
        d="M31.093 37.853c.528 0 1.032-.1 1.494-.284a4.057 4.057 0 005.408 2.704 4.057 4.057 0 007.97-1.068 4.056 4.056 0 00-5.55-3.772 4.057 4.057 0 00-5.408-2.704 4.057 4.057 0 00-7.827 0 4.057 4.057 0 00-5.407 2.704 4.056 4.056 0 102.42 4.84 4.057 4.057 0 005.408-2.704c.46.183.965.284 1.492.284z"
        clipRule="evenodd"
      ></Path>
      <Path
        fill="#5EBB93"
        d="M18.926 37.853H43.751999999999995V43.261H18.926z"
      ></Path>
    </Svg>
  );
}
export function Lixo({ width, height }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width} //38
      height={height} //44
      fill="none"
      viewBox="0 0 38 44"
    >
      <Path
        fill="#1D1843"
        fillRule="evenodd"
        d="M9.5 2.403V7.21H1.187C.532 7.21 0 7.748 0 8.412c0 .663.532 1.201 1.188 1.201h3.726c0 .053.001.107.005.16l2.058 31.244c.083 1.262 1.12 2.243 2.37 2.243h19.306c1.25 0 2.287-.98 2.37-2.243L33.08 9.773c.004-.053.005-.107.005-.16h.032l-.07-.705-.76-.535.92-.094.528-.767.093.93.759.534-.92.095-.373.542h3.517c.656 0 1.188-.538 1.188-1.201 0-.664-.532-1.202-1.188-1.202H28.5V2.403C28.5 1.076 27.437 0 26.125 0h-14.25C10.563 0 9.5 1.076 9.5 2.403zm16.625 0h-14.25V7.21h14.25V2.403zM20.187 21.63c0-.663-.531-1.201-1.187-1.201s-1.188.538-1.188 1.201v7.21c0 .664.532 1.202 1.188 1.202.656 0 1.188-.538 1.188-1.202v-7.21zm10.151-9.138l-.092-.93-.528.767-.92.094.759.534.093.93.527-.767.92-.094-.759-.534z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
}
export function Faxinar({ width, height }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width} //27
      height={height} //44
      fill="none"
      viewBox="0 0 27 44"
    >
      <Path
        fill="#1D1843"
        fillRule="evenodd"
        d="M20.986.378c1.862-.908 4.842-.105 5.959 1.612.049.075.064.245.05.5l-.879.09.765.538.018.18c-.717 4.538-5.084 19.31-7.028 25.776l4.73 1.28c1.383.374 2.137 1.882 1.65 3.24l-.264.744c-1.132 3.181-2.028 5.7-4.388 8.79-.564.737-1.523 1.03-2.415.79l-4.434-1.2c2.314-1.965 3.595-4.189 3.793-6.522.01-.128-.092-.231-.229-.23-.136.001-.256.106-.267.235-.191 2.254-1.46 4.43-3.836 6.371l-8.72-2.359c2.313-1.964 3.594-4.189 3.792-6.521.01-.129-.092-.232-.228-.23-.137 0-.257.106-.268.234-.191 2.254-1.46 4.43-3.836 6.371l-3.185-.861c-1.723-.467-2.341-2.59-1.15-3.931 2.228-2.505 3.917-4.6 5.08-7.536.49-1.24 1.786-2.016 3.065-1.67l4.934 1.335C15.445 19.79 19.88.918 20.986.378zm3.162 6.348l-.094-.937-.532.773-.928.094.765.538.094.937.533-.773.928-.094-.766-.538z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
}
export function Limpar({ width, height }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width} //35
      height={height} //44
      fill="none"
      viewBox="0 0 35 44"
    >
      <Path
        fill="#1D1843"
        fillRule="evenodd"
        d="M.965 1.202C.965.538 1.503 0 2.167 0h4.806c.664 0 1.202.538 1.202 1.202v2.403c0 .664-.538 1.202-1.202 1.202H2.167A1.202 1.202 0 01.965 3.605V1.202zm0 7.21v32.445a2.403 2.403 0 002.403 2.404h14.42a2.403 2.403 0 002.404-2.404V22.662l-.706.072-.535.767-.094-.93-.767-.535.93-.094.535-.767.094.93.543.378v-1.74c0-1.444-1.277-2.596-2.71-2.776-3.218-.406-8.266-2.228-9.167-9.56C8.153 7.09 7.099 6.009 5.77 6.009H3.367A2.402 2.402 0 00.965 8.412zM16.106 21.63a.721.721 0 10-1.442 0v16.824a.721.721 0 101.442 0V21.63zM26.2 0C25.537 0 25 .538 25 1.202v2.403c0 .664.538 1.202 1.201 1.202h4.807c.663 0 1.201-.538 1.201-1.202V1.202C32.209.538 31.672 0 31.008 0H26.2zm2.404 7.21a6.008 6.008 0 00-6.009 6.009v27.638A2.403 2.403 0 0025 43.261h7.21a2.403 2.403 0 002.403-2.404V13.218a6.008 6.008 0 00-6.009-6.008zm3.605 34.368a.721.721 0 100-1.442h-7.21a.721.721 0 100 1.442h7.21zM24.36 17.125l.094.93.768.535-.93.094-.535.768-.094-.93-.768-.535.931-.094.534-.768z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
}
export function FaxinaGeral({ width, height }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width} //41
      height={height} //44
      fill="none"
      viewBox="0 0 41 44"
    >
      <Path
        fill="#1D1843"
        fillRule="evenodd"
        d="M26.322 32.41a.69.69 0 01-.253.048.722.722 0 01-.71-.734c0-2.92.948-5.177 2.43-6.706a7.486 7.486 0 015.39-2.277c1.953 0 3.916.756 5.39 2.277C40.053 26.547 41 28.804 41 31.724a.722.722 0 01-.711.734.691.691 0 01-.253-.048l-.75 9.295c-.103 1.267-1.13 2.242-2.363 2.242h-7.488c-1.233 0-2.26-.975-2.362-2.242l-.75-9.295zm.583-2.345c.273-1.74.976-3.068 1.889-4.01a6.085 6.085 0 014.385-1.847c1.602 0 3.194.619 4.385 1.847.914.942 1.616 2.27 1.89 4.01a2.329 2.329 0 00-1.74-.785h-9.069c-.691 0-1.309.304-1.74.785zM10.87 1.034C12.338-.272 15.154-.342 16.723.83l-.174.258-.918.096.757.544.093.946.527-.78.199-.021c.55 3.949.1 20.395-.126 27.461h4.844c1.415 0 2.517 1.273 2.397 2.727l-.065.795c-.274 3.404-.491 6.098-1.963 9.737A2.262 2.262 0 0120.187 44h-4.54c1.713-2.528 2.372-5.037 1.97-7.365-.022-.129-.146-.202-.276-.165a.274.274 0 00-.196.3c.389 2.25-.272 4.709-2.049 7.23H6.168c1.713-2.528 2.372-5.037 1.97-7.365-.023-.129-.147-.202-.277-.165a.274.274 0 00-.196.3c.389 2.25-.272 4.709-2.049 7.23h-3.26C.59 44-.538 42.09.26 40.467c1.493-3.033 2.575-5.522 2.94-8.695.155-1.34 1.196-2.439 2.505-2.439h5.052c-.26-7.891-.807-27.48.113-28.299zm2.814 4.338l-.092-.946-.527.78-.918.096.757.543.093.947.527-.78.917-.097-.757-.543z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
}

export function Outros({ width, height }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width} //38
      height={height} //41
      fill="none"
      viewBox="0 0 38 41"
    >
      <Path
        fill="#1D1843"
        fillRule="evenodd"
        d="M2.375 0C1.063 0 0 1.02 0 2.278v36.444C0 39.98 1.063 41 2.375 41h33.25C36.937 41 38 39.98 38 38.722V2.278C38 1.02 36.937 0 35.625 0H2.375zm4.75 22.778c1.312 0 2.375-1.02 2.375-2.278s-1.063-2.278-2.375-2.278S4.75 19.242 4.75 20.5s1.063 2.278 2.375 2.278zm14.25-2.278c0 1.258-1.063 2.278-2.375 2.278s-2.375-1.02-2.375-2.278 1.063-2.278 2.375-2.278 2.375 1.02 2.375 2.278zm9.5 2.278c1.312 0 2.375-1.02 2.375-2.278s-1.063-2.278-2.375-2.278S28.5 19.242 28.5 20.5s1.063 2.278 2.375 2.278z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
}
export function Agua({ width, height }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width} //33
      height={height} //41
      fill="none"
      viewBox="0 0 33 41"
    >
      <Path
        fill="#1D1843"
        fillRule="evenodd"
        d="M16.5 41C26.813 41 33 31.465 33 23.917 33 16.369 20.625 0 16.5 0S0 16.369 0 23.917C0 31.465 5.156 41 16.5 41zM3.695 27.171c-.081-.366-.416-.591-.748-.502-.332.09-.535.46-.454.826.566 2.566 1.698 4.984 4.35 7.215.273.229.66.171.868-.13a.732.732 0 00-.117-.957c-2.402-2.021-3.392-4.155-3.9-6.452z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
}
export function Internet({ width, height }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width} //43
      height={height} //41
      fill="none"
      viewBox="0 0 43 41"
    >
      <Path
        fill="#1D1843"
        d="M5.972 0c-.66 0-1.194.51-1.194 1.139v27.333c0 .63.535 1.14 1.194 1.14.66 0 1.195-.51 1.195-1.14V1.14C7.167.509 6.632 0 5.972 0zM37.028 0c-.66 0-1.195.51-1.195 1.139v27.333c0 .63.535 1.14 1.195 1.14s1.194-.51 1.194-1.14V1.14c0-.63-.535-1.139-1.194-1.139z"
      ></Path>
      <Path
        fill="#1D1843"
        fillRule="evenodd"
        d="M2.389 27.333c-1.32 0-2.389 1.02-2.389 2.278v9.111C0 39.98 1.07 41 2.389 41H40.61C41.931 41 43 39.98 43 38.722v-9.11c0-1.259-1.07-2.279-2.389-2.279H2.39zm.676 8.886c-.13-.356-.539-.544-.913-.42a.676.676 0 00-.44.87c.385 1.051 1.13 1.756 2.11 2.181.95.413 2.105.556 3.345.556.395 0 .716-.306.716-.684 0-.377-.32-.683-.716-.683-1.15 0-2.069-.136-2.752-.433-.654-.284-1.104-.718-1.35-1.387z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
}
export function Energia({ width, height }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width} //28
      height={height} //41
      fill="none"
      viewBox="0 0 28 41"
    >
      <Path
        fill="#1D1843"
        fillRule="evenodd"
        d="M28 13.667c0 4.985-2.735 9.347-6.82 11.734l-1.701 7.476c-.475 2.084-2.369 3.567-4.556 3.567h-1.846c-2.188 0-4.081-1.483-4.556-3.567L6.82 25.401C2.735 23.014 0 18.652 0 13.667 0 6.119 6.268 0 14 0s14 6.119 14 13.667zM9.664 5.155a.675.675 0 00.278-.928.709.709 0 00-.95-.27c-2.45 1.31-4.578 3.202-6.057 6.72a.678.678 0 00.382.892.706.706 0 00.914-.373c1.343-3.197 3.232-4.864 5.433-6.041z"
        clipRule="evenodd"
      ></Path>
      <Path
        fill="#1D1843"
        d="M9.333 39.861c0-.629.523-1.139 1.167-1.139h7c.644 0 1.167.51 1.167 1.14 0 .628-.523 1.138-1.167 1.138h-7c-.644 0-1.167-.51-1.167-1.139z"
      ></Path>
    </Svg>
  );
}
export function Aluguel({ width, height }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width} //43
      height={height} //43
      fill="none"
      viewBox="0 0 43 43"
    >
      <Path
        fill="#1D1843"
        d="M9.714 19.222c-1.302 0-2.357 1.02-2.357 2.278v18.222C7.357 40.98 8.412 42 9.714 42h7.072v-9.111c0-1.258 1.055-2.278 2.357-2.278h4.715c1.301 0 2.357 1.02 2.357 2.278V42h7.071c1.302 0 2.358-1.02 2.358-2.278V21.5c0-1.258-1.056-2.278-2.358-2.278H9.714z"
      ></Path>
      <Path
        fill="#1D1843"
        d="M41.537 21.5C45.073 21.5 27.393 1 21.5 1v20.5h20.037z"
      ></Path>
      <Path
        fill="#1D1843"
        fillRule="evenodd"
        d="M21.5 1C15.607 1-2.073 21.5 1.463 21.5H21.5V1zm-3.666 7.433a.672.672 0 00.28-.928.72.72 0 00-.959-.271c-2.475 1.31-4.625 3.202-6.118 6.721a.676.676 0 00.386.892.716.716 0 00.922-.373c1.358-3.198 3.266-4.864 5.49-6.041z"
        clipRule="evenodd"
      ></Path>
      <Path
        stroke="#1D1843"
        strokeWidth="0.2"
        d="M21.5 1c5.893 0 23.573 20.5 20.037 20.5H21.5m0-20.5v20.5m0-20.5C15.607 1-2.073 21.5 1.463 21.5H21.5m-14.143 0c0-1.258 1.055-2.278 2.357-2.278h23.572c1.302 0 2.358 1.02 2.358 2.278v18.222c0 1.258-1.056 2.278-2.358 2.278h-7.071v-9.111c0-1.258-1.056-2.278-2.357-2.278h-4.715c-1.302 0-2.357 1.02-2.357 2.278V42H9.714c-1.302 0-2.357-1.02-2.357-2.278V21.5zM18.115 7.505a.672.672 0 01-.28.928c-2.224 1.177-4.132 2.843-5.49 6.04a.716.716 0 01-.922.374.676.676 0 01-.386-.892c1.493-3.519 3.643-5.411 6.118-6.721a.72.72 0 01.96.271z"
      ></Path>
    </Svg>
  );
}