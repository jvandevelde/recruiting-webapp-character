import { useContext, useState } from "react";
import { CharacterContext } from "../CharacterContext";
import { SKILL_LIST } from "../consts";

const SkillList = () => {
  const { totalSkillPoints, usedSkillPoints } = useContext(CharacterContext);
  return (
    <div>
      <p>Total skill points: {totalSkillPoints}</p>
      <p>Skill points available: {totalSkillPoints - usedSkillPoints}</p>
      <div style={{ marginTop: "40px" }}>
        {SKILL_LIST.map((item) => (
          <CharacterSkill key={`skill-${item.name}`} skill={item} />
        ))}
      </div>
    </div>
  );
};

const CharacterSkill = (props: {
  skill: { name: string; attributeModifier: string };
}) => {
  const {
    skill: { name, attributeModifier },
  } = props;
  const {
    characterAttributes,
    totalSkillPoints,
    usedSkillPoints,
    setUsedSkillPoints,
  } = useContext(CharacterContext);
  const [usedPoints, setUsedPoints] = useState(0);
  const skillModifier = characterAttributes[attributeModifier].modifier;

  const handleIncrease = () => {
    if (usedSkillPoints >= totalSkillPoints) {
      window.alert(`No skill points available`);
      return;
    }

    setUsedSkillPoints(usedSkillPoints + 1);
    setUsedPoints(usedPoints + 1);
  };

  const handleDecrease = () => {
    if (usedSkillPoints <= 0 || usedPoints <= 0) {
      return;
    }
    setUsedSkillPoints(usedSkillPoints - 1);
    setUsedPoints(usedPoints - 1);
  };

  return (
    <p>
      {name}: {usedPoints} (Modifier: {attributeModifier}): {skillModifier}
      <button onClick={handleDecrease}>-</button>
      <button onClick={handleIncrease}>+</button>
      Total: {usedPoints + skillModifier}
    </p>
  );
};

export default SkillList;
