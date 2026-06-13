import Link from "next/link";

export function SelfServiceMenu() {
  const list: any[] = [];

  // if (!!config.selfservice.change_password.enabled) {
  //   list.push({
  //     link:
  //       `/me/change-password?` +
  //       new URLSearchParams({
  //         sessionId: sessionId,
  //       }),
  //     name: "Change password",
  //   });
  // }

  return (
    <div className="flex w-full flex-col space-y-2">
      {list.map((menuitem, index) => {
        return <SelfServiceItem link={menuitem.link} key={"self-service-" + index} name={menuitem.name} />;
      })}
    </div>
  );
}

const SelfServiceItem = ({ name, link }: { name: string; link: string }) => {
  return (
    <Link
      prefetch={false}
      href={link}
      className="group flex w-full flex-row items-center rounded-[8px] border border-[#dde6eb] bg-white px-4 py-2.5 text-sm font-medium text-[#1d1d1d] transition-[border-color,box-shadow,background-color] duration-150 hover:border-primary-light-500/30 hover:bg-primary-light-500/5 hover:shadow-[0_18px_42px_-40px_rgba(29,29,29,0.28)]"
    >
      {name}
    </Link>
  );
};
