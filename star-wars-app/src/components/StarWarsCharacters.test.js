import React from "react";
import { getData as mockData } from "../api"
import { render, fireEvent, wait } from "@testing-library/react";
import "@testing-library/jest-dom";
import  StarWarsCharacters  from "./StarWarsCharacters";


jest.mock("../api");

test(' buttons re-render new page', async () => {
    mockData.mockResolvedValueOnce({results: [{
        name: "Luke Skywalker",
        height: "172",
        mass: "77", 
        id: Date.now()

    }],
        next: "abcd",
        previous: "abcd"
    })
    const { findByText, getByText } = render(<StarWarsCharacters />)

    const nextButton= getByText(/next/i);
    const prevButton = getByText(/previous/i)
    
    
    
    fireEvent.click(nextButton);
    fireEvent.click(prevButton);
    

    expect(mockData).toHaveBeenCalledTimes(1);

  
    await(() => expect(getByText(/Luke/i).toBeInDocument()))



})