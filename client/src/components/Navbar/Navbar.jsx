import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { GitHub as GitHubIcon } from "@material-ui/icons";

import WCHeader from "../../stories/WCHeader/WCHeader";
import { EthereumContext } from "../../contexts/";

const MY_GITHUB_REPOSITORY = "https://github.com/PratapTyagi";

const Navbar = () => {
  const { account, addAccount, removeAccount } = useContext(EthereumContext);
  const history = useHistory();

  const toggleAccount = () => {
    if (account.length !== 0) {
      removeAccount();
      return;
    }
    addAccount();
  };

  const links = [
    {
      label: "Github",
      icon: <GitHubIcon />,
      onClick: () => {
        window.open(MY_GITHUB_REPOSITORY, "_blank");
      },
    },
    {
      label: "Create",
      onClick: () => {
        history.push("/campaigns/create");
      },
    },
    {
      label: account ? "Disconnect" : "Connect",
      isAccount: account.length,
      onClick: () => {
        toggleAccount();
      },
    },
  ];

  return <WCHeader title="We Care" links={links} />;
};

export default Navbar;
