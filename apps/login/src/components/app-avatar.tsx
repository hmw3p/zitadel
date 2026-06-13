import { ColorShade, getColorHash } from "@/helpers/colors";
import { getInitials } from "./avatar";

interface AvatarProps {
  appName: string;
  imageUrl?: string;
  shadow?: boolean;
}

export function AppAvatar({ appName, imageUrl, shadow }: AvatarProps) {
  const credentials = getInitials(appName, appName);

  const color: ColorShade = getColorHash(appName);

  const avatarStyleLight = {
    backgroundColor: color[200],
    color: color[900],
  };

  return (
    <div
      className={`pointer-events-none flex h-[100px] w-[100px] cursor-default items-center justify-center rounded-full bg-primary-light-500 text-primary-light-contrast-500 transition-colors duration-200 hover:bg-primary-light-400 group-focus:outline-none group-focus:ring-2 group-focus:ring-primary-light-200 ${
        shadow ? "shadow" : ""
      }`}
      style={avatarStyleLight}
    >
      {imageUrl ? (
        <img
          height={48}
          width={48}
          alt="avatar"
          className="h-full w-full rounded-full border border-divider-light"
          src={imageUrl}
        />
      ) : (
        <span className={`text-3xl uppercase`}>{credentials}</span>
      )}
    </div>
  );
}
