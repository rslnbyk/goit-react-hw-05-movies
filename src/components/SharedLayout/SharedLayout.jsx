import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { SharedHeader, SharedNav } from './SharedLayout.style';

const StyledLink = styled(NavLink)`
  color: black;
  font-size: 20px;
  text-decoration: none;

  &:not(:last-child) {
    margin-right: 20px;
  }

  &.active {
    color: #ff5f5f;
  }
`;

export const SharedLayout = () => {
  return (
    <>
      <SharedHeader>
        <SharedNav>
          <StyledLink to="/">Home</StyledLink>
          <StyledLink to="/movies">Movies</StyledLink>
        </SharedNav>
      </SharedHeader>
      <Suspense fallback={<div>Loading page...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
};
