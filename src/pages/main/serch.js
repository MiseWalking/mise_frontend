import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 25rem;
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    padding: 1rem 2rem;
    border: 1px solid black;
  }
`;

const StyleInput = styled.input`
  width: 300px;
  height: 30px;
  border: 1px solid #dddddd;
  border-radius: 30px;
  align-items: center;
  text-indent: 15px;
`;

const DataLists = styled.div`
  ${({ visiable }) => {
    return {
      display: visiable === false && "none",
    };
  }}
  width: 100%;
  font-size: 10px;
  height: 10rem;
  overflow-y: scroll;
  position: "absolute";
  z-index: 0;
  top: 0;
`;

const Search = ({ datas, input, onChange }) => {
  const [visiable, setVisiable] = useState(false);

  return (
    <Container>
      <StyleInput
        placeholder="산책하고자하는 위치를 알려주세요!"
        onClick={() => setVisiable(!visiable)}
        value={input}
        onChange={onChange}
      />
      <DataLists visiable={visiable}>
        <ul>
          {datas.map((data, index) => (
            <li key={`${data}_${index}`}>{data}</li>
          ))}
        </ul>
      </DataLists>
    </Container>
  );
};

export default Search;
