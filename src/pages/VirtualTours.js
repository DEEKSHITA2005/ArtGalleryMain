import React from 'react';
import styled from 'styled-components';

const VirtualTourContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 100px); /* Adjust this value based on the height of your navbar */
  width: 100%;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const VirtualTours = () => {
  return (
    <VirtualTourContainer>
      <Iframe
        src="https://nostromophoto.com/virtual/virtual.html"
        title="Virtual Tour"
      />
    </VirtualTourContainer>
  );
};

export default VirtualTours;
