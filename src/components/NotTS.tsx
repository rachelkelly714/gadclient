import React, { useState, Component } from "react";

const NotTS: React.FunctionComponent = () => {
  const [selectedOption, setSelectedOption] = useState<String>();

  // This function is triggered when the select changes
  const selectChange = (event: React.ChangeEvent<HTMLButtonElement>) => {
    const value = event.target.value;
    setSelectedOption(value);
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
    <div style={styles.container}>
      <select onClick={selectChange} style={styles.select}>
        <option selected disabled>
          Choose one
        </option>
        <option value="blue">Blue</option>
        <option value="red">Red</option>
        <option value="green">Green</option>
        <option value="yellow">Yellow</option>
        <option value="kindacode.com">Kindacode.com</option>
      </select>
      {selectedOption && <h2 style={styles.result}>{selectedOption}</h2>}
    </div>
  );
};

export default NotTS;


