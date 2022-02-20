import React, { useState, Component } from "react";

const Topicslist: React.FunctionComponent = () => {
  const [selectedOption, setSelectedOption] = useState<String>();

  // This function is triggered when the select changes
  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.target;
    setSelectedOption();
  };
  const styles: { [name: string]: React.CSSProperties } = {
    container: {
      marginTop: 50,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    select: {
      padding: 5,
      width: 200,
    },
    result: {
      marginTop: 30,
    },
  };

  return (
      <div className= 'Topicslist'>
        <h1>Select a Topic</h1>
      <div className='Topicslisted'>
      <select onClick={handleSubmit} style={styles.select}>
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