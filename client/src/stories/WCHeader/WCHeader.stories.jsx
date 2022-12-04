import WCHeader from "./WCHeader";

export default {
  title: "Components/WCHeader",
  component: WCHeader,
};

export const Default = () => {
  const links = [
    {
      label: "Github",
      onClick: () => {
        console.log("Link clicked");
      },
    },
    {
      label: "Create",
      onClick: () => {
        console.log("Link clicked");
      },
    },
  ];

  const menuOptions = [
    // {
    //   label: "Profile",
    //   onClick: () => {
    //     console.log("Profile Menu clicked");
    //   },
    // },
    // {
    //   label: "My account",
    //   onClick: () => {
    //     console.log("My account clicked");
    //   },
    // },
  ];

  return (
    <WCHeader
      // icon={<img alt="logo" />}
      title="We Care"
      links={links}
      menuOptions={menuOptions}
    />
  );
};
