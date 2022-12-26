pragma solidity ^0.4.17;

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
    string public image;
    string public title;
    string public campaignDescription;
    uint256 public createdAt;

    function Campaign (uint value, address creator, string _imageHash, string _title, string _description, uint256 _createdAt) public {
        minimumContribution = value;
        manager = creator;
        image = _imageHash;
        title = _title;
        campaignDescription = _description;
        createdAt = _createdAt;
    }

    function getDetails() public view returns(address, string, string, string, uint256) {
        return (
            manager,
            title,
            campaignDescription,
            image,
            createdAt
        );
    }
    
    function contribute() public payable {
        require(minimumContribution < msg.value);
        if(contributors[msg.sender] == true) return;
        contributors[msg.sender] = true;
        contributorsCount++;
    }
    
    function createRequest(string _description, uint _value, address _receipient) public restricted {
        Request memory newRequest = Request({
            description: _description,
            value: _value,
            receipient: _receipient,
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

    function isContributor(string _address) public view returns (bool) {
        address currentUser = toAddress(_address);
        return contributors[currentUser];
    }
    
    function toAddress(string self) pure internal returns (address){
        bytes memory tmp = bytes(self);
        
        uint addr = 0;
        uint b;
        uint b2;
        
        for (uint i=2; i<2+2*20; i+=2){
            
            addr *= 256;
            
            b = uint(tmp[i]);
            b2 = uint(tmp[i+1]);
            
            if ((b >= 97)&&(b <= 102)) b -= 87;
            else if ((b >= 48)&&(b <= 57)) b -= 48;
            else if ((b >= 65)&&(b <= 70)) b -= 55;
            
            if ((b2 >= 97)&&(b2 <= 102)) b2 -= 87;
            else if ((b2 >= 48)&&(b2 <= 57)) b2 -= 48;
            else if ((b2 >= 65)&&(b2 <= 70)) b2 -= 55;
            
            addr += (b*16+b2);
            
        }
        
        return address(addr);
    }
}