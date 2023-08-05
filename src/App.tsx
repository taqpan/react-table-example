import styled from '@emotion/styled';
import React from 'react';

import { TableComponent } from './TableComponent';
import { generatePersons } from './generatePerson';

export const App: React.FC = () => {
  const data = React.useMemo(() => generatePersons(100), []);

  return (
    <div>
      <Heading>Example Table</Heading>
      <TableComponent data={data} sticky={['check', 'firstName', 'lastName', 'age', 'rating']}/>
    </div>
  );
};

const Heading = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin: .7em;
`;
