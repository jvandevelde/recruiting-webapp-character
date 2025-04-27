import React, { createContext, useState } from "react";

const DEFAULT_VALUE = 10;
const MAX_ATTRIBUTE_VALUE = 70;

export type CharacterAttributes = {
  Strength: number;
  Dexterity: number;
  Constitution: number;
  Intelligence: number;
  Wisdom: number;
  Charisma: number;
};

export type CharMap = {
  [key in keyof CharacterAttributes]: {
    name: string;
    value: number;
    modifier: number;
  };
};

const initialState = {
  Strength: { name: "Strength", value: DEFAULT_VALUE, modifier: 0 },
  Dexterity: { name: "Dexterity", value: DEFAULT_VALUE, modifier: 0 },
  Constitution: { name: "Constitution", value: DEFAULT_VALUE, modifier: 0 },
  Intelligence: { name: "Intelligence", value: DEFAULT_VALUE, modifier: 0 },
  Wisdom: { name: "Wisdom", value: DEFAULT_VALUE, modifier: 0 },
  Charisma: { name: "Charisma", value: DEFAULT_VALUE, modifier: 0 },
};

interface CharacterContextProps {
  characterAttributes: CharMap;
  totalSkillPoints: number;
  usedSkillPoints: number;
  incrementAttribute: (attribute: keyof CharacterAttributes) => void;
  decrementAttribute: (attribute: keyof CharacterAttributes) => void;
  setUsedSkillPoints: React.Dispatch<React.SetStateAction<number>>;
}

const CharacterContext = createContext<CharacterContextProps>(null);

const CharacterContextProvider = ({ children }) => {
  const [totalSkillPoints, setTotalSkillPoints] = useState(DEFAULT_VALUE);
  const [usedSkillPoints, setUsedSkillPoints] = useState(0);
  const [characterAttributes, setCharacterAttributes] =
    React.useState<CharMap>(initialState);

  const calcSkillModifier = (value: number) => {
    const diffPoints = Math.floor(Math.abs(DEFAULT_VALUE - value) / 2);
    return value > DEFAULT_VALUE ? diffPoints : -diffPoints;
  };

  const attributeTotal = () => {
    return Object.keys(characterAttributes).reduce(
      (prev, curr) => prev + characterAttributes[curr].value,
      0,
    );
  };

  const incrementAttribute = (attribute: string) => {
    if (attributeTotal() >= MAX_ATTRIBUTE_VALUE) {
      window.alert(
        `Can not have more than ${MAX_ATTRIBUTE_VALUE} across all attributes`,
      );
      return;
    }

    if (attribute === "Intelligence") {
      const newSkillModifier = calcSkillModifier(
        characterAttributes[attribute].value + 1,
      );
      setTotalSkillPoints(DEFAULT_VALUE + 4 * newSkillModifier);
    }

    setCharacterAttributes((prevData) => ({
      ...prevData,
      [attribute]: {
        ...prevData[attribute],
        value: prevData[attribute].value + 1,
        modifier: calcSkillModifier(prevData[attribute].value + 1),
      },
    }));
  };

  const decrementAttribute = (attribute: string) => {
    if (characterAttributes[attribute].value <= 0) return;
    setCharacterAttributes((prevData) => ({
      ...prevData,
      [attribute]: {
        ...prevData[attribute],
        value: prevData[attribute].value - 1,
        modifier: calcSkillModifier(prevData[attribute].value - 1),
      },
    }));
  };

  const value = {
    characterAttributes,
    totalSkillPoints,
    usedSkillPoints,
    incrementAttribute,
    decrementAttribute,
    setUsedSkillPoints,
  };

  return (
    <CharacterContext.Provider value={value}>
      {children}
    </CharacterContext.Provider>
  );
};

export { CharacterContext, CharacterContextProvider };
