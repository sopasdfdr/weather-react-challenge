import React, { useState } from "react";
import styled from "styled-components";

type SearchBarProps = {
  onSearch: (city: string) => void;  // Function received from the parent component
};

// Styled components
const StyledForm = styled.form`
  display: flex;
  justify-content: center; /* Center the input field */
  margin-bottom: 1rem; /* Space below the search bar */
`;

const StyledInput = styled.input`
  padding: 0.4rem 0.2rem; /* Add padding */
  border: none; /* Remove border */
  margin-top: 1rem;
  text-color: black;
  border-radius: 5px; /* Rounded corners */
  font-size: 1rem; /* Font size */
  outline: none; /* Remove outline */
  transition: box-shadow 0.3s ease, background-color 0.3s ease; /* Smooth transition for shadow and background */
  
  /* Semi-transparent background */
  background-color: rgba(255, 255, 255, 0.3); /* White background with 70% opacity */

  &:focus {
    box-shadow: 0 0 10px rgba(0, 102, 204, 0.5); /* Highlight on focus */
    background-color: rgba(255, 255, 255, 1); /* Fully opaque on focus */
  }

  &::placeholder {
    color: rgba(255, 255, 255, .4);
  }
`;

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(inputValue);  // Send the value back to App
    setInputValue(""); // Clear the search field after sending
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledInput
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter the name of the city"
      />
    </StyledForm>
  );
};

export default SearchBar;
