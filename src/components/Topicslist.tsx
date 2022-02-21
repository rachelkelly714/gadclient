import React, { useState, Component } from "react";

const Topicslist: React.FunctionComponent = () => {
  const [selectedOption, setSelectedOption] = useState<String>();

  // This function is triggered when the select changes
  const ButtonClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    
    setSelectedOption('value');
  };
  

  return (
      <div className= 'Topicslist'>
        <h1>Select a Topic</h1>
      <div className='Topicslisted'>
      <select onClick={ButtonClickHandler}>
        <option selected disabled>
          Choose one
        </option>
        <option value="topic1">Ethics</option>
        <option value="topic2">Is this the Matrix?</option>
        <option value="topic3">Free Will</option>
      </select>
    </div>
    </div>
  );
};

export default Topicslist;