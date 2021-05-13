pragma solidity 0.5.16;

contract SimpleTest {
    
    
    struct User{
        uint256 coins;
        
    }
    
     mapping(address => User) public  users;
    
    
    
    function exchange(uint256  token )public{
        User storage currentUser = users[msg.sender];
        currentUser.coins += token;
        users[msg.sender] = currentUser;
    }
    
    function getCoins()public view returns (uint256 coins){
        User storage currentUser = users[msg.sender];
        coins = currentUser.coins;
      
    }
     function getSender()public view returns (address adr){
        adr = msg.sender;
      
    }
    
    
}