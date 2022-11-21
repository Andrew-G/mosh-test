import React, { useCallback, useEffect, useState } from 'react';
import styled from "styled-components/macro";
import useWindowSize from './hooks/useWindowSize';
import apiAxios from './utils/apiAxios';
import { breakpoints } from './utils/theme';
import therapyImage from './img/therapy.png'
import consultationImage from './img/consultation.png'
import checkIcon from './img/check.png'
import chevronUpIcon from './img/chevron-up.png'
import chevronDownIcon from './img/chevron-down.png'

// Extra item information
type HeroItemMetaData = {
  imgUrl: string,
  title: string,
  buttonText: string,
  buttonUrl: string,
};
const HERO_ITEMS_META: { [key: string]: HeroItemMetaData } = {
  "consultation": {
    imgUrl: consultationImage,
    title: 'Free Online Doctor Consultation',
    buttonText: 'GET STARTED',
    buttonUrl: 'https://www.getmosh.com.au/quizzes/mental_health_quiz',
  },
  "therapy": {
    imgUrl: therapyImage,
    title: 'One-on-one therapy sessions',
    buttonText: 'BOOK THERAPIST',
    buttonUrl: 'https://www.getmosh.com.au/booking/mental_health',
  },
};
// Backup item data for when API exceeds daily request limit
type HeroItemData = { [key: string]: string[] };
const HERO_ITEMS_DATA: HeroItemData = {
  "consultation": [
    'Personalised treatment options',
    'Video consults and easy check-ins',
    'Medication, prescribed and delivered',
  ],
  "therapy": [
    'Match with a registered therapist',
    'Video consults and easy check-ins',
    'Confidential online therapy sessions',
  ],
};

const HeroContainer = styled.div`
  @media ${props => props.theme.breakpoints.mobile} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    gap: 24px;
  }
  @media ${props => props.theme.breakpoints.tablet} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 24px;
    width: 100%;
    max-width: 1200px;
  }
  @media ${props => props.theme.breakpoints.desktop} {
    display: grid;
    grid-template-areas: "hero-header hero-items";
    grid-template-columns: auto minmax(600px, auto);
    gap: 24px;
    width: 100%;
    max-width: 1200px;
  }
`;
const HeroHeader = styled.div`
  grid-area: hero-header;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media ${props => props.theme.breakpoints.mobile} {
    align-items: center;
    max-width: 400px;
  }
  @media ${props => props.theme.breakpoints.tablet} {
    align-items: center;
  }
`;
const HeroTitle = styled.h2`
  font-family: ${props => props.theme.font.title.fontFamily};
  font-weight: 700;
  font-size: 48px;
  line-height: 120%;
  text-align: center;
  margin: 0;
  margin-bottom: 8px;
  @media ${props => props.theme.breakpoints.mobile} {
    font-size: 32px;
  }
  @media ${props => props.theme.breakpoints.desktop} {
    text-align: left;
  }
`;
const Subtitle = styled.p`
  font-family: ${props => props.theme.font.fontFamily};
  color: ${props => props.theme.color.text};
  line-height: 150%;
  letter-spacing: -0.01em;
  margin: 0;
  @media ${props => props.theme.breakpoints.mobile} {
    font-size: 14px;
    text-align: center;
  }
  @media ${props => props.theme.breakpoints.tablet} {
    font-size: 18px;
    text-align: center;
  }
`;
const HeroItems = styled.div`
  grid-area: hero-items;
  @media ${props => props.theme.breakpoints.mobile} {
    font-size: 14px;
    text-align: center;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap 24px;
  }
  @media ${props => props.theme.breakpoints.tablet} {
    font-size: 18px;
    text-align: center;
    display: flex;
    gap: 24px;
    justify-content: center;
    width: 100%;
  }
  @media ${props => props.theme.breakpoints.desktop} {
    display: flex;
    flex-direction: column;
    gap 32px;
  }
`;
const HeroItemContainer = styled.div`
  @media ${props => props.theme.breakpoints.mobile} {
    display: grid;
    gap: 16px;
    grid-template-rows: 140px 27px 53px;
    grid-template-areas:
      "hero-item-image"
      "hero-item-title"
      "hero-item-button";
    &.is-open {
      grid-template-rows: 140px 27px auto 53px;
      grid-template-areas:
        "hero-item-image"
        "hero-item-title"
        "hero-item-list"
        "hero-item-button";
    }
  }
  @media ${props => props.theme.breakpoints.tablet} {
    display: grid;
    gap: 16px;
    grid-template-rows: 140px 27px 53px;
    grid-template-areas:
      "hero-item-image"
      "hero-item-title"
      "hero-item-button";
    width: 100%;
    max-width: 400px;
    &.is-open {
      grid-template-rows: 140px 27px auto 53px;
      grid-template-areas:
        "hero-item-image"
        "hero-item-title"
        "hero-item-list"
        "hero-item-button";
    }
  }
  @media ${props => props.theme.breakpoints.desktop} {
    display: grid;
    grid-template-columns: 285px auto;
    grid-template-rows: auto auto 50px;
    grid-template-areas:
      "hero-item-image hero-item-title"
      "hero-item-image hero-item-list"
      "hero-item-image hero-item-button";
    gap: 16px 20px;
  }
`;
const HeroItemImage = styled.img`
  grid-area: hero-item-image;
  width: 100%;
  border-radius: 20px;
  max-width: 400px;
  align-self: stretch;
  object-fit: cover;
  cursor: pointer;
`;
const HeroItemTitle = styled.div`
  grid-area: hero-item-title;
  font-family: ${props => props.theme.font.fontFamily};
  font-size: 18px;
  line-height: 150%;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .open-icon {
    margin-left: 16px;
    width: 12px;
    height: 7px;
  }
`;
const HeroItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 8px;
  @media ${props => props.theme.breakpoints.desktop} {
    margin-bottom: 0px;
  }
