import { useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ToasterContext } from "../contexts";
import {
  contributeAmount,
  createNewCampaign,
  fetchCampaigns,
  fetchCampaignSummary,
} from "../helpers/functions";

const CAMPAIGNS = "campaigns";

const useFetchCampaigns = () => {
  const { showToast } = useContext(ToasterContext);
  return useQuery([CAMPAIGNS], async () => await fetchCampaigns(), {
    retry: 2,
    retryDelay: 3,
    staleTime: 5 * 60 * 1000,
    onSettled: (data, error) => {
      if (error) {
        showToast({ type: "error", message: error });
      }
      return data;
    },
  });
};

const useFetchCampaignSummary = (address) => {
  const { showToast } = useContext(ToasterContext);
  return useQuery(
    [`${CAMPAIGNS}:${address}`],
    async () => await fetchCampaignSummary(address),
    {
      enabled: !!address,
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

const useCampaignMutation = () => {
  const { showToast } = useContext(ToasterContext);
  const queryClient = useQueryClient();

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
        showToast({
          type: "success",
          message: "Successfully created campaign",
        });
        return response;
      },
    }
  );

  const makeContribution = useMutation(
    async ({ address, amount, onClose }) => {
      const callbackFn = async () => {
        await queryClient.invalidateQueries(`${CAMPAIGNS}:${address}`);
        onClose();
      };
      const data = await contributeAmount(address, amount, callbackFn);
      return data;
    },
    {
      onSettled: async (response, error) => {
        if (error) {
          return showToast({ type: "error", message: error });
        }
        showToast({
          type: "success",
          message: "Successfully made contribution",
        });
        return response;
      },
    }
  );

  return { createCampaign, makeContribution };
};

export { useFetchCampaigns, useFetchCampaignSummary, useCampaignMutation };
