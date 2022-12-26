import { useContext } from "react";
import { useMutation, useQuery } from "react-query";
import { EthereumContext, ToasterContext } from "../contexts";
import { createNewCampaign, fetchCampaigns } from "../helpers/functions";

const CAMPAIGNS = "campaigns";

const useFetchCampaigns = () => {
  const { showToast } = useContext(ToasterContext);
  const { account } = useContext(EthereumContext);
  return useQuery(
    [CAMPAIGNS],
    async () => {
      const data = await fetchCampaigns();
      return data;
    },
    {
      enabled: !!account,
      retry: 2,
      retryDelay: 3,
      staleTime: 5 * 60 * 1000,
      onSettled: (data, error) => {
        if (error) {
          showToast({ type: "error", message: error });
        }
        return data;
      },
    }
  );
};

const useCampaignMutation = (callback) => {
  const { showToast } = useContext(ToasterContext);
  const createCampaign = useMutation(
    async (props) => {
      const data = await createNewCampaign(props);
      return data;
    },
    {
      onSettled: (response, error) => {
        if (error) {
          return showToast({ type: "error", message: error });
        }
        callback && callback();
        showToast({
          type: "success",
          message: "Successfully created campaign",
        });
        return response;
      },
    }
  );

  return { createCampaign };
};

export { useFetchCampaigns, useCampaignMutation };
