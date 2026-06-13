type Props = {
  darkSrc?: string;
  lightSrc?: string;
  height?: number;
  width?: number;
};

export function Logo({ lightSrc, darkSrc, height = 40, width = 147.5 }: Props) {
  const src = lightSrc || darkSrc;

  if (!src) {
    return null;
  }

  return (
    <div className="flex">
      <img height={height} width={width} src={src} alt="logo" />
    </div>
  );
}