`;
const HeroItemListItem = styled.div`
  text-align: left;
  &:before {
    content: '';
    background: transparent url(${checkIcon}) no-repeat;
    padding-left: 32px;
    position: relative;
  }
  @media ${props => props.theme.breakpoints.mobile} {
    &:before {
      top: 2px;
    }
  }
  @media ${props => props.theme.breakpoints.tablet} {
    &:before {
      top: 5px;
    }
  }
  @media ${props => props.theme.breakpoints.desktop} {
    &:before {
      top: 4px;
    }
  }
`;
const HeroItemButton = styled.a`
  grid-area: hero-item-button;
  padding: 16px 24px;
  background-color: ${props => props.theme.color.button};
  color: ${props => props.theme.color.buttonText};
  border-radius: 8px;
  font-family: ${props => props.theme.font.fontFamily};
  font-weight: 600;
  font-size: 14px;
  line-height: 150%;
  width: 100%;
  text-decoration: none;
  text-align: center;
  box-sizing: border-box; 
  @media ${props => props.theme.breakpoints.mobile} {
    width: unset;
    max-width: 100%;
  }
  @media ${props => props.theme.breakpoints.tablet} {
    width: unset;
    max-width: 100%;
  }
  @media ${props => props.theme.breakpoints.desktop} {
    max-width: 220px;
  }
`;
const ErrorMessage = styled.p`
  font-family: ${props => props.theme.font.fontFamily};
  font-weight: 200;
  line-height: 150%;
  color: ${props => props.theme.color.error};
  margin: 0;
`;

// Single point of sale item within the hero banner
const HeroItem = ({ itemKey, listItems }: { itemKey: string, listItems: string[] }) => {
  const { width = 0 } = useWindowSize();
  const [open, setOpen] = useState(false);
  const handleToggleOpen = () => {
    setOpen(prev => !prev);
  };

  return (
    <HeroItemContainer className={open ? 'is-open' : undefined}>
      {/* Image */}
      <HeroItemImage src={HERO_ITEMS_META[itemKey].imgUrl} alt={itemKey} onClick={handleToggleOpen}/>
      {/* Expandable Title */}
      <HeroItemTitle
        onClick={handleToggleOpen}
        className={open ? 'is-open' : undefined}
      >
        {HERO_ITEMS_META[itemKey].title}
        {width <= breakpoints.tablet ? (
          <img
            className="open-icon"
            src={open ? chevronUpIcon : chevronDownIcon}
            alt={open ? 'Close info' : 'Open info'}
          />
        ) : null}
      </HeroItemTitle>
      {/* List Items */}
      {width >= breakpoints.tablet || open ? (
        <HeroItemList>
          {listItems.map(i => <HeroItemListItem>{i}</HeroItemListItem>)}
        </HeroItemList>
      ) : null}
      {/* Action button */}
      <HeroItemButton href={HERO_ITEMS_META[itemKey].buttonUrl}>
        {HERO_ITEMS_META[itemKey].buttonText}
      </HeroItemButton>
    </HeroItemContainer>
  )
}

// The hero banner
function HeroBanner() {
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<HeroItemData | undefined>(undefined);
  const { width = 0 } = useWindowSize();

  // Gets item data
  const getItems = useCallback(async () => {
    setError(null);
    try {
      const res = await apiAxios({
        method: 'get',
        url: `/options`,
      });
      if (res?.data) {
        setItems(res.data);
      }
    } catch (error: any) {
      const newError = error?.response?.data || 'Something went wrong';
      setError(newError);
      setItems(undefined);

      // For the purpose of being able to continue to work on this test
      // after the beeceptor api exceeds daily request limit
      // I am clearing the error and manually setting the data 
      setTimeout(() => {
        setError(null);
        setItems(HERO_ITEMS_DATA);
      }, 3000);
    }
  }, []);
  useEffect(() => { getItems() }, [getItems]);

  return (
    <HeroContainer>
      {/* Header */}
      <HeroHeader>
        {/* Title */}
        <HeroTitle>Get back on track</HeroTitle>
        {/* Subtitle */}
        {width < breakpoints.mobile ? (
          <Subtitle>Treatment plan in 24 hours. Treat anxiety, depression & more</Subtitle>
        ) : (
          <Subtitle>Treatment plan in 24 hours.<br/>Treat anxiety, depression & more</Subtitle>
        )}
      </HeroHeader>
      {/* Point of sale items */}
      <HeroItems>
        {error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          items !== undefined ? (
            Object.keys(items).map(key => (
              <HeroItem key={key} itemKey={key} listItems={items[key]}/>
            ))
          ) : null
        )}
      </HeroItems>
    </HeroContainer>
  );
}

export default HeroBanner;