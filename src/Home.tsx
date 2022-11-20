import React from 'react';
import styled from "styled-components/macro";
import HeroBanner from './HeroBanner';

const ContentWrapper = styled.div`
  background-color: ${props => props.theme.color.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${props => props.theme.color.text};
  @media ${props => props.theme.breakpoints.mobile} {
    padding: 40px 16px 32px;
  }
  @media ${props => props.theme.breakpoints.tablet} {
    padding: 48px 32px 32px;
  }
  @media ${props => props.theme.breakpoints.desktop} {
    padding: 64px 32px 32px;
  }
`;

const Home = () => {
  return (
    <ContentWrapper>
      <HeroBanner/>
    </ContentWrapper>
  )
};

export default Home;