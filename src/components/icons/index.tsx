export interface IconProps {
  fillOpacity: string;
}

export function MyLocationIcon({ fillOpacity }: IconProps) {
  return (
    <svg viewBox="0 0 49 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M26.9853 62.5619C33.4032 54.5161 48.0406 35.0156 48.0406 24.0623C48.0406 10.7779 37.2815 0 24.0203 0C10.7591 0 0 10.7779 0 24.0623C0 35.0156 14.6374 54.5161 21.0553 62.5619C22.5941 64.4794 25.4465 64.4794 26.9853 62.5619V62.5619ZM24.0203 32.083C19.604 32.083 16.0135 28.4862 16.0135 24.0623C16.0135 19.6383 19.604 16.0415 24.0203 16.0415C28.4365 16.0415 32.027 19.6383 32.027 24.0623C32.027 28.4862 28.4365 32.083 24.0203 32.083Z"
        fill="white"
        fillOpacity={fillOpacity}
      />
    </svg>
  );
}

export function LocationsIcon({ fillOpacity }: IconProps) {
  return (
    <svg viewBox="0 0 74 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M51.8467 15.2249C51.8467 22.1522 42.5575 34.497 38.4784 39.5846C37.4999 40.8026 35.6828 40.8026 34.717 39.5846C30.6379 34.497 21.3487 22.1522 21.3487 15.2249C21.3487 6.81312 28.1726 0 36.5977 0C45.0228 0 51.8467 6.81312 51.8467 15.2249ZM52.8633 25.4255C53.3081 24.5501 53.7148 23.6747 54.0833 22.8119C54.1468 22.6597 54.2103 22.4947 54.2739 22.3425L69.0146 16.4555C71.0224 15.6562 73.1954 17.128 73.1954 19.2848V53.6422C73.1954 54.8856 72.433 56.0021 71.2766 56.4715L52.8633 63.8175V25.4255ZM17.4856 17.5466C17.7906 19.3356 18.4005 21.1372 19.1121 22.8119C19.4807 23.6747 19.8873 24.5501 20.3321 25.4255V57.3216L4.18078 63.7795C2.17299 64.5788 0 63.107 0 60.9502V26.5927C0 25.3494 0.762452 24.2329 1.91884 23.7635L17.4983 17.5466H17.4856ZM41.6553 42.1221C43.4216 39.9145 46.1919 36.324 48.7969 32.3528V63.9825L24.3985 57.0171V32.3528C27.0035 36.324 29.7738 39.9145 31.5401 42.1221C34.1451 45.3701 39.0503 45.3701 41.6553 42.1221ZM36.5977 19.2848C39.4061 19.2848 41.6807 17.0138 41.6807 14.2099C41.6807 11.406 39.4061 9.13491 36.5977 9.13491C33.7893 9.13491 31.5147 11.406 31.5147 14.2099C31.5147 17.0138 33.7893 19.2848 36.5977 19.2848Z"
        fill="white"
        fillOpacity={fillOpacity}
      />
    </svg>
  );
}

export function FavoritesIcon({ fillOpacity }: IconProps) {
  return (
    <svg viewBox="0 0 72 59" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.95 32.2811L28.5375 53.3686C29.475 54.2436 30.7125 54.7311 32 54.7311C33.2875 54.7311 34.525 54.2436 35.4625 53.3686L35.7875 53.0686C33.4 49.5561 32 45.3061 32 40.7311C32 28.5811 41.85 18.7311 54 18.7311C57.5375 18.7311 60.875 19.5686 63.8375 21.0436C63.95 20.2311 64 19.4186 64 18.5936V17.8686C64 9.13114 57.6875 1.68114 49.075 0.243638C43.375 -0.706362 37.575 1.15614 33.5 5.23114L32 6.73114L30.5 5.23114C26.425 1.15614 20.625 -0.706362 14.925 0.243638C6.3125 1.68114 0 9.13114 0 17.8686V18.5936C0 23.7811 2.15 28.7436 5.95 32.2811ZM72 40.7311C72 30.7936 63.9375 22.7311 54 22.7311C44.0625 22.7311 36 30.7936 36 40.7311C36 50.6686 44.0625 58.7311 54 58.7311C63.9375 58.7311 72 50.6686 72 40.7311ZM62.4125 35.3186C63.1875 36.0936 63.1875 37.3686 62.4125 38.1436L53.4125 47.1436C52.6375 47.9186 51.3625 47.9186 50.5875 47.1436L45.5875 42.1436C44.8125 41.3686 44.8125 40.0936 45.5875 39.3186C46.3625 38.5436 47.6375 38.5436 48.4125 39.3186L52 42.9061L59.5875 35.3186C60.3625 34.5436 61.6375 34.5436 62.4125 35.3186Z"
        fill="white"
        fillOpacity={fillOpacity}
      />
    </svg>
  );
}

