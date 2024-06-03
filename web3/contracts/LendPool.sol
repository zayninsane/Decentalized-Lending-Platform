// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract LendPool {
   struct Request {
    address borrower;
    string title;
    string description;
    uint256 amount;
    uint256 interest;
    uint256 deadline;
    uint256 amountCollected;
    string image;
    address[] lenders;
    uint256[] lendings;
   }

// maps the reques IDs to the struct
   mapping(uint256 => Request) public requests;

   uint256 public numberOfRequests = 0;


function createRequest(address _borrower, string memory _title, string memory _description, uint256 _amount, uint256 _interest, uint256 _deadline, string memory _image) public returns (uint256) {
    Request storage request = requests[numberOfRequests];

    //check if everything is timeline is properly set, the require keyword can be used for simialr activities?
    require(request.deadline < block.timestamp, "The deadline needs to be a future date");

    request.borrower = _borrower;
    request.title = _title;
    request.description = _description;
    request.amount = _amount;
    request.interest = _interest;
    request.deadline = _deadline;
    request.amountCollected = 0;
    request.image = _image;

    numberOfRequests++;

    return numberOfRequests - 1;

}

function lendToRequest (uint256 _id) public payable{
    uint256 fund = msg.value;

    Request storage request = requests[_id];

    request.lenders.push(msg.sender);
    request.lendings.push(fund);

    (bool sent,) = payable(request.borrower).call{value: fund}("");

    if(sent) {
        request.amountCollected += fund; // = request.amountCollected + fund;
    }
}

function getLenders(uint256 _id) view public returns (address[] memory, uint256[] memory){
    return (requests[_id].lenders, requests[_id].lendings);
}

function getRequests() public view returns(Request[] memory){
    Request[] memory allRequests = new Request[](numberOfRequests);

    for (uint i = 0; i < numberOfRequests; i++){
        Request storage item = requests[i];

        allRequests[i] = item;
    }

    return allRequests;
}
}