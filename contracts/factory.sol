pragma solidity ^0.4.17;

import "./campaigns.sol";

contract Factory {
    address[] campaigns;
    
    function addCampaign(uint minimumContribution, string _imageHash, string _title, string _description) public {
        address newCampaign = new Campaign(minimumContribution, msg.sender, _imageHash, _title, _description, block.timestamp);
        campaigns.push(newCampaign);
    }
    
    function getCampaigns() public view returns(address[]) {
        return campaigns;
    }    
}