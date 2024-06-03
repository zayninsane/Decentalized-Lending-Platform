import React,{useContext, createContext } from 'react';

import { ConnectWallet, useAddress, useContract, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers' ;


const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract('0xf9567D16Dd39895d70345DC3dfDEd5b1e647a51c');
    const { mutateAsync: createRequest } = useContractWrite(contract, 'createRequest');

    const address = useAddress();


    const publishRequest = async (form) => {
        try {
            const data = await createRequest({
            args: [
                address,
                form.title,
                form.description,
                form.amount,
                form.interest,
                new Date(form.deadline).getTime(),
                form.image,
                ],
        })
            console.log("published", data);
        } catch (error) {
            console.log("failed to publish", error)
        }
        
    }

    const getRequests = async () => {
        const requests = await contract.call('getRequests');

        const parsedRequests = requests.map((request, id) => ({
            borrower: request.borrower,
            name: request.name,
            title: request.title,
            description: request.description,
            amount: ethers.utils.formatEther(request.amount.toString()),
            interest: request.interest,
            deadline: request.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(request.amountCollected.toString()),
            image: request.image,
            pId: id
            
        }));

        return parsedRequests;
    }


    const getUserRequests = async () => {
        const allRequests = await getRequests();

        const filteredRequests = allRequests.filter((request) =>
            request.borrower === address
        );

        return filteredRequests;
    }

    const lend = async (pId, fund) => {
        const data = await contract.call('lendToRequest', [pId], { value: ethers.utils.parseEther(fund)});
    
        return data;
      }
    
      const getLendings = async (pId) => {
        const lendings = await contract.call('getLenders', [pId]);
        const numberOfLendings = lendings[0].length;
    
        const parsedLendings = [];
    
        for(let i = 0; i < numberOfLendings; i++) {
          parsedLendings.push({
            lender: lendings[0][i],
            lends: ethers.utils.formatEther(lendings[1][i].toString())
          })
        }
    
        return parsedLendings;
      }
    


    return(
        <StateContext.Provider
        value={{
            address,
            contract,
            createRequest: publishRequest,
            getRequests,
            getUserRequests,
            lend,
            getLendings
            
        }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);