export function DropDownUiOnIcon() {
  return (
    <svg
      width="28"
      height="16"
      viewBox="0 0 28 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 2L14 14L26 2"
        stroke="black"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function DropDownUiOffIcon() {
  return (
    <svg
      width="28"
      height="16"
      viewBox="0 0 28 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26 14L14 2L2 14"
        stroke="black"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GootUiIcon() {
  return (
    <svg viewBox="0 0 272 272" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_ii_11_323)">
        <circle cx="136" cy="136" r="136" fill="#F0FAFF" />
      </g>
      <circle
        cx="137"
        cy="54"
        r="2"
        transform="rotate(90 137 54)"
        fill="#A8A8A8"
      />
      <circle
        cx="137"
        cy="162"
        r="2"
        transform="rotate(90 137 162)"
        fill="#A8A8A8"
      />
      <circle
        cx="137"
        cy="81"
        r="2"
        transform="rotate(90 137 81)"
        fill="#A8A8A8"
      />
      <circle
        cx="110"
        cy="81"
        r="2"
        transform="rotate(90 110 81)"
        fill="#A8A8A8"
      />
      <circle
        cx="137"
        cy="189"
        r="2"
        transform="rotate(90 137 189)"
        fill="#A8A8A8"
      />
      <circle
        cx="137"
        cy="108"
        r="2"
        transform="rotate(90 137 108)"
        fill="#A8A8A8"
      />
      <circle
        cx="110"
        cy="108"
        r="2"
        transform="rotate(90 110 108)"
        fill="#A8A8A8"
      />
      <circle
        cx="137"
        cy="216"
        r="2"
        transform="rotate(90 137 216)"
        fill="#A8A8A8"
      />
      <circle
        cx="137"
        cy="137"
        r="2"
        transform="rotate(-180 137 137)"
        fill="#A8A8A8"
      />
      <circle
        cx="218"
        cy="137"
        r="2"
        transform="rotate(-180 218 137)"
        fill="#A8A8A8"
      />
      <circle
        cx="110"
        cy="137"
        r="2"
        transform="rotate(-180 110 137)"
        fill="#A8A8A8"
      />
      <circle
        cx="110"
        cy="164"
        r="2"
        transform="rotate(-180 110 164)"
        fill="#A8A8A8"
      />
      <circle
        cx="110"
        cy="191"
        r="2"
        transform="rotate(-180 110 191)"
        fill="#A8A8A8"
      />
      <circle
        cx="191"
        cy="137"
        r="2"
        transform="rotate(-180 191 137)"
        fill="#A8A8A8"
      />
      <circle
        cx="191"
        cy="164"
        r="2"
        transform="rotate(-180 191 164)"
        fill="#A8A8A8"
      />
      <circle
        cx="191"
        cy="110"
        r="2"
        transform="rotate(-180 191 110)"
        fill="#A8A8A8"
      />
      <circle
        cx="83"
        cy="137"
        r="2"
        transform="rotate(-180 83 137)"
        fill="#A8A8A8"
      />
      <circle
        cx="83"
        cy="164"
        r="2"
        transform="rotate(-180 83 164)"
        fill="#A8A8A8"
      />
      <circle
        cx="83"
        cy="110"
        r="2"
        transform="rotate(-180 83 110)"
        fill="#A8A8A8"
      />
      <circle
        cx="164"
        cy="137"
        r="2"
        transform="rotate(-180 164 137)"
        fill="#A8A8A8"
      />
      <circle
        cx="164"
        cy="164"
        r="2"
        transform="rotate(-180 164 164)"
        fill="#A8A8A8"
      />
      <circle
        cx="164"
        cy="191"
        r="2"
        transform="rotate(-180 164 191)"
        fill="#A8A8A8"
      />
      <circle
        cx="164"
        cy="110"
        r="2"
        transform="rotate(-180 164 110)"
        fill="#A8A8A8"
      />
      <circle
        cx="164"
        cy="83"
        r="2"
        transform="rotate(-180 164 83)"
        fill="#A8A8A8"
      />
      <circle
        cx="56"
        cy="137"
        r="2"
        transform="rotate(-180 56 137)"
        fill="#A8A8A8"
      />
      <defs>
        <filter
          id="filter0_ii_11_323"
          x="-12"
          y="-12"
          width="296"
          height="296"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="12" dy="12" />
          <feGaussianBlur stdDeviation="9" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0509804 0 0 0 0 0.152941 0 0 0 0 0.313726 0 0 0 0.16 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_11_323"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-12" dy="-12" />
          <feGaussianBlur stdDeviation="8" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.14 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_innerShadow_11_323"
            result="effect2_innerShadow_11_323"
          />
        </filter>
      </defs>
    </svg>
  );
}

export function OnCheckIcon() {
  return (
    <svg viewBox="0 0 76 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.50852 37.748L33.9244 62.4068C35.0208 63.4299 36.4681 64 37.9738 64C39.4795 64 40.9267 63.4299 42.0231 62.4068L68.439 37.748C72.8831 33.6114 75.3975 27.8085 75.3975 21.7425V20.8947C75.3975 10.6775 68.0151 1.96584 57.9428 0.284899C51.2767 -0.825986 44.4937 1.35193 39.728 6.11704L37.9738 7.87107L36.2195 6.11704C31.4539 1.35193 24.6708 -0.825986 18.0047 0.284899C7.93246 1.96584 0.550049 10.6775 0.550049 20.8947V21.7425C0.550049 27.8085 3.06446 33.6114 7.50852 37.748Z"
        fill="#9CB5F7"
      />
    </svg>
  );
}

export function OffCheckIcon() {
  return (
    <svg viewBox="0 0 75 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M35.6654 6.11687L37.2878 7.8709L39.0419 6.11979C43.9386 1.34736 50.7208 -0.824722 57.3862 0.284705C67.4572 1.96273 74.8388 10.6774 74.8388 20.8946V21.7424C74.8388 27.8084 72.3247 33.6114 67.8811 37.748L41.4683 62.4068C40.372 63.4299 38.9249 64 37.4194 64C35.9139 64 34.4668 63.4299 33.3705 62.4068L6.95621 37.748C2.5185 33.6114 0 27.8084 0 21.7424V20.8946C0 10.6774 7.38449 1.96273 17.4526 0.284705C23.9864 -0.824722 30.9002 1.34736 35.6654 6.11687C35.6654 6.11687 35.5338 6.11687 35.6654 6.11687ZM37.2878 17.7958L30.7102 10.9551C27.5383 7.91183 23.0363 6.46768 18.6074 7.20437C11.9201 8.31964 7.01614 14.1123 7.01614 20.8946V21.7424C7.01614 25.8644 8.72778 29.8109 11.7433 32.6174L37.4194 56.5892L63.1014 32.6174C66.1125 29.8109 67.8227 25.8644 67.8227 21.7424V20.8946C67.8227 14.1123 62.9114 8.31964 56.2314 7.20437C51.8025 6.46768 47.3005 7.91183 44.1286 10.9551L37.2878 17.7958Z"
        fill="#9CB5F7"
      />
    </svg>
  );
}
