pragma solidity ^0.4.17;

contract Factory {
    address[] campaigns;
    
    function addCampaign(uint minimumContribution) public {
        address newCampaign = new Campaign(minimumContribution, msg.sender);
        campaigns.push(newCampaign);
    }
    
    function getCampaigns() public view returns(address[]) {
        return campaigns;
    }
    
}

contract Campaign {
    
    struct Request {
        string description;
        address receipient;
        uint value;
        bool compleate;
        uint approvalsCount;
        mapping(address => bool) approvals;
    }
    
    modifier restricted () {
        require(msg.sender == manager);
        _;
    }
    
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public contributors;
    Request[] public requests;
    uint public contributorsCount;

    constructor (uint value, address creator) public {
        minimumContribution = value;
        manager = creator;
    }
    
    function contribute() public payable {
        require(minimumContribution < msg.value);
        contributors[msg.sender] = true;
        contributorsCount++;
    }
    
    function createRequest(string description, uint value, address receipient) public restricted {
        Request memory newRequest = Request({
            description: description,
            value: value,
            receipient: receipient,
            compleate: false,
            approvalsCount: 0
        });
        requests.push(newRequest);
    }
    
    function approveRequest(uint index) public {
        Request storage request = requests[index];
        
        require(contributors[msg.sender]);
        require(!request.approvals[msg.sender]);
        
        request.approvals[msg.sender] = true;
        request.approvalsCount ++;
    }
    
    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];
        
        require(request.approvalsCount > (request.approvalsCount/2));
        require(!request.compleate);
        
        request.receipient.transfer(request.value);
        request.compleate = true;
    }

    function getSummary() public view returns (uint, uint, uint, uint, address) {
        return (
            this.balance,
            minimumContribution,
            requests.length,
            contributorsCount,
            manager
        );
    }  

    function isContributor() public view returns (bool) {
        return contributors[msg.sender];
    }
}