type Props = {
  height?: number;
  width?: number;
};

export function ZitadelLogo({ height = 40, width = 147.5 }: Props) {
  return (
    <div className="flex">
      <img height={height} width={width} src="/zitadel-logo-dark.svg" alt="Triniprint logo" />
    </div>
  );
}
